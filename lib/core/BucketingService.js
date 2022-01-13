/**
 * Copyright 2019-2022 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Hasher = require('murmurhash');

const Constants = require('../constants');
const ValidateUtil = require('../utils/ValidateUtil');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const CampaignUtil = require('../utils/CampaignUtil');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const file = FileNameEnum.BucketingService;

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
   * Returns the Variation by checking the Start and End Bucket Allocations of each Variation
   *
   * @param {Object} campaign which contains the variations
   * @param {Number} bucketValue the bucket Value of the user
   *
   * @return {Object|null} variation data allotted to the user or null if not
   */
  _getVariation: (variations, bucketValue) => {
    for (let i = 0; i < Object.keys(variations).length; i++) {
      let variation = variations[i];

      if (bucketValue >= variation.startVariationAllocation && bucketValue <= variation.endVariationAllocation) {
        return variation;
      }
    }

    return null;
  },

  /**
   * Validates the User ID and generates Bucket Value of the User by hashing the userId by murmurHash and scaling it down.
   *
   * @param {String} userId the unique ID assigned to User
   *
   * @return {Number} the bucket Value allotted to User (between 1 to $this->$MAX_TRAFFIC_PERCENT)
   */
  _getBucketValueForUser: (seed, userId, disableLog) => {
    let hashValue = Hasher.v3(seed, Constants.SEED_VALUE);
    let bucketValue = BucketingService._generateBucketValue(hashValue, Constants.MAX_TRAFFIC_PERCENT);

    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_HASH_BUCKET_VALUE, {
        file,
        hashValue,
        bucketValue,
        userId
      }),
      disableLog
    );

    return bucketValue;
  },

  /**
   * Calculate if this user should become part of the campaign or not
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {Object} campaign fot getting the value of traffic allotted to the campaign
   *
   * @return {Boolean} if User is a part of Campaign or not
   */
  isUserPartOfCampaign: (userId, campaign, disableLog = false) => {
    if (!campaign) {
      return false;
    }

    let trafficAllocation = campaign.percentTraffic;
    let valueAssignedToUser = BucketingService._getBucketValueForUser(
      CampaignUtil.getBucketingSeed(userId, campaign),
      userId,
      disableLog
    );
    let isUserPart = valueAssignedToUser !== 0 && valueAssignedToUser <= trafficAllocation;

    logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_CAMPAIGN_ELIGIBILITY, {
        file,
        userId,
        campaignKey: campaign.key,
        status: isUserPart ? 'eligible' : 'not eligible'
      }),
      disableLog
    );

    return isUserPart;
  },

  /**
   * Validates the User ID and generates Variation into which the User is bucketed in.
   *
   * @param {String} userId the unique ID assigned to User
   * @param {Object} campaign the Campaign of which User is a part of
   *
   * @return {Object|null} variation data into which user is bucketed in or null if not
   */
  bucketUserToVariation: (userId, campaign) => {
    let multiplier;
    if (!ValidateUtil.isValidValue(userId)) {
      return null;
    }

    if (!campaign) {
      return null;
    }
    if (campaign.percentTraffic) {
      multiplier = Constants.MAX_TRAFFIC_VALUE / campaign.percentTraffic / 100;
    }

    const hashValue = BucketingService._generateHashValue(
      campaign.isBucketingSeedEnabled ? `${campaign.id}_${userId}` : userId
    );
    const bucketValue = BucketingService._generateBucketValue(hashValue, Constants.MAX_TRAFFIC_VALUE, multiplier);

    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_CAMPAIGN_BUCKET_VALUES, {
        file,
        userId,
        campaignKey: campaign.key,
        percentTraffic: campaign.percentTraffic,
        bucketValue,
        hashValue
      })
    );
    return BucketingService._getVariation(campaign.variations, bucketValue);
  },
  calculateBucketValue: (seed, multiplier = 1) => {
    const hashValue = BucketingService._generateHashValue(seed);
    return BucketingService._generateBucketValue(hashValue, Constants.MAX_TRAFFIC_VALUE, multiplier);
  },
  _generateHashValue: userId => {
    return Hasher.v3(userId, Constants.SEED_VALUE);
  }
};

module.exports = BucketingService;
