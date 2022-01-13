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
const DataTypeUtil = require('../utils/DataTypeUtil');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

const file = FileNameEnum.GetVariation;

/**
 * This API method: Gets the variation assigned for the user for the campaign
 *
 * 1. Validates the arguments being passed
 * 2. Checks if user is eligible to get bucketed into the campaign,
 * 3. Assigns the determinitic variation to the user(based on userId), if user becomes part of campaign
 *    If userStorageService is used, it will look into it for the variation and if found, no further processing is done
 *
 * @param {Object} vwoInstance       VWO instance which has logger, settingsFile etc.
 * @param {String} campaignKey       unique campaign key specified in VWO app
 * @param {String} userId            ID assigned to a user
 * @param {Object} options           Optional params
 *
 * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
 */
function getVariation(vwoInstance, campaignKey, userId, options = {}) {
  const api = ApiEnum.GET_VARIATION_NAME;
  let areParamsValid = false;
  if (DataTypeUtil.isObject(options)) {
    var { customVariables, variationTargetingVariables, userStorageData, metaData } = options;
    // Check if arguments have valid data-type
    if (
      ValidateUtil.areValidParamsForAPIMethod({
        method: ApiEnum.GET_VARIATION_NAME,
        campaignKey,
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
        api: ApiEnum.GET_VARIATION_NAME
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

  // Get the campaign settings based on campaignKey from the settings
  let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

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

    return null;
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

    return null;
  }

  const { variationName } = DecisionUtil.getVariation(
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
    return null;
  }

  return variationName;
}

module.exports = getVariation;
