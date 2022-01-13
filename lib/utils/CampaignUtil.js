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

const ValidateUtil = require('./ValidateUtil');
const Constants = require('../constants');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const GoalTypeEnum = require('../enums/GoalTypeEnum');
const CampaignTypeEnum = require('../enums/CampaignTypeEnum');
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

  /**
   * Get the campaign on the basis of campaign id
   *
   * @param {Object} settingsFile
   * @param {Number} campaignId
   *
   * @returns {Object} campaign object
   */
  getCampaignBasedOnId: (settingsFile, campaignId) => {
    let campaign;

    for (let i = 0; i < settingsFile.campaigns.length; i++) {
      if (parseInt(settingsFile.campaigns[i].id, 10) === parseInt(campaignId, 10)) {
        campaign = settingsFile.campaigns[i];

        break;
      }
    }

    return campaign;
  },
  /**
   * It extracts the weights from all the variations inside the campaign
      and scales them so that the total sum of eligible variations' weights become 100%

      1. variations
   */
  scaleVariationWeights: variations => {
    const totalWeight = variations.reduce((acc, variation) => {
      return acc + variation.weight;
    }, 0);
    if (!totalWeight) {
      const weight = 100 / variations.length;
      variations.forEach(variation => (variation.weight = weight));
    } else {
      variations.forEach(variation => (variation.weight = (variation.weight / totalWeight) * 100));
    }
  },

  getCampaign: (settingsFile, campaignKey) => {
    let campaign;

    for (let i = 0; i < settingsFile.campaigns.length; i++) {
      if (settingsFile.campaigns[i].key === campaignKey) {
        campaign = settingsFile.campaigns[i];

        break;
      }
    }

    return campaign;
  },
  /**
   * Gets campaigns for corresponding campaignKeys
   *
   * @param {Object} settingsFile
   * @param {Array} campaignKeys
   *
   * @return {Array} Campaigns
   */
  getCampaignsForKeys: (settingsFile, campaignKeys) => {
    const campaigns = [];
    campaignKeys.forEach(key => {
      let campaign = CampaignUtil.getCampaign(settingsFile, key);
      if (campaign) {
        campaigns.push(campaign);
      } else {
        campaigns.push({
          key
        });
      }
    });
    return campaigns;
  },
  /**
   * Gets campaigns which have the goalIdentifier present
   *
   * @param {settingsFile}
   * @param {String} goalIdentifier
   * @param {String} goalTypeToTrack type of goal to track
   *
   * @return {Array} Campaigns
   */
  getCampaignsForGoal: (settingsFile, goalIdentifier, goalTypeToTrack) => {
    let campaigns = [];
    settingsFile.campaigns.forEach(campaign => {
      const goal = CampaignUtil.getCampaignGoal(settingsFile, campaign.key, goalIdentifier);
      if (goal && (goalTypeToTrack === GoalTypeEnum.ALL || goal.type === goalTypeToTrack)) {
        campaigns.push(campaign);
      }
    });
    if (!campaigns.length) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_FOUND_FOR_GOAL, {
          file: FileNameEnum.CampaignUtil,
          goalIdentifier
        })
      );
    }
    return campaigns;
  },
  getCampaignStatus: (settingsFile, campaignKey) => {
    let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

    if (!campaign || !campaign.status) {
      // log error
      return '';
    }

    return campaign.status.toLowerCase();
  },

  isCampaignRunning: (settingsFile, campaignKey) => {
    return CampaignUtil.getCampaignStatus(settingsFile, campaignKey) === 'running';
  },
  /**
   * Validates the campaign
   *
   * @param {Campaign} campaign the campaign to be validated
   *
   * @return {Boolean} true is campaign is valid
   */
  validateCampaign: campaign => {
    return ValidateUtil.isValidValue(campaign) && campaign.variations && Object.keys(campaign.variations).length > 0;
  },

  /**
   * Assigns the buckets to the Variations of the campaign
   * depending on the traffic allocation
   *
   * @param {Campaign} campaign whose Variations are to be allocated
   */
  setVariationAllocation: campaign => {
    const numberOfVariations = campaign.variations.length;
    let stepFactor = 0;

    for (let i = 0, currentAllocation = 0; i < numberOfVariations; i++) {
      let variation = campaign.variations[i];

      stepFactor = CampaignUtil.assignRangeValues(variation, currentAllocation);
      currentAllocation += stepFactor;

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.VARIATION_RANGE_ALLOCATION, {
          file: FileNameEnum.CampaignUtil,
          campaignKey: campaign.key,
          variationName: variation.name,
          variationWeight: variation.weight,
          start: variation.startVariationAllocation,
          end: variation.endVariationAllocation
        })
      );
    }
  },

  /**
   * Assign range allocation to the campaigns in the list to decide which campaign to choose out of the Mutually Exclusive group
   *
   * @param {Array} campaigns
   */
  setCampaignAllocation: campaigns => {
    let stepFactor = 0;

    for (let i = 0, currentAllocation = 0; i < campaigns.length; i++) {
      let campaign = campaigns[i];

      stepFactor = CampaignUtil.assignRangeValues(campaign, currentAllocation);
      currentAllocation += stepFactor;
    }
  },

  assignRangeValues: (variation, currentAllocation) => {
    let stepFactor;
    stepFactor = CampaignUtil._getVariationBucketRange(variation.weight);

    if (stepFactor) {
      variation.startVariationAllocation = currentAllocation + 1;
      variation.endVariationAllocation = currentAllocation + stepFactor;
    } else {
      variation.startVariationAllocation = -1;
      variation.endVariationAllocation = -1;
    }
    return stepFactor;
  },
  getCampaignGoal: (settingsFile, campaignKey, goalIdentifier) => {
    let desiredCampaignGoal = null;

    if (!settingsFile || !campaignKey || !goalIdentifier) {
      return desiredCampaignGoal;
    }

    let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

    if (!campaign) {
      return desiredCampaignGoal;
    }

    for (let i = 0; i < campaign.goals.length; i++) {
      let goal = campaign.goals[i];

      if (goal.identifier === goalIdentifier) {
        desiredCampaignGoal = goal;
        break;
      }
    }

    return desiredCampaignGoal;
  },
  getCampaignVariation: (settingsFile, campaignKey, variationName) => {
    let desiredVariation = null;

    if (!settingsFile || !campaignKey || !variationName) {
      return desiredVariation;
    }

    let campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

    if (!campaign) {
      return desiredVariation;
    }

    for (let i = 0; i < campaign.variations.length; i++) {
      let variation = campaign.variations[i];

      if (variation.name === variationName) {
        desiredVariation = variation;

        break;
      }
    }

    return desiredVariation;
  },
  getControlForCampaign: campaign => {
    let control = {};

    if (!campaign || !campaign.variations) {
      return control;
    }

    for (let i = 0; i < campaign.variations.length; i++) {
      if (campaign.variations[i].id === 1) {
        control = campaign.variations[i];
        break;
      }
    }

    return control;
  },
  isFeatureTestCampaign: campaign => {
    if (campaign && campaign.type === CampaignTypeEnum.FEATURE_TEST) {
      return true;
    }

    return false;
  },
  isFeatureRolloutCampaign: campaign => {
    if (campaign && campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT) {
      return true;
    }

    return false;
  },
  isAbCampaign: campaign => {
    if (campaign && campaign.type === CampaignTypeEnum.AB) {
      return true;
    }

    return false;
  },

  /**
   * Check if the campaign is a part of mutually exclusive group
   *
   * @param {Object} settingsFile
   * @param {Number} campaignId
   *
   * @returns {Number} group id of the campaign.
   */
  isPartOfGroup: (settingsFile, campaignId) => {
    if (settingsFile.campaignGroups && Object.prototype.hasOwnProperty.call(settingsFile.campaignGroups, campaignId)) {
      return {
        groupId: settingsFile.campaignGroups[campaignId],
        groupName: settingsFile.groups[settingsFile.campaignGroups[campaignId]].name
      };
    }
    return {};
  },

  /**
   * Get the list of campaigns on the basis of their id
   *
   * @param {Object} settingsFile
   * @param {Number} groupId
   *
   * @returns {Array} list of campaigns
   */
  getGroupCampaigns: (settingsFile, groupId) => {
    const campaigns = [];
    if (Object.prototype.hasOwnProperty.call(settingsFile.groups, groupId)) {
      settingsFile.groups[groupId].campaigns.forEach(campaignId => {
        let campaign = CampaignUtil.getCampaignBasedOnId(settingsFile, campaignId);
        if (campaign) {
          campaigns.push(campaign);
        }
      });
    }
    return campaigns;
  },

  /**
   * Decide the Seed for murmurhash to bucket user.
   * @param {string} userId
   * @param {object} campaign
   * @param {number} groupId
   *
   * @returns {string} Seed value
   */
  getBucketingSeed: (userId, campaign, groupId) => {
    if (groupId) {
      return `${groupId}_${userId}`;
    }

    if (campaign && campaign.isBucketingSeedEnabled) {
      return `${campaign.id}_${userId}`;
    } else {
      return userId;
    }
  }
};

module.exports = CampaignUtil;
