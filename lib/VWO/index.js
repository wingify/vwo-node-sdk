const VariationDecider = require('../core/VariationDecider');

const CampaignUtil = require('../utils/CampaignUtil');
const ImpressionUtil = require('../utils/ImpressionUtil');
const ValidateUtil = require('../utils/ValidateUtil');

const EventQueue = require('../services/EventQueue');
const Constants = require('../constants');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

class VWO {
  constructor(config) {
    // validate
    this.userProfileService = config.userProfileService;
    this.logger = config.logger;

    this.projectConfigManager = config.ProjectConfigManager;
    this.eventQueue = new EventQueue();

    this.projectConfigManager.processConfigFile(config);

    this.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SDK_INITIALIZED, {
        file: FileNameEnum.VWO
      })
    );
  }

  // PUBLIC METHODS

  activate(expId, userId) {
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.ACTIVATE, expId, userId)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_MISSING_PARAMS, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    let configFile = this.projectConfigManager.getConfigFile();
    if (!configFile) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_CONFIG_CORRUPTED, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    let isRunning = CampaignUtil.isCampaignRunning(configFile, expId);
    if (!isRunning) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
          file: FileNameEnum.VWO,
          campaignId: expId
        })
      );

      return null;
    }

    let variationId = this.getVariation(expId, userId);
    if (!ValidateUtil.isValidValue(variationId)) {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.INVALID_VARIATION_KEY, {
          file: FileNameEnum.VWO,
          userId,
          campaignId: expId
        })
      );
      return null;
    }

    let properties = ImpressionUtil.buildEvent(configFile, expId, variationId, userId);
    this.eventQueue.process(properties, this);

    return variationId;
  }

  getVariation(expId, userId) {
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.GET_VARIATION, expId, userId)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_MISSING_PARAMS, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    let config = this.projectConfigManager.getConfig();
    let configFile = config.configFile;

    if (!configFile) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_CONFIG_CORRUPTED, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    let campaign = CampaignUtil.getCampaign(configFile, expId);
    if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
      this.logger.log(
        LogLevelEnum.WARN,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
          file: FileNameEnum.VWO,
          campaignId: expId
        })
      );

      return null;
    }

    let campaignBucketMap = this.__resolveCampaignBucketMap(userId);
    const variation = this.__getStoredVariation(config, campaign.id, userId, campaignBucketMap);

    if (variation) {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_STORED_VARIATION, {
          file: FileNameEnum.VWO,
          campaignId: expId,
          userId,
          variationId: variation.id
        })
      );

      return variation.id;
    }

    let variationId = VariationDecider.getVariationAllotted(configFile, expId, userId);

    if (variationId) {
      // persist bucketing
      this.__saveUserProfile(campaign, variationId, userId, campaignBucketMap);

      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIATION_ALLOCATED, {
          file: FileNameEnum.VWO,
          campaignId: expId,
          userId,
          variationId
        })
      );
    } else {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.NO_VARIATION_ALLOCATED, {
          file: FileNameEnum.VWO,
          campaignId: expId,
          userId,
          variationId
        })
      );
    }

    return variationId;
  }

  /**
   * Marks the conversion of the campaign for a particular goal
   *
   * @param {Number} expId the unique ID assigned to a user
   * @param {String} userId the unique ID assigned to a user
   * @param {Number} goalId
   * @param {String} value revenue generated on triggering the goal
   */
  track(expId, userId, goalId, revenue) {
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, expId, userId, goalId)) {
      // log
      return;
    }
    let configObj = this.projectConfigManager.getConfigFile();

    if (!configObj) {
      return null;
    }

    let campaign = CampaignUtil.getCampaign(configObj, expId);
    let variationId = VariationDecider.getVariationAllotted(configObj, expId, userId);

    // Is User is a part of Campaign and has been decided to be a part of particular variation
    if (variationId) {
      let properties = ImpressionUtil.buildEvent(configObj, campaign.id, variationId, userId, goalId, revenue);

      this.eventQueue.process(properties, this);
    }
  }

  // PRIVATE METHODS

  __getStoredVariation(config, expId, userId, campaignBucketMap = {}) {
    if (campaignBucketMap.hasOwnProperty(expId)) {
      let decision = campaignBucketMap[expId];
      let variationId = decision.variation_id;

      config.logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GETTING_STORED_VARIATION, {
          file: FileNameEnum.VWO,
          campaignId: expId,
          userId,
          variationId
        })
      );

      return CampaignUtil.getCampaignVariation(config, expId, variationId);
    }

    config.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.NO_STORED_VARIATION, {
        file: FileNameEnum.VWO,
        campaignId: expId,
        userId
      })
    );

    return null;
  }
  __resolveCampaignBucketMap(userId) {
    let userData = this.__getUserProfile(userId);
    let campaignBucketMap = {};

    if (userData) {
      campaignBucketMap = userData.campaignBucketMap;
    }
    return Object.assign({}, campaignBucketMap);
  }
  __getUserProfile(userId) {
    let userProfile = {
      user_id: userId,
      campaignBucketMap: {}
    };

    if (!this.userProfileService) {
      this.logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_USER_PROFILE_SERVICE_LOOKUP, {
          file: FileNameEnum.VWO
        })
      );
      return userProfile;
    }

    try {
      let data = this.userProfileService.lookup(userId);

      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.LOOKING_UP_USER_PROFILE_SERVICE, {
          file: FileNameEnum.VWO,
          userId
        })
      );

      return data;
    } catch (ex) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.LOOK_UP_USER_PROFILE_SERVICE_FAILED, {
          file: FileNameEnum.VWO,
          userId
        })
      );
    }
  }

  __saveUserProfile(campaign, variationKey, userId, campaignBucketMap) {
    if (!this.userProfileService) {
      this.logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_USER_PROFILE_SERVICE_SAVE, {
          file: FileNameEnum.VWO
        })
      );
      return;
    }

    try {
      let newBucketMap = Object.assign({}, campaignBucketMap);

      newBucketMap[campaign.id] = {
        variation_id: variationKey
      };

      this.userProfileService.save({
        user_id: userId,
        campaignBucketMap: newBucketMap
      });

      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SAVING_DATA_USER_PROFILE_SERVICE, {
          file: FileNameEnum.VWO,
          userId
        })
      );
    } catch (ex) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SAVE_USER_PROFILE_SERVICE_FAILED, {
          file: FileNameEnum.VWO,
          userId
        })
      );
    }
  }
}
module.exports = VWO;
