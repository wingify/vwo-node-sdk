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

const VariationDecider = require('../core/VariationDecider');
const BucketingService = require('../core/BucketingService');

const CampaignUtil = require('./CampaignUtil');
const DataTypeUtil = require('./DataTypeUtil');
const FunctionUtil = require('./FunctionUtil');
const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const StatusEnum = require('../enums/StatusEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();
const SegmentEvaluator = require('../core/SegmentEvaluator');

const file = FileNameEnum.DecisionUtil;

const SegmentationTypeEnum = {
  WHITELISTING: 'whitelisting',
  PRE_SEGMENTATION: 'pre-segmentation'
};

let DecisionUtil = {
  // PUBLIC METHODS
  /**
   *  1. Checks if there is a variation stored in userStorage, returns it
   *  2. If Whitelisting is applicable, evaluate it, if any eligible variation is found, store it in User Storage service and return, otherwise skip it.
   *  3. If Pre-segmentation is applied and passes then go further otherwise return early and no further processing
   *  4. If no user storage value, no whitelisted variation and pre-segmentation evaluates to true, get variation using hashing logic if campaign traffic passes for that userId
   *
   *
   *  @param {Object} config
   *  @param {Object} settingsFile
   *  @param {Object} campaign
   *  @param {Object} campaignKey
   *  @param {String} userId
   *  @param {Object} customVariables
   *  @param {Object} variationTargetingVariables
   *
   *  @return {Object|null} - Object if a variation is assigned, otherwise null
   */
  getVariation: function(
    config,
    settingsFile,
    campaign,
    campaignKey,
    userId,
    customVariables,
    variationTargetingVariables = {}
  ) {
    let status;
    let variation, variationName, variationId;

    if (campaign.isForcedVariationEnabled) {
      let whitelistingResult = DecisionUtil._evaluateWhitelisting(
        campaign,
        campaignKey,
        userId,
        variationTargetingVariables
      );
      let variationString;
      if (whitelistingResult) {
        status = StatusEnum.PASSED;
        variationString = `for ${whitelistingResult.variationName}`;
      } else {
        status = StatusEnum.FAILED;
        variationString = '';
      }

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SEGMENTATION_STATUS, {
          campaignKey,
          userId,
          customVariables: JSON.stringify(variationTargetingVariables),
          file,
          status,
          segmentationType: SegmentationTypeEnum.WHITELISTING,
          variation: variationString
        })
      );

      if (whitelistingResult) {
        variationName = whitelistingResult.variationName;
        return whitelistingResult;
      }
    } else {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.WHITELISTING_SKIPPED, {
          campaignKey,
          userId,
          file
        })
      );
    }

    // If userStorageService is used, get the variation from the stored data
    let storedVariation = DecisionUtil._getStoredVariation(config, settingsFile, campaign.key, userId);

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

    if (DataTypeUtil.isObject(campaign.segments) && !Object.keys(campaign.segments).length) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
          campaignKey,
          userId,
          file
        })
      );
    } else {
      const preSegmentationResult = SegmentEvaluator(campaign.segments, customVariables, campaignKey, userId);
      if (!preSegmentationResult) {
        status = StatusEnum.FAILED;
      } else {
        status = StatusEnum.PASSED;
      }

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SEGMENTATION_STATUS, {
          campaignKey,
          userId,
          customVariables: JSON.stringify(customVariables || {}),
          file,
          status,
          segmentationType: SegmentationTypeEnum.PRE_SEGMENTATION,
          variation: ''
        })
      );

      if (status === StatusEnum.FAILED) {
        return {};
      }
    }

    // Use our core's VariationDecider utility to get the deterministic variation assigned to the userId for that campaign
    ({ variation, variationName, variationId } = VariationDecider.getVariationAllotted(userId, campaign));

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

  _evaluateWhitelisting: (campaign, campaignKey, userId, variationTargetingVariables) => {
    let whitelistedVariation;
    let status;
    variationTargetingVariables = Object.assign({}, variationTargetingVariables, {
      _vwoUserId: userId
    });
    const targetedVariations = [];
    campaign.variations.forEach(variation => {
      if (DataTypeUtil.isObject(variation.segments) && !Object.keys(variation.segments).length) {
        logger.log(
          LogLevelEnum.DEBUG,
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
            campaignKey,
            userId,
            file,
            variation: `, for ${variation.name}`
          })
        );
        return;
      }
      if (
        DataTypeUtil.isObject(variation.segments) &&
        SegmentEvaluator(variation.segments, variationTargetingVariables, campaignKey, userId, variation.name)
      ) {
        status = StatusEnum.PASSED;
        targetedVariations.push(FunctionUtil.cloneObject(variation));
      } else {
        status = StatusEnum.FAILED;
      }
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_STATUS, {
          campaignKey,
          userId,
          customVariables: JSON.stringify(variationTargetingVariables),
          file,
          status,
          segmentationType: SegmentationTypeEnum.WHITELISTING,
          variation: `for ${variation.name}`
        })
      );
    });

    if (targetedVariations.length > 1) {
      CampaignUtil.scaleVariationWeights(targetedVariations);
      for (let i = 0, currentAllocation = 0, stepFactor = 0; i < targetedVariations.length; i++) {
        stepFactor = CampaignUtil.assignRangeValues(targetedVariations[i], currentAllocation);
        currentAllocation += stepFactor;
      }
      whitelistedVariation = BucketingService._getVariation(
        targetedVariations,
        BucketingService.calculateBucketValue(userId)
      );
    } else {
      whitelistedVariation = targetedVariations[0];
    }

    if (whitelistedVariation) {
      return {
        variation: whitelistedVariation,
        variationName: whitelistedVariation.name,
        variationId: whitelistedVariation.id
      };
    }
  },
  /**
   * If userStorageService is provided and variation was stored, get the stored variation
   *
   * @param {Object} config
   * @param {Object} settingsFile - cloned settingsFile
   * @param {String} campaignKey
   * @param {String} userId
   *
   * @return {Object|null} - if found then variation settings object otherwise null
   */
  _getStoredVariation: function(config, settingsFile, campaignKey, userId) {
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

      return CampaignUtil.getCampaignVariation(settingsFile, campaignKey, variationName);
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
   * Get the User Variation mapping by calling get method of UserStorageService being provided
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
      let data = config.userStorageService.get(userId, campaignKey) || {};

      // if data found
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GETTING_DATA_USER_STORAGE_SERVICE, {
          file,
          userId
        })
      );

      return data;
    } catch (err) {
      // if no data found
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_USER_STORAGE_SERVICE_FAILED, {
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
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SETTING_DATA_USER_STORAGE_SERVICE, {
          file,
          userId
        })
      );

      isSaved = true;
    } catch (ex) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SET_USER_STORAGE_SERVICE_FAILED, {
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
