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

const VariationDecider = require('../core/VariationDecider');
const BucketingService = require('../core/BucketingService');

const CampaignUtil = require('./CampaignUtil');
const DataTypeUtil = require('./DataTypeUtil');
const FunctionUtil = require('./FunctionUtil');
const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const StatusEnum = require('../enums/StatusEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();
const SegmentEvaluator = require('../core/SegmentEvaluator');
const HooksManager = require('../services/HooksManager');
const HooksEnum = require('../enums/HooksEnum');
const UuidUtil = require('./UuidUtil');
const Constants = require('../constants');
const CampaignTypeEnum = require('../enums/CampaignTypeEnum');
const ApiEnum = require('../enums/ApiEnum');

const file = FileNameEnum.DecisionUtil;

const SegmentationTypeEnum = {
  WHITELISTING: 'whitelisting',
  PRE_SEGMENTATION: 'pre-segmentation'
};

let DecisionUtil = {
  // PUBLIC METHODS
  /**
   *  1. Checks if there is a variation stored in userStorage, returns it
   *  2. If Whitelisting is applicable, evaluate it, if any eligible variation is found, store it in User Storage service and return, otherwise skip it.
   *  3. Check if the campaign is part of mutually exclusive group, if yes, get the winner campaign using campaign traffic normalization.
   *  4. If Pre-segmentation is applied and passes then go further otherwise return early and no further processing
   *  5. If no user storage value, no whitelisted variation and pre-segmentation evaluates to true, get variation using hashing logic if campaign traffic passes for that userId
   *
   *
   *  @param {Object} config
   *  @param {Object} settingsFile
   *  @param {Object} campaign
   *  @param {Object} campaignKey
   *  @param {String} userId
   *  @param {Object} customVariables
   *  @param {Object} variationTargetingVariables
   *
   *  @return {Object|null} - Object if a variation is assigned, otherwise null
   */
  getVariation: (
    config,
    settingsFile,
    campaign,
    campaignKey,
    userId,
    customVariables,
    variationTargetingVariables = {},
    userStorageData = {},
    metaData,
    isTrackUserAPI,
    newGoalIdentifier,
    api = ''
  ) => {
    let vwoUserId = UuidUtil.generateFor(userId, settingsFile.accountId);

    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_UUID, {
        file: FileNameEnum.UuidUtil,
        userId,
        accountId: settingsFile.accountId,
        uuid: vwoUserId
      })
    );

    let decision = {
      // campaign info
      campaignId: campaign.id,
      campaignKey,
      campaignType: campaign.type,
      campaignName: campaign.name,
      // campaign segmentation conditions
      customVariables,
      // event name
      event: HooksEnum.DECISION_TYPES.CAMPAIGN_DECISION,
      // goal tracked in case of track API
      goalIdentifier: newGoalIdentifier,
      // campaign whitelisting flag
      isForcedVariationEnabled: campaign.isForcedVariationEnabled,
      sdkVersion: Constants.SDK_VERSION,
      // API name which triggered the event
      source: api,
      // Passed in API
      userId,
      // Campaign Whitelisting conditions
      variationTargetingVariables,
      // VWO generated UUID based on passed UserId and Account ID
      vwoUserId
    };

    // check if the campaign is a part of group
    const { groupId, groupName } = CampaignUtil.isPartOfGroup(settingsFile, campaign.id);

    if (groupId) {
      // append groupId and groupName, if campaign is a part of group
      decision['groupId'] = groupId;
      decision['groupName'] = groupName;
    }

    variationTargetingVariables = Object.assign({}, variationTargetingVariables, {
      _vwoUserId: campaign.isUserListEnabled ? vwoUserId : userId
    });

    // check if tbe campaign satisfies the whitelisting before checking for the group
    const whitelistedVariation = DecisionUtil._checkForWhitelisting(
      campaign,
      campaignKey,
      userId,
      variationTargetingVariables,
      decision
    );
    if (whitelistedVariation) {
      return whitelistedVariation;
    }

    // check if the campaign is present in the storage before checking for the group
    const storedVariation = DecisionUtil._checkForUserStorage(
      config,
      settingsFile,
      campaign,
      campaignKey,
      userId,
      userStorageData,
      isTrackUserAPI,
      decision
    );
    if (storedVariation) {
      return storedVariation;
    }

    // check if the called campaign satisfies the pre-segmentatin before further proccessing.
    if (
      !(
        DecisionUtil._checkForPreSegmentation(campaign, campaignKey, userId, customVariables, decision) &&
        BucketingService.isUserPartOfCampaign(userId, campaign, true)
      )
    ) {
      return {};
    }

    if (groupId) {
      // mutually exclusive group exists

      // get the list of the all the campaigns in a group
      const campaignList = CampaignUtil.getGroupCampaigns(settingsFile, groupId);

      if (campaignList.length === 0) {
        // return if no campaigns are active in a group
        return {};
      }

      // checking other campaigns for whitelisting and user storage.
      let isWhitelistedOrStoredVariation = DecisionUtil._checkForStorageAndWhitelisting(
        config,
        settingsFile,
        groupName,
        campaignList,
        campaign,
        userId,
        userStorageData,
        variationTargetingVariables,
        isTrackUserAPI
      );

      if (isWhitelistedOrStoredVariation) {
        // other campaigns satisfy the whitelisting or storage, therfore returning
        logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.MEG_CALLED_CAMPAIGN_NOT_WINNER, {
            userId,
            groupName,
            file,
            campaignKey: campaignKey
          })
        );
        return {};
      }

      // none of the group campaigns satisfy whitelisting or user storage
      // check each campaign for pre-segmentation and traffic allocation.
      let inEligibleCampaignKeys = '';
      let eligibleCampaignKeys = '';
      const { eligibleCampaigns, inEligibleCampaigns } = DecisionUtil.getEligbleCampaigns(
        campaignList,
        userId,
        customVariables
      );

      inEligibleCampaigns.forEach(campaign => {
        inEligibleCampaignKeys = inEligibleCampaignKeys + campaign.key + ',';
      });
      eligibleCampaigns.forEach(campaign => {
        eligibleCampaignKeys = eligibleCampaignKeys + campaign.key + ',';
      });

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.MEG_ELIGIBLE_CAMPAIGNS, {
          userId,
          groupName,
          file,
          eligibleCampaignKeys: eligibleCampaignKeys.slice(0, -1),
          inEligibleText:
            inEligibleCampaignKeys === '' ? 'no campaigns' : `campaigns: ${inEligibleCampaignKeys.slice(0, -1)}`
        })
      );

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.MEG_ELIGIBLE_CAMPAIGNS, {
          userId,
          groupName,
          file,
          noOfEligibleCampaigns: eligibleCampaigns.length,
          noOfGroupCampaigns: inEligibleCampaigns.length + eligibleCampaigns.length
        })
      );

      if (eligibleCampaigns.length === 1) {
        // if the called campaign is the only winner.
        return DecisionUtil.evaluateTrafficAndGetVariation(
          config,
          eligibleCampaigns[0],
          eligibleCampaigns[0].key,
          userId,
          metaData,
          newGoalIdentifier,
          decision
        );
      } else {
        // normalize the eligible campaigns and decide winner
        return DecisionUtil._normalizeAndFindWinningCampaign(
          config,
          campaign,
          eligibleCampaigns,
          userId,
          groupName,
          groupId,
          metaData,
          newGoalIdentifier,
          decision
        );
      }
    } else {
      // campaign is not a part of mutually exclusive group
      // check if the user is eligible to become part of the campaign and assign variation.
      return DecisionUtil.evaluateTrafficAndGetVariation(
        config,
        campaign,
        campaignKey,
        userId,
        metaData,
        newGoalIdentifier,
        decision
      );
    }
  },
  // PRIVATE METHODS

  _evaluateWhitelisting: (campaign, campaignKey, userId, variationTargetingVariables, disableLogs = false) => {
    let whitelistedVariation;
    let status;
    const targetedVariations = [];
    campaign.variations.forEach(variation => {
      if (DataTypeUtil.isObject(variation.segments) && !Object.keys(variation.segments).length) {
        logger.log(
          LogLevelEnum.DEBUG,
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
            campaignKey,
            userId,
            file,
            variation: campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT ? '' : `, for ${variation.name}`
          }),
          disableLogs
        );
        return;
      }
      if (
        DataTypeUtil.isObject(variation.segments) &&
        SegmentEvaluator(variation.segments, variationTargetingVariables, campaignKey, userId, variation.name)
      ) {
        status = StatusEnum.PASSED;
        targetedVariations.push(FunctionUtil.cloneObject(variation));
      } else {
        status = StatusEnum.FAILED;
      }
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_STATUS, {
          campaignKey,
          userId,
          customVariables: JSON.stringify(variationTargetingVariables),
          file,
          status,
          segmentationType: SegmentationTypeEnum.WHITELISTING,
          variation:
            campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT && status === StatusEnum.PASSED
              ? 'and becomes part of the rollout'
              : `for ${variation.name}`
        }),
        disableLogs
      );
    });

    if (targetedVariations.length > 1) {
      CampaignUtil.scaleVariationWeights(targetedVariations);
      for (let i = 0, currentAllocation = 0, stepFactor = 0; i < targetedVariations.length; i++) {
        stepFactor = CampaignUtil.assignRangeValues(targetedVariations[i], currentAllocation);
        currentAllocation += stepFactor;
      }
      whitelistedVariation = BucketingService._getVariation(
        targetedVariations,
        BucketingService.calculateBucketValue(CampaignUtil.getBucketingSeed(userId, campaign))
      );
    } else {
      whitelistedVariation = targetedVariations[0];
    }

    if (whitelistedVariation) {
      return {
        variation: whitelistedVariation,
        variationName: whitelistedVariation.name,
        variationId: whitelistedVariation.id
      };
    }
  },
  /**
   * If userStorageService is provided and variation was stored, get the stored variation
   *
   * @param {Object} config
   * @param {Object} settingsFile - cloned settingsFile
   * @param {String} campaignKey
   * @param {String} userId
   *
   * @return {Object|null} - if found then variation and goalIdentifier settings object otherwise null
   */
  _getStoredVariationAndGoalIdentifiers: function(
    config,
    settingsFile,
    campaignKey,
    userId,
    userStorageData,
    disableLogs = false
  ) {
    let userData = DecisionUtil._getStoredUserData(config, userId, campaignKey, userStorageData, disableLogs);
    let { variationName, goalIdentifier } = userData;

    if (userData && userData.campaignKey && variationName) {
      return {
        storedVariation: CampaignUtil.getCampaignVariation(settingsFile, campaignKey, variationName),
        goalIdentifier
      };
    }

    // Log if stored variation is not found even after implementing UserStorageService
    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_STORAGE_SERVICE_NO_STORED_DATA, {
        file,
        campaignKey,
        userId
      }),
      disableLogs
    );

    return null;
  },
  /**
   * If userStorageService is provided and variation was stored, get the stored variation
   *
   * @param {Object} config
   * @param {Object} settingsFile - cloned settingsFile
   * @param {String} campaignKey
   * @param {String} userId
   *
   * @return {Object|null} - if found then variation settings object otherwise null
   */
  _getStoredVariation: function(config, settingsFile, campaignKey, userId, userStorageData) {
    const data = DecisionUtil._getStoredVariationAndGoalIdentifiers(
      config,
      settingsFile,
      campaignKey,
      userId,
      userStorageData
    );
    if (data && data.storedVariation) {
      return data.storedVariation;
    }
    return null;
  },
  /**
   * Get the User Variation mapping by calling get method of UserStorageService being provided
   *
   * @param {Object} config
   * @param {String} UserID
   * @param {String} campaignKey
   *
   * @return {Object} - User Campaign Mapping
   */
  _getStoredUserData: function(config, userId, campaignKey, userStorageData, disableLogs) {
    let userStorageMap = {
      userId: userId,
      variationName: null,
      campaignKey: campaignKey,
      goalIdentifier: null
    };

    if (!config.userStorageService) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_STORAGE_SERVICE_NOT_CONFIGURED, {
          file
        }),
        disableLogs
      );
      return userStorageMap;
    }

    try {
      let data = config.userStorageService.get(userId, campaignKey) || {};

      // if data found
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GETTING_DATA_USER_STORAGE_SERVICE, {
          file,
          userId,
          campaignKey
        }),
        disableLogs
      );

      return Object.assign({}, data, userStorageData);
    } catch (err) {
      // if no data found
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.USER_STORAGE_SERVICE_GET_FAILED, {
          file,
          userId,
          error: err
        }),
        disableLogs
      );
    }
  },

  /**
   * If UserStorageService is provided and variation was stored, save the assigned variation
   *
   * @param {Object} campaign
   * @param {String} variationName
   * @param {String} userId
   *
   * @return {Boolean} - true if found otherwise false
   */
  _saveUserData: function(config, campaign, variationName, userId, metaData, goalIdentifier) {
    let isSaved = false;

    if (!config.userStorageService) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_STORAGE_SERVICE_NOT_CONFIGURED, {
          file
        })
      );
      return isSaved;
    }

    try {
      const properties = {
        userId: userId,
        variationName,
        campaignKey: campaign.key
      };

      if (!DataTypeUtil.isUndefined(goalIdentifier)) {
        properties.goalIdentifier = goalIdentifier;
      }

      if (!DataTypeUtil.isUndefined(metaData)) {
        properties.metaData = metaData;
      }

      config.userStorageService.set(properties);

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SETTING_DATA_USER_STORAGE_SERVICE, {
          file,
          userId,
          campaignKey: campaign.key
        })
      );

      isSaved = true;
    } catch (err) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.USER_STORAGE_SERVICE_SET_FAILED, {
          file,
          userId,
          error: err
        })
      );

      isSaved = false;
    }

    return isSaved;
  },

  /**
   * Evaluate the campaign for whitelisting and store
   * This method would be run only for MEG campaigns
   *
   * @param {Object} config
   * @param {Object} settingsFile
   * @param {Array} campaignList
   * @param {Object} calledCampaign
   * @param {String} userId
   * @param {Object} userStorageData
   * @param {Object} variationTargetingVariables
   * @param {Boolean} isTrackUserAPI
   *
   * @returns {Boolean} - true, if whitelisting/storage is satisfied for any campaign
   */
  _checkForStorageAndWhitelisting(
    config,
    settingsFile,
    groupName,
    campaignList,
    calledCampaign,
    userId,
    userStorageData,
    variationTargetingVariables,
    isTrackUserAPI
  ) {
    let otherCampaignWinner = false;
    campaignList.some(groupCampaign => {
      if (groupCampaign.id === calledCampaign.id) {
        return;
      }
      // create a local copy of the campaigns
      // groupCampaign = FunctionUtil.cloneObject(groupCampaign);
      // checking other campaigns for whitelisting or user storage.
      const whitelistedVariation = DecisionUtil._checkForWhitelisting(
        groupCampaign,
        groupCampaign.key,
        userId,
        variationTargetingVariables
      );
      if (whitelistedVariation) {
        // other campaign satisfy the whitelisting
        otherCampaignWinner = true;
        logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.OTHER_CAMPAIGN_SATISFIES_WHITELISTING_STORAGE, {
            file,
            campaignKey: groupCampaign.key,
            groupName,
            userId,
            type: 'whitelisting'
          })
        );
        return true;
      }
      const storedVariation = DecisionUtil._checkForUserStorage(
        config,
        settingsFile,
        groupCampaign,
        groupCampaign.key,
        userId,
        userStorageData,
        isTrackUserAPI
      );
      if (storedVariation && DataTypeUtil.isObject(storedVariation) && Object.keys(storedVariation).length > 0) {
        // other campaign sastisfy the user storage
        otherCampaignWinner = true;
        logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.OTHER_CAMPAIGN_SATISFIES_WHITELISTING_STORAGE, {
            file,
            campaignKey: groupCampaign.key,
            groupName,
            userId,
            type: 'user storage'
          })
        );
        return true;
      }
    });
    return otherCampaignWinner;
  },

  /**
   * Evaluate a campaign for pre-segmentation.
   *
   * @param {Object} campaign
   * @param {String} campaignKey
   * @param {String} userId
   * @param {Object} customVariables
   * @param {Object} decision
   *
   * @returns {Boolean} true, if the pre-segmentation is satisfied.
   */
  _checkForPreSegmentation: (campaign, campaignKey, userId, customVariables, decision) => {
    let status;
    if (DataTypeUtil.isObject(campaign.segments) && !Object.keys(campaign.segments).length) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
          campaignKey,
          userId,
          file
        }),
        !decision
      );
      return true;
    } else {
      const preSegmentationResult = SegmentEvaluator(
        campaign.segments,
        customVariables,
        campaignKey,
        userId,
        !decision
      );
      if (!preSegmentationResult) {
        status = StatusEnum.FAILED;
      } else {
        status = StatusEnum.PASSED;
      }

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SEGMENTATION_STATUS, {
          campaignKey,
          userId,
          customVariables: JSON.stringify(customVariables || {}),
          file,
          status,
          segmentationType: SegmentationTypeEnum.PRE_SEGMENTATION,
          variation: ''
        }),
        !decision
      );

      if (status === StatusEnum.FAILED) {
        return false;
      } else {
        return true;
      }
    }
  },

  /**
   * Check if user is eligible for the camapign based on traffic percentage and assign variation.
   * @param {Object} config
   * @param {Object} campaign
   * @param {String} campaignKey
   * @param {String} userId
   * @param {Object} metaData
   * @param {String} newGoalIdentifier
   * @param {Object} decision
   * @returns {Object} variation assigned to the user
   */
  evaluateTrafficAndGetVariation(config, campaign, campaignKey, userId, metaData, newGoalIdentifier, decision) {
    let variation, variationName, variationId;
    // Use our core's VariationDecider utility to get the deterministic variation assigned to the userId for that campaign
    ({ variation, variationName, variationId } = VariationDecider.getVariationAllotted(userId, campaign));

    logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_VARIATION_ALLOCATION_STATUS, {
        file,
        campaignKey,
        userId,
        status: variationName ? `got variation:${variationName}` : 'did not get any variation'
      })
    );

    // Check if variation-name has been assigned to the userId. If not, return no variation
    if (variationName) {
      // If userStorageService is provided, look into it for the saved variation for the campaign and userId
      DecisionUtil._saveUserData(config, campaign, variationName, userId, metaData, newGoalIdentifier);
    }

    // Executing the callback when SDK makes the decision
    HooksManager.execute(
      Object.assign(
        {
          fromUserStorageService: false,
          isUserWhitelisted: false
        },
        campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT
          ? {
              isFeatureEnabled: !!variationName
            }
          : {
              variationName,
              variationId
            },
        decision
      )
    );

    return {
      variation: variation && variation.variation,
      variationName,
      variationId
    };
  },

  /**
   * Evaluate a campaign for whitelisting
   *
   * @param {Object} campaign
   * @param {String} campaignKey
   * @param {String} userId
   * @param {Object} variationTargetingVariables
   * @param {Object} decision
   *
   * @returns {Object} whitelisted variation
   */
  _checkForWhitelisting: (campaign, campaignKey, userId, variationTargetingVariables, decision) => {
    let status;
    let variationName, variationId;
    if (campaign.isForcedVariationEnabled) {
      let whitelistingResult = DecisionUtil._evaluateWhitelisting(
        campaign,
        campaignKey,
        userId,
        variationTargetingVariables,
        !decision
      );
      let variationString;
      if (whitelistingResult) {
        status = StatusEnum.PASSED;
        variationString = whitelistingResult.variationName;
      } else {
        status = StatusEnum.FAILED;
        variationString = '';
      }

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SEGMENTATION_STATUS, {
          campaignKey,
          userId,
          customVariables: JSON.stringify(variationTargetingVariables),
          file,
          status,
          segmentationType: SegmentationTypeEnum.WHITELISTING,
          variation: campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT ? '' : `for variation: ${variationString}`
        }),
        !decision
      );

      if (whitelistingResult) {
        variationName = whitelistingResult.variationName;
        variationId = whitelistingResult.variationId;
        // Executing the callback when SDK has made a decision in case of whitelisting
        if (decision) {
          HooksManager.execute(
            Object.assign(
              {
                fromUserStorageService: false,
                isUserWhitelisted: !!variationName
              },
              campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT
                ? {
                    isFeatureEnabled: !!variationName
                  }
                : {
                    variationName,
                    variationId
                  },
              decision
            )
          );
        }
        return whitelistingResult;
      }
    } else {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.WHITELISTING_SKIPPED, {
          campaignKey,
          userId,
          file
        }),
        !decision
      );
    }
  },

  /**
   * Check if the variation is present in the user storage
   *
   * @param {Object} config
   * @param {Object} settingsFile
   * @param {Object} campaign
   * @param {String} campaignKey
   * @param {String} userId
   * @param {Object} userStorageData
   * @param {Boolean} isTrackUserAPI
   * @param {Object} decision
   *
   * @returns {Object} stored variaition
   */
  _checkForUserStorage: (
    config,
    settingsFile,
    campaign,
    campaignKey,
    userId,
    userStorageData,
    isTrackUserAPI,
    decision
  ) => {
    let variationName, variationId;
    let storedVariation, goalIdentifier;
    // If userStorageService is used, get the variation from the stored data
    ({ storedVariation, goalIdentifier } =
      DecisionUtil._getStoredVariationAndGoalIdentifiers(
        config,
        settingsFile,
        campaign.key,
        userId,
        userStorageData,
        !decision
      ) || {});

    // If stored variation is found, simply return the same
    if (storedVariation) {
      variationName = storedVariation.name;
      variationId = storedVariation.id;

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_STORED_VARIATION, {
          file,
          campaignKey,
          userId,
          variationName: storedVariation.name
        }),
        !decision
      );

      // Executing the callback when SDK gets the decision from user storage service
      if (decision) {
        HooksManager.execute(
          Object.assign(
            {
              fromUserStorageService: !!variationName,
              isUserWhitelisted: false
            },
            campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT
              ? {
                  isFeatureEnabled: !!variationName
                }
              : {
                  variationName,
                  variationId
                },
            decision
          )
        );
      }

      return {
        variation: storedVariation,
        variationName: storedVariation.name,
        variationId: storedVariation.id,
        storedGoalIdentifier: goalIdentifier,
        isStoredVariation: true
      };
    } else if (
      !DataTypeUtil.isUndefined(config.userStorageService) &&
      !isTrackUserAPI &&
      DataTypeUtil.isUndefined(storedVariation)
    ) {
      logger.log(
        LogLevelEnum.WARN,
        LogMessageUtil.build(LogMessageEnum.WARNING_MESSAGES.CAMPAIGN_NOT_ACTIVATED, {
          file,
          campaignKey,
          userId,
          api: config.apiName
        }),
        !decision
      );

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CAMPAIGN_NOT_ACTIVATED, {
          file,
          campaignKey,
          userId,
          reason: config.apiName === ApiEnum.TRACK ? 'track it' : 'get the decision/value'
        }),
        !decision
      );
      return {};
    }
  },

  /**
   * Evaluate the list of campaigns for pre-segmentation and campaign traffic allocation and assign variation to the user.
   * This method will be used for MEG campaigns
   *
   * @param {Object} config
   * @param {Array} campaignList
   * @param {String} userId
   * @param {Object} customVariables
   * @param {Object} metaData
   * @param {String} newGoalIdentifier
   *
   * @returns {Array} list of campaigns which satisfies the conditions.
   */
  getEligbleCampaigns(campaignList, userId, customVariables) {
    let eligibleCampaigns = [];
    let inEligibleCampaigns = [];

    campaignList.forEach(groupCampaign => {
      const isPartOfCampaign =
        DecisionUtil._checkForPreSegmentation(groupCampaign, groupCampaign.key, userId, customVariables) &&
        BucketingService.isUserPartOfCampaign(userId, groupCampaign, true);
      if (isPartOfCampaign) {
        groupCampaign = FunctionUtil.cloneObject(groupCampaign);
        // campaign satisfies the pre-segmentation
        eligibleCampaigns.push(groupCampaign);
      } else {
        inEligibleCampaigns.push(groupCampaign);
      }
    });

    return {
      eligibleCampaigns,
      inEligibleCampaigns
    };
  },

  /**
   * Equally distribute the traffic of campaigns and assign a winner campaign by murmur hash.
   *
   * @param {Object} config
   * @param {Object} calledCampaign
   * @param {Array} shortlistedCampaigns
   * @param {String} userId
   * @param {Object} metaData
   * @param {String} newGoalIdentifier
   * @param {Object} decision
   *
   * @returns {Object} variation of the winner campaign
   */
  _normalizeAndFindWinningCampaign(
    config,
    calledCampaign,
    shortlistedCampaigns,
    userId,
    groupName,
    groupId,
    metaData,
    newGoalIdentifier,
    decision
  ) {
    // normalise the weights of all the shortlisted campaigns
    shortlistedCampaigns.forEach(campaign => {
      campaign.weight = Math.floor(100 / shortlistedCampaigns.length);
    });

    // re-distribute the traffic for each camapign
    CampaignUtil.setCampaignAllocation(shortlistedCampaigns);

    let winnerCampaign = BucketingService._getVariation(
      shortlistedCampaigns,
      BucketingService.calculateBucketValue(CampaignUtil.getBucketingSeed(userId, undefined, groupId))
    );

    logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.MEG_GOT_WINNER_CAMPAIGN, {
        userId,
        groupName,
        file,
        campaignKey: winnerCampaign.key
      })
    );

    if (winnerCampaign.id === calledCampaign.id) {
      // if called campaign is the winner campaign, get the variation for the campaign
      return DecisionUtil.evaluateTrafficAndGetVariation(
        config,
        winnerCampaign,
        winnerCampaign.key,
        userId,
        metaData,
        newGoalIdentifier,
        decision
      );
    } else {
      // if winning campaign not the called camapaign, return
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.MEG_CALLED_CAMPAIGN_NOT_WINNER, {
          userId,
          groupName,
          file,
          campaignKey: calledCampaign.key
        })
      );
      return {};
    }
  }
};

module.exports = DecisionUtil;
