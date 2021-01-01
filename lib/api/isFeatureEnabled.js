/**
 * Copyright 2019-2020 Wingify Software Pvt. Ltd.
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
const ImpressionUtil = require('../utils/ImpressionUtil');
const ValidateUtil = require('../utils/ValidateUtil');
const DataTypeUtil = require('../utils/DataTypeUtil');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

const file = FileNameEnum.IsFeatureEnabled;

/**
 * This API checks: Whether a feature is enabled or not for the given user
 *
 * 1. Validates the arguments being passed
 * 2. Checks if user is eligible for campaign and check if feature is enabled for the user.
 * 4. If feature enabled, sends a call to VWO server for tracking visitor
 *
 * @param {Object} vwoInstance       VWO instance which has logger, settingsFile etc.
 * @param {String} campaignKey       Unique key for a campaign
 * @param {String} userId            Unique identifier for the user
 * @param {Object} options           Optional params
 *
 * @return {Boolean}                 true if feature enabled, false otherwise
 */
function isFeatureEnabled(vwoInstance, campaignKey, userId, options = {}) {
  const api = ApiEnum.IS_FEATURE_ENABLED;
  let areParamsValid = false;
  if (DataTypeUtil.isObject(options)) {
    var { customVariables, variationTargetingVariables, userStorageData } = options;
    // Check if arguments have valid data-type
    if (
      ValidateUtil.areValidParamsForAPIMethod({
        method: ApiEnum.IS_FEATURE_ENABLED,
        campaignKey,
        userId,
        customVariables,
        variationTargetingVariables,
        userStorageData
      })
    ) {
      areParamsValid = true;
    }
  }

  if (areParamsValid === false) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IS_FEATURE_ENABLED_API_MISSING_PARAMS, {
        file
      })
    );
    return false;
  }

  // Get the cached configuration
  let config = vwoInstance.SettingsFileManager.getConfig();
  let settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api);

  // If no settings are found, simply log and return false
  if (!settingsFile) {
    return false;
  }

  // Get the campaign settings based on campaignKey from the settings
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

    return false;
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

    return false;
  }

  const { variation, variationName, variationId } = DecisionUtil.getVariation(
    config,
    settingsFile,
    campaign,
    campaignKey,
    userId,
    customVariables,
    variationTargetingVariables,
    userStorageData
  );

  let isFeatureEnabled = false;

  if (variationName && CampaignUtil.isFeatureTestCampaign(campaign)) {
    isFeatureEnabled = variation.isFeatureEnabled;

    // Variation found...let VWO server knows about it to show report stats
    if (config.batchEvents) {
      let properties = ImpressionUtil.buildBatchEventForTrackingUser(settingsFile, campaign.id, variationId, userId);
      vwoInstance.batchEventsQueue.enqueue(properties);
    } else {
      let properties = ImpressionUtil.buildEventForTrackingUser(settingsFile, campaign.id, variationId, userId);
      vwoInstance.eventQueue.process(config, properties, vwoInstance);
    }
  } else if (variationName && CampaignUtil.isFeatureRolloutCampaign(campaign)) {
    isFeatureEnabled = true;
  }

  if (isFeatureEnabled) {
    vwoInstance.logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_ENABLED_FOR_USER, {
        file,
        campaignKey,
        userId
      })
    );
  } else {
    vwoInstance.logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_NOT_ENABLED_FOR_USER, {
        file,
        campaignKey,
        userId
      })
    );
  }

  return isFeatureEnabled;
}

module.exports = isFeatureEnabled;
