const CampaignUtils = require('../utils/CampaignUtils');
const Bucketer = require('./BucketingService');
const Audience = require('./AudienceEvaluator');

const VariationDecider = {
  /**
   * Returns the Variation Allotted to User
   *
   * @param {String} userId the unique ID assigned to User
   * @param {String} variationKey the Variation Key
   *
   * @return {String} Variation name Allotted to User
   */
  getVariationAllotted: (configObj, expId, userId) => {
    let campaign = CampaignUtils.getCampaign(configObj, expId);
    let variationId;

    if (VariationDecider.isUserPartOfCampaign(userId, campaign)) {
      variationId = VariationDecider.getVariationIdOfCampaignForUser(campaign, userId);

      // if (variationId) {
      //     if (ValidateUtil.isValidValue(campaign.variations[variationId].changes)) {
      //         sendToServer(campaignId, variationId, userId);
      //         return resolve(campaign.variations[variationId].changes[variationKey]);
      //     } else {
      //         resolve(null);
      //         sendToServer(campaignId, variationId, userId);
      //     }
      // } else {
      //     return resolve(((defaultObject !== undefined) ? defaultObject : null));
      // }
    } else {
      console.log('User not part of campaign');
    }

    console.log(variationId);

    // if (variationId == null) {
    //     return 'Control';
    // }

    // for (let i = 0; i < configObj.campaigns.length; i++) {
    //     let campaign = configObj.campaigns[i];
    //     CampaignUtils.setVariationAllocation(campaign);

    //     for (let j = 1; j <= Object.keys(campaign.variations).length; j++) {
    //         let variation = campaign.variations[j];

    //         if (variation.id == variationId) {
    //             return variation.name;
    //         }
    //     }
    // }
    // console.log("Variation not found");

    return variationId;
  },
  /**
   * Randomly select a particular Variation for the user
   * if percentage traffic is not 100%,
   * calculate if this user should become part of the campaign or not
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {Number} trafficAllocation the value of traffic allotted to the campaign
   *
   * @return {Boolean} if User is a part or Campaign or not
   */
  isUserPartOfCampaign: (userId, campaign) => {
    let conditions = (campaign.conditions = []);

    if (Audience.evaluate(conditions)) {
      let trafficAllocation = campaign.percentTraffic;

      let valueAssignedToUser = Bucketer.bucketUserToCampaign(userId);

      console.log('valueAssignedToUser = ', valueAssignedToUser)
      return valueAssignedToUser !== 0 && valueAssignedToUser <= trafficAllocation;
    }

    return false;
  },

  /**
   * Assigns random variation ID to a particular user depending on the PC Traffic.
   * Makes user a part of campaign if user's included in Traffic.
   *
   * @param {Campaign} campaign the Campaign of which user is to be made a part of
   * @param {String} userId the unique ID assigned to a user
   *
   * @return {Number} Variation ID of the Variation Allotted to User
   */
  getVariationIdOfCampaignForUser: (campaign, userId) => {
    let variation = Bucketer.bucketUserToVariation(userId, campaign);
    if (variation && variation.id) {
      return variation.id;
    }
    return null
  }
};

module.exports = VariationDecider;
