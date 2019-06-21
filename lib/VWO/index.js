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

    this.projectConfigManager.processsettingsFile(config);

    this.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SDK_INITIALIZED, {
        file: FileNameEnum.VWO
      })
    );
  }

  // PUBLIC METHODS

  activate(campaignTestKey, userId) {
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.ACTIVATE, campaignTestKey, userId)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_MISSING_PARAMS, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    let config = this.projectConfigManager.getConfig();
    let settingsFile = config.settingsFile;

    if (!settingsFile) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_CONFIG_CORRUPTED, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    let campaign = CampaignUtil.getCampaign(settingsFile, campaignTestKey);

    if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
          api: 'activate'
        })
      );

      return null;
    }

    let variationId = this.getVariation(campaignTestKey, userId);
    if (!ValidateUtil.isValidValue(variationId)) {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.INVALID_VARIATION_KEY, {
          file: FileNameEnum.VWO,
          userId,
          campaignTestKey: campaignTestKey
        })
      );
      return null;
    }

    let properties = ImpressionUtil.buildEvent(settingsFile, campaign.id, variationId, userId);
    this.eventQueue.process(config, properties, this);

    return variationId;
  }

  getVariation(campaignTestKey, userId) {
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.GET_VARIATION, campaignTestKey, userId)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_VARIATION_API_MISSING_PARAMS, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    let config = this.projectConfigManager.getConfig();
    let settingsFile = config.settingsFile;

    if (!settingsFile) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_VARIATION_API_CONFIG_CORRUPTED, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    let campaign = CampaignUtil.getCampaign(settingsFile, campaignTestKey);
    if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
          api: 'getVariation'
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
          campaignTestKey: campaignTestKey,
          userId,
          variationId: variation.id
        })
      );

      return variation.id;
    }

    let variationId = VariationDecider.getVariationAllotted(settingsFile, campaignTestKey, userId);

    if (variationId) {
      // persist bucketing
      this.__saveUserProfile(campaign, variationId, userId, campaignBucketMap);

      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIATION_ALLOCATED, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
          userId,
          variationId
        })
      );
    } else {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.NO_VARIATION_ALLOCATED, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
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
   * @param {Number} campaignTestKey the unique ID assigned to a user
   * @param {String} userId the unique ID assigned to a user
   * @param {Number} goalIdentifier
   * @param {String} value revenue generated on triggering the goal
   */
  track(campaignTestKey, userId, goalIdentifier, revenue) {
    if (
      !ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, campaignTestKey, userId, goalIdentifier)
    ) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_MISSING_PARAMS, {
          file: FileNameEnum.VWO
        })
      );
      return;
    }
    let config = this.projectConfigManager.getConfig();
    let settingsFile = config.settingsFile;

    if (!settingsFile) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_CONFIG_CORRUPTED, {
          file: FileNameEnum.VWO
        })
      );
      return;
    }

    let campaign = CampaignUtil.getCampaign(settingsFile, campaignTestKey);

    if (!campaign) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
          api: 'track'
        })
      );

      return;
    }

    let campaignId = campaign.id;
    let variationId = VariationDecider.getVariationAllotted(settingsFile, campaignTestKey, userId);

    // Is User is a part of Campaign and has been decided to be a part of particular variation
    if (variationId) {
      let goal = CampaignUtil.getCampaignGoal(config, campaign.key, goalIdentifier);

      if (goal) {
        let properties = ImpressionUtil.buildEvent(settingsFile, campaignId, variationId, userId, goal.id, revenue);

        this.eventQueue.process(config, properties, this);
      } else {
        this.logger.log(
          LogLevelEnum.ERROR,
          LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_GOAL_NOT_FOUND, {
            file: FileNameEnum.VWO,
            userId,
            campaignTestKey: campaignTestKey
          })
        );
      }
    } else {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_VARIATION_NOT_FOUND, {
          file: FileNameEnum.VWO,
          userId,
          campaignTestKey: campaignTestKey
        })
      );
    }
  }

  // PRIVATE METHODS

  __getStoredVariation(config, campaignTestKey, userId, campaignBucketMap = {}) {
    if (campaignBucketMap.hasOwnProperty(campaignTestKey)) {
      let decision = campaignBucketMap[campaignTestKey];
      let variationId = decision.variation_id;

      config.logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GETTING_STORED_VARIATION, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
          userId,
          variationId
        })
      );

      return CampaignUtil.getCampaignVariation(config, campaignTestKey, variationId);
    }

    config.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_STORED_VARIATION, {
        file: FileNameEnum.VWO,
        campaignTestKey: campaignTestKey,
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
