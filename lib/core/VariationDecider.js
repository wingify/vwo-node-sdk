const CampaignUtil = require('../utils/CampaignUtil');
const Bucketer = require('./BucketingService');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const loggger = logging.getLogger();

const VariationDecider = {
  /**
   * Returns the Variation Allotted to User
   *
   * @param {String} userId the unique ID assigned to User
   * @param {String} variationKey the Variation Key
   *
   * @return {String} Variation name Allotted to User
   */
  getVariationAllotted: (configObj, campaignTestKey, userId) => {
    let campaign = CampaignUtil.getCampaign(configObj, campaignTestKey);
    let variationId;

    if (Bucketer.isUserPartOfCampaign(userId, campaign)) {
      variationId = VariationDecider.getVariationIdOfCampaignForUser(campaign, userId);

      loggger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GOT_VARIATION_FOR_USER, {
          file: FileNameEnum.VariationDecider,
          variationId,
          userId,
          campaignTestKey: campaignTestKey,
          method: 'getVariationAllotted'
        })
      );
    } else {
      loggger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_NOT_PART_OF_CAMPAIGN, {
          file: FileNameEnum.VariationDecider,
          userId,
          campaignTestKey: campaignTestKey,
          method: 'getVariationAllotted'
        })
      );
    }

    return variationId;
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
      loggger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_VARIATION_FOR_USER, {
          file: FileNameEnum.VariationDecider,
          variationId: variation.id,
          userId,
          campaignTestKey: campaign.key
        })
      );
      return variation.id;
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
