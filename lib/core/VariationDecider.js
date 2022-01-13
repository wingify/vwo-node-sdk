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

const ValidateUtil = require('../utils/ValidateUtil');

const Bucketer = require('./BucketingService');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const file = FileNameEnum.VariationDecider;

const VariationDecider = {
  /**
   * Returns the Variation Allotted to User
   *
   * @param {String} userId the unique ID assigned to User
   * @param {Object} campaign
   *
   * @return {Object} Variation object allotted to User
   */
  getVariationAllotted: (userId, campaign) => {
    let response = {
      variation: null,
      variationId: null,
      variationName: null
    };

    if (!ValidateUtil.isValidValue(userId)) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.USER_ID_INVALID, {
          file,
          userId
        })
      );

      return response;
    }

    if (Bucketer.isUserPartOfCampaign(userId, campaign)) {
      let variation = VariationDecider.getVariationOfCampaignForUser(userId, campaign) || {};

      response.variation = variation;
      response.variationId = variation.id;
      response.variationName = variation.name;
    } else {
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_NOT_PART_OF_CAMPAIGN, {
          file,
          userId,
          campaignKey: campaign.key
        })
      );
    }

    return response;
  },

  /**
   * Assigns random variation ID to a particular user depending on the PercentTraffic.
   * Makes user a part of campaign if user's included in Traffic.
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {Object} campaign the Campaign of which user is to be made a part of
   *
   * @return {Object|null} Variation allotted to User
   */
  getVariationOfCampaignForUser: (userId, campaign) => {
    if (!campaign) {
      return null;
    }

    let variation = Bucketer.bucketUserToVariation(userId, campaign);

    if (variation && variation.name) {
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_VARIATION_STATUS, {
          file,
          userId,
          campaignKey: campaign.key,
          status: `got Varation:${variation.name}`
        })
      );
      return {
        variation,
        name: variation.name,
        id: variation.id
      };
    }

    logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_VARIATION_STATUS, {
        file,
        userId,
        campaignKey: campaign.key,
        status: 'got no variation'
      })
    );

    return null;
  }
};

module.exports = VariationDecider;
