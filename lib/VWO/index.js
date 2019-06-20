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

  activate(campaignId, userId) {
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.ACTIVATE, campaignId, userId)) {
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

    let isRunning = CampaignUtil.isCampaignRunning(configFile, campaignId);
    if (!isRunning) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
          file: FileNameEnum.VWO,
          campaignId: campaignId
        })
      );

      return null;
    }

    let variationId = this.getVariation(campaignId, userId);
    if (!ValidateUtil.isValidValue(variationId)) {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.INVALID_VARIATION_KEY, {
          file: FileNameEnum.VWO,
          userId,
          campaignId: campaignId
        })
      );
      return null;
    }

    let properties = ImpressionUtil.buildEvent(configFile, campaignId, variationId, userId);
    this.eventQueue.process(config, properties, this);

    return variationId;
  }

  getVariation(campaignId, userId) {
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.GET_VARIATION, campaignId, userId)) {
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

    let campaign = CampaignUtil.getCampaign(configFile, campaignId);
    if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
      this.logger.log(
        LogLevelEnum.WARN,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
          file: FileNameEnum.VWO,
          campaignId: campaignId
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
          campaignId: campaignId,
          userId,
          variationId: variation.id
        })
      );

      return variation.id;
    }

    let variationId = VariationDecider.getVariationAllotted(configFile, campaignId, userId);

    if (variationId) {
      // persist bucketing
      this.__saveUserProfile(campaign, variationId, userId, campaignBucketMap);

      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIATION_ALLOCATED, {
          file: FileNameEnum.VWO,
          campaignId: campaignId,
          userId,
          variationId
        })
      );
    } else {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.NO_VARIATION_ALLOCATED, {
          file: FileNameEnum.VWO,
          campaignId: campaignId,
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
   * @param {Number} campaignId the unique ID assigned to a user
   * @param {String} userId the unique ID assigned to a user
   * @param {Number} goalId
   * @param {String} value revenue generated on triggering the goal
   */
  track(campaignId, userId, goalId, revenue) {
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, campaignId, userId, goalId)) {
      // log
      return;
    }
    let config = this.projectConfigManager.getConfig();
    let configFile = config.configFile;

    if (!configFile) {
      return null;
    }

    let campaign = CampaignUtil.getCampaign(configFile, campaignId);
    let variationId = VariationDecider.getVariationAllotted(configFile, campaignId, userId);

    // Is User is a part of Campaign and has been decided to be a part of particular variation
    if (variationId) {
      let properties = ImpressionUtil.buildEvent(configFile, campaign.id, variationId, userId, goalId, revenue);

      this.eventQueue.process(config, properties, this);
    }
  }

  // PRIVATE METHODS

  __getStoredVariation(config, campaignId, userId, campaignBucketMap = {}) {
    if (campaignBucketMap.hasOwnProperty(campaignId)) {
      let decision = campaignBucketMap[campaignId];
      let variationId = decision.variation_id;

      config.logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GETTING_STORED_VARIATION, {
          file: FileNameEnum.VWO,
          campaignId: campaignId,
          userId,
          variationId
        })
      );

      return CampaignUtil.getCampaignVariation(config, campaignId, variationId);
    }

    config.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.NO_STORED_VARIATION, {
        file: FileNameEnum.VWO,
        campaignId: campaignId,
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
