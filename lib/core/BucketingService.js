const Hasher = require('murmurhash');
const ValidateUtil = require('../utils/ValidateUtil');
const Constants = require('../constants/Constants');
const CampaignUtils = require('../utils/CampaignUtils');

/**
 * Generates Bucket Value of the User by hashing the User ID by murmurHash
 * and scaling it down.
 *
 * @param {Number} hashValue the hashValue generated after hashing
 * @param {Number} maxValue the value up-to which hashValue needs to be scaled
 * @param {Number} multiplier multiplier in case the traffic allocation is less than 100
 *
 * @return {Number} bucket Value of the User
 */
function generateBucketValue(hashValue, maxValue, multiplier = 1) {
  let ratio = hashValue / Math.pow(2, 32);
  let multipliedValue = (maxValue * ratio + 1) * multiplier;
  return Math.floor(multipliedValue);
}

/**
 * Returns the Variation by checking the Start and End
 * Bucket Allocations of each Variation
 *
 * @param {Campaign} campaign which contains the variations
 * @param {Number} bucketValue the bucket Value of the user
 *
 * @return {Variation} allotted to the user
 */
function getVariation(campaign, bucketValue) {
  if (!CampaignUtils.validateCampaign(campaign)) {
    throw new Error('Invalid Campaign');
  }

  console.log(bucketValue);
  for (let i = 0; i < Object.keys(campaign.variations).length; i++) {
    let variation = campaign.variations[i];
    // console.log('start: '+variation.startVariationAllocation);
    // console.log('end: '+variation.endVariationAllocation);
    if (bucketValue >= variation.startVariationAllocation && bucketValue <= variation.endVariationAllocation) {
      return variation;
    }
  }
  console.error('Variation not found');
  return null;
}

module.exports = {
  /**
   * Validates the User ID and generates Bucket Value of the User
   * by hashing the User ID by murmurHash
   * and scaling it down.
   *
   * @param {String} userId the unique ID assigned to User
   *
   * @return {Number} the bucket Value allotted to User (between 1 to $this->$MAX_TRAFFIC_PERC)
   */
  bucketUserToCampaign: userId => {
    if (!ValidateUtil.isValidValue(userId)) {
      console.log('Invalid User ID');
      return 0;
    }

    let hashValue = Hasher.v3(userId, Constants.SEED_VALUE);

    console.log('hash', hashValue);

    return generateBucketValue(hashValue, Constants.MAX_TRAFFIC_PERC);
  },

  /**
   * Validates the User ID and generates Variation into
   * which the User is bucketed in.
   *
   * @param {String} userId the unique ID assigned to User
   * @param {Campaign} campaign the Campaign of which User is a part of
   *
   * @return {Variation} into which user is bucketed in
   */
  bucketUserToVariation: (userId, campaign) => {
    if (!ValidateUtil.isValidValue(userId)) {
      console.log('Invalid User ID');
      return 0;
    }

    let hashValue = Hasher.v3(userId, Constants.SEED_VALUE);
    let multiplier = Constants.MAX_TRAFFIC_VALUE / campaign.percentTraffic / 100;
    let bucketValue = generateBucketValue(hashValue, Constants.MAX_TRAFFIC_VALUE, multiplier);

    return getVariation(campaign, bucketValue);
  }
};
