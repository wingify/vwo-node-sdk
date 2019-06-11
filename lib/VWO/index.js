const VariationDecider = require('../core/VariationDecider');

const CampaignUtils = require('../utils/CampaignUtils');
const ImpressionUtil = require('../utils/ImpressionUtil');
const ValidateUtil = require('../utils/ValidateUtil');

const EventQueue = require('../services/EventQueue');
const ProjectConfigManager = require('../services/ProjectConfigManager');
const Constants = require('../constants/Constants');

function VWO(config) {
  // validate
  this.userProfileService = config.userProfileService;
  this.projectConfigManager = new ProjectConfigManager({
    configFile: config.configFile,
    sdkKey: config.sdkKey
  });
  this.eventQueue = new EventQueue();
}

VWO.prototype.activate = function(expId, userId) {
  if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.ACTIVATE, expId, userId)) {
    // log
    return;
  }

  let configObj = this.projectConfigManager.getConfigFile();
  if (!configObj) {
    console.log('configobject is not defined');
    return null;
  }

  let variationKey = this.getVariation(expId, userId);
  if (!ValidateUtil.isValidValue(variationKey)) {
    // notActivatingCampaign(expId, userId);
    console.log('no variation key is defined');
    return;
  }

  let isRunning = CampaignUtils.isCampaignRunning(configObj, expId);
  if (!isRunning) {
    // log not running
    console.log('campaign is not running');
    return variationKey;
  }

  let properties = ImpressionUtil.buildEvent(configObj, expId, variationKey, userId);
  this.eventQueue.process(properties, this);

  return variationKey;
};

VWO.prototype.getVariation = function(expId, userId) {
  if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.GET_VARIATION, expId, userId)) {
    // log
    return;
  }

  let configObj = this.projectConfigManager.getConfigFile();
  if (!configObj) {
    return null;
  }

  let campaign = CampaignUtils.getCampaign(configObj, expId);
  if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
    // log error
    return;
  }

  let campaignBucketMap = this.__resolveCampaignBucketMap(userId);
  variation = this.__getStoredVariation(configObj, campaign.id, userId, campaignBucketMap);

  if (variation) {
    return variation.id;
  }
  // TODO: check audience

  let variationKey = VariationDecider.getVariationAllotted(configObj, expId, userId);

  // persist bucketing
  this.__saveUserProfile(campaign, variationKey, userId, campaignBucketMap);

  return variationKey;
};

/**
 * Marks the conversion of the campaign for a particular goal
 *
 * @param {Number} expId the unique ID assigned to a user
 * @param {String} userId the unique ID assigned to a user
 * @param {Number} goalId
 * @param {String} value revenue generated on triggering the goal
 */
VWO.prototype.track = function(expId, userId, goalId, revenue) {
  if (!ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, expId, userId, goalId)) {
    // log
    return;
  }
  let configObj = this.projectConfigManager.getConfigFile();

  if (!configObj) {
    return null;
  }

  let campaign = CampaignUtils.getCampaign(configObj, expId);
  let variationId = VariationDecider.getVariationIdOfCampaignForUser(campaign, userId);
  let properties = ImpressionUtil.buildEvent(configObj, campaign.id, variationId, userId, goalId, revenue);

  this.eventQueue.process(properties, this);
};

VWO.prototype.__getStoredVariation = function(configObj, expId, userId, campaignBucketMap = {}) {
  if (campaignBucketMap.hasOwnProperty(expId)) {
    let decision = campaignBucketMap[expId];
    let variationId = decision.variation_id;

    return CampaignUtils.getCampaignVariation(configObj, expId, variationId);
  }

  return null;
};
VWO.prototype.__resolveCampaignBucketMap = function(userId) {
  let userData = this.__getUserProfile(userId);
  let campaign_bucket_map = {};

  if (userData) {
    campaign_bucket_map = userData.campaign_bucket_map;
  }
  return Object.assign({}, campaign_bucket_map);
};
VWO.prototype.__getUserProfile = function(userId) {
  let userProfile = {
    user_id: userId,
    campaign_bucket_map: {}
  };

  if (!this.userProfileService) {
    return userProfile;
  }

  try {
    return this.userProfileService.lookup(userId);
  } catch (ex) {
    // log error
  }
};

VWO.prototype.__saveUserProfile = function(campaign, variationKey, userId, campaignBucketMap) {
  if (!this.userProfileService) {
    return;
  }

  try {
    let newBucketMap = Object.assign({}, campaignBucketMap);

    newBucketMap[campaign.id] = {
      variation_id: variationKey
    };

    this.userProfileService.save({
      user_id: userId,
      campaign_bucket_map: newBucketMap
    });

    console.log('SAVED');
  } catch (ex) {
    // log
  }
};

module.exports = VWO;
