/**
 * Copyright 2019 Wingify Software Pvt. Ltd.
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

module.exports = {
  DEBUG_MESSAGES: {
    CHECK_USER_ELIGIBILITY_FOR_CAMPAIGN:
      '({file}): campaign:{campaignKey} having traffic allocation:{trafficAllocation} assigned value:{trafficAllocation} to User ID:{userId}',
    CUSTOM_LOGGER_USED: '({file}): Custom logger used',
    FEATURE_FLAG_NOT_LINKED: '({file}): Feature:{campaignKey} is not linked to any running campaigns',
    GETTING_STORED_VARIATION:
      '({file}): Got stored variation for User ID:{userId} of Campaign:{campaignKey} as Variation: {variationName}, found in UserStorageService',
    GOT_FROM_CACHE: '({file}): Got data from cache for the finalKey:{finalKey}',
    GOT_VARIATION_FOR_USER:
      '({file}): User ID:{userId} for campaign:{campaignKey} got variationName:{variationName} inside method:{method}',
    IMPRESSION_FOR_TRACK_GOAL: '({file}): impression built for track-goal - {properties}',
    IMPRESSION_FOR_TRACK_USER: '({file}): impression built for track-user - {properties}',
    IMPRESSION_FOR_PUSH: '({file}): impression built for pushing - {properties}',
    LOG_LEVEL_SET: '({file}): Log level set to {level}',
    NO_STORED_VARIATION:
      '({file}): No stored variation for User ID:{userId} for Campaign:{campaignKey} found in UserStorageService',
    NO_USER_STORAGE_SERVICE_GET: '({file}): No UserStorageService to look for stored data',
    NO_USER_STORAGE_SERVICE_SET: '({file}): No UserStorageService to save data',
    REMOVE_FROM_CACHE: '({file}): Removed data from cache for the finalKey:{finalKey}',
    RESET_CACHE: '({file}): Cache Reset on VWO instantiation',
    SDK_INITIALIZED: '({file}): SDK properly initialzed',
    SET_COLORED_LOG: '({file}): Colored log set to {value}',
    SET_DEVELOPMENT_MODE: '({file}): DEVELOPMENT mode is ON',
    SET_IN_CACHE: '({file}): Set data in cache for the finalKey:{finalKey}',
    SETTINGS_FILE_PROCESSED: '({file}): Settings file processed',
    USER_HASH_BUCKET_VALUE: '({file}): User ID:{userId} having hash:{hashValue} got bucketValue:{bucketValue}',
    USER_NOT_PART_OF_CAMPAIGN:
      '({file}): userId:{userId} for campaign:{campaignKey} did not become part of campaign, method:{method}',
    UUID_FOR_USER: '({file}): Uuid generated for User ID:{userOd} and accountId:{accountId} is {desiredUuid}',
    VALID_CONFIGURATION: '({file}): SDK configuration and account settings are valid.',
    VARIATION_HASH_BUCKET_VALUE:
      '({file}): User ID:{userId} for campaign:{campaignKey} having percent traffic:{percentTraffic} got hash-value:{hashValue} and bucket value:{bucketValue}',
    SEGMENTATION_SKIPPED:
      '({file}): For userId:{userId} of campaign:{campaignKey}, segment was missing, hence skipping segmentation{variation}',
    SEGMENTATION_STATUS:
      '({file}): For userId:{userId} of campaign:{campaignKey} with variables:{customVariables} {status} {segmentationType} {variation}',
    WHITELISTING_SKIPPED: '({file}): For userId:{userId} of campaign:{campaignKey}, whitelisting was skipped'
  },
  INFO_MESSAGES: {
    FEATURE_ENABLED_FOR_USER: `({file}): Campaign having campaign-key:{campaignKey} for user ID:{userId} is enabled`,
    FEATURE_NOT_ENABLED_FOR_USER: `({file}): Campaign having campaign-key:{campaignKey} for user ID:{userId} is not enabled`,
    GOT_STORED_VARIATION:
      '({file}): Got stored variation:{variationName} of campaign:{campaignKey} for User ID:{userId} from UserStorageService',
    GOT_VARIATION_FOR_USER: '({file}): User ID:{userId} for campaign:{campaignKey} got variationName:{variationName}',
    IMPRESSION_SUCCESS:
      '({file}): Impression event - {endPoint} was successfully received by VWO having main keys: accountId:{accountId}, User ID:{userId}, campaignId:{campaignId} and variationId:{variationId}',
    INVALID_VARIATION_KEY: '({file}): Variation was not assigned to User ID:{userId} for campaign:{campaignKey}',
    LOOKING_UP_USER_PROFILE_SERVICE: '({file}): Looked into UserStorageService for User ID:{userId} successful',
    NO_VARIATION_ALLOCATED: '({file}): User ID:{userId} of Campaign:{campaignKey} did not get any variation',
    RETRY_FAILED_IMPRESSION_AFTER_DELAY:
      '({file}): Failed impression event for {endPoint} will be retried after {retryTimeout} milliseconds delay',
    SAVING_DATA_USER_PROFILE_SERVICE: '({file}): Saving into UserStorageService for User ID:{userId} successful',
    USER_ELIGIBILITY_FOR_CAMPAIGN: '({file}): Is User ID:{userId} part of campaign? {isUserPart}',
    USER_GOT_NO_VARIATION: '({file}): User ID:{userId} for campaign:{campaignKey} did not allot any variation',
    USER_RECEIVED_DEFAULT_VARIABLE_VALUE:
      '({file}): User:{userId} is not in any variation or rollout rule. Returning default value for variable:{variableKey} of feature flag:{campaignKey}',
    USER_RECEIVED_VARIABLE_VALUE: `({file}): Value for variable:{variableKey} of feature flag:{campaignKey} is:{variableValue} for user:{userId}`,
    VARIABLE_NOT_USED_RETURN_DEFAULT_VARIABLE_VALUE: `({file}): Variable:{variableKey} is not used in variation:{variationName}. Returning default value`,
    VARIATION_ALLOCATED: '({file}): User ID:{userId} of Campaign:{campaignKey} got variation: {variationName}',
    VARIATION_RANGE_ALLOCATION:
      '({file}): Campaign:{campaignKey} having variations:{variationName} with weight:{variationWeight} got range as: ( {start} - {end} ))',
    SEGMENTATION_STATUS:
      '({file}): UserId:{userId} of campaign:{campaignKey} with variables:{customVariables} {status} {segmentationType} {variation}'
  },
  WARNING_MESSAGES: {},
  ERROR_MESSAGES: {
    ACTIVATE_API_CONFIG_CORRUPTED: '({file}): "activate" API has corrupted configuration',
    ACTIVATE_API_MISSING_PARAMS:
      '({file}): "activate" API got bad parameters. It expects campaignKey(String) as first, userId(String) as second and options(optional Object) as third argument',
    CAMPAIGN_NOT_RUNNING:
      '({file}): API used:{api} - Campaign:{campaignKey} is not RUNNING. Please verify from VWO App',
    FEATURE_FLAG_NOT_FOUND: '({file}): Feature: {campaignKey} not found in settingsFile',
    GET_FEATURE_VARIABLE_CONFIG_CORRUPTED: '({file}): "getFeatureVariableValue" API has corrupted configuration',
    GET_FEATURE_VARIABLE_MISSING_PARAMS: `({file}): "getFeatureVariableValue" API got bad parameters. It expects campaignKey(String) as first, variableKey(String) as second, userId(String) as third, and options(optional Object) as fourth argument`,
    GET_VARIATION_API_CONFIG_CORRUPTED: '({file}): "getVariation" API has corrupted configuration',
    GET_VARIATION_API_MISSING_PARAMS:
      '({file}): "getVariation" API got bad parameters. It expects campaignKey(String) as first, userId(String) as second and options(optional Object) as third argument',
    IMPRESSION_FAILED: '({file}): Impression event could not be sent to VWO - {endPoint}. Reason: {err}',
    INVALID_CAMPAIGN: '({file}): Invalid campaign passed to {method} of this file',
    INVALID_CONFIGURATION: '({file}): SDK configuration or account settings or both is/are not valid.',
    IS_FEATURE_ENABLED_API_CONFIG_CORRUPTED: '({file}): "isFeatureEnabled" API has corrupted configuration',
    IS_FEATURE_ENABLED_API_MISSING_PARAMS:
      '({file}): "isFeatureEnabled" API got bad parameters. It expects Campaign(String) as first, userId(String) as second and options(optional Object) as third argument',
    LOOK_UP_USER_PROFILE_SERVICE_FAILED: '({file}): Looking data from UserStorageService failed for User ID:{userId}',
    PROJECT_CONFIG_CORRUPTED: '({file}): config passed to launch API is not a valid JSON object.',
    SAVE_USER_PROFILE_SERVICE_FAILED: '({file}): Saving data into UserStorageService failed for User ID:{userId}',
    SETTINGS_FILE_CORRUPTED: '({file}): Settings file is corrupted. Please contact VWO Support for help.',
    TRACK_API_CONFIG_CORRUPTED: '({file}): "track" API has corrupted configuration',
    TRACK_API_MISSING_PARAMS:
      '({file}): "track" API got bad parameters. It expects campaignKey(String) as first, userId(String) as second, goalIdentifier(String/Number) as third and options(optional Object) as fourth argument',
    TRACK_API_VARIATION_NOT_FOUND: '({file}): Variation not found for campaign:{campaignKey} and User ID:{userId}',
    UNABLE_TO_CAST_VALUE: `({file}): Unable to cast value:{variableValue} to type:{variableType}, returning null`,
    FEATURE_TEST_NOT_RUNNING:
      '({file}): API used:{api} - Feature test corresponding to Campaign:{campaignKey} is not RUNNING. Please verify from VWO app.',
    VARIABLE_NOT_FOUND: `({file}): Variable:{variableKey} for User ID:{userId} is not found in settings-file. Returning null`,
    INVALID_API:
      '({file}): {api} API is not valid for campaign: {campaignKey} having campaign type: {campaignType} for User ID: {userId}.',
    TRACK_API_GOAL_NOT_FOUND:
      '({file}): Goal:{goalIdentifier} not found for campaign:{campaignKey} and userId:{userId}',
    TRACK_API_REVENUE_NOT_PASSED_FOR_REVENUE_GOAL:
      '({file}): Revenue value should be passed for revenue goal:{goalIdentifier} for campaign:{campaignKey} and userId:{userId}',
    PUSH_INVALID_PARAMS:
      '({file}): "{method}" API got bad parameters. It expects tagKey(String) as first, tagValue(String) as second and userId(String) as third argument',
    PUSH_API_CONFIG_CORRUPTED: '({file}): "{method}" API has corrupted configuration',
    TAG_KEY_LENGTH_EXCEEDED: '({file}): Length of tagKey:{tagKey} for userID:{userId} can not be greater than 255',
    TAG_VALUE_LENGTH_EXCEEDED:
      '({file}): Length of value:{tagValue} of tagKey:{tagKey} for userID:{userId} can not be greater than 255',
    REGEX_CREATION_FAILED: '({file}): Regex cound not be processed.',
    SEGMENTATION_ERROR:
      '({file}): Error while segmenting the userId:{userId} of campaignKey:{campaignKey}{variation} with customVariables:{customVariables}. Error message: {err}'
  }
};
