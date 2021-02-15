# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
