# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.34.0] - 2022-06-06

- Update `vwo-sdk-log-messages` dependency to reference npm-published version instead of GitHub tag.

## [1.33.0] - 2022-25-02

- Fix `isFeatureEnabled` API to handle various cases related to promise based response as mentioned in [#34](https://github.com/wingify/vwo-node-sdk/issues/34)

## [1.32.3] - 2022-11-02

### Changed

- Fix variable used for settings-file in case of EU Data residency

## [1.32.2] - 2022-10-02

### Changed

- Fix [#34](https://github.com/wingify/vwo-node-sdk/issues/34) - Promise for isFeatureEnabled is not always resolved

## [1.32.1] - 2022-21-01

### Changed

- Fix bundle size of JavaScript SDK by removing node dependencies which got introduced because of previous optimizations in `track` and `push` API.

## [1.32.0] - 2022-20-01

### Changed

- Instead of multiple tracking calls in case of global goals, now one single batch call will be made to track different goals of different campaigns having same goal-identifier.
- Instead of multiple tracking calls in case of pushing more than one custom dimension, now one single batch call will be made to push custom dimension map.

## [1.31.1] - 2022-14-01

### Changed

- Fix using tagged version of vwo-sdk-log-messages repo. `npm install` was failing while `yarn install` was working fine.

## [1.31.0] - 2022-13-01

### Changed

- Integrated VWO SDK Log Messages repo instead of hardcoding messages in every VWO server-side SDK.
- Old logs are revamped. New logs that would help in better debugging are added.

## [1.30.1] - 2022-13-01

### Changed

- Expose `LogLevelEnum` on vwoSDK instead of `vwoSDK.logging`. Fixes #29 and #30.

## [1.30.0] - 2022-11-01

### Changed

- Tracking data for the `Data Residency` enabled VWO accounts will be sent to the configured location
- Update year in all the copyright and liense headers

## [1.29.0] - 2021-12-21

### Changed

- Update `webpack.config.js` to use `globalObject.this` flag to make the distributable library compatible with both client-isde as well as server-side rendering engines like Next.js, etc.

## [1.28.0] - 2021-12-09

### Changed

- In case you want to opt out of tracking by VWO, simply call the `setOptOut` API. This will exclude all the users from any kind of tracking by VWO. This is useful when you just want to make the VWO SDK ineffective without actually removing the associated code.

  `setOptOut` API will also remove unwanted memory footprint by destructing all the instance variables. Calling any other API after this will not be effective i.e. no decision-making or impression would be made to VWO.

  ```javascript
  vwoClientInstance.setOptOut();
  ```

  If you want to opt-in again for tracking by VWO SDK, reinitialize the SDK with the latest settings.

## [1.27.1] - 2021-12-07

### Changed

- Updated `index.d.ts` file with typings related to asynchronous behavior of different APIs when `returnPromiseFor` is passed in `launch` API config.
- When `isDevelopmentMode` is set to `true`, a log will be shown stating no tracking call will be made corresponding to the APIs.
- Added tests to verify APIs are working properly when `returnPromiseFor` and `isDevelopmentMode` both are used.

## [1.27.0] - 2021-12-03

### Added

- All APIs are capable of returning promise i.e. once the decision is made and tracking call to VWO is completed then only API will return. This will increase the overall response time of API as it will include tracking call time.

  By default, all APIs are asynchronous i.e. they do not wait for the asynchronous tracking calls to get completed. You get the response

  To return a promise, you have to configure the SDK at the time of instantiating i.e. while calling `launch` API.

  We have provided a way to select which APIs you want to promisify. Rest will continue working normally

  To return promise from all the APIs, configure the SDK like:

  ```javascript
  const vwoInstance = vwoSdk.launch({
    settingsFile,
    returnPromiseFor: {
      all: true
    }
  });
  ```

  To return a promise from a particular API, for example, `activate` API, configure the SDK like:

  ```javascript
  const vwoInstance = vwoSdk.launch({
    settingsFile,
    returnPromiseFor: {
      activate: true
    }
  });
  ```

  To return promise from different APIs, for example, `isFeatureEnabled` and `track` APIs, configure the SDK like:

  ```javascript
  const vwoInstance = vwoSdk.launch({
    settingsFile,
    returnPromiseFor: {
      isFeatureEnabled: true,
      track: true
    }
  });
  ```

## [1.26.0] - 2021-11-18

### Changed

- Optimized build for JavaScript SDK by removing unwanted modules like `url` and `https`(used for Node.js SDK) for sending events tracking calls. Specifically for JavaScript SDK, `XMLHttpRequest` is used for which a utility already existed. The gzip minified JavaScript SDK size has been reduced to `24.4 kB` from `53.2 kB`.

## [1.25.2] - 2021-11-17

### Changed

- Increased tests coverage
- Refactored code to write unit tests for verifying tracking calls

## [1.25.1] - 2021-11-08

### Changed

- Fix sending `track-user` impression along with the event batching call in case of `isFeatureEnabled` API.

## [1.25.0] - 2021-11-01

### Added

- Support for pushing multiple custom dimensions at once.
  Earlier, you had to call `push` API multiple times for tracking multiple custom dimensions as follows:

  ```java
  vwoInstance.push('browser', 'chrome', userId);
  vwoInstance.push('price', '20', userId);
  ```

  Now, you can pass a hash map

  ```javascript
  const customDimensionMap = {
    browser: 'chrome',
    price: '20'
  };

  vwoInstance.push(customDimensionMap, userId);`
  ```

  Multiple asynchronous tracking calls would be initiated in this case.

### Changed

- If Events Architecture is enabled for your VWO account, all the tracking calls being initiated from SDK would now be `POST` instead of `GET` and there would be single endpoint i.e. `/events/t`. This is done in order to bring events support and building advancded capabilities in future.

- For events architecture accounts, tracking same goal across multiple campaigns will not send multiple tracking calls. Instead one single `POST` call would be made to track the same goal across multiple different campaigns running on the same environment.

- Multiple custome dimension can be pushed via `push` API. For events architecture enabled account, only one single asynchronous call would be made to track multiple custom dimensions.

  ```javascript
  const customDimensionMap = {
      browser: 'chrome',
      price: '20'
    };

  vwoInstance.push(customDimensionMap, userId);
  ```

## [1.24.0] - 2021-11-01

### Changed

- User IDs passed while applying whitelisting in a campaign from VWO Application will now be hashed. Inside settings-file, all User IDs will be hashed for security reasons. SDK will hash the User ID passed in the different APIs before matching it with the campaigns settings. This is feature-controlled from VWO i.e. we are only rolling this functionality gradually. Please reach out to the support team in case you want to opt-in early for this feature for your VWO account.


## [1.22.2] - 2021-10-21

### Changed

- Updated whitelisting logs for Feature Rollout campaign
- Test cases added to verify whitelisting cases in Feature Rollout campaign

## [1.22.1] - 2021-09-16

### Changed

- Fixed the logic for validating settings-file in case there are no running campaigns

## [1.22.0] - 2021-08-12

### Changed

- Use Campaign ID along with User ID for bucketing a user in a campaign. This will ensure that a particular user gets different variation for different campaigns having similar settings i.e. same campaign-traffic, number of variations, and variation traffic.

## [1.21.0] - 2021-08-05

### Changed

- Sending visitor tracking call for Feature Rollout campaign when `isFeatureEnabled` API is used. This will help in visualizing the overall traffic for the respective campaign's report in the VWO application.


## [1.20.0] - 2021-08-04

### Added

- Added support for JavaScript SDK to connect User Storage Service with `getSettingsFile` API so that settings could be stored and fetched before sending a network call.
- Added support for two new methods - `getSettings` and `setSettings` in User Storage Service. These will be called by SDK, if provided, when `getSettingsFile` API is invoked.

## [1.19.1] - 2021-08-02

### Changed

- Fix code which was using wrong variable to read account ID while generating UUID at the time of integrations callback invocation


## [1.19.0] - 2021-07-29

### Added

- Introducing support for Mutually Exclusive Campaigns. By creating Mutually Exclusive Groups in VWO Application, you can group multiple FullStack A/B campaigns together that are mutually exclusive. SDK will ensure that visitors do not overlap in multiple running mutually exclusive campaigns and the same visitor does not see the unrelated campaign variations. This eliminates the interaction effects that multiple campaigns could have with each other. You simply need to configure the group in the VWO application and the SDK will take care what to be shown to the visitor when you will call the `activate` API for a given user and a campaign.

### Changed

- Update `superstruct` dependency to the latest version.

## [1.18.0] - 2021-07-12

### Added

- Feature Rollout and Feature Test campaigns now supports `JSON` type variable which can be created inside VWO Application. This will help in storing grouped and structured data.

## [1.17.2] - 2021-06-10

### Changed

- Update name of usage metrics keys. Start sending `_l` flag to notify VWO server whether to log or not.

## [1.17.1] - 2021-05-27

## Changed

- `campaignName` will be available in integrations callback, if callback is defined.

## [1.17.0] - 2021-05-18

## Added

- Campaign name will be available in settings and hence, changed settings-schema validations.


## [1.16.0] - 2021-04-29

### Added

- Sending stats which are used for launching the SDK like storage service, logger, and integrations, etc. in tracking calls(track-user and batch-event). This is solely for debugging purpose. We are only sending whether a particular key(feature) is used not the actual value of the key

### Changed

- Removed sending user-id, that is provided in the various APIs, in the tracking calls to VWO server as it might contain sensitive PII data.

- SDK Key will not be logged in any log message, for example, tracking call logs.

- TypeScript files were properly formatted using prettier. Prettier will run on `.ts` files whenever a commit is made.



## [1.15.0] - 2021-04-05

### Added

- Added type declaration file to support [TypeScript](https://www.typescriptlang.org/) projects.


## [1.14.0] - 2021-03-01

### Added

- Expose lifecycle hook events. This feature allows sending VWO data to third party integrations.

### Changed

- Introduce `integrations` key in `launch` API to enable receiving hooks for the third party integrations.

```js
let vwoClientInstance = vwoSDK.launch({
  settingsFile,
  integrations: {
    callback: (properties) => {
      console.log(properties);
    }
  }
});
```

## [1.13.0] - 2021-02-26

### Changed

- Pass meta information from APIs to the User Storage Service's `set` method.

```js
const options = {
  metaData: {
    browser: 'chrome',
    os: 'linux'
  }
};

vwoClientInstance.activate(campaignKey, userId, options);
```

Same for other APIs - `getVariationName`, `track`, `isFeatureEnabled`, and `getFeatureVariableValue`.

- If User Storage Service is provided, do not track same visitor multiple times.

You can pass `shouldTrackReturningUser` as `true` in case you prefer to track duplicate visitors.

```js
const options = {
  shouldTrackReturningUser: true
};

vwoClientInstance.activate(campaignKey, userId, options);
```

Or, you can also pass `shouldTrackReturningUser` at the time of instantiating VWO SDK client. This will avoid passing the flag in different API calls.

```js
let vwoClientInstance = vwoSDK.launch({
  settingsFile,
  shouldTrackReturningUser: true
});
```

If `shouldTrackReturningUser` param is passed at the time of instantiating the SDK as well as in the API options as mentioned above, then the API options value will be considered.

- If User Storage Service is provided, campaign activation is mandatory before tracking any goal, getting variation of a campaign, and getting value of the feature's variable.

**Correct Usage**

```js
vwoClientInstance.activate(campaignKey, userId, options);
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```

**Wrong Usage**

```js
// Calling track API before activate API
// This will not track goal as campaign has not been activated yet.
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);

// After calling track APi
vwoClientInstance.activate(campaignKey, userId, options);
```

## [1.12.0] - 2021-02-11

### Changed

- Send environment token in every network call initiated from SDK to the VWO server. This will help in viewing campaign reports on the basis of environment.

## [1.11.1] - 2021-01-29

### Changed

- Fix build failure on latest node i.e. `15.0.7` version. Error was because of unhandled promise rejection in test cases.
- Copyright year changes in all files
- Updated format of message in case settings are not fetched to be same as other log messages.

## [1.11.0] - 2021-01-02

### Changed

- `userStorageData` key can be passed in `options` parameter for utilizing already fetched storage data. It also helps in implementing the asynchronous nature of the User Storage Service's `get` method. For more info read [this](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous).

## [1.10.0] - 2020-12-02

### Added

- Webhooks support
- New API `getAndUpdateSettingsFile` to fetch and update settings-file in case of webhook-trigger

### Changed

- Polling bugs when settings were updated but not being reflected on instance
- Removed caching util as it causes stale data to be used in case of new settings via polling/webhook

## [1.9.1] - 2020-10-20

### Changed
- `flushEvents` API returns promise to know whether the batch request passes or fails
- If `requestTimeInterval` is passed, it will only set the timer when the first event will arrive
- If `requestTimeInterval` is provided, after flushing of events, new interval will be registered when the first event will arrive
- If `eventsPerRequest` is not provided, the default value of `600` i.e. `10 minutes` will be used
- If `requestTimeInterval` is not provided, the default value of `100` events will be used

```js
vwoClientInstance.flushEvents().then(status => {
  console.log(status); // true/false depending on network request status
})
```

## [1.9.0] - 2020-10-16
### Added
- Added support for batching of events sent to VWO server
- Intoduced `batchEvents` config in launch API for setting when to send bulk events
- Added `flushEvents` API to manually flush the batch events queue whne `batchEvents` config is passed. Note: `batchEvents` config i.e. `eventsPerRequest` and `requestTimeInterval` won't be considered while manually flushing

```js
var settingsFile = await vwoSdk.getSettingsFile(accountId, sdkKey);

vwoSdk.lanuch({
  settingsFile: settingsFile,
  batchEvents: {
    eventsPerRequest: 1000, // specify the number of events
    requestTimeInterval: 10000, // specify the time limit fordraining the events (in seconds)
    flushCallback: (err, events) => console.log(err, events) // optional callback to execute when queue events are flushed
  }
});

// (optional): Manually flush the batch events queue to send impressions to VWO server.
vwoClientInstance.flushEvents();
```

## [1.8.3] - 2020-06-03
### Added
- Added support for polling settingsFile automatically based on the interval provided al the time of using launch API
```js
var settingsFile = await vwoSdk.getSettingsFile(accountId, sdkKey);

vwoSdk.lanuch({
  settingsFile: settingsFile,
  pollInterval: 1000 // ms,
  sdkKey: 'YOUR_SDK_KEY'
})
```

## [1.8.1] - 2020-05-13
### Changed
- Used a util method instead of Object.values since Object.values is not supported in older versions of NodeJs and browsers

## [1.8.0] - 2020-04-29
### Changes
- Update track API to handle duplicate and unique conversions and corresponding changes in `launch` API
- Update track API to track a goal globally across campaigns with the same `goalIdentififer` and corresponding changes in `launch` API
```js
// it will track goal having `goalIdentifier` of campaign having `campaignKey` for the user having `userId` as id.
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);

