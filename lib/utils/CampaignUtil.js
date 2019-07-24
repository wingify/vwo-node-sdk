const ValidateUtil = require('./ValidateUtil');
const Constants = require('../constants');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

let CampaignUtil = {
  /**
   * Returns the bucket size of variation.
   *
   * @param {Number/Float} - weight of variation
   *
   * @return {Number} bucket start range of Variation
   */
  _getVariationBucketRange: variationWeight => {
    if (!variationWeight || variationWeight === 0) {
      return 0;
    }

    const startRange = Math.ceil(variationWeight * 100);

    return Math.min(startRange, Constants.MAX_TRAFFIC_VALUE);
  },

  getCampaign: (settingsFile, campaignKey) => {
    let campaign;

    for (let i = 0; i < settingsFile.campaigns.length; i++) {
      if (settingsFile.campaigns[i].key === campaignKey) {
        campaign = settingsFile.campaigns[i];
        break;
      }
    }

    return campaign;
  },

  getCampaignStatus: (settingsFile, campaignKey) => {
    let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

    if (!campaign || !campaign.status) {
      // log error
      return '';
    }

    return campaign.status.toLowerCase();
  },

  isCampaignRunning: (settingsFile, campaignTestKey) => {
    return CampaignUtil.getCampaignStatus(settingsFile, campaignTestKey) === 'running';
  },
  /**
   * Validates the campaign
   *
   * @param {Campaign} campaign the campaign to be validated
   *
   * @return {Boolean} true is campaign is valid
   */
  validateCampaign: campaign => {
    return ValidateUtil.isValidValue(campaign) && campaign.variations && Object.keys(campaign.variations).length > 0;
  },

  /**
   * Assigns the buckets to the Variations of the campaign
   * depending on the traffic allocation
   *
   * @param {Campaign} campaign whose Variations are to be allocated
   */
  setVariationAllocation: campaign => {
    const numberOfVariations = campaign.variations.length;
    let stepFactor;

    let currentAllocation = 0;

    // console.log('campaign: '+campaign.name);
    for (let i = 0; i < numberOfVariations; i++) {
      let variation = campaign.variations[i];

      stepFactor = CampaignUtil._getVariationBucketRange(variation.weight);

      if (stepFactor) {
        variation.startVariationAllocation = currentAllocation + 1;
        currentAllocation += stepFactor;
        variation.endVariationAllocation = currentAllocation;
      } else {
        variation.startVariationAllocation = -1;
        variation.endVariationAllocation = -1;
      }

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIATION_RANGE_ALLOCATION, {
          file: FileNameEnum.CampaignUtil,
          campaignTestKey: campaign.key,
          variationName: variation.name,
          variationWeight: variation.weight,
          start: variation.startVariationAllocation,
          end: variation.endVariationAllocation
        })
      );
    }
  },
  getCampaignGoal: (config, campaignTestKey, goalIdentifier) => {
    if (!config || !config.settingsFile || !campaignTestKey || !goalIdentifier) {
      return null;
    }

    let settingsFile = config.settingsFile;
    let campaign = CampaignUtil.getCampaign(settingsFile, campaignTestKey);

    if (!campaign) {
      return null;
    }

    let desiredCampaignGoal = null;

    for (let i = 0; i < campaign.goals.length; i++) {
      let goal = campaign.goals[i];

      if (goal.identifier === goalIdentifier) {
        desiredCampaignGoal = goal;
        break;
      }
    }

    return desiredCampaignGoal;
  },
  getCampaignVariation: (config, campaignTestKey, variationName) => {
    let desiredVariation = null;

    if (!config || !config.settingsFile || !campaignTestKey || !variationName) {
      return desiredVariation;
    }

    let settingsFile = config.settingsFile;
    let campaign = CampaignUtil.getCampaign(settingsFile, campaignTestKey);

    if (!campaign) {
      return desiredVariation;
    }

    for (let i = 0; i < campaign.variations.length; i++) {
      let variation = campaign.variations[i];

      if (variation.name === variationName) {
        desiredVariation = variation;
        break;
      }
    }

    return desiredVariation;
  }
};

module.exports = CampaignUtil;
