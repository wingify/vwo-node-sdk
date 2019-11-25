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
const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const file = FileNameEnum.VariationDecisionUtil;

let VariationDecisionUtil = {
  // PUBLIC METHODS

  get: function(config, campaign, campaignTestKey, userId) {
    let campaignBucketMap = VariationDecisionUtil.__resolveCampaignBucketMap(config, userId);

    // If userProfileService is used, get the variation from the stored data
    const variation = VariationDecisionUtil.__getStoredVariation(config, campaign.key, userId, campaignBucketMap);

    // If stored variation is found, simply return the same
    if (variation) {
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_STORED_VARIATION, {
          file,
          campaignTestKey,
          userId,
          variationName: variation.name
        })
      );

      return {
        variationName: variation.name,
        variationId: variation.id
      };
    }

    // Use our core's VariationDecider utility to get the deterministic variation assigned to the userId for that campaign
    let { variationName, variationId } = VariationDecider.getVariationAllotted(userId, campaign);

    // Check if variation-name has been assigned to the userId. If not, return no variation
    if (variationName) {
      // If userProfileService is provided, look into it for the saved variation for the campaign and userId
      VariationDecisionUtil.__saveUserProfile(config, campaign, variationName, userId, campaignBucketMap);

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIATION_ALLOCATED, {
          file,
          campaignTestKey,
          userId,
          variationName
        })
      );
    } else {
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.NO_VARIATION_ALLOCATED, {
          file,
          campaignTestKey,
          userId
        })
      );
    }

    return {
      variationName,
      variationId
    };
  },

  // PRIVATE METHODS

  /**
   * If userProfileService is provided and variation was stored, get the stored variation
   *
   * @param {Object} config
   * @param {String} campaignTestKey
   * @param {String} userId
   * @param {Object} campaignBucketMap
   *
   * @return {Object|null} - if found then variation settings object otherwise null
   */
  __getStoredVariation: function(config, campaignTestKey, userId, campaignBucketMap = {}) {
    if (campaignBucketMap.hasOwnProperty(campaignTestKey)) {
      let decision = campaignBucketMap[campaignTestKey];
      let variationName = decision.variationName;

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GETTING_STORED_VARIATION, {
          file,
          campaignTestKey,
          userId,
          variationName: decision.variationName
        })
      );

      return CampaignUtil.getCampaignVariation(config, campaignTestKey, variationName);
    }

    // Log if stored variation is not found even after implementing UserProfileService
    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_STORED_VARIATION, {
        file,
        campaignTestKey,
        userId
      })
    );

    return null;
  },
  /**
   * Returns the campaign mapping to the userId
   *
   * @param {String} userId
   * @return {Object} - data
   */
  __resolveCampaignBucketMap(config, userId) {
    let userData = VariationDecisionUtil.__getUserProfile(config, userId);
    let campaignBucketMap = {};

    if (userData) {
      campaignBucketMap = userData.campaignBucketMap;
    }
    return Object.assign({}, campaignBucketMap);
  },

  /**
   * Get the UserProfileData after looking up into lookup method being provided via UserProfileService
   *
   * @param {String} userId
   * @return {Object} - UserProfile data
   */
  __getUserProfile: function(config, userId) {
    let userProfile = {
      userId: userId,
      campaignBucketMap: {}
    };

    if (!config.userProfileService) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_USER_PROFILE_SERVICE_LOOKUP, {
          file
        })
      );
      return userProfile;
    }

    try {
      let data = config.userProfileService.lookup(userId);

      // if data found
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.LOOKING_UP_USER_PROFILE_SERVICE, {
          file,
          userId
        })
      );

      return data;
    } catch (ex) {
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
   * If userProfileService is provided and variation was stored, save the assigned variation
   *
   * @param {Object} campaign
   * @param {String} variationName
   * @param {String} userId
   * @param {Object} campaignBucketMap
   *
   * @return {Boolean} - true if found otherwise false
   */
  __saveUserProfile: function(config, campaign, variationName, userId, campaignBucketMap) {
    let isSaved = false;

    if (!config.userProfileService) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_USER_PROFILE_SERVICE_SAVE, {
          file
        })
      );
      return isSaved;
    }

    try {
      let newBucketMap = Object.assign({}, campaignBucketMap);

      newBucketMap[campaign.key] = {
        variationName: variationName
      };

      config.userProfileService.save({
        userId: userId,
        campaignBucketMap: newBucketMap
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

module.exports = VariationDecisionUtil;
