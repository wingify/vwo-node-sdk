const ValidateUtil = require('./ValidateUtil');
const Constants = require('../constants/Constants');

/**
 * Returns the bucket size of variation.
 *
 * @param {Number/Float} - weight of variation
 *
 * @return {Number} bucket start range of Variation
 */
function getVariationBucketRange(variationWeight) {
  if (!variationWeight || variationWeight === 0) {
    return 0;
  }

  const startRange = Math.floor(variationWeight * 100);

  return Math.min(startRange, Constants.MAX_TRAFFIC_VALUE);
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
    const numberOfVariations = campaign.variations.length;
    let stepFactor;

    let currentAllocation = 0;

    // console.log('campaign: '+campaign.name);
    for (let i = 0; i < numberOfVariations; i++) {
      let variation = campaign.variations[i];

      stepFactor = getVariationBucketRange(variation.weight);

      if (stepFactor) {
        variation.startVariationAllocation = currentAllocation + 1;
        currentAllocation += stepFactor;
        variation.endVariationAllocation = currentAllocation;
      } else {
        variation.startVariationAllocation = -1;
        variation.endVariationAllocation = -1;
      }

      console.log(`${variation.id} - ${variation.weight} - start: ${variation.startVariationAllocation}`);
      console.log(`${variation.id} - ${variation.weight} - end: ${variation.endVariationAllocation}`);
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
