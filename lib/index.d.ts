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

declare module 'vwo-node-sdk' {
  /** Fetches the latest settings file from the VWO servers.
   *
   * @param accountId   AccountId associated with the VWO account.
   * @param apiKey      apiKey of the project whose settigns are to be fetched.
   *
   * @returns           Settings file.
   */
  export function getSettingsFile(accountId: string, apiKey: string, userStorageService?: VWOUserStorageConfig): Promise<object>;

  /**
   * Creates an instance of the VWO
   *
   * This instance can then be used to call other APIs.
   * @param launchConfig    Launch configuration settings.
   *
   * @returns               The VWO instance.
   */
  export function launch(launchConfig: VWOLaunchConfig): vwoInstance;
  export function launch(launchConfig: VWOAsyncLaunchConfig): vwoAsyncInstance;

  /**
   * APIs offered by the VWO fullstack which can be accessed using the VWO instance.
   */
  export interface vwoInstance {
    /**
     * This API method: Gets the variation assigned for the user for the campaign and send the metrics to VWO server
     *
     * @param campaignKey       unique campaign key specified in VWO app
     * @param userId            ID assigned to a user
     * @param options           VWOApiOptions optional params - customVariables, variationTargetingVariables, metaData, shouldTrackReturningUser, userStorageData
     *
     * @returns                 If variation is assigned then variation-name otherwise null in case of user not becoming part
     */
    activate(campaignKey: string, userId: string, options?: VWOApiOptions): string | null;

    /**
     * This API method: Gets the variation assigned for the user for the campaign.
     *
     * @param campaignKey       unique campaign key specified in VWO app
     * @param userId            ID assigned to a user
     * @param options           VWOApiOptions optional params - customVariables, variationTargetingVariables, metaData, userStorageData
     *
     * @returns                 If variation is assigned then variation-name otherwise null in case of user not becoming part
     */
    getVariationName(campaignKey: string, userId: string, options?: VWOApiOptions): string | null;

    /**
     * This API method: Marks the conversion of the campaign for a particular goal.
     *
     * @param campaignSpecifier       campaign keys to track/unique campaignSpecifier. It could be null also.
     * @param userId                  ID assigned to a user
     * @param goalIdentifier          unique campaign's goal identifier which needs to be tracked.
     * @param options                 VWOApiOptions optional params - customVariables, variationTargetingVariables, revenueValue, metaData, shouldTrackReturningUser, userStorageData, goalTypeToTrack
     *
     * @returns                       A dictionary with campaignKey as key and value as true if the goal is tracked, else false.
     */
    track(
      campaignSpecifier: string | Array<String> | null | undefined,
      userId: string,
      goalIdentifier: string,
      options?: VWOTrackGoalOptions
    ): Record<string, boolean>;

    /**
     * This API method checks: Whether a feature is enabled or not for the given user
     *
     * @param campaignKey          Unique key for a campaign
     * @param userId               Unique identifier for the user
     * @param options              VWOApiOptions optional params - customVariables, variationTargetingVariables, metaData, userStorageData, shouldTrackReturningUser
     *
     * @returns                    true if feature enabled, false otherwise
     */
    isFeatureEnabled(campaignKey: string, userId: string, options?: VWOApiOptions): boolean;

    /**
     * This API method: Return the variable for that variation(if Feature Test), otherwise the default values being set in Feature
     *
     * @param campaignKey           Unique key for a campaign
     * @param variableKey           Unique key for a feature's variable
     * @param userId                Unique identifier for the user
     * @param options               VWOApiOptions optional params - customVariables, variationTargetingVariables, metaData, userStorageData
     */
    getFeatureVariableValue(
      campaignKey: string,
      variableKey: string,
      userId: string,
      options?: VWOApiOptions
    ): string | number | boolean | null;

    /**
     * This API method: Pushes the key-value tag pair for a particular user
     *
     * @param tagKey                tag key
     * @param tagValue              tag Value
     * @param userId                ID assigned to a user
     *
     * @returns                     true if request is pushed to eventQueue, false if params are invalid or settings file is unavailable
     */
    push(tagKey: string, tagValue: string, userId: string): boolean;

