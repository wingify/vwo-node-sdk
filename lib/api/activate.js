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

const file = FileNameEnum.Activate;

/**
 * This API method: Gets the variation assigned for the user for the campaign and send the metrics to VWO server
 *
 * 1. Validates the arguments being passed
 * 2. Checks if user is eligible to get bucketed into the campaign,
 * 3. Assigns the determinitic variation to the user(based on userId), if user becomes part of campaign
 *    If userStorageService is used, it will look into it for the variation and if found, no further processing is done
 * 4. Sends an impression call to VWO server to track user
 *
 * @param {Object} vwoInstance       VWO instance which has logger, settingsFile etc.
 * @param {String} campaignKey       unique campaign key specified in VWO app
 * @param {String} userId            ID assigned to a user
 * @param {Object} options           Optional params
 *
 * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
 */
function activate(vwoInstance, campaignKey, userId, options = {}) {
  const api = ApiEnum.ACTIVATE;
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
        method: ApiEnum.ACTIVATE,
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
        api: ApiEnum.ACTIVATE
      })
    );
    return null;
  }

  // Get the cached configuration
  let config = vwoInstance.SettingsFileManager.getConfig();
  let settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api);

  // If no settings are found, simply return no variation
  if (!settingsFile) {
    return null;
  }

  shouldTrackReturningUser = shouldTrackReturningUser || config.shouldTrackReturningUser || false;

  // Get the campaign settings based on campaignKey from the settings
  let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

  // If matching campaign is not found with campaignKey or if found but is in not RUNNING state, simply return no variation
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

  if (!CampaignUtil.isAbCampaign(campaign)) {
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

  // Once the matching RUNNING campaign is found, assign the deterministic variation to the userId provided
  const { variationId, variationName, isStoredVariation } = DecisionUtil.getVariation(
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

  // Check if variation-name has been assigned to the userId. If not, return no variation
  if (!ValidateUtil.isValidValue(variationName)) {
    vwoInstance.logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.DECISION_NO_VARIATION_ALLOTED, {
        file,
        userId,
        campaignKey
      })
    );

    return null;
  }

  // check if variation found from storage. return it without sending a call to VWO server
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
    return { variationName };
  }

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

  if (config.isDevelopmentMode) {
    return { variationName };
  }

  return variationName;
}

module.exports = activate;
