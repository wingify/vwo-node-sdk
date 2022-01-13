/**
 * Copyright 2019-2022 Wingify Software Pvt. Ltd.
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
const FeatureUtil = require('../utils/FeatureUtil');
const DataTypeUtil = require('../utils/DataTypeUtil');
const ObjectUtil = require('../utils/ObjectUtil');

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
 * @param {Object} options           Optional params
 *
 * @return {string|number|double|boolean|null} Variable value as is set in the VWO app i.e.
 *                                             maintaining the data-type,
 *                                             null if anything fails like campaign / variable not found
 */
function getFeatureVariableValue(vwoInstance, campaignKey, variableKey, userId, options = {}) {
  try {
    const api = ApiEnum.GET_FEATURE_VARIABLE_VALUE;
    let areParamsValid = false;
    if (DataTypeUtil.isObject(options)) {
      var { customVariables, variationTargetingVariables, userStorageData, metaData } = options;
      // Check if arguments have valid data-type
      if (
        ValidateUtil.areValidParamsForAPIMethod({
          method: ApiEnum.GET_FEATURE_VARIABLE_VALUE,
          campaignKey,
          variableKey,
          userId,
          customVariables,
          variationTargetingVariables,
          userStorageData,
          metaData
        })
      ) {
        areParamsValid = true;
      }
    }

    if (areParamsValid === false) {
      vwoInstance.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_BAD_PARAMETERS, {
          file,
          api: ApiEnum.GetFeatureVariableValue
        })
      );
      return null;
    }

    // Get the cached configuration
    let config = vwoInstance.SettingsFileManager.getConfig();
    let settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api);
    config.apiName = api;

    // If no settings are found, simply return no variation
    if (!settingsFile) {
      return null;
    }

    let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

    if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
      vwoInstance.logger.log(
        LogLevelEnum.WARN,
        LogMessageUtil.build(LogMessageEnum.WARNING_MESSAGES.CAMPAIGN_NOT_RUNNING, {
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
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_NOT_APPLICABLE, {
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
    const { variation, variationName } = DecisionUtil.getVariation(
      config,
      settingsFile,
      campaign,
      campaignKey,
      userId,
      customVariables,
      variationTargetingVariables,
      userStorageData,
      metaData,
      false,
      undefined,
      api
    );

    if (!variationName) {
      vwoInstance.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_STATUS, {
          file,
          campaignKey,
          userId,
          status: 'disabled'
        })
      );

      return null;
    }

    if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
      variable = FeatureUtil.getVariableForFeature(campaign, variableKey);
    } else if (CampaignUtil.isFeatureTestCampaign(campaign)) {
      variable = FeatureUtil.getVariableValueForVariation(campaign, variation, variableKey);

      if (ObjectUtil.areObjectKeys(variable) && variation.isFeatureEnabled) {
        vwoInstance.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_VARIABLE_VALUE, {
            file,
            variableKey,
            campaignKey: campaign.key,
            variableValue: variable.value,
            userId
          })
        );
      } else if (ObjectUtil.areObjectKeys(variable) && !variation.isFeatureEnabled) {
        vwoInstance.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_VARIABLE_DEFAULT_VALUE, {
            file,
            variableKey,
            variationName
          })
        );
      }
    }

    if (!ObjectUtil.areObjectKeys(variable)) {
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