     /**
     * This API method: Opt-out the user from VWO i.e APIs exposed on vwoInstance will not work anymore
     */
    setOptOut(): boolean;

    /**
     * This API method: Pushes the key-value tag pair for a particular user
     *
     * @param customDimensionMap    A Map containing multiple Sustom Dimensions
     * @param userId                ID assigned to a user
     *
     * @returns                     true if request is pushed to eventQueue, false if params are invalid or settings file is unavailable
     */
    push(customDimensionMap: Record<string, string>, userId: string): boolean;

    /**
     * Manually flush impression events to VWO which are queued in batch queue as per batchEvents config
     *
     * @returns                     A dictionary with message and status.
     */
    flushEvents(): Promise<Record<string, any>>;

    /**
     * Fetch latest settings-file and update so that vwoClientInstance could use latest settings
     * Helpful especially when using webhooks
     *
     * @param accountId             AccountId associated with the VWO account.
     * @param apiKey                apiKey of the project whose settigns are to be fetched.
     */
    getAndUpdateSettingsFile(accountId?: string, apiKey?: string): Promise<object>;
  }

  export interface vwoAsyncInstance {
    /**
     * This API method: Gets the variation assigned for the user for the campaign and send the metrics to VWO server
     *
     * @param campaignKey       unique campaign key specified in VWO app
     * @param userId            ID assigned to a user
     * @param options           VWOApiOptions optional params - customVariables, variationTargetingVariables, metaData, shouldTrackReturningUser, userStorageData
     *
     * @returns                 If variation is assigned then variation-name otherwise null in case of user not becoming part
     */
    activate(campaignKey: string, userId: string, options?: VWOApiOptions): Promise<string | null> | string | null;

    /**
     * This API method: Gets the variation assigned for the user for the campaign.
     *
     * @param campaignKey       unique campaign key specified in VWO app
     * @param userId            ID assigned to a user
     * @param options           VWOApiOptions optional params - customVariables, variationTargetingVariables, metaData, userStorageData
     *
     * @returns                 If variation is assigned then variation-name otherwise null in case of user not becoming part
     */
    getVariationName(campaignKey: string, userId: string, options?: VWOApiOptions): Promise<string | null> | string | null;

    /**
     * This API method: Marks the conversion of the campaign for a particular goal.
     *
     * @param campaignSpecifier       campaign keys to track/unique campaignSpecifier. It could be null also.
     * @param userId                  ID assigned to a user
     * @param goalIdentifier          unique campaign's goal identifier which needs to be tracked.
     * @param options                 VWOApiOptions optional params - customVariables, variationTargetingVariables, revenueValue, metaData, shouldTrackReturningUser, userStorageData, goalTypeToTrack
     *
     * @returns                       A dictionary with campaignKey as key and value as true if the goal is tracked, else false.
     */
    track(
      campaignSpecifier: string | Array<String> | null | undefined,
      userId: string,
      goalIdentifier: string,
      options?: VWOTrackGoalOptions
    ): Promise<Record<string, boolean>> | Record<string, boolean>;

    /**
     * This API method checks: Whether a feature is enabled or not for the given user
     *
     * @param campaignKey          Unique key for a campaign
     * @param userId               Unique identifier for the user
     * @param options              VWOApiOptions optional params - customVariables, variationTargetingVariables, metaData, userStorageData, shouldTrackReturningUser
     *
     * @returns                    true if feature enabled, false otherwise
     */
    isFeatureEnabled(campaignKey: string, userId: string, options?: VWOApiOptions): Promise<boolean> | boolean;

