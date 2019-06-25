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

  getCampaign: (projectConfig, campaignKey) => {
    let campaign;

    for (let i = 0; i < projectConfig.campaigns.length; i++) {
      if (projectConfig.campaigns[i].key === campaignKey) {
        campaign = projectConfig.campaigns[i];
        break;
      }
    }

    return campaign;
  },

  getCampaignStatus: (projectConfig, campaignKey) => {
    let campaign = CampaignUtil.getCampaign(projectConfig, campaignKey);

    if (!campaign || !campaign.status) {
      // log error
      return false;
    }

    return campaign.status.toLowerCase();
  },

  isCampaignRunning: (projectConfig, campaignTestKey) => {
    return CampaignUtil.getCampaignStatus(projectConfig, campaignTestKey) === 'running';
  },
  /**
   * Validates the campaign
   *
   * @param {Campaign} campaign the campaign to be validated
   *
   * @return {Boolean} true is campaign is valid
   */
  validateCampaign: campaign => {
    return ValidateUtil.isValidValue(campaign) && Object.keys(campaign.variations).length > 0;
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
          variationId: variation.id,
          variationWeight: variation.weight,
          start: variation.startVariationAllocation,
          end: variation.endVariationAllocation
        })
      );
    }
  },
  getCampaignGoal: (config, campaignTestKey, goalIdentifier) => {
    let configObj = config.settingsFile;

    if (!configObj || !campaignTestKey || !goalIdentifier) {
      return;
    }

    let campaign = CampaignUtil.getCampaign(configObj, campaignTestKey);

    if (!campaign) {
      return;
    }

    let desiredCampaignGoal;

    for (let i = 0; i < campaign.goals.length; i++) {
      let goal = campaign.goals[i];

      if (goal.identifier === goalIdentifier) {
        desiredCampaignGoal = goal;
        break;
      }
    }

    return desiredCampaignGoal;
  },
  getCampaignVariation: (config, campaignTestKey, variationId) => {
    let configObj = config.settingsFile;
    let desiredVariation = null;

    if (!configObj || !campaignTestKey || !variationId) {
      return desiredVariation;
    }

    let campaign = CampaignUtil.getCampaign(configObj, campaignTestKey);

    if (!campaign) {
      return desiredVariation;
    }


    for (let i = 0; i < campaign.variations.length; i++) {
      let variation = campaign.variations[i];

      if (parseInt(variation.id, 10) === parseInt(variationId, 10)) {
        desiredVariation = variation;
        break;
      }
    }

    return desiredVariation;
  }
};

module.exports = CampaignUtil;
