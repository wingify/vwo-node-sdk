const Hasher = require('murmurhash');

const Constants = require('../constants');
const Audience = require('./AudienceEvaluator');
const ValidateUtil = require('../utils/ValidateUtil');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const loggger = logging.getLogger();

let BucketingService = {
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
  _generateBucketValue: (hashValue, maxValue, multiplier = 1) => {
    const ratio = hashValue / Math.pow(2, 32);
    const multipliedValue = (maxValue * ratio + 1) * multiplier;
    const value = Math.floor(multipliedValue);

    return value;
  },

  /**
   * Returns the Variation by checking the Start and End
   * Bucket Allocations of each Variation
   *
   * @param {Campaign} campaign which contains the variations
   * @param {Number} bucketValue the bucket Value of the user
   *
   * @return {Variation} allotted to the user
   */
  _getVariation: (campaign, bucketValue) => {
    // console.log(bucketValue);
    for (let i = 0; i < Object.keys(campaign.variations).length; i++) {
      let variation = campaign.variations[i];

      if (bucketValue >= variation.startVariationAllocation && bucketValue <= variation.endVariationAllocation) {
        return variation;
      }
    }

    return null;
  },

  /**
   * Validates the User ID and generates Bucket Value of the User
   * by hashing the User ID by murmurHash
   * and scaling it down.
   *
   * @param {String} userId the unique ID assigned to User
   *
   * @return {Number} the bucket Value allotted to User (between 1 to $this->$MAX_TRAFFIC_PERC)
   */
  _getBucketValueForUser: userId => {
    if (!ValidateUtil.isValidValue(userId)) {
      loggger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_USER_ID, {
          file: FileNameEnum.BucketingService,
          userId,
          method: '_getBucketValueForUser'
        })
      );

      return 0;
    }

    let hashValue = Hasher.v3(userId, Constants.SEED_VALUE);
    let bucketValue = BucketingService._generateBucketValue(hashValue, Constants.MAX_TRAFFIC_PERC);

    loggger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_HASH_BUCKET_VALUE, {
        file: FileNameEnum.BucketingService,
        hashValue,
        bucketValue,
        userId
      })
    );

    return bucketValue;
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
    if (!campaign) {
      loggger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_CAMPAIGN, {
          file: FileNameEnum.BucketingService,
          method: 'isUserPartOfCampaign'
        })
      );

      return false;
    }

    let conditions = (campaign.conditions = []);

    if (Audience.evaluate(conditions)) {
      let trafficAllocation = campaign.percentTraffic;
      let valueAssignedToUser = BucketingService._getBucketValueForUser(userId);
      let isUserPart = valueAssignedToUser !== 0 && valueAssignedToUser <= trafficAllocation;

      /* loggger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CHECK_USER_ELIGIBILITY_FOR_CAMPAIGN, {
          file: FileNameEnum.BucketingService,
          valueAssignedToUser,
          userId,
          trafficAllocation,
          campaignTestKey: campaign.key
        })
      ); */

      loggger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_ELIGIBILITY_FOR_CAMPAIGN, {
          file: FileNameEnum.BucketingService,
          userId,
          isUserPart
        })
      );

      return isUserPart;
    }

    loggger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.AUDIENCE_CONDITION_NOT_MET, {
        file: FileNameEnum.BucketingService,
        userId
      })
    );

    return false;
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
      loggger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_USER_ID, {
          file: FileNameEnum.BucketingService,
          userId,
          method: 'bucketUserToVariation'
        })
      );

      return 0;
    }

    let hashValue = Hasher.v3(userId, Constants.SEED_VALUE);
    let multiplier = Constants.MAX_TRAFFIC_VALUE / campaign.percentTraffic / 100;
    let bucketValue = BucketingService._generateBucketValue(hashValue, Constants.MAX_TRAFFIC_VALUE, multiplier);

    loggger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.VARIATION_HASH_BUCKET_VALUE, {
        file: FileNameEnum.BucketingService,
        userId,
        campaignTestKey: campaign.key,
        percentTraffic: campaign.percentTraffic,
        bucketValue,
        hashValue
      })
    );

    return BucketingService._getVariation(campaign, bucketValue);
  }
};

module.exports = BucketingService;
