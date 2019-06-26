const VariationDecider = require('../core/VariationDecider');

const Constants = require('../constants');

const CampaignUtil = require('../utils/CampaignUtil');
const ImpressionUtil = require('../utils/ImpressionUtil');
const ValidateUtil = require('../utils/ValidateUtil');

const EventQueue = require('../services/EventQueue');
const ProjectConfigManager = require('../services/ProjectConfigManager');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

class VWO {
  // Setting various services on the instance to be accessible by its member functions
  constructor(config = {}) {
    this.userProfileService = config.userProfileService;
    this.logger = config.logger;

    let projectConfigManager = new ProjectConfigManager({
      settingsFile: config.settingsFile
    });

    // Validate the config file i.e. check if required fields contain appropriate data
    if (!projectConfigManager.isSettingsFileValid(config)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_CONFIGURATION, {
          file: FileNameEnum.INDEX
        })
      );

      return;
    }

    this.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.VALID_CONFIGURATION, {
        file: FileNameEnum.INDEX
      })
    );

    // Setup event quque for sending impressions to VWO server
    this.eventQueue = new EventQueue();
    this.projectConfigManager = projectConfigManager;

    // Process settingsFile for various things. For eg: assign bucket range to variation, etc.
    this.projectConfigManager.processsettingsFile(config);

    this.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SDK_INITIALIZED, {
        file: FileNameEnum.VWO
      })
    );
  }

  // PUBLIC METHODS

  /**
   * This API method: * This API method: Gets the variation assigned for the user for the campaign and send the metrics to VWO server
   * 1. Validates the arguments being passed
   * 2. Checks if user is eligible to get bucketed into the campaign,
   * 3. Assigns the determinitic variation to the user(based on userId), if user becomes part of campaign
   *    If userProfileService is used, it will look into it for the variation and if found, no further processing is done
   * 4. Sends an impression call to VWO server to track user
   *
   * @param {String} campaignTestKey
   * @param {String|Number|Float} userId
   *
   * @return {String|null} If variation is assigned then variation-name otherwise null in case of user not becoming part
   */
  activate(campaignTestKey, userId) {
    // Check if arguments have valid data-type
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.ACTIVATE, campaignTestKey, userId)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_MISSING_PARAMS, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    // Get the cached configuration
    let config = this.projectConfigManager.getConfig();
    let settingsFile = config.settingsFile;

    // If no settings are found, simply log and return no variation
    if (!settingsFile) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_CONFIG_CORRUPTED, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    // Get the campaign settings based on campaignTestKey from the settings
    let campaign = CampaignUtil.getCampaign(settingsFile, campaignTestKey);

    // If matching campaign is not found with campaignTestKey or if found but is in not RUNNING state, simply return no variation
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

    const isCalledViaActivate = true;
    // Once the matching RUNNING campaign is found, assign the deterministic variation to the userId provided
    let { variationId, variationName } = this.getVariation(campaignTestKey, userId, isCalledViaActivate);

    // Check if variation-name has been assigned to the userId. If not, return no variation
    if (!ValidateUtil.isValidValue(variationName)) {
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

    // Variation found...let VWO server knows about it to show report stats
    let properties = ImpressionUtil.buildEvent(settingsFile, campaign.id, variationId, userId);
    this.eventQueue.process(config, properties, this);

    return variationName;
  }

  /**
   * This API method: Gets the variation assigned for the user for the campaign
   * 1. Validates the arguments being passed
   * 2. Checks if user is eligible to get bucketed into the campaign,
   * 3. Assigns the determinitic variation to the user(based on userId), if user becomes part of campaign
   *    If userProfileService is used, it will look into it for the variation and if found, no further processing is done
   *
   * @param {String} campaignTestKey
   * @param {String|Number|Float} userId
   * @param {isCalledViaActivate} Boolean - sine activate internally calls this method, so to know the flow this is required
   *
   * @return {String|null} If variation is assigned then variation-name otherwise null in case of user not becoming part
   */
  getVariation(campaignTestKey, userId, isCalledViaActivate) {
    // Check if arguments have valid data-type
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.GET_VARIATION, campaignTestKey, userId)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_VARIATION_API_MISSING_PARAMS, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    // Get the cached configuration
    let config = this.projectConfigManager.getConfig();
    let settingsFile = config.settingsFile;

    // If no settings are found, simply log and return no variation
    if (!settingsFile) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_VARIATION_API_CONFIG_CORRUPTED, {
          file: FileNameEnum.VWO
        })
      );
      return null;
    }

    // Get the campaign settings based on campaignTestKey from the settings
    let campaign = CampaignUtil.getCampaign(settingsFile, campaignTestKey);

    // If matching campaign is not found with campaignTestKey or if found but is in not RUNNING state, simply return no variation
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

    // If userProfileService is used, get the variation from the stored data
    const variation = this.__getStoredVariation(config, campaign.key, userId, campaignBucketMap);

    // If stored variation is found, simply return the same
    if (variation) {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_STORED_VARIATION, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
          userId,
          variationName: variation.name
        })
      );

      if (isCalledViaActivate) {
        return {
          variationName: variation.name,
          variationId: variation.id
        };
      }
      return variation.name;
    }

    // Use our core's VariationDecider utility to get the deterministic variation assigned to the userId for that campaign
    let { variationName, variationId } = VariationDecider.getVariationAllotted(userId, campaign);

    // Check if variation-name has been assigned to the userId. If not, return no variation
    if (variationName) {
      // If userProfileService is provided, look into it for the saved variation for the campaign and userId
      this.__saveUserProfile(campaign, variationName, userId, campaignBucketMap);

      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIATION_ALLOCATED, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
          userId,
          variationName
        })
      );
    } else {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.NO_VARIATION_ALLOCATED, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
          userId
        })
      );
    }

    // Activate method requires both variation-name and variation-id for sending it in impression call
    if (isCalledViaActivate) {
      return {
        variationName,
        variationId
      };
    } else {
      return variationName;
    }
  }

  /**
   * This API method: Marks the conversion of the campaign for a particular goal
   *
   * 1. validates the arguments being passed
   * 2. Checks if user is eligible to get bucketed into the campaign,
   * 3. Gets the assigned determinitic variation to the user(based on userId), if user becomes part of campaign
   * 4. Sends an impression call to VWO server to track goal data
   *
   * @param {String} campaignTestKey
   * @param {String|Number|Float} campaignTestKey
   * @param {String|Number} userId
   *
   * @return {Boolean} true if success otherwise false
   */
  /**
   * Marks the conversion of the campaign for a particular goal
   *
   * @param {Number} campaignTestKey the unique ID assigned to a user
   * @param {String|Number|Float} userId the unique ID assigned to a user
   * @param {String} goalIdentifier
   * @param {Number|Float|String} revenueValue revenue generated on triggering the goal
   */
  track(campaignTestKey, userId, goalIdentifier, revenueValue) {
    // Check if arguments have valid data-type
    if (
      !ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, campaignTestKey, userId, goalIdentifier)
    ) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_MISSING_PARAMS, {
          file: FileNameEnum.VWO
        })
      );
      return false;
    }

    // Get the cached configuration
    let config = this.projectConfigManager.getConfig();
    let settingsFile = config.settingsFile;

    // If no settings are found, simply log and do not track goal
    if (!settingsFile) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_CONFIG_CORRUPTED, {
          file: FileNameEnum.VWO
        })
      );
      return false;
    }

    // Get the campaign settings based on campaignTestKey from the settings
    let campaign = CampaignUtil.getCampaign(settingsFile, campaignTestKey);

    // If matching campaign is not found with campaignTestKey or if found but is in not RUNNING state, simply return no variation
    if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
          api: 'track'
        })
      );

      return false;
    }

    let campaignId = campaign.id;
    let { variationId, variationName } = VariationDecider.getVariationAllotted(userId, campaign);

    // Is User is a part of Campaign and has been decided to be a part of particular variation
    if (variationName) {
      // Get the campaign goal settings based on goalIdentifier
      let goal = CampaignUtil.getCampaignGoal(config, campaign.key, goalIdentifier);

      // If goal is found, send an impression to VWO server for report stats
      if (goal) {
        let properties = ImpressionUtil.buildEvent(
          settingsFile,
          campaignId,
          variationId,
          userId,
          goal.id,
          revenueValue
        );

        this.eventQueue.process(config, properties, this);
      } else {
        // If no goal is found, something is wrong with the goalIdentifier
        this.logger.log(
          LogLevelEnum.ERROR,
          LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_GOAL_NOT_FOUND, {
            file: FileNameEnum.VWO,
            userId,
            campaignTestKey: campaignTestKey
          })
        );
      }

      return true;
    }

    return false;
  }

  // PRIVATE METHODS

  /**
   * If userProfileService is provided and variation was stored, get the stored variation
   *
   * @param {Object} config
   * @param {String} campaignTestKey
   * @param {String|Number|Float} userId
   * @param {Object} campaignBucketMap
   *
   * @return {Object|null} - if found then variation settings object otherwise null
   */
  __getStoredVariation(config, campaignTestKey, userId, campaignBucketMap = {}) {
    if (campaignBucketMap.hasOwnProperty(campaignTestKey)) {
      let decision = campaignBucketMap[campaignTestKey];
      let variationName = decision.variationName;

      config.logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GETTING_STORED_VARIATION, {
          file: FileNameEnum.VWO,
          campaignTestKey: campaignTestKey,
          userId,
          variationName: decision.variationName
        })
      );

      return CampaignUtil.getCampaignVariation(config, campaignTestKey, variationName);
    }

    // Log if stored variation is not found even after implementing UserProfileService
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

  /**
   * Returns the campaign mapping to the userId
   *
   * @param {String|Number|Float} userId
   * @return {Object} - data
   */
  __resolveCampaignBucketMap(userId) {
    let userData = this.__getUserProfile(userId);
    let campaignBucketMap = {};

    if (userData) {
      campaignBucketMap = userData.campaignBucketMap;
    }
    return Object.assign({}, campaignBucketMap);
  }

  /**
   * Get the UserProfileData after looking up into lookup method being provided via UserProfileService
   *
   * @param {String|Number|Float} userId
   * @return {Object} - UserProfile data
   */
  __getUserProfile(userId) {
    let userProfile = {
      userId: userId,
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

      // if data found
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.LOOKING_UP_USER_PROFILE_SERVICE, {
          file: FileNameEnum.VWO,
          userId
        })
      );

      return data;
    } catch (ex) {
      // if no data found
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.LOOK_UP_USER_PROFILE_SERVICE_FAILED, {
          file: FileNameEnum.VWO,
          userId
        })
      );
    }
  }

  /**
   * If userProfileService is provided and variation was stored, save the assigned variation
   *
   * @param {Object} campaign
   * @param {String} variationName
   * @param {String|Number|Float} userId
   * @param {Object} campaignBucketMap
   *
   * @return {Boolean} - true if found otherwise false
   */
  __saveUserProfile(campaign, variationName, userId, campaignBucketMap) {
    if (!this.userProfileService) {
      this.logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_USER_PROFILE_SERVICE_SAVE, {
          file: FileNameEnum.VWO
        })
      );
      return false;
    }

    try {
      let newBucketMap = Object.assign({}, campaignBucketMap);

      newBucketMap[campaign.key] = {
        variationName: variationName
      };

      this.userProfileService.save({
        userId: userId,
        campaignBucketMap: newBucketMap
      });

      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SAVING_DATA_USER_PROFILE_SERVICE, {
          file: FileNameEnum.VWO,
          userId
        })
      );

      return true;
    } catch (ex) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SAVE_USER_PROFILE_SERVICE_FAILED, {
          file: FileNameEnum.VWO,
          userId
        })
      );

      return false;
    }
  }
}
module.exports = VWO;
