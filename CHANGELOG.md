# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
vwoSdk.activate(campaignKey, userId, customVariables);
// getVariation API
vwoSdk.getVariation(campaignKey, userId, customVariables);
// track API
vwoSdk.track(campaignKey, userId, goalIdentifier, revenueValue, customVariables);
// isFeatureEnabled API
vwoSdk.isFeatureEnabled(campaignKey, userId, customVariables);
// getFeatureVariableValue API
vwoSdk.getFeatureVariableValue(campaignKey, variableKey, userId, customVariables);
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
vwoSdk.activate(campaignKey, userId, options);
// getVariation API
vwoSdk.getVariation(campaignKey, userId, options);
// track API
vwoSdk.track(campaignKey, userId, goalIdentifier, options);
// isFeatureEnabled API
vwoSdk.isFeatureEnabled(campaignKey, userId, options);
// getFeatureVariableValue API
vwoSdk.getFeatureVariableValue(campaignKey, variableKey, userId, options);
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