// it will track goal having `goalIdentifier` of campaigns having `campaignKey1` and `campaignKey2` for the user having `userId` as id.
vwoClientInstance.track([campaignKey1, campaignKey2], userId, goalIdentifier, options);

// it will track goal having `goalIdentifier` of all the campaigns
vwoClientInstance.track(null, userId, goalIdentifier, options);
//Read more about configuration and usage - https://developers.vwo.com/reference#server-side-sdk-track
```

## [1.7.4] - 2020-03-05
### Changed
- Added check in segmentation for handling the scenario in which custom-variable key defined in campaign settings is not passed in APIs and matches regex ".*" is used.
- Remove unused log messages.
- Refactored code. Minified source code is now reduced by 4KB.

## [1.7.3] - 2020-02-03
### Changed
- Update year in Apache-2.0 Copyright header in all source and scripts files

## [1.7.2] - 2020-02-03
### Changed
- Make `sdkKey` optional while validating settingsFile. `sdkKey` will not be present in response of `getSettingsFile` API from `v1.7.0`.

## [1.7.0] - 2020-01-28
### Added
Client-side Javascript SDK
- NodeJs SDK can be used on client-side i.e. browser with all capabilities like A/B testing, Goal tracking, Feature Rollout, Feature Test, etc.
- Introduced `webpack` for bundling client-side `vwo-javascript-sdk`
-
### Changed
- Replaced `ajv` dependency with `superstruct`. Build-size reduced by significant factor

## [1.6.0] - 2020-01-15
### Breaking Changes
To prevent ordered arguments and increasing use-cases, we are moving all optional arguments into a combined argument(Object).

- customVariables argument in APIs: `activate`, `getVariation`, `track`, `isFeatureEnabled`, and `getFeatureVariableValue` have been moved into options object.
- `revenueValue` parameter in `track` API is now moved into `options` argument.

#### Before
```js
// activae API
vwoClientInstance.activate(campaignKey, userId, customVariables);
// getVariation API
vwoClientInstance.getVariation(campaignKey, userId, customVariables);
// track API
vwoClientInstance.track(campaignKey, userId, goalIdentifier, revenueValue, customVariables);
// isFeatureEnabled API
vwoClientInstance.isFeatureEnabled(campaignKey, userId, customVariables);
// getFeatureVariableValue API
vwoClientInstance.getFeatureVariableValue(campaignKey, variableKey, userId, customVariables);
```
#### After
```js

