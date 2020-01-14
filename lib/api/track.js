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
const GoalTypeEnum = require('../enums/GoalTypeEnum');
const ApiEnum = require('../enums/ApiEnum');

const DecisionUtil = require('../utils/DecisionUtil');
const CampaignUtil = require('../utils/CampaignUtil');
const ImpressionUtil = require('../utils/ImpressionUtil');
const ValidateUtil = require('../utils/ValidateUtil');
const DataTypeUtil = require('../utils/DataTypeUtil');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

const file = FileNameEnum.Track;

/**
 * This API method: Marks the conversion of the campaign for a particular goal
 *
 * 1. validates the arguments being passed
 * 2. Checks if user is eligible to get bucketed into the campaign,
 * 3. Gets the assigned determinitic variation to the user(based on userId), if user becomes part of campaign
 * 4. Sends an impression call to VWO server to track goal data
 *
 * @param {Object} vwoInstance               VWO instance which has logger, settingsFile etc.
 * @param {Number} campaignKey               unique campaign test key
 * @param {String} userId                    ID assigned to a user
 * @param {String} goalIdentifier             unique campaign's goal identifier
 * @param {Object} options                   Optional params
 */
function track(vwoInstance, campaignKey, userId, goalIdentifier, options = {}) {
  const api = ApiEnum.TRACK;
  let areParamsValid = false;
  if (DataTypeUtil.isObject(options)) {
    var { revenueValue, customVariables, variationTargetingVariables } = options;
    // Check if arguments have valid data-type
    if (
      ValidateUtil.areValidParamsForAPIMethod({
        method: ApiEnum.TRACK,
        campaignKey,
        userId,
        goalIdentifier,
        customVariables,
        variationTargetingVariables
      })
    ) {
      areParamsValid = true;
    }
  }

  if (areParamsValid === false) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_MISSING_PARAMS, {
        file
      })
    );
    return false;
  }

  // Get the cached configuration
  let config = vwoInstance.SettingsFileManager.getConfig();
  let settingsFile = config.settingsFile;

  // If no settings are found, simply log and do not track goal
  if (!settingsFile) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_CONFIG_CORRUPTED, {
        file
      })
    );
    return false;
  }

  // Get the campaign settings based on campaignKey from the settings
  let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

  // If matching campaign is not found with campaignKey or if found but is in not RUNNING state, simply return no variation
  if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
        file,
        campaignKey: campaignKey,
        api
      })
    );

    return false;
  }

  if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
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

  let campaignId = campaign.id;

  // Get the campaign goal settings based on goalIdentifier
  let goal = CampaignUtil.getCampaignGoal(config, campaign.key, goalIdentifier);

  if (!goal) {
    // If no goal is found, something is wrong with the goalIdentifier
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_GOAL_NOT_FOUND, {
        file,
        userId,
        goalIdentifier,
        campaignKey: campaignKey
      })
    );

    return false;
  } else if (goal.type === GoalTypeEnum.REVENUE && !ValidateUtil.isValidValue(revenueValue)) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_REVENUE_NOT_PASSED_FOR_REVENUE_GOAL, {
        file,
        userId,
        goalIdentifier,
        campaignKey: campaignKey
      })
    );

    return false;
  }

  let { variationId, variationName } = DecisionUtil.getVariation(
    config,
    campaign,
    campaignKey,
    userId,
    customVariables,
    variationTargetingVariables
  );
  // Is User is a part of Campaign and has been decided to be a part of particular variation
  if (variationName) {
    // If goal is found, send an impression to VWO server for report stats

    let properties = ImpressionUtil.buildEventForTrackingGoal(
      settingsFile,
      campaignId,
      variationId,
      userId,
      goal,
      revenueValue
    );

    vwoInstance.eventQueue.process(config, properties, vwoInstance);

    return true;
  }

  return false;
}

module.exports = track;
