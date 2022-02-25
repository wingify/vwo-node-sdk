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
const ImpressionUtil = require('../utils/ImpressionUtil');
const ValidateUtil = require('../utils/ValidateUtil');
const DataTypeUtil = require('../utils/DataTypeUtil');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const EventEnum = require('../enums/EventEnum');
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
    var {
      customVariables,
      variationTargetingVariables,
      userStorageData,
      shouldTrackReturningUser,
      metaData,
      responseCallback
    } = options;
    // Check if arguments have valid data-type
    if (
      ValidateUtil.areValidParamsForAPIMethod({
        method: ApiEnum.IS_FEATURE_ENABLED,
        campaignKey,
        userId,
        customVariables,
        variationTargetingVariables,
        userStorageData,
        shouldTrackReturningUser,
        metaData,
        responseCallback
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
        api: ApiEnum.isFeatureEnabled
      })
    );
    return null;
  }

  // Get the cached configuration
  let config = vwoInstance.SettingsFileManager.getConfig();
  let settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api);

  // If no settings are found, simply log and return false
  if (!settingsFile) {
    return null;
  }

  shouldTrackReturningUser = shouldTrackReturningUser || config.shouldTrackReturningUser || false;

  // Get the campaign settings based on campaignKey from the settings
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

  const { variation, variationName, variationId, isStoredVariation } = DecisionUtil.getVariation(
    config,
    settingsFile,
    campaign,
    campaignKey,
    userId,
    customVariables,
    variationTargetingVariables,
    userStorageData,
    metaData,
    true,
    undefined,
    api
  );

  let isFeatureEnabled = false;

  if (variationName) {
    isFeatureEnabled = CampaignUtil.isFeatureRolloutCampaign(campaign) || variation.isFeatureEnabled;

    if (isStoredVariation && !shouldTrackReturningUser) {
      vwoInstance.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CAMPAIGN_USER_ALREADY_TRACKED, {
          file,
          userId,
          campaignKey,
          api
        })
      );
    } else {
      // Variation found...let VWO server knows about it to show report stats
      if (config.batchEvents) {
        let properties = ImpressionUtil.buildBatchEventForTrackingUser(settingsFile, campaign.id, variationId, userId);
        vwoInstance.batchEventsQueue.enqueue(properties);
      } else if (settingsFile.isEventArchEnabled) {
        let properties = ImpressionUtil.getEventsBaseProperties(
          settingsFile,
          EventEnum.VWO_VARIATION_SHOWN,
          vwoInstance.usageStats.getUsageStats()
        );
        let payload = ImpressionUtil.getTrackUserPayloadData(
          settingsFile,
          userId,
          EventEnum.VWO_VARIATION_SHOWN,
          campaign.id,
          variationId
        );
        vwoInstance.eventQueue.process(config, properties, vwoInstance, { payload, responseCallback });
      } else {
        let properties = ImpressionUtil.buildEventForTrackingUser(
          settingsFile,
          campaign.id,
          variationId,
          userId,
          vwoInstance.usageStats.getUsageStats()
        );
        vwoInstance.eventQueue.process(config, properties, vwoInstance, { responseCallback });
      }

      vwoInstance.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_STATUS, {
          file,
          campaignKey,
          userId,
          status: isFeatureEnabled ? 'enabled' : 'disabled'
        })
      );

      if (config.isDevelopmentMode) {
        return { isFeatureEnabled };
      }

      return isFeatureEnabled;
    }
  }

  vwoInstance.logger.log(
    LogLevelEnum.INFO,
    LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_STATUS, {
      file,
      campaignKey,
      userId,
      status: isFeatureEnabled ? 'enabled' : 'disabled'
    })
  );

  if (isStoredVariation || config.isDevelopmentMode) {
    return { isFeatureEnabled };
  }

  return { isFeatureEnabled };
}

module.exports = isFeatureEnabled;