    /**
     * This API method: Return the variable for that variation(if Feature Test), otherwise the default values being set in Feature
     *
     * @param campaignKey           Unique key for a campaign
     * @param variableKey           Unique key for a feature's variable
     * @param userId                Unique identifier for the user
     * @param options               VWOApiOptions optional params - customVariables, variationTargetingVariables, metaData, userStorageData
     */
    getFeatureVariableValue(
      campaignKey: string,
      variableKey: string,
      userId: string,
      options?: VWOApiOptions
    ): Promise<string | number | boolean | null> | string | number | boolean | null;

    /**
     * This API method: Pushes the key-value tag pair for a particular user
     *
     * @param tagKey                tag key
     * @param tagValue              tag Value
     * @param userId                ID assigned to a user
     *
     * @returns                     true if request is pushed to eventQueue, false if params are invalid or settings file is unavailable
     */
    push(tagKey: string, tagValue: string, userId: string): Promise<boolean> | boolean;

     /**
     * This API method: Pushes the key-value tag pair for a particular user
     *
     * @param customDimensionMap    A Map containing multiple Sustom Dimensions
     * @param userId                ID assigned to a user
     *
     * @returns                     true if request is pushed to eventQueue, false if params are invalid or settings file is unavailable
     */
    push(customDimensionMap: Record<string, string>, userId: string): Promise<boolean> | boolean;


    /**
     * This API method: Opt-out the user from VWO i.e APIs exposed on vwoInstance will not work anymore
     */
    setOptOut(): Promise<boolean> | boolean;

    /**
     * Manually flush impression events to VWO which are queued in batch queue as per batchEvents config
     *
     * @returns                     A dictionary with message and status.
     */
    flushEvents(): Promise<Record<string, any>>;

    /**
     * Fetch latest settings-file and update so that vwoClientInstance could use latest settings
     * Helpful especially when using webhooks
     *
     * @param accountId             AccountId associated with the VWO account.
     * @param apiKey                apiKey of the project whose settings needs to be fetched.
     */
    getAndUpdateSettingsFile(accountId?: string, apiKey?: string): Promise<object>;
  }

  /**
   * An object that containing the function which can be implemented to display custom logs.
   */
  export interface VWOLog {
    /**
     * A fucntion which can be implemented to display the custom logs.
     * @param level           Level describes the type of the log set while creating VWO instance.
     * @param message         Message to be displayed in the log.
     */
    log(level: any, message: string): void;
  }

  /**
   * The level determines the type of the log to be displayed.
   */
  export const enum LogLevelEnum {
    /**
     * display NOTSET logs.
     */
    NOTSET = 0,
    /**
     * display DEBUG logs.
     */
    DEBUG = 1,
    /**
     * display INFO logs.
     */
    INFO = 2,
    /**
     * display WARN logs.
     */
    WARN = 3,
    /**
     * display ERROR logs.
     */
    ERROR = 4
  }

  /**
   * GoalType determines the type of the goal to be tracked.
   */
  export const enum GoalTypeEnum {
    /**
     * Tracks only revenue goals.
     */
    REVENUE = 'REVENUE_TRACKING',

    /**
     * Tracks only custom goals.
     */
    CUSTOM = 'CUSTOM_GOAL',

    /**
     * Tracks both revenue and custom goals.
     */
    ALL = 'ALL'
  }

  /**
   * An object which allows to set the custom properties for the VWO logger at the time of VWO instantiation.
   */
  export interface VWOLogger {
    /**
     * An object to display custom logs
     */
    logger?: VWOLog;

    /**
     * Type/Level of the logs to be displayed.
     */
    level?: LogLevelEnum;
  }

  /**
   * VWO initialization configurations.
   */
  interface VWOBaseLaunchConfig {
    /**
     * settings file obtained from the getSettingsFile Function.
     */
    settingsFile: object;

    /**
     * Flag determining whether the tracking data to be sent to VWO servers.
     */
    isDevelopmentMode?: boolean;

    /**
     * Flag determining  whether the returning user should be tracked again or not.
     */
    shouldTrackReturningUser?: boolean;

    /**
     * Interval at which the settings file should be fetched again.
     */
    pollingInterval?: number;

