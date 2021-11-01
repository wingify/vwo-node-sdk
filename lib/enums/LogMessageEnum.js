/**
 * Copyright 2019-2021 Wingify Software Pvt. Ltd.
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
    CUSTOM_LOGGER_USED: '({file}): Custom logger used',
    GETTING_STORED_VARIATION:
      '({file}): Got stored variation for User ID:{userId} of Campaign:{campaignKey} as Variation:{variationName}, found in UserStorageService',
    GOT_FROM_CACHE: '({file}): Got data from cache for the finalKey:{finalKey}',
    GOT_VARIATION_FOR_USER:
      '({file}): User ID:{userId} for Campaign:{campaignKey} got variationName:{variationName} inside method:{method}',
    IMPRESSION_FOR_PUSH: '({file}): impression built for pushing - {properties}',
    IMPRESSION_FOR_TRACK_GOAL: '({file}): impression built for track-goal - {properties}',
    IMPRESSION_FOR_TRACK_USER: '({file}): impression built for track-user - {properties}',
    IMPRESSION_FOR_EVENT_ARCH_TRACK_USER:
      '({file}): impression built for vwo_variationShown event for account ID:{a}, user ID:{u}, and campaign ID:{c}',
    IMPRESSION_FOR_EVENT_ARCH_TRACK_GOAL:
      '({file}): impression built for {goalName} event for accountId:{a}, user ID:{u}, and campaign ID:{c}',
    IMPRESSION_FOR_EVENT_ARCH_PUSH:
      '({file}): impression built for visitor property:{property} for accountId:{a} and user ID:{u}',
    LOG_LEVEL_SET: '({file}): Log level set to {level}',
    NO_STORED_VARIATION:
      '({file}): No stored variation for User ID:{userId} for Campaign:{campaignKey} found in UserStorageService',
    NO_USER_STORAGE_SERVICE_GET: '({file}): No UserStorageService to get stored data',
    NO_USER_STORAGE_SERVICE_SET: '({file}): No UserStorageService to set data',
    // REMOVE_FROM_CACHE: '({file}): Removed data from cache for the finalKey:{finalKey}',
    RESET_CACHE: '({file}): Cache Reset on VWO instantiation',
    SDK_INITIALIZED: '({file}): SDK properly initialzed',
    SEGMENTATION_SKIPPED:
      '({file}): For userId:{userId} of Campaign:{campaignKey}, segment was missing, hence skipping segmentation{variation}',
    SEGMENTATION_STATUS:
      '({file}): For userId:{userId} of Campaign:{campaignKey} with variables:{customVariables} {status} {segmentationType} {variation}',
    SET_DEVELOPMENT_MODE: '({file}): DEVELOPMENT mode is ON',
    SET_IN_CACHE: '({file}): Set data in cache for the finalKey:{finalKey}',
    SETTINGS_FILE_PROCESSED: '({file}): Settings file processed',
    USER_HASH_BUCKET_VALUE: '({file}): User ID:{userId} having hash:{hashValue} got bucketValue:{bucketValue}',
    USER_NOT_PART_OF_Campaign:
      '({file}): userId:{userId} for Campaign:{campaignKey} did not become part of campaign, method:{method}',
    UUID_FOR_USER: '({file}): Uuid generated for User ID:{userId} and accountId:{accountId} is {desiredUuid}',
    VALID_CONFIGURATION: '({file}): SDK configuration and account settings are valid',
    VARIATION_HASH_BUCKET_VALUE:
      '({file}): User ID:{userId} for Campaign:{campaignKey} having percent traffic:{percentTraffic} got hash-value:{hashValue} and bucket value:{bucketValue}',
    WHITELISTING_SKIPPED: '({file}): For userId:{userId} of Campaign:{campaignKey}, whitelisting was skipped',
    STARTED_POLLING: '({file}): Polling of settings-file is registered with a periodic interval of {pollingInterval}ms',
    BATCH_EVENT_LIMIT_EXCEEDED:
      '({file}): Impression event - {endPoint} failed due to exceeding payload size. Parameter eventsPerRequest in batchEvents config in launch API has value:{eventsPerRequest} for accountId:{accountId}. Please read the official documentation for knowing the size limits',
    BULK_NOT_PROCESSED:
      "({file}): Batch events couldn't be received by VWO. Calling Flush Callback with error and data",
    BEFORE_FLUSHING:
      '({file}): Flushing events queue {manually} having {length} events for account:{accountId}. {timer}',
    FLUSH_EVENTS: '{{file}}: Manually flushing events for account:{accountId} having {queueLength} events',
    CAMPAIGN_NOT_ACTIVATED:
      '({file}): Campaign:{campaignKey} for User ID:{userId} is not yet activated for API:{api}. Use activate API to activate A/B test or isFeatureEnabled API to activate Feature Test.',
    GOT_ELIGIBLE_CAMPAIGNS:
      '({file}): Campaigns: {eligibleCampaignKeys} are eligible, {inEligibleText} are ineligible from the Group:{groupName} for the User Id:{userId}'
  },
  ERROR_MESSAGES: {
    API_HAS_CORRUPTED_SETTINGS_FILE:
      '({file}): "{api}" API has corrupted settings-file. Please check or reach out to VWO support',
    ACTIVATE_API_MISSING_PARAMS:
      '({file}): "activate" API got bad parameters. It expects campaignKey(String) as first, userId(String) as second and options(optional Object) as third argument',
    CAMPAIGN_NOT_RUNNING:
      '({file}): API used:{api} - Campaign:{campaignKey} is not RUNNING. Please verify from VWO App',
    GET_FEATURE_VARIABLE_MISSING_PARAMS: `({file}): "getFeatureVariableValue" API got bad parameters. It expects campaignKey(String) as first, variableKey(String) as second, userId(String) as third, and options(optional Object) as fourth argument`,
    GET_VARIATION_API_MISSING_PARAMS:
      '({file}): "getVariation" API got bad parameters. It expects campaignKey(String) as first, userId(String) as second and options(optional Object) as third argument',
    IMPRESSION_FAILED: '({file}): Impression event could not be sent to VWO - {endPoint}. Reason: {err}',
    INVALID_API:
      '({file}): {api} API is not valid for Campaign:{campaignKey} of type:{campaignType} for User ID:{userId}',
    INVALID_SETTINGS_FILE: '({file}): Settings-file fetched is not proper',
    IS_FEATURE_ENABLED_API_MISSING_PARAMS:
      '({file}): "isFeatureEnabled" API got bad parameters. It expects Campaign(String) as first, userId(String) as second and options(optional Object) as third argument',
    GET_USER_STORAGE_SERVICE_FAILED: '({file}): Getting data from UserStorageService failed for User ID:{userId}',
    SDK_CONFIG_CORRUPTED: '({file}): config passed to launch API is not a valid JSON object',
    PUSH_INVALID_PARAMS:
      '({file}): "{method}" API got bad parameters. It expects tagKey(String) as first, tagValue(String) as second and userId(String) as third argument',
    PUSH_INVALID_PARAMS_CD_MAP:
      '({file}): "{method}" API got bad parameters. It expects customDimensionMap(String, String) as first and userId(String) as second argument',
    REGEX_CREATION_FAILED: '({file}): Regex cound not be processed',
    SET_USER_STORAGE_SERVICE_FAILED: '({file}): Saving data into UserStorageService failed for User ID:{userId}',
    SEGMENTATION_ERROR:
      '({file}): Error while segmenting the user:{userId} of Campaign:{campaignKey}{variation} with customVariables:{customVariables}. Error message: {err}',
    SETTINGS_FILE_CORRUPTED: '({file}): Settings file is corrupted. Please contact VWO Support for help',
    TAG_KEY_LENGTH_EXCEEDED: '({file}): Length of tagKey:{tagKey} for userID:{userId} can not be greater than 255',
    TAG_VALUE_LENGTH_EXCEEDED:
      '({file}): Length of value:{tagValue} of tagKey:{tagKey} for userID:{userId} can not be greater than 255',
    TRACK_API_GOAL_NOT_FOUND:
      '({file}): Goal:{goalIdentifier} not found for Campaign:{campaignKey} and userId:{userId}',
    TRACK_API_MISSING_PARAMS:
      '({file}): "track" API got bad parameters. It expects campaignKey(String or Array of strings or null or undefined) as first, userId(String) as second, goalIdentifier(String/Number) as third and options(optional Object) as fourth argument',
    TRACK_API_REVENUE_NOT_PASSED_FOR_REVENUE_GOAL:
      '({file}): Revenue value should be passed for revenue goal:{goalIdentifier} for Campaign:{campaignKey} and userId:{userId}',
    UNABLE_TO_CAST_VALUE: `({file}): Unable to cast value:{variableValue} to type:{variableType}, returning null`,
    VARIABLE_NOT_FOUND: `({file}): Variable:{variableKey} for User ID:{userId} is not found in settings-file. Returning null`,
    NO_CAMPAIGN_FOUND: `({file}): No campaign found for goalIdentifier:{goalIdentifier}. Please verify from VWO app.`,
    POLLING_FAILED: '({file}): Failed fetching of Settings-file via polling for the accountId:{accountId}',
    POLLING_INTERVAL_INVALID: '({file}): pollingParameter provided is not of type number',
    SDK_KEY_NOT_PROVIVED: '({file}): sdkKey is required along with pollingInterval to poll the settings-file',
    SDK_KEY_NOT_STRING: '({file}): sdkKey provided is not of type string',
    INVALID_USER_ID: '({file}): Invalid userId:{userId} passed to {method} of this file',
    EVENT_BATCHING_NOT_OBJECT: '({file}): Batch events settings are not of type object',
    NO_BATCH_QUEUE:
      '{{file}}: No batch queue present for account:{accountId} when calling flushEvents API. Check batchEvents config in launch API'
  },
  INFO_MESSAGES: {
    FEATURE_ENABLED_FOR_USER: `({file}): Campaign:{campaignKey} for user ID:{userId} is enabled`,
    FEATURE_NOT_ENABLED_FOR_USER: `({file}): Campaign:{campaignKey} for user ID:{userId} is not enabled`,
    IMPRESSION_SUCCESS:
      '({file}): Impression event - {endPoint} was successfully received by VWO having main keys: accountId:{accountId}, {mainKeys}',
    IMPRESSION_SUCCESS_FOR_EVENT_ARCH:
      '({file}): Impression for {event} - {endPoint} was successfully received by VWO for account ID:{a}',
    INVALID_VARIATION_KEY: '({file}): Variation was not assigned to User ID:{userId} for Campaign:{campaignKey}',
    GETTING_DATA_USER_STORAGE_SERVICE: '({file}): Getting data from UserStorageService for User ID:{userId} successful',
    SETTING_DATA_USER_STORAGE_SERVICE: '({file}): Setting data into UserStorageService for User ID:{userId} successful',
    SEGMENTATION_STATUS:
      '({file}): UserId:{userId} of Campaign:{campaignKey} with variables:{customVariables} {status} {segmentationType} {variation}',
    USER_GOT_NO_VARIATION: '({file}): User ID:{userId} for Campaign:{campaignKey} did not allot any variation',
    USER_RECEIVED_VARIABLE_VALUE: `({file}): Value for variable:{variableKey} of feature flag:{campaignKey} is:{variableValue} for user:{userId}`,
    VARIABLE_NOT_USED_RETURN_DEFAULT_VARIABLE_VALUE: `({file}): Variable:{variableKey} is not used in variation:{variationName}. Returning default value`,
    VARIATION_ALLOCATED: '({file}): User ID:{userId} of Campaign:{campaignKey} got variation:{variationName}',
    NO_VARIATION_ALLOCATED: '({file}): User ID:{userId} of Campaign:{campaignKey} did not get any variation',
    VARIATION_RANGE_ALLOCATION:
      '({file}): Campaign:{campaignKey} having variation:{variationName} with weight:{variationWeight} got range as: ( {start} - {end} ))',
    GOAL_ALREADY_TRACKED:
      '({file}): Goal:{goalIdentifier} of Campaign:{campaignKey} for User ID:{userId} has already been tracked earlier. Skipping now',
    USER_ALREADY_TRACKED:
      '({file}): User ID:{userId} for Campaign:{campaignKey} has already been tracked earlier for "{api}" API. Skipping now',
    POLLING_SUCCESS: '({file}): Settings-file fetched successfully via polling for the accountId:{accountId}',
    SETTINGS_FILE_UPDATED:
      '({file}): vwo-sdk instance is updated with the latest settings-file for the accountId:{accountId}',
    USER_ELIGIBILITY_FOR_CAMPAIGN: '({file}): Is User ID:{userId} part of campaign? {isUserPart}',
    GOT_VARIATION_FOR_USER:
      '({file}): userId:{userId} for campaign:{campaignTestKey} got variationName:{variationName}',
    BULK_IMPRESSION_SUCCESS:
      '({file}): Impression event - {endPoint} was successfully received by VWO having accountId:{a}',
    AFTER_FLUSHING: '({file}): Events queue having {length} events has been flushed {manually}',
    SETTINGS_NOT_UPDATED: '{{file}}: Settings-file fetched are same as earlier fetched settings',
    GOT_STORED_VARIATION:
      '({file}): Got stored variation for User ID:{userId} of Campaign:{campaignKey} as Variation:{variationName}, found in UserStorageService',
    CAMPAIGN_NOT_ACTIVATED: '({file}): Activate the campaign:{campaignKey} for User ID:{userId} to {reason}.',
    GOT_WINNER_CAMPAIGN:
      '({file}): Campaign:{campaignKey} is selected from the mutually exclusive group:{groupName} for the User ID:{userId}.',
    GOT_ELIGIBLE_CAMPAIGNS:
      '({file}): Got {noOfEligibleCampaigns} eligible winners out of {noOfGroupCampaigns} campaigns from the Group:{groupName} and for User ID:{userId}',
    CALLED_CAMPAIGN_NOT_WINNER:
      '({file}): Campaign:{campaignKey} does not qualify from the mutually exclusive group:{groupName} for User ID:{userId}',
    OTHER_CAMPAIGN_SATISFIES_WHITELISTING_STORAGE:
      '({file}): Campaign:{campaignKey} of Group:{groupName} satisfies {type} for User ID:{userId}'
  },
  WARNING_MESSAGES: {}
};
