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

let BatchEventsDispatcher;
if (typeof process.env !== 'undefined') {
  BatchEventsDispatcher = require('../utils/BatchEventsDispatcher');
}

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
      userStorageData,
      goalTypeToTrack,
      shouldTrackReturningUser,
      metaData,
      responseCallback,
      eventProperties,
      userAgent,
      userIpAddress
    } = options;
    var visitorUserAgent = userAgent;
    // Check if arguments have valid data-type
    if (
      ValidateUtil.areValidParamsForAPIMethod({
        method: ApiEnum.TRACK,
        campaignKey,
        userId,
        goalIdentifier,
        customVariables,
        variationTargetingVariables,
        userStorageData,
        goalTypeToTrack,
        shouldTrackReturningUser,
        metaData,
        responseCallback,
        eventProperties,
        visitorUserAgent,
        userIpAddress
      }) &&
      (!goalTypeToTrack || (goalTypeToTrack && objectValues(GoalTypeEnum).includes(goalTypeToTrack)))
    ) {
      areParamsValid = true;
    }
  }

  if (areParamsValid === false) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_BAD_PARAMETERS, {
        file,
        api: ApiEnum.TRACK
      })
    );
    return null;
  }

  // Get the cached configuration
  let config = vwoInstance.SettingsFileManager.getConfig();
  let settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api);
  config.apiName = api;
  let revenuePropList = new Set();

  // If no settings are found, simply do not track goal and return false
  if (!settingsFile) {
    return null;
  }

  let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);
  // check if MAB enabled, if yes, then userStorage must be defined
  if (campaign && campaign.hasOwnProperty('isMAB') && campaign.isMAB === true) {
    if (vwoInstance.userStorageService === undefined) {
      vwoInstance.logger.log(
        LogLevelEnum.ERROR,
        '(' +
          file +
          ') This campaign: ' +
          campaignKey +
          ' has MAB configured. Please configure User Storage to proceed.'
      );

      return null;
    }
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
  let metricMap = {};
  let events = [];
  let areGlobalGoals = typeof process.env === 'undefined' ? false : campaigns.length > 1;

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
        userStorageData,
        goalTypeToTrack,
        shouldTrackReturningUser,
        metaData,
        metricMap,
        revenuePropList,
        events,
        areGlobalGoals,
        eventProperties,
        visitorUserAgent,
        userIpAddress
      ))
  );

  // Check if each object in result is a promise
  // in case of asyncStorageConfig, each object would be a promise only
  // Check if result is a non-empty object
  const areAllPromises =
    result && Object.keys(result).length > 0
      ? Object.values(result).every(item => DataTypeUtil.isPromise(item))
      : false;
  // const areAllPromises = Object.values(result).every(item => DataTypeUtil.isPromise(item));

  if (areAllPromises) {
    // Promise.all - This method takes an array of promises and returns a new promise that resolves to an array of the resolved values when all of the input promises have resolved.
    // If any of the promises in the array reject, the whole Promise.all is rejected.
    return Promise.all(Object.values(result)).then(dataArray => {
      dataArray.forEach((data, index) => {
        const campaignKey = Object.keys(result)[index];
        const ans = _validateAndReturnTrackValue(
          vwoInstance,
          config,
          settingsFile,
          revenuePropList,
          userId,
          goalIdentifier,
          revenueValue,
          metricMap,
          events,
          areGlobalGoals,
          responseCallback,
          eventProperties,
          visitorUserAgent,
          userIpAddress,
          { [campaignKey]: data }
        );
        result[campaignKey] = ans[campaignKey];
      });
      return result;
    });
  }
  return _validateAndReturnTrackValue(
    vwoInstance,
    config,
    settingsFile,
    revenuePropList,
    userId,
    goalIdentifier,
    revenueValue,
    metricMap,
    events,
    areGlobalGoals,
    responseCallback,
    eventProperties,
    visitorUserAgent,
    userIpAddress,
    result
  );
}

