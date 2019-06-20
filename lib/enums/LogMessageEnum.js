module.exports = {
  DEBUG_MESSAGES: {
    VALID_CONFIGURATION: '({file}): SDK configuration and account settings are valid.',
    CUSTOM_LOGGER_USED: '({file}): Custom logger used',
    SDK_INITIALIZED: '({file}): SDK properly initialzed',
    SETTINGS_FILE_PROCESSED: '({file}): Settings file processed',
    NO_STORED_VARIATION:
      '({file}): No stored variation for UserId:{userId} of Campaign:{campaignId} found in UserProfileService',
    NO_USER_PROFILE_SERVICE_LOOKUP: '({file}): No UserProfileService to look for stored data',
    NO_USER_PROFILE_SERVICE_SAVE: '({file}): No UserProfileService to save data',
    GETTING_STORED_VARIATION:
      '({file}): Got stored variation for UserId:{userId} of Campaign:{campaignId} as Variation: {variationId}, found in UserProfileService',
    CHECK_USER_ELIGIBILITY_FOR_CAMPAIGN:
      '({file}): campaign:{campaignId} having traffic allocation:{trafficAllocation} assigned value:{trafficAllocation} to userId:{userId}',
    USER_HASH_BUCKET_VALUE: '({file}): userId:{userId} having hash:{hashValue} got bucketValue:{bucketValue}',
    VARIATION_HASH_BUCKET_VALUE:
      '({file}): userId:{userId} for campaign:{campaignId} having percent traffic:{percentTraffic} got hash-value:{hashValue} and bucket value:{bucketValue}',
    GOT_VARIATION_FOR_USER:
      '({file}): userId:{userId} for campaign:{campaignId} got variationId:{variationId} inside method:{method}',
    USER_NOT_PART_OF_CAMPAIGN:
      '({file}): userId:{userId} for campaign:{campaignId} did not become part of campaign, method:{method}',
    UUID_FOR_USER: '({file}): Uuid generated for userId:{userOd} and accountId:{accountId} is {desiredUuid}',
    IMPRESSION_FOR_TRACK_USER: '({file}): impression infor for track-user: {properties}',
    IMPRESSION_FOR_TRACK_GOAL: '({file}): impression infor for track-goal: {properties}'
  },
  INFO_MESSAGES: {
    LOG_LEVEL_SET: '({file}): Log level set to {level}',
    SET_COLORED_LOG: '({file}): Colored log set to {value}',
    VARIATION_RANGE_ALLOCATION:
      '({file}): Campaign:{campaignId} having variation:{variationId} with weight:{variationWeight} got range as: ( {start} - {end} ))',
    VARIATION_ALLOCATED: '({file}): UserId:{userId} of Campaign:{campaignId} got variation: {variationId}',
    LOOKING_UP_USER_PROFILE_SERVICE: '({file}): Looked into UserProfileService for userId:{userId} successful',
    SAVING_DATA_USER_PROFILE_SERVICE: '({file}): Saving into UserProfileService for userId:{userId} successful',
    GOT_STORED_VARIATION:
      '({file}): Got stored variation:{variationId} of campaign:{campaignId} for userId:{userId} from UserProfileService',
    NO_VARIATION_ALLOCATED: '({file}): UserId:{userId} of Campaign:{campaignId} did not get any variation',
    USER_ELIGIBILITY_FOR_CAMPAIGN: '({file}): Is userId:{userId} part of campaign? {isUserPart}',
    AUDIENCE_CONDITION_NOT_MET:
      '({file}): userId:{userId} does not become part of campaign because of not meeting audience conditions',
    GOT_VARIATION_FOR_USER: '({file}): userId:{userId} for campaign:{campaignId} got variationId:{variationId}',
    USER_GOT_NO_VARIATION: '({file}): userId:{userId} for campaign:{campaignId} did not allot any variation',
    IMPRESSION_SUCCESS: '({file}): Event sent to VWO - {endPoint}',
    INVALID_VARIATION_KEY: '({file}): Variation was not assigned to userId:{userId} for campaign:{campaignId}'
  },
  WARNING_MESSAGES: {},
  ERROR_MESSAGES: {
    INVALID_CONFIGURATION: '({file}): SDK configuration or account settings or both is/are not valid.',
    SETTINGS_FILE_CORRUPTED: '({file}): Settings file is corrupted. Please contact VWO Support for help.',
    ACTIVATE_API_MISSING_PARAMS:
      '({file}): "activate" API got bad parameters. It expects expId as first and userId as second argument',
    ACTIVATE_API_CONFIG_CORRUPTED: '({file}): "activate" API has corrupted configuration',
    CAMPAIGN_NOT_RUNNING: '({file}): Campaign:{campaignId} is not RUNNING. Please verify from VWO App',
    LOOK_UP_USER_PROFILE_SERVICE_FAILED: '({file}): Looking data from UserProfileService failed for userId:{userId}',
    SAVE_USER_PROFILE_SERVICE_FAILED: '({file}): Saving data into UserProfileService failed for userId:{userId}',
    INVALID_CAMPAIGN: '({file}): Invalid campaign passed to {method} of this file',
    INVALID_USER_ID: '({file}): Invalid userId:{userId} passed to {method} of this file',
    IMPRESSION_FAILED: '({file}): Event could not be sent to VWO - {endPoint}'
  }
};
