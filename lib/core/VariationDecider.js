const ValidateUtil = require('../utils/ValidateUtil');

const Bucketer = require('./BucketingService');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const loggger = logging.getLogger();

const VariationDecider = {
  /**
   * Returns the Variation Allotted to User
   *
   * @param {String|Number|Float} userId the unique ID assigned to User
   * @param {Object} campaign
   *
   * @return {Object} Variation object allotted to User
   */
  getVariationAllotted: (userId, campaign) => {
    let response = {
      variationId: null,
      variationName: null
    };

    if (!ValidateUtil.isValidValue(userId)) {
      loggger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_USER_ID, {
          file: FileNameEnum.BucketingService,
          userId,
          method: 'getVariationAllotted'
        })
      );

      return response;
    }

    if (Bucketer.isUserPartOfCampaign(userId, campaign)) {
      let variation = VariationDecider.getVariationIdOfCampaignForUser(userId, campaign);

      response.variationId = variation.id;
      response.variationName = variation.name;

      loggger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GOT_VARIATION_FOR_USER, {
          file: FileNameEnum.VariationDecider,
          variationId: variation.name,
          userId,
          campaignTestKey: campaign.key,
          method: 'getVariationAllotted'
        })
      );
    } else {
      loggger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_NOT_PART_OF_CAMPAIGN, {
          file: FileNameEnum.VariationDecider,
          userId,
          campaignTestKey: campaign.key,
          method: 'getVariationAllotted'
        })
      );
    }

    return response;
  },

  /**
   * Assigns random variation ID to a particular user depending on the PercentTraffic.
   * Makes user a part of campaign if user's included in Traffic.
   *
   * @param {String|Number|Float} userId the unique ID assigned to a user
   * @param {Object} campaign the Campaign of which user is to be made a part of
   *
   * @return {Object|null} Variation allotted to User
   */
  getVariationIdOfCampaignForUser: (userId, campaign) => {
    if (!ValidateUtil.isValidValue(userId)) {
      loggger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_USER_ID, {
          file: FileNameEnum.BucketingService,
          userId,
          method: 'getVariationIdOfCampaignForUser'
        })
      );

      return null;
    }

    if (!campaign) {
      loggger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_CAMPAIGN, {
          file: FileNameEnum.BucketingService,
          method: 'getVariationIdOfCampaignForUser'
        })
      );

      return null;
    }

    let variation = Bucketer.bucketUserToVariation(userId, campaign);

    if (variation && variation.name) {
      loggger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_VARIATION_FOR_USER, {
          file: FileNameEnum.VariationDecider,
          variationId: variation.name,
          userId,
          campaignTestKey: campaign.key
        })
      );
      return {
        name: variation.name,
        id: variation.id
      };
    }

    loggger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_GOT_NO_VARIATION, {
        file: FileNameEnum.VariationDecider,
        userId,
        campaignTestKey: campaign.key
      })
    );

    return null;
  }
};

module.exports = VariationDecider;