function _validateAndReturnTrackValue(
  vwoInstance,
  config,
  settingsFile,
  revenuePropList,
  userId,
  goalIdentifier,
  revenueValue,
  metricMap,
  events,
  areGlobalGoals,
  responseCallback,
  eventProperties,
  visitorUserAgent,
  userIpAddress,
  result
) {
  if (!Object.keys(result).length) {
    return null;
  }

  if (typeof process.env === 'undefined') {
    if (events && events.length) {
      for (let k = 0; k < events.length; k++) {
        vwoInstance.eventQueue.process(config, events[k], vwoInstance, { responseCallback });
      }
    }
  } else if (!settingsFile.isEventArchEnabled && events && events.length) {
    if (!areGlobalGoals) {
      vwoInstance.eventQueue.process(config, events[0], vwoInstance, { responseCallback });
    } else if (!config.isDevelopmentMode) {
      BatchEventsDispatcher.dispatch(
        {
          ev: events
        },
        responseCallback,
        Object.assign(
          {},
          {
            a: vwoInstance.SettingsFileManager.getSettingsFile().accountId
          },
          vwoInstance.usageStats.getUsageStats()
        ),
        vwoInstance.SettingsFileManager.getSettingsFile().sdkKey
      );
    }
  }

  if (settingsFile.isEventArchEnabled && Object.keys(metricMap).length > 0) {
    let properties = ImpressionUtil.getEventsBaseProperties(
      settingsFile,
      goalIdentifier,
      {},
      visitorUserAgent,
      userIpAddress
    );
    let payload = ImpressionUtil.getTrackGoalPayloadData(
      settingsFile,
      userId,
      goalIdentifier,
      metricMap,
      revenueValue,
      revenuePropList,
      eventProperties
    );
    vwoInstance.eventQueue.process(config, properties, vwoInstance, { payload, responseCallback });

    // save to user storage if not event arch
    if (!settingsFile.isEventArchEnabled) {
      Object.keys(metricMap).forEach(function(key) {
        DecisionUtil._saveUserData(
          config,
          metricMap[key].campaign,
          metricMap[key].variationName,
          metricMap[key].userId,
          metricMap[key].metaData,
          goalIdentifier
        );
      });
    }
  }

  if (config.isDevelopmentMode) {
    return Object.assign({}, result, { isDevelopmentMode: config.isDevelopmentMode });
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
  userStorageData,
  goalTypeToTrack,
  shouldTrackReturningUser,
  metaData,
  metricMap,
  revenuePropList,
  events,
  areGlobalGoals,
  eventProperties,
  visitorUserAgent,
  userIpAddress
) {
  // If matching campaign is not found with campaignKey or if found but is in not RUNNING state, simply return no variation
  if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
    vwoInstance.logger.log(
      LogLevelEnum.WARN,
      LogMessageUtil.build(LogMessageEnum.WARNING_MESSAGES.CAMPAIGN_NOT_RUNNING, {
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
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_NOT_APPLICABLE, {
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
    if (settingsFile.isEventArchEnabled) {
      /* 
      If it's a metric of type - value of an event property and calculation logic is first Value (mca != -1 )
      */
      if (goal.mca !== -1) {
        /*
        In this case it is expected that goal will have revenueProp
        Error should be logged if eventProperties is not Defined ` OR ` eventProperties does not have revenueProp key
        */
        if (DataTypeUtil.isUndefined(eventProperties) || !eventProperties.hasOwnProperty(goal.revenueProp)) {
          logIncorrectParamsForRevenueGoal(vwoInstance, userId, goalIdentifier, campaignKey);
          return false;
        }
      } else {
        /*
        here mca == -1 so there could only be 2 scenarios, 
        1. If revenueProp is defined then eventProperties should have revenueProp key
        2. if revenueProp is not defined then it's a metric of type - Number of times an event has been triggered.
        */
        if (goal.revenueProp) {
          // Error should be logged if eventProperties is not Defined ` OR ` eventProperties does not have revenueProp key
          if (DataTypeUtil.isUndefined(eventProperties) || !eventProperties.hasOwnProperty(goal.revenueProp)) {
            logIncorrectParamsForRevenueGoal(vwoInstance, userId, goalIdentifier, campaignKey);
            return false;
          }
        }
      }
    } else {
      logIncorrectParamsForRevenueGoal(vwoInstance, userId, goalIdentifier, campaignKey);
      return false;
    }
  }

  if (goal.type === GoalTypeEnum.REVENUE && goal.revenueProp) {
    revenuePropList.add(goal.revenueProp);
  }

  const result = DecisionUtil.getVariation(
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
    true,
    goalIdentifier,
    api
  );

  if (DataTypeUtil.isPromise(result)) {
    return result.then(function(data) {
      if (!Object.keys(data).length) {
        return null;
      }
      return _validateAndReturnTrackEvent(
        vwoInstance,
        campaignKey,
        campaignId,
        userId,
        config,
        goal,
        shouldTrackReturningUser,
        settingsFile,
        campaign,
        goalIdentifier,
        revenueValue,
        metaData,
        metricMap,
        events,
        areGlobalGoals,
        eventProperties,
        visitorUserAgent,
        userIpAddress,
        data
      );
    });
  }

  return _validateAndReturnTrackEvent(
    vwoInstance,
    campaignKey,
    campaignId,
    userId,
    config,
    goal,
    shouldTrackReturningUser,
    settingsFile,
    campaign,
    goalIdentifier,
    revenueValue,
    metaData,
    metricMap,
    events,
    areGlobalGoals,
    eventProperties,
    visitorUserAgent,
    userIpAddress,
    result
  );
}

function _validateAndReturnTrackEvent(
  vwoInstance,
  campaignKey,
  campaignId,
  userId,
  config,
  goal,
  shouldTrackReturningUser,
  settingsFile,
  campaign,
  goalIdentifier,
  revenueValue,
  metaData,
  metricMap,
  events,
  areGlobalGoals,
  eventProperties,
  visitorUserAgent,
  userIpAddress,
  result
) {
  var { variationId, variationName, storedGoalIdentifier } = result;
  // Is User is a part of Campaign and has been decided to be a part of particular variation
  if (variationName) {
    if (storedGoalIdentifier) {
      const identifiers = storedGoalIdentifier.split(GOAL_IDENTIFIER_SEPERATOR);
      if (!identifiers.includes(goalIdentifier)) {
        storedGoalIdentifier += GOAL_IDENTIFIER_SEPERATOR + goalIdentifier;

        // save to user storage if not event arch
        if (!settingsFile.isEventArchEnabled) {
          DecisionUtil._saveUserData(config, campaign, variationName, userId, metaData, storedGoalIdentifier);
        }
      } else if (!shouldTrackReturningUser && goal.mca !== -1) {
        vwoInstance.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CAMPAIGN_GOAL_ALREADY_TRACKED, {
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
    if (config.batchEvents) {
      let properties = ImpressionUtil.buildBatchEventForTrackingGoal(
        settingsFile,
        campaignId,
        variationId,
        userId,
        goal,
        revenueValue,
        eventProperties,
        visitorUserAgent,
        userIpAddress
      );
      vwoInstance.batchEventsQueue.enqueue(properties);
    } else if (settingsFile.isEventArchEnabled) {
      metricMap[campaign.id] = {
        config,
        campaign,
        variationName,
        userId,
        metaData,
        goal
      };
      return true;
    } else {
      let properties = {};

      if (areGlobalGoals) {
        properties = ImpressionUtil.buildBatchEventForTrackingGoal(
          settingsFile,
          campaignId,
          variationId,
          userId,
          goal,
          revenueValue,
          visitorUserAgent,
          userIpAddress
        );
      } else {
        properties = ImpressionUtil.buildEventForTrackingGoal(
          settingsFile,
          campaignId,
          variationId,
          userId,
          goal,
          revenueValue,
          visitorUserAgent,
          userIpAddress
        );
      }

      events.push(properties);
    }

    // save to user storage if not event arch
    if (!settingsFile.isEventArchEnabled) {
      DecisionUtil._saveUserData(config, campaign, variationName, userId, metaData, goalIdentifier);
    }
    return true;
  }

  return false;
}

function logIncorrectParamsForRevenueGoal(vwoInstance, userId, goalIdentifier, campaignKey) {
  vwoInstance.logger.log(
    LogLevelEnum.ERROR,
    LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_REVENUE_NOT_PASSED_FOR_REVENUE_GOAL, {
      file,
      userId,
      goalIdentifier,
      campaignKey
    })
  );
}

module.exports = track;
