const VariationDecider = require('../core/VariationDecider');

const Constants = require('../constants');

const VariationDecisionUtil = require('../utils/VariationDecisionUtil');
const CampaignUtil = require('../utils/CampaignUtil');
const ImpressionUtil = require('../utils/ImpressionUtil');
const ValidateUtil = require('../utils/ValidateUtil');

const EventQueue = require('../services/EventQueue');
const ProjectConfigManager = require('../services/ProjectConfigManager');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

const file = FileNameEnum.VWO;

class VWO {
  // Setting various services on the instance to be accessible by its member functions
  constructor(config = {}) {
    this.userProfileService = config.userProfileService;
    this.logger = config.logger;

    let projectConfigManager = new ProjectConfigManager(config);

    // Validate the config file i.e. check if required fields contain appropriate data
    if (!projectConfigManager.isSettingsFileValid(config)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_CONFIGURATION, {
          file
        })
      );

      return;
    }

    this.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.VALID_CONFIGURATION, {
        file
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
        file
      })
    );
  }

  // PUBLIC METHODS

  /**
   * This API method: Gets the variation assigned for the user for the campaign and send the metrics to VWO server
   *
   * 1. Validates the arguments being passed
   * 2. Checks if user is eligible to get bucketed into the campaign,
   * 3. Assigns the determinitic variation to the user(based on userId), if user becomes part of campaign
   *    If userProfileService is used, it will look into it for the variation and if found, no further processing is done
   * 4. Sends an impression call to VWO server to track user
   *
   * @param {String} campaignTestKey   unique campaign test key
   * @param {String} userId            ID assigned to a user
   *
   * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
   */
  activate(campaignTestKey, userId) {
    // Check if arguments have valid data-type
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.ACTIVATE, campaignTestKey, userId)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_MISSING_PARAMS, {
          file
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
          file
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
          file,
          campaignTestKey: campaignTestKey,
          api: 'activate'
        })
      );

      return null;
    }

    // Once the matching RUNNING campaign is found, assign the deterministic variation to the userId provided
    const { variationId, variationName } = VariationDecisionUtil.get(config, campaign, campaignTestKey, userId);

    // Check if variation-name has been assigned to the userId. If not, return no variation
    if (!ValidateUtil.isValidValue(variationName)) {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.INVALID_VARIATION_KEY, {
          file,
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
   *
   * 1. Validates the arguments being passed
   * 2. Checks if user is eligible to get bucketed into the campaign,
   * 3. Assigns the determinitic variation to the user(based on userId), if user becomes part of campaign
   *    If userProfileService is used, it will look into it for the variation and if found, no further processing is done
   *
   * @param {String} campaignTestKey       unique campaign test key
   * @param {String} userId                ID assigned to a user
   *
   * @return {String|null}                 If variation is assigned then variation-name otherwise null in case of user not becoming part
   */
  getVariation(campaignTestKey, userId) {
    // Check if arguments have valid data-type
    if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.GET_VARIATION, campaignTestKey, userId)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_VARIATION_API_MISSING_PARAMS, {
          file
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
          file
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
          file,
          campaignTestKey: campaignTestKey,
          api: 'getVariation'
        })
      );

      return null;
    }

    const { variationName } = VariationDecisionUtil.get(config, campaign, campaignTestKey, userId);

    return variationName;
  }

  /**
   * This API method: Marks the conversion of the campaign for a particular goal
   *
   * 1. validates the arguments being passed
   * 2. Checks if user is eligible to get bucketed into the campaign,
   * 3. Gets the assigned determinitic variation to the user(based on userId), if user becomes part of campaign
   * 4. Sends an impression call to VWO server to track goal data
   *
   * @param {Number} campaignTestKey           unique campaign test key
   * @param {String} userId                    ID assigned to a user
   * @param {String} goalIdentifier             unique campaign's goal identifier
   * @param {Number|Float|String} revenueValue revenue generated on triggering the goal
   */
  track(campaignTestKey, userId, goalIdentifier, revenueValue) {
    // Check if arguments have valid data-type
    if (
      !ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, campaignTestKey, userId, goalIdentifier)
    ) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_MISSING_PARAMS, {
          file
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
          file
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
          file,
          campaignTestKey: campaignTestKey,
          api: 'track'
        })
      );

      return false;
    }

    let campaignId = campaign.id;

    // Get the campaign goal settings based on goalIdentifier
    let goal = CampaignUtil.getCampaignGoal(config, campaign.key, goalIdentifier);

    if (!goal) {
      // If no goal is found, something is wrong with the goalIdentifier
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_GOAL_NOT_FOUND, {
          file,
          userId,
          goalIdentifier,
          campaignTestKey: campaignTestKey
        })
      );

      return false;
    } else if (goal.type === Constants.GOAL_TYPES.REVENUE && !ValidateUtil.isValidValue(revenueValue)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_REVENUE_NOT_PASSED_FOR_REVENUE_GOAL, {
          file,
          userId,
          goalIdentifier,
          campaignTestKey: campaignTestKey
        })
      );

      return false;
    }

    let { variationId, variationName } = VariationDecider.getVariationAllotted(userId, campaign);

    // Is User is a part of Campaign and has been decided to be a part of particular variation
    if (variationName) {
      // If goal is found, send an impression to VWO server for report stats

      let properties = ImpressionUtil.buildEvent(settingsFile, campaignId, variationId, userId, goal, revenueValue);

      this.eventQueue.process(config, properties, this);

      return true;
    }

    return false;
  }
}
module.exports = VWO;