var options = {
  // Optional, needed for pre-segmentation
  customVariables: {},
  // Optional, neeeded for Forced Variation
  variationTargetingVariables: {}
  // Optional, needed to track revenue goal with revenue value
  revenueValue: 1000.12
};
// activae API
vwoClientInstance.activate(campaignKey, userId, options);
// getVariation API
vwoClientInstance.getVariation(campaignKey, userId, options);
// track API
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
// isFeatureEnabled API
vwoClientInstance.isFeatureEnabled(campaignKey, userId, options);
// getFeatureVariableValue API
vwoClientInstance.getFeatureVariableValue(campaignKey, variableKey, userId, options);
```
### Added
Forced Variation capabilites
- Introduced `Forced Variation` to force certain users into specific variation. Forcing can be based on User IDs or custom variables defined.
### Changed
- All existing APIs to handle custom-targeting-variables as an option for forcing variation
- Code refactored to support Whitelisting. Order of execution


## [1.5.0] - 2019-12-17
### Added
Pre and Post segmentation capabilites
- Introduced new Segmentation service to evaluate whether user is eligible for campaign based on campaign pre-segmentation conditions and passed custom-variables
### Changed
- All existing APIs to handle custom-variables for tageting audience
- Code refactored to support campaign tageting and post segmentation


## [1.4.2] - 2019-12-02
### Changed
- `getVariation` and `getVariationName` API are same. Only two names for same API.


## [1.4.1] - 2019-11-27
### Changed
- File `getFeaturevariableValue` got renamed to `getFeatureVariableValue`. No issues were on MAC OS X as filenames are by default case-insensitve.


## [1.4.0] - 2019-11-27
### Added
Feature Rollout and Feature Test capabilities
- Introduced two new APIs i.e. `isFeatureEnabled` and `getFeatureVariableValue`
### Changed
- Existing APIs to handle new type of campaigns i.e. feature-rollout and feature-test
- Code refactored to support feature-rollout and feature-test capabilites


## [1.3.0] - 2019-11-25
### Changed
- Change MIT License to Apache-2.0
- Added apache copyright-header in each file
- Add NOTICE.txt file complying with Apache LICENSE
- Give attribution to the third-party libraries being used and mention StackOverflow


## [1.0.5] - 2019-11-22
### Changed
- Use User Storage Service in Track API also
- Update track API to use common method


## [1.0.4] - 2019-09-13
### Changed
- Fix passing `r` in custom goal type


## [1.0.3] - 2019-08-14
### Changed
- Show error when revenue not passed for revenue goals
- Merge pull request #3


## [1.0.2] - 2019-07-20
### Added
- First release with Server-side A/B capabilities
