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
const GoalTypeEnum = require('../enums/GoalTypeEnum');
const ApiEnum = require('../enums/ApiEnum');

const DecisionUtil = require('../utils/DecisionUtil');
const CampaignUtil = require('../utils/CampaignUtil');
const { objectValues } = require('../utils/ObjectUtil');
const ImpressionUtil = require('../utils/ImpressionUtil');
const ValidateUtil = require('../utils/ValidateUtil');
const DataTypeUtil = require('../utils/DataTypeUtil');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

const file = FileNameEnum.Track;
const GOAL_TYPE_TO_TRACK_DEFAULT = GoalTypeEnum.ALL;
const GOAL_IDENTIFIER_SEPERATOR = '_vwo_';
const api = ApiEnum.TRACK;

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
  let areParamsValid = false;
  if (DataTypeUtil.isObject(options)) {
    var {
      revenueValue,
      customVariables,
      variationTargetingVariables,
      goalTypeToTrack,
      shouldTrackReturningUser
    } = options;
    // Check if arguments have valid data-type
    if (
      ValidateUtil.areValidParamsForAPIMethod({
        method: ApiEnum.TRACK,
        campaignKey,
        userId,
        goalIdentifier,
        customVariables,
        variationTargetingVariables,
        goalTypeToTrack,
        shouldTrackReturningUser
      }) &&
      (!goalTypeToTrack || (goalTypeToTrack && objectValues(GoalTypeEnum).includes(goalTypeToTrack)))
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
    return null;
  }

  // Get the cached configuration
  let config = vwoInstance.SettingsFileManager.getConfig();
  let settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api);

  // If no settings are found, simply do not track goal and return false
  if (!settingsFile) {
    return null;
  }

  let campaigns = [];
  goalTypeToTrack = goalTypeToTrack || config.goalTypeToTrack || GOAL_TYPE_TO_TRACK_DEFAULT; // priority order - options > launchConfig > default
  if (DataTypeUtil.isUndefined(shouldTrackReturningUser)) {
    // if shouldTrackReturningUser is not given in options
    if (DataTypeUtil.isBoolean(config.shouldTrackReturningUser)) {
      // if shouldTrackReturningUser is given in config at launch
      shouldTrackReturningUser = config.shouldTrackReturningUser;
    } else {
      shouldTrackReturningUser = false;
    }
  }
  if (!DataTypeUtil.isString(campaignKey)) {
    if (DataTypeUtil.isArray(campaignKey)) {
      campaigns = CampaignUtil.getCampaignsForKeys(settingsFile, campaignKey);
    } else {
      campaigns = CampaignUtil.getCampaignsForGoal(settingsFile, goalIdentifier, goalTypeToTrack);
    }
  } else {
    // Get the campaign settings based on campaignKey from the settings
    let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);
    campaigns.push(campaign || { key: campaignKey });
  }
  const result = {};
  campaigns.forEach(
    campaign =>
      (result[campaign.key] = trackCampaignGoal(
        vwoInstance,
        campaign,
        campaign.key,
        userId,
        settingsFile,
        goalIdentifier,
        revenueValue,
        config,
        customVariables,
        variationTargetingVariables,
        goalTypeToTrack,
        shouldTrackReturningUser
      ))
  );
  if (!Object.keys(result).length) {
    return null;
  }
  return result;
}

function trackCampaignGoal(
  vwoInstance,
  campaign,
  campaignKey,
  userId,
  settingsFile,
  goalIdentifier,
  revenueValue,
  config,
  customVariables,
  variationTargetingVariables,
  goalTypeToTrack,
  shouldTrackReturningUser
) {
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
  let goal = CampaignUtil.getCampaignGoal(settingsFile, campaign.key, goalIdentifier);

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
  } else if (goalTypeToTrack !== GOAL_TYPE_TO_TRACK_DEFAULT && goal.type !== goalTypeToTrack) {
    return false;
  } else if (goal.type === GoalTypeEnum.REVENUE && !ValidateUtil.isValidValue(revenueValue)) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_REVENUE_NOT_PASSED_FOR_REVENUE_GOAL, {
        file,
        userId,
        goalIdentifier,
        campaignKey
      })
    );
    return false;
  }

  let { variationId, variationName, storedGoalIdentifier } = DecisionUtil.getVariation(
    config,
    settingsFile,
    campaign,
    campaignKey,
    userId,
    customVariables,
    variationTargetingVariables,
    goalIdentifier
  );

  // Is User is a part of Campaign and has been decided to be a part of particular variation
  if (variationName) {
    if (storedGoalIdentifier) {
      const identifiers = storedGoalIdentifier.split(GOAL_IDENTIFIER_SEPERATOR);
      if (!identifiers.includes(goalIdentifier)) {
        storedGoalIdentifier += GOAL_IDENTIFIER_SEPERATOR + goalIdentifier;
        DecisionUtil._saveUserData(config, campaign, variationName, userId, storedGoalIdentifier);
      } else if (!shouldTrackReturningUser) {
        vwoInstance.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOAL_ALREADY_TRACKED, {
            file,
            userId,
            goalIdentifier,
            campaignKey
          })
        );
        return false;
      }
    }
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
    DecisionUtil._saveUserData(config, campaign, variationName, userId, goalIdentifier);
    return true;
  }

  return false;
}

module.exports = track;
