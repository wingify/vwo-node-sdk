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

const VariationDecider = require('../core/VariationDecider');

const CampaignUtil = require('./CampaignUtil');
const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const file = FileNameEnum.DecisionUtil;

let DecisionUtil = {
  // PUBLIC METHODS

  getVariation: function(config, campaign, campaignKey, userId) {
    // If userStorageService is used, get the variation from the stored data
    let storedVariation = DecisionUtil._getStoredVariation(config, campaign.key, userId);

    // If stored variation is found, simply return the same
    if (storedVariation) {
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_STORED_VARIATION, {
          file,
          campaignKey,
          userId,
          variationName: storedVariation.name
        })
      );

      return {
        variation: storedVariation,
        variationName: storedVariation.name,
        variationId: storedVariation.id
      };
    }

    // Use our core's VariationDecider utility to get the deterministic variation assigned to the userId for that campaign
    let { variation, variationName, variationId } = VariationDecider.getVariationAllotted(userId, campaign);

    // Check if variation-name has been assigned to the userId. If not, return no variation
    if (variationName) {
      // If userStorageService is provided, look into it for the saved variation for the campaign and userId
      DecisionUtil._saveUserData(config, campaign, variationName, userId);

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIATION_ALLOCATED, {
          file,
          campaignKey,
          userId,
          variationName
        })
      );
    } else {
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.NO_VARIATION_ALLOCATED, {
          file,
          campaignKey,
          userId
        })
      );
    }

    return {
      variation: variation && variation.variation,
      variationName,
      variationId
    };
  },
  // PRIVATE METHODS

  /**
   * If userStorageService is provided and variation was stored, get the stored variation
   *
   * @param {Object} config
   * @param {String} campaignKey
   * @param {String} userId
   *
   * @return {Object|null} - if found then variation settings object otherwise null
   */
  _getStoredVariation: function(config, campaignKey, userId) {
    let userData = DecisionUtil._getStoredUserData(config, userId, campaignKey);
    let { variationName } = userData;

    if (userData && userData.campaignKey && variationName) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GETTING_STORED_VARIATION, {
          file,
          campaignKey,
          userId,
          variationName
        })
      );

      return CampaignUtil.getCampaignVariation(config, campaignKey, variationName);
    }

    // Log if stored variation is not found even after implementing UserStorageService
    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_STORED_VARIATION, {
        file,
        campaignKey,
        userId
      })
    );

    return null;
  },
  /**
   * Get the User Variation mapping looking up into get method being provided via UserStorageService
   *
   * @param {Object} config
   * @param {String} UserID
   * @param {String} campaignKey
   *
   * @return {Object} - User Campaign Mapping
   */
  _getStoredUserData: function(config, userId, campaignKey) {
    let userStorageMap = {
      userId: userId,
      variationName: null,
      campaignKey: campaignKey
    };

    if (!config.userStorageService) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_USER_STORAGE_SERVICE_GET, {
          file
        })
      );
      return userStorageMap;
    }

    try {
      let data = config.userStorageService.get(userId, campaignKey);

      // if data found
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.LOOKING_UP_USER_PROFILE_SERVICE, {
          file,
          userId
        })
      );

      return data;
    } catch (err) {
      // if no data found
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.LOOK_UP_USER_PROFILE_SERVICE_FAILED, {
          file,
          userId
        })
      );
    }
  },

  /**
   * If UserStorageService is provided and variation was stored, save the assigned variation
   *
   * @param {Object} campaign
   * @param {String} variationName
   * @param {String} userId
   *
   * @return {Boolean} - true if found otherwise false
   */
  _saveUserData: function(config, campaign, variationName, userId) {
    let isSaved = false;

    if (!config.userStorageService) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_USER_STORAGE_SERVICE_SET, {
          file
        })
      );
      return isSaved;
    }

    try {
      config.userStorageService.set({
        userId: userId,
        variationName,
        campaignKey: campaign.key
      });

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SAVING_DATA_USER_PROFILE_SERVICE, {
          file,
          userId
        })
      );

      isSaved = true;
    } catch (ex) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SAVE_USER_PROFILE_SERVICE_FAILED, {
          file,
          userId
        })
      );

      isSaved = false;
    }

    return isSaved;
  }
};

module.exports = DecisionUtil;