    /**
     * An object describing the level of the logs to be displayed and the callback to display custom logs.
     */
    logging?: VWOLogger;

    /**
     * An object describing the event batching configs.
     */
    batchEvents?: VWOBatchConfig;

    /**
     * An object containing the callback for get and set method of UserStorage.
     */
    userStorageService?: VWOUserStorageConfig;

    /**
     * Type of the goal to be tracked.
     */
    goalTypeToTrack?: GoalTypeEnum;

    /**
     * This is equivalent to apiKey.
     *
     * This key should be passed along with pollingInterval to fetch settigns file at regular intervals.
     */
    sdkKey?: string;
  }

  // For synchronous code
  export interface VWOLaunchConfig extends VWOBaseLaunchConfig {}

  // For asynchronous code
  export interface VWOAsyncLaunchConfig extends VWOBaseLaunchConfig {
    /**
     * If APIs need to return promise instead of value
     * Refer the section "Promises and async" in the docs
     * For example: https://developers.vwo.com/docs/nodejs-activate#promises-and-async
     */
    returnPromiseFor: VWOAsyncConfig;
  }


  /**
   * Event batching configuration to be passed at the time of VWO instantiation.
   */
  export interface VWOBatchConfig {
    /**
     * Time interval at which the event batching queue should be flushed and data in the queue is synced with VWO servers.
     */
    requestTimeInterval?: number;

    /**
     * Number of events after which the event batching queue should be flushed and data in the queue is synced with VWO servers.
     */
    eventsPerRequest?: number;

    /**
     * Callback triggered as soon as the event batching queue is flushed and data is synced with VWO servers.
     */
    flushCallback?: Function;
  }

  /**
   * Storage config and functions to be passed at the time of VWO instantiation.
   */
  export interface VWOUserStorageConfig {
    /**
     * Get the User Variation mapping.
     * @param userId              Unique identifier of the user.
     * @param campaignKey         Unique campaign key specified in VWO app
     *
     * @returns                   Variation mapping.
     */
    get(userId: string, campaignKey: string): Record<string, any>;

    /**
     * Save the assigned variation.
     * @param userStorageData     Variation mapping.
     */
    set(userStorageData: Record<string, any>): void;

    /**
     * Get the stored VWO settings
     */
    getSettings?(): string;
    /**
     * Store the VWO settings into storage(Web)
     * @param settings VWO settings
     */
    setSettings?(settings: string): void;
  }

  /**
   * Track Configuration options passed in the track API.
   */
  export interface VWOTrackGoalOptions extends VWOApiOptions {
    /**
     * Revenue value.
     */
    revenueValue?: number;

    /**
     * Type of the goal to be tracked.
     */
    goalTypeToTrack?: GoalTypeEnum;
  }

  export interface VWOAsyncConfig {
    // If you want only specific APIs to return the promise, configure only them
    activate?: boolean,
    getVariationName?: boolean,
    track?: boolean,
    isFeatureEnabled?: boolean,
    getFeatureVariableValue?: boolean,
    push?: boolean,

    // If you want all the above APIs to return promise or not, only configure the below key
    // By default, all APIs simply return a value without waiting for any asycnhornous call originating from specific APIs
    all?: boolean
  }

  /**
   * API configuration options passed in the activate, getVariationName, track, isFeatureEnabled, getFeatureVariableValue
   */
  export interface VWOApiOptions {
    /**
     * Custom variables for segmentation.
     */
    customVariables?: Record<string, any>;

    /**
     * variation targeting variables for whitelisting.
     */
    variationTargetingVariables?: Record<string, any>;

    /**
     * Flag determining  whether returning user should be tracked again or not.
     */
    shouldTrackReturningUser?: boolean;

    /**
     * Pass meta information from APIs to the User Storage Service's set method.
     */
    metaData?: Record<string, any>;

    /**
     * An object for utilizing already fetched storage data.
     *
     * It also helps in implementing the asynchronous nature of the User Storage Service's 'get' method
     */
    userStorageData?: object;
  }
}
