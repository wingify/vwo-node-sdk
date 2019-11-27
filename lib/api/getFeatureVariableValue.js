/**
 * Copyright 2019 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Constants = require('../constants');
const ApiEnum = require('../enums/ApiEnum');

const DecisionUtil = require('../utils/DecisionUtil');
const CampaignUtil = require('../utils/CampaignUtil');
const ValidateUtil = require('../utils/ValidateUtil');
const FunctionUtil = require('../utils/FunctionUtil');
const FeatureUtil = require('../utils/FeatureUtil');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

const file = FileNameEnum.GetFeatureVariableValue;

/**
 * This API method:
 *
 * 1. Validates the arguments being passed
 * 2. Checks if user is eligible for campaign and check if feature is enabled for the user.
 * 4. If feature enabled, return the variable for that variation(if Feature Test),
 *    otherwise the default values being set in Feature
 *
 * @param {Object} vwoInstance   VWO instance which has logger, settingsFile etc.
 * @param {String} campaignKey   Unique key for a campaign
 * @param {String} variableKey   Unique key for a feature's variable
 * @param {String} userId        Unique identifier for the user
 *
 * @return {string|number|double|boolean|null} Variable value as is set in the VWO app i.e.
 *                                             maintaining the data-type,
 *                                             null if anything fails like campaign / variable not found
 */
function getFeatureVariableValue(vwoInstance, campaignKey, variableKey, userId) {
  try {
    const api = ApiEnum.GET_FEATURE_VARIABLE_VALUE;

    // Check if arguments have valid data-type
    if (!ValidateUtil.areValidParamsForAPIMethod(ApiEnum.GET_FEATURE_VARIABLE_TYPE, campaignKey, variableKey, userId)) {
      vwoInstance.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_FEATURE_VARIABLE_MISSING_PARAMS, {
          file,
          campaignKey,
          variableKey
        })
      );

      return null;
    }

    // Get the cached configuration
    let config = vwoInstance.SettingsFileManager.getConfig();
    let settingsFile = config.settingsFile;

    // If no settings are found, simply log and return no variation
    if (!settingsFile) {
      vwoInstance.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_FEATURE_VARIABLE_CONFIG_CORRUPTED, {
          file
        })
      );

      return null;
    }

    let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

    if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
      vwoInstance.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
          file,
          campaignKey,
          api
        })
      );

      return null;
    }

    if (CampaignUtil.isAbCampaign(campaign)) {
      // API not allowed for full-stack AB campaigns
      vwoInstance.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_API, {
          file,
          campaignKey,
          campaignType: campaign.type,
          userId,
          api
        })
      );

      return null;
    }

    let variable;

    const { variation, variationName } = DecisionUtil.getVariation(config, campaign, campaignKey, userId);

    if (!variationName) {
      vwoInstance.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_NOT_ENABLED_FOR_USER, {
          file,
          campaignKey,
          userId
        })
      );

      return null;
    }

    if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
      variable = FeatureUtil.getVariableForFeature(campaign, variableKey);
    } else if (CampaignUtil.isFeatureTestCampaign(campaign)) {
      variable = FeatureUtil.getVariableValueForVariation(campaign, variation, variableKey);

      if (FunctionUtil.areOjectKeys(variable) && variation.isFeatureEnabled) {
        vwoInstance.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_RECEIVED_VARIABLE_VALUE, {
            file,
            variableKey,
            campaignKey: campaign.key,
            variableValue: variable.value,
            userId
          })
        );
      } else if (FunctionUtil.areOjectKeys(variable) && !variation.isFeatureEnabled) {
        vwoInstance.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIABLE_NOT_USED_RETURN_DEFAULT_VARIABLE_VALUE, {
            file,
            variableKey,
            variationName
          })
        );
      }
    }

    if (!FunctionUtil.areOjectKeys(variable)) {
      vwoInstance.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.VARIABLE_NOT_FOUND, {
          file,
          variableKey,
          userId
        })
      );

      return null;
    }

    let variableValue = variable.value;
    let typeCastedValue = FeatureUtil.getTypeCastVariableValue(variableValue, variable.type);

    return typeCastedValue;
  } catch (err) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, err.message);

    return null;
  }
}

module.exports = getFeatureVariableValue;
