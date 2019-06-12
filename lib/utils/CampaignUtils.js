const ValidateUtil = require('./ValidateUtil');
const Constants = require('../constants/Constants');

/**
 * Returns the bucket size of variation.
 *
 * @param {Number} numberOfVariations
 *
 * @return {Number} bucket size of Variation
 */
function calculateVariationBucketSize(numberOfVariations) {
  return Math.floor(Constants.MAX_TRAFFIC_VALUE / numberOfVariations);
}

let CampaignUtils = {
  getCampaign: (projectConfig, campaignKey) => {
    let campaign;

    for (let i = 0; i < projectConfig.campaigns.length; i++) {
      if (parseInt(projectConfig.campaigns[i].id, 10) === parseInt(campaignKey, 10)) {
        campaign = projectConfig.campaigns[i];
      }
      break;
    }

    return campaign;
  },

  getCampaignStatus: (projectConfig, campaignKey) => {
    let campaign = CampaignUtils.getCampaign(projectConfig, campaignKey);

    if (!campaign || !campaign.status) {
      // log error
      return false;
    }

    return campaign.status.toLowerCase();
  },

  isCampaignRunning: (projectConfig, expId) => {
    return CampaignUtils.getCampaignStatus(projectConfig, expId) === 'running';
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
    let numberOfVariations = Object.keys(campaign.variations).length;
    let factor = calculateVariationBucketSize(numberOfVariations);
    let currentAllocation = 0;

    // console.log('campaign: '+campaign.name);
    for (let i = 0; i < numberOfVariations; i++) {
      let variation = campaign.variations[i];
      variation.startVariationAllocation = currentAllocation + 1;
      currentAllocation += factor;
      if (i === numberOfVariations) {
        variation.endVariationAllocation = Constants.MAX_TRAFFIC_VALUE;
      } else {
        variation.endVariationAllocation = currentAllocation;
      }

      console.log('start: ' + variation.startVariationAllocation);
      console.log('end: ' + variation.endVariationAllocation);
    }
  },
  getCampaignVariation: (configObj, expId, variationId) => {
    if (!configObj || !expId || !variationId) {
      // log error
      return;
    }

    let campaign = CampaignUtils.getCampaign(configObj, expId);

    if (!campaign) {
      // log
      return;
    }

    let desiredVariation;

    for (let i = 0; i < campaign.variations.length; i++) {
      let variation = campaign.variations[i];

      if (parseInt(variation.id, 10) === parseInt(variationId, 10)) {
        desiredVariation = variation;
      }
    }

    return desiredVariation;
  }
};

module.exports = CampaignUtils;
