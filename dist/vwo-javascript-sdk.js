/*!
 * vwo-javascript-sdk - v1.25.2
 * URL - https://github.com/wingify/vwo-node-sdk
 * 
 * Copyright 2019-2021 Wingify Software Pvt. Ltd.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Dependencies used - 
 *  1. murmurhash - ^0.0.2
 *  2. superstruct - ^0.10.12
 *  3. uuid - ^3.3.2
 */
(function webpackUniversalModuleDefinition(root, factory) {
	// CommonJS2
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	// AMD
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	// CommonJS
	else if(typeof exports === 'object')
		exports["vwoSdk"] = factory();
	// Root
	else
		root["vwoSdk"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/VWO.js":
/*!********************!*\
  !*** ./lib/VWO.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var api = __webpack_require__(/*! ./api */ "./lib/api/index.js");

var EventQueue = __webpack_require__(/*! ./services/EventQueue */ "./lib/services/EventQueue.js");

var SettingsFileService = __webpack_require__(/*! ./services/SettingsFileManager */ "./lib/services/SettingsFileManager.js");

var BatchEventsDispatcher;
var customEventUtil;
var BatchEventsQueue;

if (false) {}

var logging = __webpack_require__(/*! ./services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ./enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var HooksManager = __webpack_require__(/*! ./services/HooksManager */ "./lib/services/HooksManager.js");

var UsageStats = __webpack_require__(/*! ./services/UsageStats */ "./lib/services/UsageStats.js");

var ApiEnum = __webpack_require__(/*! ./enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var file = FileNameEnum.VWO;

var VWO =
/*#__PURE__*/
function () {
  // Setting various services on the instance to be accessible by its member functions
  function VWO() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, VWO);

    this.getVariation = this.getVariationName; // to be backward compatible

    this.userStorageService = config.userStorageService;
    this.logger = config.logger; // Initialize Hooks manager so that callbacks can be invoked

    HooksManager.init(config);
    var settingsFileManager = new SettingsFileService(config); // Validate the config file i.e. check if required fields contain appropriate data

    if (!settingsFileManager.isSettingsFileValid()) {
      this.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_SETTINGS_FILE, {
        file: file
      }));
      return;
    }

    this.logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.VALID_CONFIGURATION, {
      file: file
    }));
    settingsFileManager.checkAndPoll(); // Checks if pollingInterval is passed then starts polling settingsFile
    // Setup event quque for sending impressions to VWO server

    this.eventQueue = new EventQueue();
    this.SettingsFileManager = settingsFileManager;
    this.usageStats = new UsageStats();

    if (!settingsFileManager.getConfig().isDevelopmentMode) {
      this.usageStats.collectUsageStats(settingsFileManager.getConfig());
    }

    if (false) { var sdkKey, accountId; } // Process settingsFile for various things. For eg: assign bucket range to variation, etc.


    this.SettingsFileManager.processSettingsFile();
    this.logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SDK_INITIALIZED, {
      file: file
    }));
  } // PUBLIC METHODS

  /**
   * This API method: Gets the variation assigned for the user for the campaign and send the metrics to VWO server
   *
   * @param {String} campaignKey       unique campaign key specified in VWO app
   * @param {String} userId            ID assigned to a user
   * @param {Object} options           optional params - customVariables, variationTargetingVariables
   *
   * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
   */


  _createClass(VWO, [{
    key: "activate",
    value: function activate(campaignKey, userId, options) {
      try {
        var self = this;
        return api.activate(self, campaignKey, userId, options);
      } catch (err) {
        this.logger.log(LogLevelEnum.ERROR, err.message);
        return null;
      }
    }
    /**
     * This API method: Gets the variation assigned for the user for the campaign
     *
     * @param {String} campaignKey       unique campaign key specified in VWO app
     * @param {String} userId            ID assigned to a user
     * @param {Object} options           optional params - customVariables, variationTargetingVariables
     *
     * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
     */

  }, {
    key: "getVariationName",
    value: function getVariationName(campaignKey, userId, options) {
      try {
        var self = this;
        return api.getVariation(self, campaignKey, userId, options);
      } catch (err) {
        this.logger.log(LogLevelEnum.ERROR, err.message);
        return null;
      }
    }
    /**
     * This API method: Marks the conversion of the campaign for a particular goal
     *
     * @param {String/Array<string>/null/undefined} campaignSpecifier campaign keys to track           unique campaignSpecifier
     * @param {String} userId                ID assigned to a user
     * @param {String} goalIdentifier         unique campaign's goal identifier
     * @param {Object} options               optional params - customVariables, variationTargetingVariables, revenueValue
     */

  }, {
    key: "track",
    value: function track(campaignSpecifier, userId, goalIdentifier, options) {
      try {
        var self = this;
        return api.track(self, campaignSpecifier, userId, goalIdentifier, options);
      } catch (err) {
        this.logger.log(LogLevelEnum.ERROR, err.message);
        return null;
      }
    }
    /**
     * This API method checks: Whether a feature is enabled or not for the given user
     *
     * @param {String} campaignKey       Unique key for a campaign
     * @param {String} userId            Unique identifier for the user
     * @param {Object} options           optional params - customVariables, variationTargetingVariables
     *
     * @return {Boolean}                 true if feature enabled, false otherwise
     */

  }, {
    key: "isFeatureEnabled",
    value: function isFeatureEnabled(campaignKey, userId, options) {
      try {
        var self = this;
        return api.isFeatureEnabled(self, campaignKey, userId, options);
      } catch (err) {
        this.logger.log(LogLevelEnum.ERROR, err.message);
        return false;
      }
    }
    /**
     * This API method: Return the variable for that variation(if Feature Test),
     *    otherwise the default values being set in Feature
     *
     * @param {String} campaignKey   Unique key for a campaign
     * @param {String} variableKey   Unique key for a feature's variable
     * @param {String} userId        Unique identifier for the user
     * @param {Object} options           optional params - customVariables, variationTargetingVariables
     *
     * @return {string|number|double|boolean|null} Variable value as is set in the VWO app i.e.
     *                                             maintaining the data-type,
     *                                             null if anything fails like campaign / variable not found
     */

  }, {
    key: "getFeatureVariableValue",
    value: function getFeatureVariableValue(campaignKey, variableKey, userId, options) {
      try {
        var self = this;
        return api.getFeatureVariableValue(self, campaignKey, variableKey, userId, options);
      } catch (err) {
        this.logger.log(LogLevelEnum.ERROR, err.message);
        return null;
      }
    }
    /**
     * This API method: Pushes the key-value tag pair for a particular user
     *
     * @param {String} tagKey                    tag key
     * @param {String} tagValue                  tag Value
     * @param {String} userId                    ID assigned to a user
     *
     * @return {Boolean}                    true if request is pushed to eventQueue, false if params are invalid or settings file is unavailable
     */

  }, {
    key: "push",
    value: function push(tagKey, tagValue, userId) {
      try {
        var self = this;

        if (arguments.length === 2) {
          // Argument reshuffling.
          var customDimensionMap = tagKey;
          var _userId = tagValue;
          return api.push(self, ' ', ' ', _userId, customDimensionMap);
        } else if (arguments.length === 3) {
          return api.push(self, tagKey, tagValue, userId, {});
        } else {
          this.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.PUSH_INVALID_PARAMS, {
            file: file,
            method: ApiEnum.PUSH
          }));
          return false;
        }
      } catch (err) {
        this.logger.log(LogLevelEnum.ERROR, err.message);
        return false;
      }
    }
    /**
     * Manually flush impression events to VWO which are queued in batch queue as per batchEvents config
     */

  }, {
    key: "flushEvents",
    value: function flushEvents() {
      var _this2 = this;

      if (false) {}
    }
    /**
     * Fetch latest settings-file and update so that vwoClientInstance could use latest settings
     * Helpful especially when using webhooks
     *
     * @param {Number} accountId
     * @param {String} sdkKey
     *
     * @return {Promise}
     */

  }, {
    key: "getAndUpdateSettingsFile",
    value: function getAndUpdateSettingsFile(accountId, sdkKey) {
      return this.SettingsFileManager.getAndUpdateSettingsFile(accountId, sdkKey);
    }
  }]);

  return VWO;
}();

module.exports = VWO;

/***/ }),

/***/ "./lib/api/activate.js":
/*!*****************************!*\
  !*** ./lib/api/activate.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var ApiEnum = __webpack_require__(/*! ../enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var DecisionUtil = __webpack_require__(/*! ../utils/DecisionUtil */ "./lib/utils/DecisionUtil.js");

var CampaignUtil = __webpack_require__(/*! ../utils/CampaignUtil */ "./lib/utils/CampaignUtil.js");

var ImpressionUtil = __webpack_require__(/*! ../utils/ImpressionUtil */ "./lib/utils/ImpressionUtil.js");

var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var EventEnum = __webpack_require__(/*! ../enums/EventEnum */ "./lib/enums/EventEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var file = FileNameEnum.Activate;
/**
 * This API method: Gets the variation assigned for the user for the campaign and send the metrics to VWO server
 *
 * 1. Validates the arguments being passed
 * 2. Checks if user is eligible to get bucketed into the campaign,
 * 3. Assigns the determinitic variation to the user(based on userId), if user becomes part of campaign
 *    If userStorageService is used, it will look into it for the variation and if found, no further processing is done
 * 4. Sends an impression call to VWO server to track user
 *
 * @param {Object} vwoInstance       VWO instance which has logger, settingsFile etc.
 * @param {String} campaignKey       unique campaign key specified in VWO app
 * @param {String} userId            ID assigned to a user
 * @param {Object} options           Optional params
 *
 * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
 */

function activate(vwoInstance, campaignKey, userId) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var api = ApiEnum.ACTIVATE;
  var areParamsValid = false;

  if (DataTypeUtil.isObject(options)) {
    var customVariables = options.customVariables,
        variationTargetingVariables = options.variationTargetingVariables,
        userStorageData = options.userStorageData,
        shouldTrackReturningUser = options.shouldTrackReturningUser,
        metaData = options.metaData; // Check if arguments have valid data-type

    if (ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.ACTIVATE,
      campaignKey: campaignKey,
      userId: userId,
      customVariables: customVariables,
      variationTargetingVariables: variationTargetingVariables,
      userStorageData: userStorageData,
      shouldTrackReturningUser: shouldTrackReturningUser,
      metaData: metaData
    })) {
      areParamsValid = true;
    }
  }

  if (areParamsValid === false) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.ACTIVATE_API_MISSING_PARAMS, {
      file: file
    }));
    return null;
  } // Get the cached configuration


  var config = vwoInstance.SettingsFileManager.getConfig();
  var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api); // If no settings are found, simply return no variation

  if (!settingsFile) {
    return null;
  }

  shouldTrackReturningUser = shouldTrackReturningUser || config.shouldTrackReturningUser || false; // Get the campaign settings based on campaignKey from the settings

  var campaign = CampaignUtil.getCampaign(settingsFile, campaignKey); // If matching campaign is not found with campaignKey or if found but is in not RUNNING state, simply return no variation

  if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
      file: file,
      campaignKey: campaignKey,
      api: api
    }));
    return null;
  }

  if (!CampaignUtil.isAbCampaign(campaign)) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_API, {
      file: file,
      campaignKey: campaignKey,
      campaignType: campaign.type,
      userId: userId,
      api: api
    }));
    return null;
  } // Once the matching RUNNING campaign is found, assign the deterministic variation to the userId provided


  var _DecisionUtil$getVari = DecisionUtil.getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables, variationTargetingVariables, userStorageData, metaData, true, undefined, api),
      variationId = _DecisionUtil$getVari.variationId,
      variationName = _DecisionUtil$getVari.variationName,
      isStoredVariation = _DecisionUtil$getVari.isStoredVariation; // Check if variation-name has been assigned to the userId. If not, return no variation


  if (!ValidateUtil.isValidValue(variationName)) {
    vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.INVALID_VARIATION_KEY, {
      file: file,
      userId: userId,
      campaignKey: campaignKey
    }));
    return null;
  } // check if variation found from storage. return it without sending a call to VWO server


  if (isStoredVariation && !shouldTrackReturningUser) {
    vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_ALREADY_TRACKED, {
      file: file,
      userId: userId,
      campaignKey: campaignKey,
      api: api
    }));
    return variationName;
  } // Variation found...let VWO server knows about it to show report stats


  if (config.batchEvents) {
    var properties = ImpressionUtil.buildBatchEventForTrackingUser(settingsFile, campaign.id, variationId, userId);
    vwoInstance.batchEventsQueue.enqueue(properties);
  } else if (settingsFile.isEventArchEnabled) {
    var _properties = ImpressionUtil.getEventsBaseProperties(settingsFile, EventEnum.VWO_VARIATION_SHOWN, vwoInstance.usageStats.getUsageStats());

    var payload = ImpressionUtil.getTrackUserPayloadData(settingsFile, userId, EventEnum.VWO_VARIATION_SHOWN, campaign.id, variationId);
    vwoInstance.eventQueue.process(config, _properties, vwoInstance, payload);
  } else {
    var _properties2 = ImpressionUtil.buildEventForTrackingUser(settingsFile, campaign.id, variationId, userId, vwoInstance.usageStats.getUsageStats());

    vwoInstance.eventQueue.process(config, _properties2, vwoInstance);
  }

  return variationName;
}

module.exports = activate;

/***/ }),

/***/ "./lib/api/getFeatureVariableValue.js":
/*!********************************************!*\
  !*** ./lib/api/getFeatureVariableValue.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var ApiEnum = __webpack_require__(/*! ../enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var DecisionUtil = __webpack_require__(/*! ../utils/DecisionUtil */ "./lib/utils/DecisionUtil.js");

var CampaignUtil = __webpack_require__(/*! ../utils/CampaignUtil */ "./lib/utils/CampaignUtil.js");

var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var FeatureUtil = __webpack_require__(/*! ../utils/FeatureUtil */ "./lib/utils/FeatureUtil.js");

var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var ObjectUtil = __webpack_require__(/*! ../utils/ObjectUtil */ "./lib/utils/ObjectUtil.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var file = FileNameEnum.GetFeatureVariableValue;
/**
 * This API method:
 *
 * 1. Validates the arguments being passed
 * 2. Checks if user is eligible for campaign and check if feature is enabled for the user.
 * 4. If feature enabled, return the variable for that variation(if Feature Test),
 *    otherwise the default values being set in Feature
 *
 * @param {Object} vwoInstance   VWO instance which has logger, settingsFile etc.
 * @param {String} campaignKey   Unique key for a campaign
 * @param {String} variableKey   Unique key for a feature's variable
 * @param {String} userId        Unique identifier for the user
 * @param {Object} options           Optional params
 *
 * @return {string|number|double|boolean|null} Variable value as is set in the VWO app i.e.
 *                                             maintaining the data-type,
 *                                             null if anything fails like campaign / variable not found
 */

function getFeatureVariableValue(vwoInstance, campaignKey, variableKey, userId) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  try {
    var api = ApiEnum.GET_FEATURE_VARIABLE_VALUE;
    var areParamsValid = false;

    if (DataTypeUtil.isObject(options)) {
      var customVariables = options.customVariables,
          variationTargetingVariables = options.variationTargetingVariables,
          userStorageData = options.userStorageData,
          metaData = options.metaData; // Check if arguments have valid data-type

      if (ValidateUtil.areValidParamsForAPIMethod({
        method: ApiEnum.GET_FEATURE_VARIABLE_VALUE,
        campaignKey: campaignKey,
        variableKey: variableKey,
        userId: userId,
        customVariables: customVariables,
        variationTargetingVariables: variationTargetingVariables,
        userStorageData: userStorageData,
        metaData: metaData
      })) {
        areParamsValid = true;
      }
    }

    if (areParamsValid === false) {
      vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_FEATURE_VARIABLE_MISSING_PARAMS, {
        file: file,
        campaignKey: campaignKey,
        variableKey: variableKey
      }));
      return null;
    } // Get the cached configuration


    var config = vwoInstance.SettingsFileManager.getConfig();
    var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api);
    config.apiName = api; // If no settings are found, simply return no variation

    if (!settingsFile) {
      return null;
    }

    var campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

    if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
      vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
        file: file,
        campaignKey: campaignKey,
        api: api
      }));
      return null;
    }

    if (CampaignUtil.isAbCampaign(campaign)) {
      // API not allowed for full-stack AB campaigns
      vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_API, {
        file: file,
        campaignKey: campaignKey,
        campaignType: campaign.type,
        userId: userId,
        api: api
      }));
      return null;
    }

    var variable;

    var _DecisionUtil$getVari = DecisionUtil.getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables, variationTargetingVariables, userStorageData, metaData, false, undefined, api),
        variation = _DecisionUtil$getVari.variation,
        variationName = _DecisionUtil$getVari.variationName;

    if (!variationName) {
      vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_NOT_ENABLED_FOR_USER, {
        file: file,
        campaignKey: campaignKey,
        userId: userId
      }));
      return null;
    }

    if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
      variable = FeatureUtil.getVariableForFeature(campaign, variableKey);
    } else if (CampaignUtil.isFeatureTestCampaign(campaign)) {
      variable = FeatureUtil.getVariableValueForVariation(campaign, variation, variableKey);

      if (ObjectUtil.areObjectKeys(variable) && variation.isFeatureEnabled) {
        vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_RECEIVED_VARIABLE_VALUE, {
          file: file,
          variableKey: variableKey,
          campaignKey: campaign.key,
          variableValue: variable.value,
          userId: userId
        }));
      } else if (ObjectUtil.areObjectKeys(variable) && !variation.isFeatureEnabled) {
        vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIABLE_NOT_USED_RETURN_DEFAULT_VARIABLE_VALUE, {
          file: file,
          variableKey: variableKey,
          variationName: variationName
        }));
      }
    }

    if (!ObjectUtil.areObjectKeys(variable)) {
      vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.VARIABLE_NOT_FOUND, {
        file: file,
        variableKey: variableKey,
        userId: userId
      }));
      return null;
    }

    var variableValue = variable.value;
    var typeCastedValue = FeatureUtil.getTypeCastVariableValue(variableValue, variable.type);
    return typeCastedValue;
  } catch (err) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, err.message);
    return null;
  }
}

module.exports = getFeatureVariableValue;

/***/ }),

/***/ "./lib/api/getVariation.js":
/*!*********************************!*\
  !*** ./lib/api/getVariation.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var ApiEnum = __webpack_require__(/*! ../enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var DecisionUtil = __webpack_require__(/*! ../utils/DecisionUtil */ "./lib/utils/DecisionUtil.js");

var CampaignUtil = __webpack_require__(/*! ../utils/CampaignUtil */ "./lib/utils/CampaignUtil.js");

var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var file = FileNameEnum.GetVariation;
/**
 * This API method: Gets the variation assigned for the user for the campaign
 *
 * 1. Validates the arguments being passed
 * 2. Checks if user is eligible to get bucketed into the campaign,
 * 3. Assigns the determinitic variation to the user(based on userId), if user becomes part of campaign
 *    If userStorageService is used, it will look into it for the variation and if found, no further processing is done
 *
 * @param {Object} vwoInstance       VWO instance which has logger, settingsFile etc.
 * @param {String} campaignKey       unique campaign key specified in VWO app
 * @param {String} userId            ID assigned to a user
 * @param {Object} options           Optional params
 *
 * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
 */

function getVariation(vwoInstance, campaignKey, userId) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var api = ApiEnum.GET_VARIATION_NAME;
  var areParamsValid = false;

  if (DataTypeUtil.isObject(options)) {
    var customVariables = options.customVariables,
        variationTargetingVariables = options.variationTargetingVariables,
        userStorageData = options.userStorageData,
        metaData = options.metaData; // Check if arguments have valid data-type

    if (ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.GET_VARIATION_NAME,
      campaignKey: campaignKey,
      userId: userId,
      customVariables: customVariables,
      variationTargetingVariables: variationTargetingVariables,
      userStorageData: userStorageData,
      metaData: metaData
    })) {
      areParamsValid = true;
    }
  }

  if (areParamsValid === false) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_VARIATION_API_MISSING_PARAMS, {
      file: file
    }));
    return null;
  } // Get the cached configuration


  var config = vwoInstance.SettingsFileManager.getConfig();
  var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api);
  config.apiName = api; // If no settings are found, simply return no variation

  if (!settingsFile) {
    return null;
  } // Get the campaign settings based on campaignKey from the settings


  var campaign = CampaignUtil.getCampaign(settingsFile, campaignKey); // If matching campaign is not found with campaignKey or if found but is in not RUNNING state, simply return no variation

  if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
      file: file,
      campaignKey: campaignKey,
      api: api
    }));
    return null;
  }

  if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_API, {
      file: file,
      campaignKey: campaignKey,
      campaignType: campaign.type,
      userId: userId,
      api: api
    }));
    return null;
  }

  var _DecisionUtil$getVari = DecisionUtil.getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables, variationTargetingVariables, userStorageData, metaData, false, undefined, api),
      variationName = _DecisionUtil$getVari.variationName;

  if (!variationName) {
    return null;
  }

  return variationName;
}

module.exports = getVariation;

/***/ }),

/***/ "./lib/api/index.js":
/*!**************************!*\
  !*** ./lib/api/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var activate = __webpack_require__(/*! ./activate */ "./lib/api/activate.js");

var getVariation = __webpack_require__(/*! ./getVariation */ "./lib/api/getVariation.js");

var track = __webpack_require__(/*! ./track */ "./lib/api/track.js");

var isFeatureEnabled = __webpack_require__(/*! ./isFeatureEnabled */ "./lib/api/isFeatureEnabled.js");

var getFeatureVariableValue = __webpack_require__(/*! ./getFeatureVariableValue */ "./lib/api/getFeatureVariableValue.js");

var push = __webpack_require__(/*! ./push */ "./lib/api/push.js");

module.exports = {
  activate: activate,
  getVariation: getVariation,
  track: track,
  isFeatureEnabled: isFeatureEnabled,
  getFeatureVariableValue: getFeatureVariableValue,
  push: push
};

/***/ }),

/***/ "./lib/api/isFeatureEnabled.js":
/*!*************************************!*\
  !*** ./lib/api/isFeatureEnabled.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var ApiEnum = __webpack_require__(/*! ../enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var DecisionUtil = __webpack_require__(/*! ../utils/DecisionUtil */ "./lib/utils/DecisionUtil.js");

var CampaignUtil = __webpack_require__(/*! ../utils/CampaignUtil */ "./lib/utils/CampaignUtil.js");

var ImpressionUtil = __webpack_require__(/*! ../utils/ImpressionUtil */ "./lib/utils/ImpressionUtil.js");

var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var EventEnum = __webpack_require__(/*! ../enums/EventEnum */ "./lib/enums/EventEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var file = FileNameEnum.IsFeatureEnabled;
/**
 * This API checks: Whether a feature is enabled or not for the given user
 *
 * 1. Validates the arguments being passed
 * 2. Checks if user is eligible for campaign and check if feature is enabled for the user.
 * 4. If feature enabled, sends a call to VWO server for tracking visitor
 *
 * @param {Object} vwoInstance       VWO instance which has logger, settingsFile etc.
 * @param {String} campaignKey       Unique key for a campaign
 * @param {String} userId            Unique identifier for the user
 * @param {Object} options           Optional params
 *
 * @return {Boolean}                 true if feature enabled, false otherwise
 */

function isFeatureEnabled(vwoInstance, campaignKey, userId) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var api = ApiEnum.IS_FEATURE_ENABLED;
  var areParamsValid = false;

  if (DataTypeUtil.isObject(options)) {
    var customVariables = options.customVariables,
        variationTargetingVariables = options.variationTargetingVariables,
        userStorageData = options.userStorageData,
        shouldTrackReturningUser = options.shouldTrackReturningUser,
        metaData = options.metaData; // Check if arguments have valid data-type

    if (ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.IS_FEATURE_ENABLED,
      campaignKey: campaignKey,
      userId: userId,
      customVariables: customVariables,
      variationTargetingVariables: variationTargetingVariables,
      userStorageData: userStorageData,
      shouldTrackReturningUser: shouldTrackReturningUser,
      metaData: metaData
    })) {
      areParamsValid = true;
    }
  }

  if (areParamsValid === false) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IS_FEATURE_ENABLED_API_MISSING_PARAMS, {
      file: file
    }));
    return false;
  } // Get the cached configuration


  var config = vwoInstance.SettingsFileManager.getConfig();
  var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api); // If no settings are found, simply log and return false

  if (!settingsFile) {
    return false;
  }

  shouldTrackReturningUser = shouldTrackReturningUser || config.shouldTrackReturningUser || false; // Get the campaign settings based on campaignKey from the settings

  var campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

  if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
      file: file,
      campaignKey: campaignKey,
      api: api
    }));
    return false;
  }

  if (CampaignUtil.isAbCampaign(campaign)) {
    // API not allowed for full-stack AB campaigns
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_API, {
      file: file,
      campaignKey: campaignKey,
      campaignType: campaign.type,
      userId: userId,
      api: api
    }));
    return false;
  }

  var _DecisionUtil$getVari = DecisionUtil.getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables, variationTargetingVariables, userStorageData, metaData, true, undefined, api),
      variation = _DecisionUtil$getVari.variation,
      variationName = _DecisionUtil$getVari.variationName,
      variationId = _DecisionUtil$getVari.variationId,
      isStoredVariation = _DecisionUtil$getVari.isStoredVariation;

  var isFeatureEnabled = false;

  if (variationName) {
    isFeatureEnabled = CampaignUtil.isFeatureRolloutCampaign(campaign) || variation.isFeatureEnabled;

    if (isStoredVariation && !shouldTrackReturningUser) {
      vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_ALREADY_TRACKED, {
        file: file,
        userId: userId,
        campaignKey: campaignKey,
        api: api
      }));
    } else {
      // Variation found...let VWO server knows about it to show report stats
      if (config.batchEvents) {
        var properties = ImpressionUtil.buildBatchEventForTrackingUser(settingsFile, campaign.id, variationId, userId);
        vwoInstance.batchEventsQueue.enqueue(properties);
      } else if (settingsFile.isEventArchEnabled) {
        var _properties = ImpressionUtil.getEventsBaseProperties(settingsFile, EventEnum.VWO_VARIATION_SHOWN, vwoInstance.usageStats.getUsageStats());

        var payload = ImpressionUtil.getTrackUserPayloadData(settingsFile, userId, EventEnum.VWO_VARIATION_SHOWN, campaign.id, variationId);
        vwoInstance.eventQueue.process(config, _properties, vwoInstance, payload);
      } else {
        var _properties2 = ImpressionUtil.buildEventForTrackingUser(settingsFile, campaign.id, variationId, userId, vwoInstance.usageStats.getUsageStats());

        vwoInstance.eventQueue.process(config, _properties2, vwoInstance);
      }
    }
  }

  if (isFeatureEnabled) {
    vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_ENABLED_FOR_USER, {
      file: file,
      campaignKey: campaignKey,
      userId: userId
    }));
  } else {
    vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_NOT_ENABLED_FOR_USER, {
      file: file,
      campaignKey: campaignKey,
      userId: userId
    }));
  }

  return isFeatureEnabled;
}

module.exports = isFeatureEnabled;

/***/ }),

/***/ "./lib/api/push.js":
/*!*************************!*\
  !*** ./lib/api/push.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var ApiEnum = __webpack_require__(/*! ../enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var EventEnum = __webpack_require__(/*! ../enums/EventEnum */ "./lib/enums/EventEnum.js");

var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var ImpressionUtil = __webpack_require__(/*! ../utils/ImpressionUtil */ "./lib/utils/ImpressionUtil.js");

var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var file = FileNameEnum.Push;
/**
 * This API method: Pushes the key-value tag pair for a particular user
 *
 * 1. validates the arguments being passed
 * 2. Sends a call to VWO push api
 *
 * @param {Object} vwoInstance               VWO instance which has logger, settingsFile etc.
 * @param {String} tagKey                    tag key
 * @param {String} tagValue                  tag Value
 * @param {String} userId                    ID assigned to a user
 *
 * @return {Boolean}                         true if request is pushed to eventQueue, false if params are invalid or settings file is unavailable
 */

function push(vwoInstance, tagKey, tagValue, userId, customDimensionMap) {
  var api = ApiEnum.PUSH;

  if (!ValidateUtil.areValidParamsForAPIMethod({
    method: ApiEnum.PUSH,
    tagKey: tagKey,
    tagValue: tagValue,
    userId: userId,
    customDimensionMap: customDimensionMap
  })) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.PUSH_INVALID_PARAMS, {
      file: file,
      method: api
    }));
    return false;
  }

  if (tagKey.length > 255) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TAG_KEY_LENGTH_EXCEEDED, {
      file: file,
      tagKey: tagKey,
      userId: userId
    }));
    return false;
  }

  if (tagValue.length > 255) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TAG_VALUE_LENGTH_EXCEEDED, {
      file: file,
      tagKey: tagKey,
      userId: userId,
      tagValue: tagValue
    }));
    return false;
  }

  if (tagKey === ' ' && tagValue === ' ' && (!customDimensionMap || Object.keys(customDimensionMap).length === 0)) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.PUSH_INVALID_PARAMS_CD_MAP, {
      file: file,
      method: api
    }));
    return false;
  }

  if (tagKey !== ' ' && tagValue !== ' ') {
    customDimensionMap[tagKey] = tagValue;
  } // Get the cached configuration


  var config = vwoInstance.SettingsFileManager.getConfig();
  var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api); // If no settings are found, simply false

  if (!settingsFile) {
    return false;
  }

  if (config.batchEvents) {
    Object.keys(customDimensionMap).forEach(function (key) {
      var tagValue = DataTypeUtil.isString(customDimensionMap[key]) ? customDimensionMap[key] : JSON.stringify(customDimensionMap[key]);
      var properties = ImpressionUtil.buildBatchEventForPushing(settingsFile, key, tagValue, userId);
      vwoInstance.batchEventsQueue.enqueue(properties);
    });
  } else if (settingsFile.isEventArchEnabled) {
    var properties = ImpressionUtil.getEventsBaseProperties(settingsFile, EventEnum.VWO_SYNC_VISITOR_PROP);
    var payload = ImpressionUtil.getPushPayloadData(settingsFile, userId, EventEnum.VWO_SYNC_VISITOR_PROP, customDimensionMap);
    vwoInstance.eventQueue.process(config, properties, vwoInstance, payload);
  } else {
    Object.keys(customDimensionMap).forEach(function (key) {
      var tagValue = DataTypeUtil.isString(customDimensionMap[key]) ? customDimensionMap[key] : JSON.stringify(customDimensionMap[key]);
      var properties = ImpressionUtil.buildEventForPushing(settingsFile, key, tagValue, userId);
      vwoInstance.eventQueue.process(config, properties, vwoInstance);
    });
  }

  return true;
}

module.exports = push;

/***/ }),

/***/ "./lib/api/track.js":
/*!**************************!*\
  !*** ./lib/api/track.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var GoalTypeEnum = __webpack_require__(/*! ../enums/GoalTypeEnum */ "./lib/enums/GoalTypeEnum.js");

var ApiEnum = __webpack_require__(/*! ../enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var DecisionUtil = __webpack_require__(/*! ../utils/DecisionUtil */ "./lib/utils/DecisionUtil.js");

var CampaignUtil = __webpack_require__(/*! ../utils/CampaignUtil */ "./lib/utils/CampaignUtil.js");

var _require = __webpack_require__(/*! ../utils/ObjectUtil */ "./lib/utils/ObjectUtil.js"),
    objectValues = _require.objectValues;

var ImpressionUtil = __webpack_require__(/*! ../utils/ImpressionUtil */ "./lib/utils/ImpressionUtil.js");

var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var file = FileNameEnum.Track;
var GOAL_TYPE_TO_TRACK_DEFAULT = GoalTypeEnum.ALL;
var GOAL_IDENTIFIER_SEPERATOR = '_vwo_';
var api = ApiEnum.TRACK;
/**
 * This API method: Marks the conversion of the campaign for a particular goal
 *
 * 1. validates the arguments being passed
 * 2. Checks if user is eligible to get bucketed into the campaign,
 * 3. Gets the assigned determinitic variation to the user(based on userId), if user becomes part of campaign
 * 4. Sends an impression call to VWO server to track goal data
 *
 * @param {Object} vwoInstance               VWO instance which has logger, settingsFile etc.
 * @param {Number} campaignKey               unique campaign test key
 * @param {String} userId                    ID assigned to a user
 * @param {String} goalIdentifier             unique campaign's goal identifier
 * @param {Object} options                   Optional params
 */

function track(vwoInstance, campaignKey, userId, goalIdentifier) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var areParamsValid = false;

  if (DataTypeUtil.isObject(options)) {
    var revenueValue = options.revenueValue,
        customVariables = options.customVariables,
        variationTargetingVariables = options.variationTargetingVariables,
        userStorageData = options.userStorageData,
        goalTypeToTrack = options.goalTypeToTrack,
        shouldTrackReturningUser = options.shouldTrackReturningUser,
        metaData = options.metaData; // Check if arguments have valid data-type

    if (ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.TRACK,
      campaignKey: campaignKey,
      userId: userId,
      goalIdentifier: goalIdentifier,
      customVariables: customVariables,
      variationTargetingVariables: variationTargetingVariables,
      userStorageData: userStorageData,
      goalTypeToTrack: goalTypeToTrack,
      shouldTrackReturningUser: shouldTrackReturningUser,
      metaData: metaData
    }) && (!goalTypeToTrack || goalTypeToTrack && objectValues(GoalTypeEnum).includes(goalTypeToTrack))) {
      areParamsValid = true;
    }
  }

  if (areParamsValid === false) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_MISSING_PARAMS, {
      file: file
    }));
    return null;
  } // Get the cached configuration


  var config = vwoInstance.SettingsFileManager.getConfig();
  var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api);
  config.apiName = api;
  var revenuePropList = new Set(); // If no settings are found, simply do not track goal and return false

  if (!settingsFile) {
    return null;
  }

  var campaigns = [];
  goalTypeToTrack = goalTypeToTrack || config.goalTypeToTrack || GOAL_TYPE_TO_TRACK_DEFAULT; // priority order - options > launchConfig > default

  if (DataTypeUtil.isUndefined(shouldTrackReturningUser)) {
    // if shouldTrackReturningUser is not given in options
    if (DataTypeUtil.isBoolean(config.shouldTrackReturningUser)) {
      // if shouldTrackReturningUser is given in config at launch
      shouldTrackReturningUser = config.shouldTrackReturningUser;
    } else {
      shouldTrackReturningUser = false;
    }
  }

  if (!DataTypeUtil.isString(campaignKey)) {
    if (DataTypeUtil.isArray(campaignKey)) {
      campaigns = CampaignUtil.getCampaignsForKeys(settingsFile, campaignKey);
    } else {
      campaigns = CampaignUtil.getCampaignsForGoal(settingsFile, goalIdentifier, goalTypeToTrack);
    }
  } else {
    // Get the campaign settings based on campaignKey from the settings
    var campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);
    campaigns.push(campaign || {
      key: campaignKey
    });
  }

  var result = {};
  var metricMap = {};
  campaigns.forEach(function (campaign) {
    return result[campaign.key] = trackCampaignGoal(vwoInstance, campaign, campaign.key, userId, settingsFile, goalIdentifier, revenueValue, config, customVariables, variationTargetingVariables, userStorageData, goalTypeToTrack, shouldTrackReturningUser, metaData, metricMap, revenuePropList);
  });

  if (!Object.keys(result).length) {
    return null;
  }

  if (settingsFile.isEventArchEnabled && Object.keys(metricMap).length > 0) {
    var properties = ImpressionUtil.getEventsBaseProperties(settingsFile, goalIdentifier);
    var payload = ImpressionUtil.getTrackGoalPayloadData(settingsFile, userId, goalIdentifier, metricMap, revenueValue, revenuePropList);
    vwoInstance.eventQueue.process(config, properties, vwoInstance, payload);
    Object.keys(metricMap).forEach(function (key) {
      DecisionUtil._saveUserData(config, metricMap[key].campaign, metricMap[key].variationName, metricMap[key].userId, metricMap[key].metaData, goalIdentifier);
    });
  }

  return result;
}

function trackCampaignGoal(vwoInstance, campaign, campaignKey, userId, settingsFile, goalIdentifier, revenueValue, config, customVariables, variationTargetingVariables, userStorageData, goalTypeToTrack, shouldTrackReturningUser, metaData, metricMap, revenuePropList) {
  // If matching campaign is not found with campaignKey or if found but is in not RUNNING state, simply return no variation
  if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_RUNNING, {
      file: file,
      campaignKey: campaignKey,
      api: api
    }));
    return false;
  }

  if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_API, {
      file: file,
      campaignKey: campaignKey,
      campaignType: campaign.type,
      userId: userId,
      api: api
    }));
    return false;
  }

  var campaignId = campaign.id; // Get the campaign goal settings based on goalIdentifier

  var goal = CampaignUtil.getCampaignGoal(settingsFile, campaign.key, goalIdentifier);

  if (!goal) {
    // If no goal is found, something is wrong with the goalIdentifier
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_GOAL_NOT_FOUND, {
      file: file,
      userId: userId,
      goalIdentifier: goalIdentifier,
      campaignKey: campaignKey
    }));
    return false;
  } else if (goalTypeToTrack !== GOAL_TYPE_TO_TRACK_DEFAULT && goal.type !== goalTypeToTrack) {
    return false;
  } else if (goal.type === GoalTypeEnum.REVENUE && !ValidateUtil.isValidValue(revenueValue)) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TRACK_API_REVENUE_NOT_PASSED_FOR_REVENUE_GOAL, {
      file: file,
      userId: userId,
      goalIdentifier: goalIdentifier,
      campaignKey: campaignKey
    }));
    return false;
  }

  if (goal.type === GoalTypeEnum.REVENUE && goal.revenueProp) {
    revenuePropList.add(goal.revenueProp);
  }

  var _DecisionUtil$getVari = DecisionUtil.getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables, variationTargetingVariables, userStorageData, metaData, false, goalIdentifier, api),
      variationId = _DecisionUtil$getVari.variationId,
      variationName = _DecisionUtil$getVari.variationName,
      storedGoalIdentifier = _DecisionUtil$getVari.storedGoalIdentifier; // Is User is a part of Campaign and has been decided to be a part of particular variation


  if (variationName) {
    if (storedGoalIdentifier) {
      var identifiers = storedGoalIdentifier.split(GOAL_IDENTIFIER_SEPERATOR);

      if (!identifiers.includes(goalIdentifier)) {
        storedGoalIdentifier += GOAL_IDENTIFIER_SEPERATOR + goalIdentifier;

        DecisionUtil._saveUserData(config, campaign, variationName, userId, metaData, storedGoalIdentifier);
      } else if (!shouldTrackReturningUser) {
        vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOAL_ALREADY_TRACKED, {
          file: file,
          userId: userId,
          goalIdentifier: goalIdentifier,
          campaignKey: campaignKey
        }));
        return false;
      }
    } // If goal is found, send an impression to VWO server for report stats


    if (config.batchEvents) {
      var properties = ImpressionUtil.buildBatchEventForTrackingGoal(settingsFile, campaignId, variationId, userId, goal, revenueValue);
      vwoInstance.batchEventsQueue.enqueue(properties);
    } else if (settingsFile.isEventArchEnabled) {
      metricMap[campaign.id] = {
        config: config,
        campaign: campaign,
        variationName: variationName,
        userId: userId,
        metaData: metaData,
        goal: goal
      };
      return true;
    } else {
      var _properties = ImpressionUtil.buildEventForTrackingGoal(settingsFile, campaignId, variationId, userId, goal, revenueValue);

      vwoInstance.eventQueue.process(config, _properties, vwoInstance);
    }

    DecisionUtil._saveUserData(config, campaign, variationName, userId, metaData, goalIdentifier);

    return true;
  }

  return false;
}

module.exports = track;

/***/ }),

/***/ "./lib/constants/index.js":
/*!********************************!*\
  !*** ./lib/constants/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/* global SDK_NAME, SDK_VERSION */
var packageFile = {}; // For javascript-sdk, to keep the build size low
// avoid adding the whole package file in the file

if (true) {
  packageFile = {
    name: "vwo-javascript-sdk",
    version: "1.25.2"
  };
} else {}

module.exports = {
  SDK_NAME: packageFile.name,
  SDK_VERSION: packageFile.version,
  PLATFORM: 'server',
  SEED_VALUE: 1,
  MAX_TRAFFIC_PERCENT: 100,
  MAX_TRAFFIC_VALUE: 10000,
  MAX_EVENTS_PER_REQUEST: 5000,
  DEFAULT_EVENTS_PER_REQUEST: 100,
  DEFAULT_REQUEST_TIME_INTERVAL: 600,
  // 10 * 60(secs) = 600 secs i.e. 10 minutes
  STATUS_RUNNING: 'RUNNING',
  SEED_URL: 'https://vwo.com',
  HTTP_PROTOCOL: 'http://',
  HTTPS_PROTOCOL: 'https://',
  SDK_QUERY_PARAM: 'sdk',
  SDK_VERSION_QUERY_PARAM: 'sdk-v'
};

/***/ }),

/***/ "./lib/core/BucketingService.js":
/*!**************************************!*\
  !*** ./lib/core/BucketingService.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var Hasher = __webpack_require__(/*! murmurhash */ "./node_modules/murmurhash/murmurhash.js");

var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var CampaignUtil = __webpack_require__(/*! ../utils/CampaignUtil */ "./lib/utils/CampaignUtil.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();
var BucketingService = {
  /**
   * Generates Bucket Value of the User by hashing the User ID by murmurHash
   * and scaling it down.
   *
   * @param {Number} hashValue the hashValue generated after hashing
   * @param {Number} maxValue the value up-to which hashValue needs to be scaled
   * @param {Number} multiplier multiplier in case the traffic allocation is less than 100
   *
   * @return {Number} bucket Value of the User
   */
  _generateBucketValue: function _generateBucketValue(hashValue, maxValue) {
    var multiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var ratio = hashValue / Math.pow(2, 32);
    var multipliedValue = (maxValue * ratio + 1) * multiplier;
    var value = Math.floor(multipliedValue);
    return value;
  },

  /**
   * Returns the Variation by checking the Start and End Bucket Allocations of each Variation
   *
   * @param {Object} campaign which contains the variations
   * @param {Number} bucketValue the bucket Value of the user
   *
   * @return {Object|null} variation data allotted to the user or null if not
   */
  _getVariation: function _getVariation(variations, bucketValue) {
    for (var i = 0; i < Object.keys(variations).length; i++) {
      var variation = variations[i];

      if (bucketValue >= variation.startVariationAllocation && bucketValue <= variation.endVariationAllocation) {
        return variation;
      }
    }

    return null;
  },

  /**
   * Validates the User ID and generates Bucket Value of the User by hashing the userId by murmurHash and scaling it down.
   *
   * @param {String} userId the unique ID assigned to User
   *
   * @return {Number} the bucket Value allotted to User (between 1 to $this->$MAX_TRAFFIC_PERCENT)
   */
  _getBucketValueForUser: function _getBucketValueForUser(seed, userId, disableLog) {
    var hashValue = Hasher.v3(seed, Constants.SEED_VALUE);

    var bucketValue = BucketingService._generateBucketValue(hashValue, Constants.MAX_TRAFFIC_PERCENT);

    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_HASH_BUCKET_VALUE, {
      file: FileNameEnum.BucketingService,
      hashValue: hashValue,
      bucketValue: bucketValue,
      userId: userId
    }), disableLog);
    return bucketValue;
  },

  /**
   * Calculate if this user should become part of the campaign or not
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {Object} campaign fot getting the value of traffic allotted to the campaign
   *
   * @return {Boolean} if User is a part of Campaign or not
   */
  isUserPartOfCampaign: function isUserPartOfCampaign(userId, campaign) {
    var disableLog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!ValidateUtil.isValidValue(userId) || !campaign) {
      return false;
    }

    var trafficAllocation = campaign.percentTraffic;

    var valueAssignedToUser = BucketingService._getBucketValueForUser(CampaignUtil.getBucketingSeed(userId, campaign), userId, disableLog);

    var isUserPart = valueAssignedToUser !== 0 && valueAssignedToUser <= trafficAllocation;
    logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_ELIGIBILITY_FOR_CAMPAIGN, {
      file: FileNameEnum.BucketingService,
      userId: userId,
      isUserPart: isUserPart
    }), disableLog);
    return isUserPart;
  },

  /**
   * Validates the User ID and generates Variation into which the User is bucketed in.
   *
   * @param {String} userId the unique ID assigned to User
   * @param {Object} campaign the Campaign of which User is a part of
   *
   * @return {Object|null} variation data into which user is bucketed in or null if not
   */
  bucketUserToVariation: function bucketUserToVariation(userId, campaign) {
    var multiplier;

    if (!ValidateUtil.isValidValue(userId)) {
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_USER_ID, {
        file: FileNameEnum.BucketingService,
        userId: userId,
        method: 'bucketUserToVariation'
      }));
      return null;
    }

    if (!campaign) {
      return null;
    }

    if (campaign.percentTraffic) {
      multiplier = Constants.MAX_TRAFFIC_VALUE / campaign.percentTraffic / 100;
    }

    var hashValue = BucketingService._generateHashValue(campaign.isBucketingSeedEnabled ? "".concat(campaign.id, "_").concat(userId) : userId);

    var bucketValue = BucketingService._generateBucketValue(hashValue, Constants.MAX_TRAFFIC_VALUE, multiplier);

    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.VARIATION_HASH_BUCKET_VALUE, {
      file: FileNameEnum.BucketingService,
      userId: userId,
      campaignKey: campaign.key,
      percentTraffic: campaign.percentTraffic,
      bucketValue: bucketValue,
      hashValue: hashValue
    }));
    return BucketingService._getVariation(campaign.variations, bucketValue);
  },
  calculateBucketValue: function calculateBucketValue(seed) {
    var multiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var hashValue = BucketingService._generateHashValue(seed);

    return BucketingService._generateBucketValue(hashValue, Constants.MAX_TRAFFIC_VALUE, multiplier);
  },
  _generateHashValue: function _generateHashValue(userId) {
    return Hasher.v3(userId, Constants.SEED_VALUE);
  }
};
module.exports = BucketingService;

/***/ }),

/***/ "./lib/core/SegmentEvaluator.js":
/*!**************************************!*\
  !*** ./lib/core/SegmentEvaluator.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var SegmentEnum = __webpack_require__(/*! ../enums/segment */ "./lib/enums/segment/index.js");

var _require = __webpack_require__(/*! ../utils/ObjectUtil */ "./lib/utils/ObjectUtil.js"),
    getKeyValue = _require.getKeyValue;

var _require2 = __webpack_require__(/*! ../utils/SegmentUtil */ "./lib/utils/SegmentUtil.js"),
    operandCustomVariablesParser = _require2.operandCustomVariablesParser,
    operandUserParser = _require2.operandUserParser;

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var _SegmentEnum$SegmentO = SegmentEnum.SegmentOperatorTypes,
    AND = _SegmentEnum$SegmentO.AND,
    OR = _SegmentEnum$SegmentO.OR,
    NOT = _SegmentEnum$SegmentO.NOT;
var _SegmentEnum$SegmentO2 = SegmentEnum.SegmentOperandTypes,
    CUSTOM_VARIABLE = _SegmentEnum$SegmentO2.CUSTOM_VARIABLE,
    USER = _SegmentEnum$SegmentO2.USER;
var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var file = FileNameEnum.SegmentEvaluator;
var logger = logging.getLogger();
module.exports = SegmentEvaluator;
/**
 * This method: A parser which recursively evaluates the expression tree represented by dsl
 *
 * @param {Object} dsl                     The segments defined in the campaing
 * @param {Object} customVariables         Key/value pair of custom_attributs properties
 *
 * @return {Boolean}                       true if user is to be made part of campaign, else false
 */

function evaluator(dsl, customVariables) {
  var _getKeyValue = getKeyValue(dsl),
      key = _getKeyValue.key,
      value = _getKeyValue.value;

  var operator = key;
  var subDsl = value;

  if (operator === NOT) {
    return !evaluator(subDsl, customVariables);
  } else if (operator === AND) {
    var list = [];

    for (var i = 0; i < subDsl.length; i++) {
      list.push(evaluator(subDsl[i], customVariables));
    }

    return list.every(function (val) {
      return val;
    });
  } else if (operator === OR) {
    var _list = [];

    for (var _i = 0; _i < subDsl.length; _i++) {
      _list.push(evaluator(subDsl[_i], customVariables));
    }

    return _list.some(function (val) {
      return val;
    });
  } else if (operator === CUSTOM_VARIABLE) {
    return operandCustomVariablesParser(subDsl, customVariables);
  } else if (operator === USER) {
    return operandUserParser(subDsl, customVariables);
  }
}

function SegmentEvaluator(dsl) {
  var customVariables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var campaignKey = arguments.length > 2 ? arguments[2] : undefined;
  var userId = arguments.length > 3 ? arguments[3] : undefined;
  var variation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var disableLogs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  try {
    if (DataTypeUtil.isObject(dsl) && !Object.keys(dsl).length) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
        campaignKey: campaignKey,
        userId: userId,
        file: file
      }), disableLogs);
      return true;
    }

    if (DataTypeUtil.isObject(dsl) && Object.keys(dsl).length) {
      return evaluator(dsl, customVariables);
    }

    return true;
  } catch (err) {
    logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SEGMENTATION_ERROR, {
      campaignKey: campaignKey,
      userId: userId,
      customVariables: JSON.stringify(customVariables),
      file: file,
      err: err,
      variation: variation
    }), disableLogs);
    return false;
  }
}

/***/ }),

/***/ "./lib/core/VariationDecider.js":
/*!**************************************!*\
  !*** ./lib/core/VariationDecider.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var Bucketer = __webpack_require__(/*! ./BucketingService */ "./lib/core/BucketingService.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();
var VariationDecider = {
  /**
   * Returns the Variation Allotted to User
   *
   * @param {String} userId the unique ID assigned to User
   * @param {Object} campaign
   *
   * @return {Object} Variation object allotted to User
   */
  getVariationAllotted: function getVariationAllotted(userId, campaign) {
    var response = {
      variation: null,
      variationId: null,
      variationName: null
    };

    if (!ValidateUtil.isValidValue(userId)) {
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_USER_ID, {
        file: FileNameEnum.BucketingService,
        userId: userId,
        method: 'getVariationAllotted'
      }));
      return response;
    }

    if (Bucketer.isUserPartOfCampaign(userId, campaign)) {
      var variation = VariationDecider.getVariationOfCampaignForUser(userId, campaign) || {};
      response.variation = variation;
      response.variationId = variation.id;
      response.variationName = variation.name;
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GOT_VARIATION_FOR_USER, {
        file: FileNameEnum.VariationDecider,
        variationName: variation.name,
        userId: userId,
        campaignKey: campaign.key,
        method: 'getVariationAllotted'
      }));
    } else {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_NOT_PART_OF_CAMPAIGN, {
        file: FileNameEnum.VariationDecider,
        userId: userId,
        campaignKey: campaign.key,
        method: 'getVariationAllotted'
      }));
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
  getVariationOfCampaignForUser: function getVariationOfCampaignForUser(userId, campaign) {
    if (!ValidateUtil.isValidValue(userId) || !campaign) {
      return null;
    }

    var variation = Bucketer.bucketUserToVariation(userId, campaign);

    if (variation && variation.name) {
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_VARIATION_FOR_USER, {
        file: FileNameEnum.VariationDecider,
        variationName: variation.name,
        userId: userId,
        campaignKey: campaign.key
      }));
      return {
        variation: variation,
        name: variation.name,
        id: variation.id
      };
    }

    logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_GOT_NO_VARIATION, {
      file: FileNameEnum.VariationDecider,
      userId: userId,
      campaignKey: campaign.key
    }));
    return null;
  }
};
module.exports = VariationDecider;

/***/ }),

/***/ "./lib/enums/AnsiColorEnum.js":
/*!************************************!*\
  !*** ./lib/enums/AnsiColorEnum.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var AnsiColorEnum = {
  BOLD: '\x1b[1m',
  CYAN: '\x1b[36m',
  GREEN: '\x1b[32m',
  LIGHTBLUE: '\x1b[94m',
  RED: '\x1b[31m',
  RESET: '\x1b[0m',
  WHITE: '\x1b[30m',
  YELLOW: '\x1b[33m'
};
module.exports = AnsiColorEnum;

/***/ }),

/***/ "./lib/enums/ApiEnum.js":
/*!******************************!*\
  !*** ./lib/enums/ApiEnum.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var ApiEnum = {
  LAUNCH: 'launch',
  ACTIVATE: 'activate',
  GET_VARIATION_NAME: 'getVariation',
  TRACK: 'track',
  IS_FEATURE_ENABLED: 'isFeatureEnabled',
  GET_FEATURE_VARIABLE_VALUE: 'getFeatureVariableValue',
  PUSH: 'push'
};
module.exports = ApiEnum;

/***/ }),

/***/ "./lib/enums/CampaignTypeEnum.js":
/*!***************************************!*\
  !*** ./lib/enums/CampaignTypeEnum.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var CampaignTypeEnum = {
  FEATURE_TEST: 'FEATURE_TEST',
  FEATURE_ROLLOUT: 'FEATURE_ROLLOUT',
  AB: 'VISUAL_AB'
};
module.exports = CampaignTypeEnum;

/***/ }),

/***/ "./lib/enums/DataTypeEnum.js":
/*!***********************************!*\
  !*** ./lib/enums/DataTypeEnum.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var DataTypeEnum = {
  NUMBER: 'number',
  STRING: 'string',
  // FUNCTION: 'function',
  BOOLEAN: 'boolean',
  OBJECT: 'object'
};
module.exports = DataTypeEnum;

/***/ }),

/***/ "./lib/enums/EventEnum.js":
/*!********************************!*\
  !*** ./lib/enums/EventEnum.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var EventEnum = {
  VWO_VARIATION_SHOWN: 'vwo_variationShown',
  VWO_SYNC_VISITOR_PROP: 'vwo_syncVisitorProp'
};
module.exports = EventEnum;

/***/ }),

/***/ "./lib/enums/FeatureVariableTypeEnum.js":
/*!**********************************************!*\
  !*** ./lib/enums/FeatureVariableTypeEnum.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var FeatureVariableTypeEnum = {
  BOOLEAN: 'boolean',
  DOUBLE: 'double',
  INTEGER: 'integer',
  STRING: 'string',
  JSON: 'json'
};
module.exports = FeatureVariableTypeEnum;

/***/ }),

/***/ "./lib/enums/FileNameEnum.js":
/*!***********************************!*\
  !*** ./lib/enums/FileNameEnum.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var LIB_PATH = 'lib';
var CORE_PATH = 'lib/core';
var UTIL_PATH = 'lib/util';
var SERVICES_PATH = 'lib/services';
module.exports = {
  INDEX: "".concat(LIB_PATH, "/index"),
  VWO: "".concat(LIB_PATH, "/VWO"),
  API: "".concat(LIB_PATH, "/api/index"),
  Activate: "".concat(LIB_PATH, "/api/activate"),
  GetVariation: "".concat(LIB_PATH, "/api/getVariation"),
  Track: "".concat(LIB_PATH, "/api/track"),
  IsFeatureEnabled: "".concat(LIB_PATH, "/api/isFeatureEnabled"),
  GetFeatureVariableValue: "".concat(LIB_PATH, "/api/getFeatureVariableValue"),
  Push: "".concat(LIB_PATH, "/api/push"),
  SegmentEvaluator: "".concat(CORE_PATH, "/SegmentEvaluator"),
  BucketingService: "".concat(CORE_PATH, "/BucketingService"),
  VariationDecider: "".concat(CORE_PATH, "/VariationDecider"),
  ConsoleLogManager: "".concat(SERVICES_PATH, "/ConsoleLogManager"),
  EventQueue: "".concat(SERVICES_PATH, "/EventQueue"),
  LoggingManager: "".concat(SERVICES_PATH, "/LoggingManager"),
  SettingsFileManager: "".concat(SERVICES_PATH, "/SettingsFileManager"),
  BatchEventsQueue: "".concat(SERVICES_PATH, "/BatchEventsQueue"),
  CampaignUtil: "".concat(UTIL_PATH, "/CampaignUtil"),
  DataTypeUtil: "".concat(UTIL_PATH, "/DataTypeUtil"),
  EventDispatcher: "".concat(UTIL_PATH, "/EventDispatcher"),
  EventDispatcherUtil: "".concat(UTIL_PATH, "/EventDispatcherUtil"),
  FeatureUtil: "".concat(UTIL_PATH, "/FeatureUtil"),
  Functionutil: "".concat(UTIL_PATH, "/Functionutil"),
  ImpressionUtil: "".concat(UTIL_PATH, "/ImpressionUtil"),
  UuidUtil: "".concat(UTIL_PATH, "/UuidUtil"),
  ValidateUtil: "".concat(UTIL_PATH, "/ValidateUtil"),
  DecisionUtil: "".concat(UTIL_PATH, "/DecisionUtils"),
  HttpHandlerUtil: "".concat(UTIL_PATH, "/HttpHandlerUtil"),
  UsageStatsUtil: "".concat(SERVICES_PATH, "/UsageStats")
};

/***/ }),

/***/ "./lib/enums/GoalTypeEnum.js":
/*!***********************************!*\
  !*** ./lib/enums/GoalTypeEnum.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var GoalTypeEnum = {
  REVENUE: 'REVENUE_TRACKING',
  CUSTOM: 'CUSTOM_GOAL',
  ALL: 'ALL'
};
module.exports = GoalTypeEnum;

/***/ }),

/***/ "./lib/enums/HooksEnum.js":
/*!********************************!*\
  !*** ./lib/enums/HooksEnum.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var HooksEnum = {
  DECISION_TYPES: {
    CAMPAIGN_DECISION: 'CAMPAIGN_DECISION'
  }
};
module.exports = HooksEnum;

/***/ }),

/***/ "./lib/enums/LogLevelEnum.js":
/*!***********************************!*\
  !*** ./lib/enums/LogLevelEnum.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _LogLevelColorInfoEnu, _LogLevelInfoEnum;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var AnsiColorEnum = __webpack_require__(/*! ./AnsiColorEnum */ "./lib/enums/AnsiColorEnum.js");

var LogNumberLevel = {
  _0: 'NOTSET',
  _1: 'DEBUG',
  _2: 'INFO',
  _3: 'WARN',
  _4: 'ERROR'
};
var LogLevelEnum = {
  NOTSET: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4
};
var LogLevelColorInfoEnum = (_LogLevelColorInfoEnu = {}, _defineProperty(_LogLevelColorInfoEnu, LogLevelEnum.NOTSET, "".concat(AnsiColorEnum.BOLD).concat(AnsiColorEnum.WHITE, "[NOTSET]:").concat(AnsiColorEnum.RESET)), _defineProperty(_LogLevelColorInfoEnu, LogLevelEnum.DEBUG, "".concat(AnsiColorEnum.BOLD).concat(AnsiColorEnum.LIGHTBLUE, "[DEBUG]: ").concat(AnsiColorEnum.RESET)), _defineProperty(_LogLevelColorInfoEnu, LogLevelEnum.INFO, "".concat(AnsiColorEnum.BOLD).concat(AnsiColorEnum.CYAN, "[INFO]:  ").concat(AnsiColorEnum.RESET)), _defineProperty(_LogLevelColorInfoEnu, LogLevelEnum.WARN, "".concat(AnsiColorEnum.BOLD).concat(AnsiColorEnum.YELLOW, "[WARN]:  ").concat(AnsiColorEnum.RESET)), _defineProperty(_LogLevelColorInfoEnu, LogLevelEnum.ERROR, "".concat(AnsiColorEnum.BOLD).concat(AnsiColorEnum.RED, "[ERROR]: ").concat(AnsiColorEnum.RESET)), _LogLevelColorInfoEnu);
var LogLevelInfoEnum = (_LogLevelInfoEnum = {}, _defineProperty(_LogLevelInfoEnum, LogLevelEnum.NOTSET, "[NOTSET]:"), _defineProperty(_LogLevelInfoEnum, LogLevelEnum.DEBUG, "[DEBUG]: "), _defineProperty(_LogLevelInfoEnum, LogLevelEnum.INFO, "[INFO]:  "), _defineProperty(_LogLevelInfoEnum, LogLevelEnum.WARN, "[WARN]:  "), _defineProperty(_LogLevelInfoEnum, LogLevelEnum.ERROR, "[ERROR]: "), _LogLevelInfoEnum);
module.exports = {
  LogLevelEnum: LogLevelEnum,
  LogNumberLevel: LogNumberLevel,
  LogLevelInfoEnum: LogLevelInfoEnum,
  LogLevelColorInfoEnum: LogLevelColorInfoEnum
};

/***/ }),

/***/ "./lib/enums/LogMessageEnum.js":
/*!*************************************!*\
  !*** ./lib/enums/LogMessageEnum.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
    GETTING_STORED_VARIATION: '({file}): Got stored variation for User ID:{userId} of Campaign:{campaignKey} as Variation:{variationName}, found in UserStorageService',
    GOT_FROM_CACHE: '({file}): Got data from cache for the finalKey:{finalKey}',
    GOT_VARIATION_FOR_USER: '({file}): User ID:{userId} for Campaign:{campaignKey} got variationName:{variationName} inside method:{method}',
    IMPRESSION_FOR_PUSH: '({file}): impression built for pushing - {properties}',
    IMPRESSION_FOR_TRACK_GOAL: '({file}): impression built for track-goal - {properties}',
    IMPRESSION_FOR_TRACK_USER: '({file}): impression built for track-user - {properties}',
    IMPRESSION_FOR_EVENT_ARCH_TRACK_USER: '({file}): impression built for vwo_variationShown event for account ID:{a}, user ID:{u}, and campaign ID:{c}',
    IMPRESSION_FOR_EVENT_ARCH_TRACK_GOAL: '({file}): impression built for {goalName} event for accountId:{a}, user ID:{u}, and campaign ID:{c}',
    IMPRESSION_FOR_EVENT_ARCH_PUSH: '({file}): impression built for visitor property:{property} for accountId:{a} and user ID:{u}',
    LOG_LEVEL_SET: '({file}): Log level set to {level}',
    NO_STORED_VARIATION: '({file}): No stored variation for User ID:{userId} for Campaign:{campaignKey} found in UserStorageService',
    NO_USER_STORAGE_SERVICE_GET: '({file}): No UserStorageService to get stored data',
    NO_USER_STORAGE_SERVICE_SET: '({file}): No UserStorageService to set data',
    // REMOVE_FROM_CACHE: '({file}): Removed data from cache for the finalKey:{finalKey}',
    RESET_CACHE: '({file}): Cache Reset on VWO instantiation',
    SDK_INITIALIZED: '({file}): SDK properly initialzed',
    SEGMENTATION_SKIPPED: '({file}): For userId:{userId} of Campaign:{campaignKey}, segment was missing, hence skipping segmentation{variation}',
    SEGMENTATION_STATUS: '({file}): For userId:{userId} of Campaign:{campaignKey} with variables:{customVariables} {status} {segmentationType} {variation}',
    SET_DEVELOPMENT_MODE: '({file}): DEVELOPMENT mode is ON',
    SET_IN_CACHE: '({file}): Set data in cache for the finalKey:{finalKey}',
    SETTINGS_FILE_PROCESSED: '({file}): Settings file processed',
    USER_HASH_BUCKET_VALUE: '({file}): User ID:{userId} having hash:{hashValue} got bucketValue:{bucketValue}',
    USER_NOT_PART_OF_Campaign: '({file}): userId:{userId} for Campaign:{campaignKey} did not become part of campaign, method:{method}',
    UUID_FOR_USER: '({file}): Uuid generated for User ID:{userId} and accountId:{accountId} is {desiredUuid}',
    VALID_CONFIGURATION: '({file}): SDK configuration and account settings are valid',
    VARIATION_HASH_BUCKET_VALUE: '({file}): User ID:{userId} for Campaign:{campaignKey} having percent traffic:{percentTraffic} got hash-value:{hashValue} and bucket value:{bucketValue}',
    WHITELISTING_SKIPPED: '({file}): For userId:{userId} of Campaign:{campaignKey}, whitelisting was skipped',
    STARTED_POLLING: '({file}): Polling of settings-file is registered with a periodic interval of {pollingInterval}ms',
    BATCH_EVENT_LIMIT_EXCEEDED: '({file}): Impression event - {endPoint} failed due to exceeding payload size. Parameter eventsPerRequest in batchEvents config in launch API has value:{eventsPerRequest} for accountId:{accountId}. Please read the official documentation for knowing the size limits',
    BULK_NOT_PROCESSED: "({file}): Batch events couldn't be received by VWO. Calling Flush Callback with error and data",
    BEFORE_FLUSHING: '({file}): Flushing events queue {manually} having {length} events for account:{accountId}. {timer}',
    FLUSH_EVENTS: '{{file}}: Manually flushing events for account:{accountId} having {queueLength} events',
    CAMPAIGN_NOT_ACTIVATED: '({file}): Campaign:{campaignKey} for User ID:{userId} is not yet activated for API:{api}. Use activate API to activate A/B test or isFeatureEnabled API to activate Feature Test.',
    GOT_ELIGIBLE_CAMPAIGNS: '({file}): Campaigns: {eligibleCampaignKeys} are eligible, {inEligibleText} are ineligible from the Group:{groupName} for the User Id:{userId}'
  },
  ERROR_MESSAGES: {
    API_HAS_CORRUPTED_SETTINGS_FILE: '({file}): "{api}" API has corrupted settings-file. Please check or reach out to VWO support',
    ACTIVATE_API_MISSING_PARAMS: '({file}): "activate" API got bad parameters. It expects campaignKey(String) as first, userId(String) as second and options(optional Object) as third argument',
    CAMPAIGN_NOT_RUNNING: '({file}): API used:{api} - Campaign:{campaignKey} is not RUNNING. Please verify from VWO App',
    GET_FEATURE_VARIABLE_MISSING_PARAMS: "({file}): \"getFeatureVariableValue\" API got bad parameters. It expects campaignKey(String) as first, variableKey(String) as second, userId(String) as third, and options(optional Object) as fourth argument",
    GET_VARIATION_API_MISSING_PARAMS: '({file}): "getVariation" API got bad parameters. It expects campaignKey(String) as first, userId(String) as second and options(optional Object) as third argument',
    IMPRESSION_FAILED: '({file}): Impression event could not be sent to VWO - {endPoint}. Reason: {err}',
    INVALID_API: '({file}): {api} API is not valid for Campaign:{campaignKey} of type:{campaignType} for User ID:{userId}',
    INVALID_SETTINGS_FILE: '({file}): Settings-file fetched is not proper',
    IS_FEATURE_ENABLED_API_MISSING_PARAMS: '({file}): "isFeatureEnabled" API got bad parameters. It expects Campaign(String) as first, userId(String) as second and options(optional Object) as third argument',
    GET_USER_STORAGE_SERVICE_FAILED: '({file}): Getting data from UserStorageService failed for User ID:{userId}',
    SDK_CONFIG_CORRUPTED: '({file}): config passed to launch API is not a valid JSON object',
    PUSH_INVALID_PARAMS: '({file}): "{method}" API got bad parameters. It expects tagKey(String) as first, tagValue(String) as second and userId(String) as third argument',
    PUSH_INVALID_PARAMS_CD_MAP: '({file}): "{method}" API got bad parameters. It expects customDimensionMap(String, String) as first and userId(String) as second argument',
    REGEX_CREATION_FAILED: '({file}): Regex cound not be processed',
    SET_USER_STORAGE_SERVICE_FAILED: '({file}): Saving data into UserStorageService failed for User ID:{userId}',
    SEGMENTATION_ERROR: '({file}): Error while segmenting the user:{userId} of Campaign:{campaignKey}{variation} with customVariables:{customVariables}. Error message: {err}',
    SETTINGS_FILE_CORRUPTED: '({file}): Settings file is corrupted. Please contact VWO Support for help',
    TAG_KEY_LENGTH_EXCEEDED: '({file}): Length of tagKey:{tagKey} for userID:{userId} can not be greater than 255',
    TAG_VALUE_LENGTH_EXCEEDED: '({file}): Length of value:{tagValue} of tagKey:{tagKey} for userID:{userId} can not be greater than 255',
    TRACK_API_GOAL_NOT_FOUND: '({file}): Goal:{goalIdentifier} not found for Campaign:{campaignKey} and userId:{userId}',
    TRACK_API_MISSING_PARAMS: '({file}): "track" API got bad parameters. It expects campaignKey(String or Array of strings or null or undefined) as first, userId(String) as second, goalIdentifier(String/Number) as third and options(optional Object) as fourth argument',
    TRACK_API_REVENUE_NOT_PASSED_FOR_REVENUE_GOAL: '({file}): Revenue value should be passed for revenue goal:{goalIdentifier} for Campaign:{campaignKey} and userId:{userId}',
    UNABLE_TO_CAST_VALUE: "({file}): Unable to cast value:{variableValue} to type:{variableType}, returning null",
    VARIABLE_NOT_FOUND: "({file}): Variable:{variableKey} for User ID:{userId} is not found in settings-file. Returning null",
    NO_CAMPAIGN_FOUND: "({file}): No campaign found for goalIdentifier:{goalIdentifier}. Please verify from VWO app.",
    POLLING_FAILED: '({file}): Failed fetching of Settings-file via polling for the accountId:{accountId}',
    POLLING_INTERVAL_INVALID: '({file}): pollingParameter provided is not of type number',
    SDK_KEY_NOT_PROVIVED: '({file}): sdkKey is required along with pollingInterval to poll the settings-file',
    SDK_KEY_NOT_STRING: '({file}): sdkKey provided is not of type string',
    INVALID_USER_ID: '({file}): Invalid userId:{userId} passed to {method} of this file',
    EVENT_BATCHING_NOT_OBJECT: '({file}): Batch events settings are not of type object',
    NO_BATCH_QUEUE: '{{file}}: No batch queue present for account:{accountId} when calling flushEvents API. Check batchEvents config in launch API'
  },
  INFO_MESSAGES: {
    FEATURE_ENABLED_FOR_USER: "({file}): Campaign:{campaignKey} for user ID:{userId} is enabled",
    FEATURE_NOT_ENABLED_FOR_USER: "({file}): Campaign:{campaignKey} for user ID:{userId} is not enabled",
    IMPRESSION_SUCCESS: '({file}): Impression event - {endPoint} was successfully received by VWO having main keys: accountId:{accountId}, {mainKeys}',
    IMPRESSION_SUCCESS_FOR_EVENT_ARCH: '({file}): Impression for {event} - {endPoint} was successfully received by VWO for account ID:{a}',
    INVALID_VARIATION_KEY: '({file}): Variation was not assigned to User ID:{userId} for Campaign:{campaignKey}',
    GETTING_DATA_USER_STORAGE_SERVICE: '({file}): Getting data from UserStorageService for User ID:{userId} successful',
    SETTING_DATA_USER_STORAGE_SERVICE: '({file}): Setting data into UserStorageService for User ID:{userId} successful',
    SEGMENTATION_STATUS: '({file}): UserId:{userId} of Campaign:{campaignKey} with variables:{customVariables} {status} {segmentationType} {variation}',
    USER_GOT_NO_VARIATION: '({file}): User ID:{userId} for Campaign:{campaignKey} did not allot any variation',
    USER_RECEIVED_VARIABLE_VALUE: "({file}): Value for variable:{variableKey} of feature flag:{campaignKey} is:{variableValue} for user:{userId}",
    VARIABLE_NOT_USED_RETURN_DEFAULT_VARIABLE_VALUE: "({file}): Variable:{variableKey} is not used in variation:{variationName}. Returning default value",
    VARIATION_ALLOCATED: '({file}): User ID:{userId} of Campaign:{campaignKey} got variation:{variationName}',
    NO_VARIATION_ALLOCATED: '({file}): User ID:{userId} of Campaign:{campaignKey} did not get any variation',
    VARIATION_RANGE_ALLOCATION: '({file}): Campaign:{campaignKey} having variation:{variationName} with weight:{variationWeight} got range as: ( {start} - {end} ))',
    GOAL_ALREADY_TRACKED: '({file}): Goal:{goalIdentifier} of Campaign:{campaignKey} for User ID:{userId} has already been tracked earlier. Skipping now',
    USER_ALREADY_TRACKED: '({file}): User ID:{userId} for Campaign:{campaignKey} has already been tracked earlier for "{api}" API. Skipping now',
    POLLING_SUCCESS: '({file}): Settings-file fetched successfully via polling for the accountId:{accountId}',
    SETTINGS_FILE_UPDATED: '({file}): vwo-sdk instance is updated with the latest settings-file for the accountId:{accountId}',
    USER_ELIGIBILITY_FOR_CAMPAIGN: '({file}): Is User ID:{userId} part of campaign? {isUserPart}',
    GOT_VARIATION_FOR_USER: '({file}): userId:{userId} for campaign:{campaignTestKey} got variationName:{variationName}',
    BULK_IMPRESSION_SUCCESS: '({file}): Impression event - {endPoint} was successfully received by VWO having accountId:{a}',
    AFTER_FLUSHING: '({file}): Events queue having {length} events has been flushed {manually}',
    SETTINGS_NOT_UPDATED: '{{file}}: Settings-file fetched are same as earlier fetched settings',
    GOT_STORED_VARIATION: '({file}): Got stored variation for User ID:{userId} of Campaign:{campaignKey} as Variation:{variationName}, found in UserStorageService',
    CAMPAIGN_NOT_ACTIVATED: '({file}): Activate the campaign:{campaignKey} for User ID:{userId} to {reason}.',
    GOT_WINNER_CAMPAIGN: '({file}): Campaign:{campaignKey} is selected from the mutually exclusive group:{groupName} for the User ID:{userId}.',
    GOT_ELIGIBLE_CAMPAIGNS: '({file}): Got {noOfEligibleCampaigns} eligible winners out of {noOfGroupCampaigns} campaigns from the Group:{groupName} and for User ID:{userId}',
    CALLED_CAMPAIGN_NOT_WINNER: '({file}): Campaign:{campaignKey} does not qualify from the mutually exclusive group:{groupName} for User ID:{userId}',
    OTHER_CAMPAIGN_SATISFIES_WHITELISTING_STORAGE: '({file}): Campaign:{campaignKey} of Group:{groupName} satisfies {type} for User ID:{userId}'
  },
  WARNING_MESSAGES: {}
};

/***/ }),

/***/ "./lib/enums/StatusEnum.js":
/*!*********************************!*\
  !*** ./lib/enums/StatusEnum.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  PASSED: 'passed',
  FAILED: 'failed'
};

/***/ }),

/***/ "./lib/enums/UrlEnum.js":
/*!******************************!*\
  !*** ./lib/enums/UrlEnum.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var UrlEnum = {
  BASE_URL: 'dev.visualwebsiteoptimizer.com',
  SETTINGS_URL: '/server-side/settings',
  WEBHOOK_SETTINGS_URL: '/server-side/pull',
  TRACK_USER: '/server-side/track-user',
  TRACK_GOAL: '/server-side/track-goal',
  PUSH: '/server-side/push',
  BATCH_EVENTS: '/server-side/batch-events',
  EVENTS: '/events/t'
};
module.exports = UrlEnum;

/***/ }),

/***/ "./lib/enums/segment/SegmentOperandTypesEnum.js":
/*!******************************************************!*\
  !*** ./lib/enums/segment/SegmentOperandTypesEnum.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  CUSTOM_VARIABLE: 'custom_variable',
  USER: 'user'
};

/***/ }),

/***/ "./lib/enums/segment/SegmentOperandValueTypeRegexesEnum.js":
/*!*****************************************************************!*\
  !*** ./lib/enums/segment/SegmentOperandValueTypeRegexesEnum.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  LOWER: /^lower/,
  LOWER_MATCH: /^lower\((.*)\)/,
  WILDCARD: /^wildcard/,
  WILDCARD_MATCH: /^wildcard\((.*)\)/,
  REGEX: /^regex/,
  REGEX_MATCH: /^regex\((.*)\)/,
  STARTING_STAR: /^\*/,
  ENDING_STAR: /\*$/
};

/***/ }),

/***/ "./lib/enums/segment/SegmentOperandValuesEnum.js":
/*!*******************************************************!*\
  !*** ./lib/enums/segment/SegmentOperandValuesEnum.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  LOWER_VALUE: 1,
  STARTING_ENDING_STAR_VALUE: 2,
  STARTING_STAR_VALUE: 3,
  ENDING_STAR_VALUE: 4,
  REGEX_VALUE: 5,
  EQUAL_VALUE: 6
};

/***/ }),

/***/ "./lib/enums/segment/SegmentOperatorTypesEnum.js":
/*!*******************************************************!*\
  !*** ./lib/enums/segment/SegmentOperatorTypesEnum.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  AND: 'and',
  NOT: 'not',
  OR: 'or'
};

/***/ }),

/***/ "./lib/enums/segment/index.js":
/*!************************************!*\
  !*** ./lib/enums/segment/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var SegmentOperandTypes = __webpack_require__(/*! ./SegmentOperandTypesEnum */ "./lib/enums/segment/SegmentOperandTypesEnum.js");

var SegmentOperatorTypes = __webpack_require__(/*! ./SegmentOperatorTypesEnum */ "./lib/enums/segment/SegmentOperatorTypesEnum.js");

var SegmentOperandValueTypeRegexes = __webpack_require__(/*! ./SegmentOperandValueTypeRegexesEnum */ "./lib/enums/segment/SegmentOperandValueTypeRegexesEnum.js");

var SegmentOperandValues = __webpack_require__(/*! ./SegmentOperandValuesEnum */ "./lib/enums/segment/SegmentOperandValuesEnum.js");

var SegmentEnum = {
  SegmentOperandTypes: SegmentOperandTypes,
  SegmentOperatorTypes: SegmentOperatorTypes,
  SegmentOperandValueTypeRegexes: SegmentOperandValueTypeRegexes,
  SegmentOperandValues: SegmentOperandValues
};
module.exports = SegmentEnum;

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var VWO = __webpack_require__(/*! ./VWO */ "./lib/VWO.js");

var DataTypeUtil = __webpack_require__(/*! ./utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var FunctionUtil = __webpack_require__(/*! ./utils/FunctionUtil */ "./lib/utils/FunctionUtil.js");

var _require = __webpack_require__(/*! ./utils/ObjectUtil */ "./lib/utils/ObjectUtil.js"),
    objectValues = _require.objectValues;

var SettingsFileUtil = __webpack_require__(/*! ./utils/SettingsFileUtil */ "./lib/utils/SettingsFileUtil.js");

var GoalTypeEnum = __webpack_require__(/*! ./enums/GoalTypeEnum */ "./lib/enums/GoalTypeEnum.js");

var _require2 = __webpack_require__(/*! ./constants */ "./lib/constants/index.js"),
    MAX_EVENTS_PER_REQUEST = _require2.MAX_EVENTS_PER_REQUEST;

var logging = __webpack_require__(/*! ./services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ./enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var file = FileNameEnum.INDEX;
var setLogHandler = logging.setLogHandler,
    setLogLevel = logging.setLogLevel,
    LogLevelEnum = logging.LogLevelEnum,
    LogNumberLevel = logging.LogNumberLevel,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger(); // By default, all ERRORS should be logged

logging.setLogLevel(LogLevelEnum.ERROR);

function logError(log) {
  logger.log(LogLevelEnum.ERROR, log);
  throw new Error(logger.log(LogLevelEnum.ERROR, log));
}

module.exports = {
  logging: logging,
  setLogger: setLogHandler,
  setLogLevel: setLogLevel,
  getSettingsFile: SettingsFileUtil.get,
  GoalTypeEnum: GoalTypeEnum,

  /**
   * Initializes the SDK and parses the settingsfile
   *
   * @param {Object} config configuration for the SDK
   */
  launch: function launch(sdkConfig) {
    var config = {};

    try {
      // validating config schema
      FunctionUtil.cloneObject(sdkConfig);

      if (!DataTypeUtil.isUndefined(sdkConfig.shouldTrackReturningUser) && !DataTypeUtil.isBoolean(sdkConfig.shouldTrackReturningUser)) {
        throw new Error('shouldTrackReturningUser should be boolean');
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.isDevelopmentMode) && !DataTypeUtil.isBoolean(sdkConfig.isDevelopmentMode)) {
        throw new Error('isDevelopmentMode should be boolean');
      }

      if (sdkConfig.goalTypeToTrack && !objectValues(GoalTypeEnum).includes(sdkConfig.goalTypeToTrack)) {
        throw new Error('goalTypeToTrack should be certain strings');
      }

      if (sdkConfig.logging && sdkConfig.logging.level && !objectValues(LogLevelEnum).includes(sdkConfig.logging.level)) {
        throw new Error('log level should be certain values');
      }

      if (sdkConfig.pollingInterval && !DataTypeUtil.isNumber(sdkConfig.pollingInterval)) {
        var log = LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.POLLING_INTERVAL_INVALID, {
          file: file
        });
        logError(log);
      }

      if (sdkConfig.pollingInterval && DataTypeUtil.isUndefined(sdkConfig.sdkKey)) {
        var _log = LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SDK_KEY_NOT_PROVIVED, {
          file: file
        });

        logError(_log);
      }

      if (sdkConfig.pollingInterval && !DataTypeUtil.isString(sdkConfig.sdkKey)) {
        var _log2 = LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SDK_KEY_NOT_STRING, {
          file: file
        });

        logError(_log2);
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.batchEvents) && !DataTypeUtil.isObject(sdkConfig.batchEvents)) {
        var _log3 = LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.EVENT_BATCHING_NOT_OBJECT, {
          file: file
        });

        logError(_log3);
      }

      if (DataTypeUtil.isObject(sdkConfig.batchEvents) && "undefined" === 'undefined') {
        sdkConfig.batchEvents = null;
      }

      if (false) {}

      config = sdkConfig;
    } catch (err) {
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SDK_CONFIG_CORRUPTED, {
        file: file
      }));
      config = {};
    } // If DEV mode, set colorful logs to true


    if (config.isDevelopmentMode) {
      logging.setLogColorMode(true);
    } // If logging is enabled, use the logger and logLevel defined by the client


    if (config.logging && DataTypeUtil.isObject(config.logging)) {
      if (config.logging.haveColoredLogs !== undefined) {
        logging.setLogColorMode(config.logging.haveColoredLogs);
      }

      if (config.logging.logger && DataTypeUtil.isObject(config.logging.logger) && DataTypeUtil.isFunction(config.logging.logger.log)) {
        logging.setLogHandler(config.logging.logger);
        logging.setLogLevel(logging.LogLevelEnum.NOTSET);
        logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CUSTOM_LOGGER_USED, {
          file: file
        }));
      } else if (config.logging.logger) {
        logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CUSTOM_LOGGER_MISCONFIGURED, {
          file: file
        }));
      }

      if (config.logging.level !== undefined) {
        logging.setLogLevel(config.logging.level);
        logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.LOG_LEVEL_SET, {
          file: file,
          level: LogNumberLevel['_' + config.logging.level]
        }));
      }
    } // DEBUG log for knowing whether it's DEV mode


    if (config.isDevelopmentMode) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SET_DEVELOPMENT_MODE, {
        file: file
      }));
    } // Set logger on config Obkect, to be required later


    config.logger = config.logging && config.logging.logger || logger; // Create an instance of VWO class which exposes API methods

    return new VWO(config);
  }
};

/***/ }),

/***/ "./lib/schemas/SettingsFileSchema.js":
/*!*******************************************!*\
  !*** ./lib/schemas/SettingsFileSchema.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
var _require = __webpack_require__(/*! superstruct */ "./node_modules/superstruct/lib/index.es.js"),
    validate = _require.validate,
    number = _require.number,
    string = _require.string,
    _boolean = _require["boolean"],
    array = _require.array,
    object = _require.object,
    optional = _require.optional,
    union = _require.union,
    type = _require.type,
    record = _require.record;

var campaignGoalSchema = type({
  id: union([number(), string()]),
  identifier: string(),
  type: string(),
  revenueProp: optional(string())
});
var variableObjectSchema = type({
  id: union([number(), string()]),
  type: string(),
  key: string(),
  value: union([number(), string(), _boolean()])
});
var campaignVariationSchema = type({
  id: union([number(), string()]),
  name: string(),
  weight: union([number(), string()]),
  changes: optional(object()),
  segments: optional(object()),
  variables: optional(union([object(), array(variableObjectSchema)])),
  isFeatureEnabled: optional(_boolean()),
  startVariationAllocation: optional(number()),
  endVariationAllocation: optional(number())
});
var campaignObjectSchema = type({
  id: union([number(), string()]),
  type: string(),
  key: string(),
  status: string(),
  name: string(),
  isBucketingSeedEnabled: optional(_boolean()),
  percentTraffic: number(),
  goals: union([object(), array(campaignGoalSchema)]),
  variations: union([object(), array(campaignVariationSchema)]),
  variables: optional(union([object(), array(variableObjectSchema)])),
  segments: object(),
  isForcedVariationEnabled: optional(_boolean()),
  isUserListEnabled: optional(_boolean())
});
var groupSchema = type({
  groupName: string(),
  campaigns: array(number())
});
var settingsFileSchema = type({
  sdkKey: optional(string()),
  version: union([number(), string()]),
  accountId: union([number(), string()]),
  campaigns: array(campaignObjectSchema),
  campaignGroups: optional(record(string(), number())),
  isEventArchEnabled: optional(_boolean()),
  groups: optional(union([object(), record(string(), groupSchema)]))
});

var validateSettingsFile = function validateSettingsFile(settings) {
  var _validate = validate(settings, settingsFileSchema),
      _validate2 = _slicedToArray(_validate, 1),
      error = _validate2[0];

  return !error;
};

module.exports = validateSettingsFile;

/***/ }),

/***/ "./lib/services/EventQueue.js":
/*!************************************!*\
  !*** ./lib/services/EventQueue.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var EventDispatcher = __webpack_require__(/*! ../utils/EventDispatcherUtil */ "./lib/utils/EventDispatcherUtil.js");

var EventQueue =
/*#__PURE__*/
function () {
  function EventQueue() {
    _classCallCheck(this, EventQueue);

    this.running = false;
    this.queue = [];
  }

  _createClass(EventQueue, [{
    key: "process",
    value: function process(config, properties, vwoInstance, payload) {
      if (config && config.isDevelopmentMode) {
        return;
      }

      this.enqueue(properties, vwoInstance, payload);
    }
  }, {
    key: "enqueue",
    value: function enqueue(properties, vwoInstance, payload) {
      this.queue.push({
        eventName: properties.eventName,
        properties: properties,
        callback: function callback() {
          if (payload) {
            EventDispatcher.dispatchPostCall(properties, payload);
          } else {
            EventDispatcher.dispatchGetCall(properties);
          }
        }
      });
      vwoInstance.eventQueue.executeNext(properties);

      if (!this.running) {
        // if nothing is running, then start the engines!
        this.executeNext(properties);
      }

      return this;
    }
  }, {
    key: "executeNext",
    value: function executeNext(properties) {
      this.running = false; // get the first element off the queue

      if (this.queue && this.queue.length) {
        var event = this.queue.shift();

        if (event) {
          this.running = true;

          if (event.callback && DataTypeUtil.isFunction(event.callback)) {
            event.callback(properties);
          }
        }
      }
    }
  }]);

  return EventQueue;
}();

module.exports = EventQueue;

/***/ }),

/***/ "./lib/services/HooksManager.js":
/*!**************************************!*\
  !*** ./lib/services/HooksManager.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");
/**
 * Hooks Manager is responsible for triggering callbacks useful to the end-user based on certain lifecycle events.
 * Possible use with integrations when the user intends to send an event when a visitor is part of the experiment.
 */


var HooksManager = {
  /**
   * Initializes with configuration from VWO Object.
   * @param {Object} config
   */
  init: function init() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.callback = config.integrations && config.integrations.callback;
  },

  /**
   * Executes the callback
   * @param {Object} properties Properties from the callback
   */
  execute: function execute(properties) {
    if (DataTypeUtil.isFunction(this.callback)) {
      this.callback(properties);
    }
  }
};
module.exports = HooksManager;

/***/ }),

/***/ "./lib/services/SettingsFileManager.js":
/*!*********************************************!*\
  !*** ./lib/services/SettingsFileManager.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var CampaignUtil = __webpack_require__(/*! ../utils/CampaignUtil */ "./lib/utils/CampaignUtil.js");

var FunctionUtil = __webpack_require__(/*! ../utils/FunctionUtil */ "./lib/utils/FunctionUtil.js");

var SettingsFileUtil = __webpack_require__(/*! ../utils/SettingsFileUtil */ "./lib/utils/SettingsFileUtil.js");

var logging = __webpack_require__(/*! ./logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var validateSettingsFile = __webpack_require__(/*! ../schemas/SettingsFileSchema */ "./lib/schemas/SettingsFileSchema.js");

var _require = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js"),
    isObject = _require.isObject;

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var file = FileNameEnum.SettingsFileManager;

var SettingsFileManager =
/*#__PURE__*/
function () {
  // PRIVATE METHODS
  function SettingsFileManager(config) {
    _classCallCheck(this, SettingsFileManager);

    if (config) {
      if (config.settingsFile && isObject(config.settingsFile.campaigns) || config.settingsFile && !config.settingsFile.campaigns) {
        config.settingsFile.campaigns = [];
      }

      this._configObj = config;
      this._clonedSettingsFile = config.settingsFile ? FunctionUtil.cloneObject(config.settingsFile) : null;
    } else {
      this._configObj = null;
      this._clonedSettingsFile = null;
    }
  }

  _createClass(SettingsFileManager, [{
    key: "_setVariationBucketing",
    value: function _setVariationBucketing(campaign) {
      CampaignUtil.setVariationAllocation(campaign);
    } // PUBLIC METHODS

  }, {
    key: "isSettingsFileValid",
    value: function isSettingsFileValid() {
      if (!this._configObj || !this._clonedSettingsFile) {
        return false;
      }

      var isValidSettingsFile = validateSettingsFile(this._clonedSettingsFile);

      if (!isValidSettingsFile) {
        this._configObj.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SETTINGS_FILE_CORRUPTED, {
          file: file
        }));

        return false;
      }

      return true;
    }
  }, {
    key: "checkAndPoll",
    value: function checkAndPoll() {
      var _this = this;

      if (!this._configObj.pollingInterval || !this._configObj.sdkKey) {
        return;
      }

      var lastSettingsFile = JSON.stringify(this._clonedSettingsFile);
      setInterval(function () {
        SettingsFileUtil.get(_this._clonedSettingsFile.accountId, _this._configObj.sdkKey).then(function (latestSettingsFile) {
          _this._configObj.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.POLLING_SUCCESS, {
            file: file,
            accountId: _this._clonedSettingsFile.accountId
          }));

          var stringifiedLatestSettingsFile = JSON.stringify(latestSettingsFile);

          if (stringifiedLatestSettingsFile !== lastSettingsFile) {
            lastSettingsFile = stringifiedLatestSettingsFile;

            _this.updateSettingsFile(latestSettingsFile);

            _this._configObj.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SETTINGS_FILE_UPDATED, {
              file: file,
              accountId: _this._clonedSettingsFile.accountId
            }));
          } else {
            _this._configObj.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SETTINGS_NOT_UPDATED, {
              file: file,
              accountId: _this._clonedSettingsFile.accountId
            }));
          }
        })["catch"](function (_e) {
          _this._configObj.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.POLLING_FAILED, {
            file: file,
            accountId: _this._clonedSettingsFile.accountId
          }));
        });
      }, this._configObj.pollingInterval);

      this._configObj.logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.STARTED_POLLING, {
        file: file,
        pollingInterval: this._configObj.pollingInterval
      }));
    }
  }, {
    key: "processSettingsFile",
    value: function processSettingsFile() {
      var settingsFile = this._clonedSettingsFile;

      for (var i = 0; i < settingsFile.campaigns.length; i++) {
        var campaign = settingsFile.campaigns[i];

        this._setVariationBucketing(campaign);
      }

      this._configObj.logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SETTINGS_FILE_PROCESSED, {
        file: file
      }));

      return settingsFile;
    }
    /**
     * Fetch latest settings-file and update so that vwoClientInstance could use latest settings
     * Helpful especially when using webhooks
     *
     * @param {Number} accountId
     * @param {String} sdkKey
     *
     * @return {Promise}
     */

  }, {
    key: "getAndUpdateSettingsFile",
    value: function getAndUpdateSettingsFile() {
      var _this2 = this;

      var accountId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._clonedSettingsFile.accountId;
      var sdkKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._clonedSettingsFile.sdkKey;
      return new Promise(function (resolve, _reject) {
        SettingsFileUtil.get(accountId, sdkKey, null, {
          isViaWebhook: true
        }).then(function (settings) {
          _this2.updateSettingsFile(settings);

          resolve(settings);
        })["catch"](function (_err) {});
      });
    }
    /**
     * Update the settings-file on the instance so that latest settings could be used from next hit onwards
     * @param {Object} settings
     */

  }, {
    key: "updateSettingsFile",
    value: function updateSettingsFile(settings) {
      this._clonedSettingsFile = FunctionUtil.cloneObject(settings);
      this.processSettingsFile();
    }
  }, {
    key: "getConfig",
    value: function getConfig() {
      return this._configObj;
    }
  }, {
    key: "getSettingsFile",
    value: function getSettingsFile(api) {
      if (!this._clonedSettingsFile) {
        this._configObj.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_HAS_CORRUPTED_SETTINGS_FILE, {
          file: file,
          api: api
        }));
      }

      return this._clonedSettingsFile;
    }
  }]);

  return SettingsFileManager;
}();

module.exports = SettingsFileManager;

/***/ }),

/***/ "./lib/services/UsageStats.js":
/*!************************************!*\
  !*** ./lib/services/UsageStats.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var _require = __webpack_require__(/*! ./logging */ "./lib/services/logging/index.js"),
    LogManager = _require.LogManager;

var UsageStats =
/*#__PURE__*/
function () {
  function UsageStats() {
    _classCallCheck(this, UsageStats);

    this.data = {};
  }
  /**
   * Collect the usage stats from the params passed at the time of instantiating VWO and send them to VWO Server
   * @param {Object} config    config passed at the time of instantiation.
   */


  _createClass(UsageStats, [{
    key: "collectUsageStats",
    value: function collectUsageStats(config) {
      this.data['eb'] = Number(!!config.batchEvents);
      this.data['ig'] = Number(!!config.integrations);
      this.data['ss'] = Number(!!config.userStorageService);
      this.data['cl'] = Number(!(config.logger instanceof LogManager));
      this.data['ll'] = Number(config.logging && config.logging.level);
      this.data['tr'] = Number(config.shouldTrackReturningUser);
      this.data['gt'] = Number(!!config.goalTypeToTrack);
      this.data['pi'] = Number(!!config.pollingInterval);
      Object.keys(this.data).forEach(function (key) {
        if (!this.data[key]) {
          delete this.data[key];
        }
      }, this);
    }
    /**
     * Get the collected usage stats.
     * @returns     collected usage stats data
     */

  }, {
    key: "getUsageStats",
    value: function getUsageStats() {
      if (Object.keys(this.data).length > 0) {
        this.data['_l'] = 1;
      }

      return this.data;
    }
  }]);

  return UsageStats;
}();

module.exports = UsageStats;

/***/ }),

/***/ "./lib/services/logging/ConsoleLogManager.js":
/*!***************************************************!*\
  !*** ./lib/services/logging/ConsoleLogManager.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var _require = __webpack_require__(/*! ../../utils/FunctionUtil */ "./lib/utils/FunctionUtil.js"),
    getCurrentTime = _require.getCurrentTime;

var _require2 = __webpack_require__(/*! ../../enums/LogLevelEnum */ "./lib/enums/LogLevelEnum.js"),
    LogLevelEnum = _require2.LogLevelEnum,
    LogLevelInfoEnum = _require2.LogLevelInfoEnum,
    LogLevelColorInfoEnum = _require2.LogLevelColorInfoEnum;

var ConsoleLogManager =
/*#__PURE__*/
function () {
  function ConsoleLogManager() {
    _classCallCheck(this, ConsoleLogManager);

    this.logLevel = LogLevelEnum.NOTSET;
    this.prefix = "VWO-SDK";
    this.isColoredLogEnabled = false;
  }

  _createClass(ConsoleLogManager, [{
    key: "log",
    value: function log(level, message) {
      if (!this.shouldLog(level)) {
        return;
      }

      var logMessage;

      if (this.isColoredLogEnabled) {
        logMessage = "".concat(this.prefix, " - ").concat(LogLevelColorInfoEnum[level], " ").concat(getCurrentTime(), " ").concat(message);
      } else {
        logMessage = "".concat(this.prefix, " - ").concat(LogLevelInfoEnum[level], " ").concat(getCurrentTime(), " ").concat(message);
      }

      this.consoleLog(level, [logMessage]);
    }
  }, {
    key: "shouldLog",
    value: function shouldLog(targetLogLevel) {
      return targetLogLevel >= this.logLevel;
    }
  }, {
    key: "setLogLevel",
    value: function setLogLevel(level) {
      if (level === undefined) {
        this.logLevel = LogLevelEnum.ERROR;
      } else {
        this.logLevel = level;
      }
    }
  }, {
    key: "consoleLog",
    value: function consoleLog(level, logArguments) {
      switch (level) {
        case LogLevelEnum.INFO:
          console.info.apply(console, logArguments);
          break;

        case LogLevelEnum.WARN:
          console.warn.apply(console, logArguments);
          break;

        case LogLevelEnum.ERROR:
          console.error.apply(console, logArguments);
          break;

        default:
          console.log.apply(console, logArguments);
          break;
      }
    }
  }]);

  return ConsoleLogManager;
}();

module.exports = ConsoleLogManager;

/***/ }),

/***/ "./lib/services/logging/LoggingManager.js":
/*!************************************************!*\
  !*** ./lib/services/logging/LoggingManager.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

/**
 * Took reference from: "loglevel" - https://github.com/pimterry/loglevel
 *
 * Name: loglevel
 * Published Name: loglevel
 * URL: https://github.com/pimterry/loglevel
 * Description: Minimal lightweight logging for JavaScript, adding reliable log level methods to wrap any available console.log methods
 * Author: Tim Perry (https://github.com/pimterry)
 * LICENSE: MIT License
 * Local Modifications: This library is not used as a dependency. Source code was referenced and is modified as per requirements.
 *
 */
var _require = __webpack_require__(/*! ../../enums/LogLevelEnum */ "./lib/enums/LogLevelEnum.js"),
    LogLevelEnum = _require.LogLevelEnum,
    LogNumberLevel = _require.LogNumberLevel;

var LogMessageEnum = __webpack_require__(/*! ../../enums/LogMessageEnum */ "./lib/enums/LogMessageEnum.js");

var LogMessageUtil = __webpack_require__(/*! ../../utils/LogMessageUtil */ "./lib/utils/LogMessageUtil.js");

var ConsoleLogManager = __webpack_require__(/*! ./ConsoleLogManager */ "./lib/services/logging/ConsoleLogManager.js");

var globalLogLevel = LogLevelEnum.NOTSET;
var isColoredLogEnabled = false;
var globalLogHandler = new ConsoleLogManager();

var LogManager =
/*#__PURE__*/
function () {
  function LogManager(name) {
    _classCallCheck(this, LogManager);

    this.name = name;
    this.isColoredLogEnabled = isColoredLogEnabled;
  }

  _createClass(LogManager, [{
    key: "_customLog",
    value: function _customLog(level, message) {
      if (level < globalLogLevel) {
        return;
      }

      globalLogHandler.log(level, message);
    }
  }, {
    key: "log",
    value: function log(level, message) {
      var disableLogs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (disableLogs) {
        return;
      }

      try {
        this._customLog(level, message);
      } catch (err) {
        console.error('VWO: Could not log.', err);
      }
    }
  }, {
    key: "info",
    value: function info(message) {
      this._customLog(LogLevelEnum.INFO, message);
    }
  }, {
    key: "debug",
    value: function debug(message) {
      this._customLog(LogLevelEnum.DEBUG, message);
    }
  }, {
    key: "warn",
    value: function warn(message) {
      this._customLog(LogLevelEnum.WARN, message);
    }
  }, {
    key: "error",
    value: function error(message) {
      this._customLog(LogLevelEnum.ERROR, message);
    }
  }]);

  return LogManager;
}();

function getLogger(name) {
  return new LogManager(name);
}

function setLogHandler(logger) {
  globalLogHandler = logger;
}

function setLogLevel(level) {
  if (level === undefined) {
    globalLogLevel = LogLevelEnum.ERROR;
  } else {
    globalLogLevel = level;
  }
}

function getLogLevel() {
  return globalLogLevel;
}

function setLogColorMode(value) {
  isColoredLogEnabled = value;
  globalLogHandler.isColoredLogEnabled = isColoredLogEnabled;
}

function getLogColorMode() {
  return isColoredLogEnabled;
}

module.exports = {
  LogLevelEnum: LogLevelEnum,
  LogNumberLevel: LogNumberLevel,
  LogMessageUtil: LogMessageUtil,
  LogMessageEnum: LogMessageEnum,
  getLogger: getLogger,
  setLogHandler: setLogHandler,
  setLogLevel: setLogLevel,
  getLogLevel: getLogLevel,
  LogManager: LogManager,
  setLogColorMode: setLogColorMode,
  getLogColorMode: getLogColorMode,
  globalLogHandler: globalLogHandler
};

/***/ }),

/***/ "./lib/services/logging/index.js":
/*!***************************************!*\
  !*** ./lib/services/logging/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var logging = __webpack_require__(/*! ./LoggingManager */ "./lib/services/logging/LoggingManager.js");

module.exports = logging;

/***/ }),

/***/ "./lib/utils/CampaignUtil.js":
/*!***********************************!*\
  !*** ./lib/utils/CampaignUtil.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var ValidateUtil = __webpack_require__(/*! ./ValidateUtil */ "./lib/utils/ValidateUtil.js");

var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var GoalTypeEnum = __webpack_require__(/*! ../enums/GoalTypeEnum */ "./lib/enums/GoalTypeEnum.js");

var CampaignTypeEnum = __webpack_require__(/*! ../enums/CampaignTypeEnum */ "./lib/enums/CampaignTypeEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();
var CampaignUtil = {
  /**
   * Returns the bucket size of variation.
   *
   * @param {Number/Float} - weight of variation
   *
   * @return {Number} bucket start range of Variation
   */
  _getVariationBucketRange: function _getVariationBucketRange(variationWeight) {
    if (!variationWeight || variationWeight === 0) {
      return 0;
    }

    var startRange = Math.ceil(variationWeight * 100);
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
  getCampaignBasedOnId: function getCampaignBasedOnId(settingsFile, campaignId) {
    var campaign;

    for (var i = 0; i < settingsFile.campaigns.length; i++) {
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
  scaleVariationWeights: function scaleVariationWeights(variations) {
    var totalWeight = variations.reduce(function (acc, variation) {
      return acc + variation.weight;
    }, 0);

    if (!totalWeight) {
      var weight = 100 / variations.length;
      variations.forEach(function (variation) {
        return variation.weight = weight;
      });
    } else {
      variations.forEach(function (variation) {
        return variation.weight = variation.weight / totalWeight * 100;
      });
    }
  },
  getCampaign: function getCampaign(settingsFile, campaignKey) {
    var campaign;

    for (var i = 0; i < settingsFile.campaigns.length; i++) {
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
  getCampaignsForKeys: function getCampaignsForKeys(settingsFile, campaignKeys) {
    var campaigns = [];
    campaignKeys.forEach(function (key) {
      var campaign = CampaignUtil.getCampaign(settingsFile, key);

      if (campaign) {
        campaigns.push(campaign);
      } else {
        campaigns.push({
          key: key
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
  getCampaignsForGoal: function getCampaignsForGoal(settingsFile, goalIdentifier, goalTypeToTrack) {
    var campaigns = [];
    settingsFile.campaigns.forEach(function (campaign) {
      var goal = CampaignUtil.getCampaignGoal(settingsFile, campaign.key, goalIdentifier);

      if (goal && (goalTypeToTrack === GoalTypeEnum.ALL || goal.type === goalTypeToTrack)) {
        campaigns.push(campaign);
      }
    });

    if (!campaigns.length) {
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.NO_CAMPAIGN_FOUND, {
        file: FileNameEnum.CampaignUtil,
        goalIdentifier: goalIdentifier
      }));
    }

    return campaigns;
  },
  getCampaignStatus: function getCampaignStatus(settingsFile, campaignKey) {
    var campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

    if (!campaign || !campaign.status) {
      // log error
      return '';
    }

    return campaign.status.toLowerCase();
  },
  isCampaignRunning: function isCampaignRunning(settingsFile, campaignKey) {
    return CampaignUtil.getCampaignStatus(settingsFile, campaignKey) === 'running';
  },

  /**
   * Validates the campaign
   *
   * @param {Campaign} campaign the campaign to be validated
   *
   * @return {Boolean} true is campaign is valid
   */
  validateCampaign: function validateCampaign(campaign) {
    return ValidateUtil.isValidValue(campaign) && campaign.variations && Object.keys(campaign.variations).length > 0;
  },

  /**
   * Assigns the buckets to the Variations of the campaign
   * depending on the traffic allocation
   *
   * @param {Campaign} campaign whose Variations are to be allocated
   */
  setVariationAllocation: function setVariationAllocation(campaign) {
    var numberOfVariations = campaign.variations.length;
    var stepFactor = 0;

    for (var i = 0, currentAllocation = 0; i < numberOfVariations; i++) {
      var variation = campaign.variations[i];
      stepFactor = CampaignUtil.assignRangeValues(variation, currentAllocation);
      currentAllocation += stepFactor;
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIATION_RANGE_ALLOCATION, {
        file: FileNameEnum.CampaignUtil,
        campaignKey: campaign.key,
        variationName: variation.name,
        variationWeight: variation.weight,
        start: variation.startVariationAllocation,
        end: variation.endVariationAllocation
      }));
    }
  },

  /**
   * Assign range allocation to the campaigns in the list to decide which campaign to choose out of the Mutually Exclusive group
   *
   * @param {Array} campaigns
   */
  setCampaignAllocation: function setCampaignAllocation(campaigns) {
    var stepFactor = 0;

    for (var i = 0, currentAllocation = 0; i < campaigns.length; i++) {
      var campaign = campaigns[i];
      stepFactor = CampaignUtil.assignRangeValues(campaign, currentAllocation);
      currentAllocation += stepFactor;
    }
  },
  assignRangeValues: function assignRangeValues(variation, currentAllocation) {
    var stepFactor;
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
  getCampaignGoal: function getCampaignGoal(settingsFile, campaignKey, goalIdentifier) {
    var desiredCampaignGoal = null;

    if (!settingsFile || !campaignKey || !goalIdentifier) {
      return desiredCampaignGoal;
    }

    var campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

    if (!campaign) {
      return desiredCampaignGoal;
    }

    for (var i = 0; i < campaign.goals.length; i++) {
      var goal = campaign.goals[i];

      if (goal.identifier === goalIdentifier) {
        desiredCampaignGoal = goal;
        break;
      }
    }

    return desiredCampaignGoal;
  },
  getCampaignVariation: function getCampaignVariation(settingsFile, campaignKey, variationName) {
    var desiredVariation = null;

    if (!settingsFile || !campaignKey || !variationName) {
      return desiredVariation;
    }

    var campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

    if (!campaign) {
      return desiredVariation;
    }

    for (var i = 0; i < campaign.variations.length; i++) {
      var variation = campaign.variations[i];

      if (variation.name === variationName) {
        desiredVariation = variation;
        break;
      }
    }

    return desiredVariation;
  },
  getControlForCampaign: function getControlForCampaign(campaign) {
    var control = {};

    if (!campaign || !campaign.variations) {
      return control;
    }

    for (var i = 0; i < campaign.variations.length; i++) {
      if (campaign.variations[i].id === 1) {
        control = campaign.variations[i];
        break;
      }
    }

    return control;
  },
  isFeatureTestCampaign: function isFeatureTestCampaign(campaign) {
    if (campaign && campaign.type === CampaignTypeEnum.FEATURE_TEST) {
      return true;
    }

    return false;
  },
  isFeatureRolloutCampaign: function isFeatureRolloutCampaign(campaign) {
    if (campaign && campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT) {
      return true;
    }

    return false;
  },
  isAbCampaign: function isAbCampaign(campaign) {
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
  isPartOfGroup: function isPartOfGroup(settingsFile, campaignId) {
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
  getGroupCampaigns: function getGroupCampaigns(settingsFile, groupId) {
    var campaigns = [];

    if (Object.prototype.hasOwnProperty.call(settingsFile.groups, groupId)) {
      settingsFile.groups[groupId].campaigns.forEach(function (campaignId) {
        var campaign = CampaignUtil.getCampaignBasedOnId(settingsFile, campaignId);

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
  getBucketingSeed: function getBucketingSeed(userId, campaign, groupId) {
    if (groupId) {
      return "".concat(groupId, "_").concat(userId);
    }

    if (campaign && campaign.isBucketingSeedEnabled) {
      return "".concat(campaign.id, "_").concat(userId);
    } else {
      return userId;
    }
  }
};
module.exports = CampaignUtil;

/***/ }),

/***/ "./lib/utils/DataTypeUtil.js":
/*!***********************************!*\
  !*** ./lib/utils/DataTypeUtil.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var DataTypeUtil = {
  _toStringValue: function _toStringValue(val) {
    return Object.prototype.toString.call(val);
  },
  isNumber: function isNumber(val) {
    return DataTypeUtil._toStringValue(val) === '[object Number]';
  },
  isString: function isString(val) {
    return DataTypeUtil._toStringValue(val) === '[object String]';
  },
  isObject: function isObject(val) {
    return DataTypeUtil._toStringValue(val) === '[object Object]';
  },
  isFunction: function isFunction(val) {
    return DataTypeUtil._toStringValue(val) === '[object Function]';
  },
  isBoolean: function isBoolean(val) {
    return DataTypeUtil._toStringValue(val) === '[object Boolean]';
  },
  isUndefined: function isUndefined(val) {
    return DataTypeUtil._toStringValue(val) === '[object Undefined]';
  },
  isNull: function isNull(val) {
    return DataTypeUtil._toStringValue(val) === '[object Null]';
  },
  isArray: function isArray(val) {
    return DataTypeUtil._toStringValue(val) === '[object Array]';
  }
};
module.exports = DataTypeUtil;

/***/ }),

/***/ "./lib/utils/DecisionUtil.js":
/*!***********************************!*\
  !*** ./lib/utils/DecisionUtil.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var VariationDecider = __webpack_require__(/*! ../core/VariationDecider */ "./lib/core/VariationDecider.js");

var BucketingService = __webpack_require__(/*! ../core/BucketingService */ "./lib/core/BucketingService.js");

var CampaignUtil = __webpack_require__(/*! ./CampaignUtil */ "./lib/utils/CampaignUtil.js");

var DataTypeUtil = __webpack_require__(/*! ./DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var FunctionUtil = __webpack_require__(/*! ./FunctionUtil */ "./lib/utils/FunctionUtil.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var StatusEnum = __webpack_require__(/*! ../enums/StatusEnum */ "./lib/enums/StatusEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();

var SegmentEvaluator = __webpack_require__(/*! ../core/SegmentEvaluator */ "./lib/core/SegmentEvaluator.js");

var HooksManager = __webpack_require__(/*! ../services/HooksManager */ "./lib/services/HooksManager.js");

var HooksEnum = __webpack_require__(/*! ../enums/HooksEnum */ "./lib/enums/HooksEnum.js");

var UuidUtil = __webpack_require__(/*! ./UuidUtil */ "./lib/utils/UuidUtil.js");

var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var CampaignTypeEnum = __webpack_require__(/*! ../enums/CampaignTypeEnum */ "./lib/enums/CampaignTypeEnum.js");

var ApiEnum = __webpack_require__(/*! ../enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var file = FileNameEnum.DecisionUtil;
var SegmentationTypeEnum = {
  WHITELISTING: 'whitelisting',
  PRE_SEGMENTATION: 'pre-segmentation'
};
var DecisionUtil = {
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
  getVariation: function getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables) {
    var variationTargetingVariables = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
    var userStorageData = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
    var metaData = arguments.length > 8 ? arguments[8] : undefined;
    var isTrackUserAPI = arguments.length > 9 ? arguments[9] : undefined;
    var newGoalIdentifier = arguments.length > 10 ? arguments[10] : undefined;
    var api = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : '';
    var vwoUserId = UuidUtil.generateFor(userId, settingsFile.accountId);
    var decision = {
      // campaign info
      campaignId: campaign.id,
      campaignKey: campaignKey,
      campaignType: campaign.type,
      campaignName: campaign.name,
      // campaign segmentation conditions
      customVariables: customVariables,
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
      userId: userId,
      // Campaign Whitelisting conditions
      variationTargetingVariables: variationTargetingVariables,
      // VWO generated UUID based on passed UserId and Account ID
      vwoUserId: vwoUserId
    }; // check if the campaign is a part of group

    var _CampaignUtil$isPartO = CampaignUtil.isPartOfGroup(settingsFile, campaign.id),
        groupId = _CampaignUtil$isPartO.groupId,
        groupName = _CampaignUtil$isPartO.groupName;

    if (groupId) {
      // append groupId and groupName, if campaign is a part of group
      decision['groupId'] = groupId;
      decision['groupName'] = groupName;
    }

    variationTargetingVariables = Object.assign({}, variationTargetingVariables, {
      _vwoUserId: campaign.isUserListEnabled ? vwoUserId : userId
    }); // check if tbe campaign satisfies the whitelisting before checking for the group

    var whitelistedVariation = DecisionUtil._checkForWhitelisting(campaign, campaignKey, userId, variationTargetingVariables, decision);

    if (whitelistedVariation) {
      return whitelistedVariation;
    } // check if the campaign is present in the storage before checking for the group


    var storedVariation = DecisionUtil._checkForUserStorage(config, settingsFile, campaign, campaignKey, userId, userStorageData, isTrackUserAPI, decision);

    if (storedVariation) {
      return storedVariation;
    } // check if the called campaign satisfies the pre-segmentatin before further proccessing.


    if (!(DecisionUtil._checkForPreSegmentation(campaign, campaignKey, userId, customVariables, decision) && BucketingService.isUserPartOfCampaign(userId, campaign, true))) {
      return {};
    }

    if (groupId) {
      // mutually exclusive group exists
      // get the list of the all the campaigns in a group
      var campaignList = CampaignUtil.getGroupCampaigns(settingsFile, groupId);

      if (campaignList.length === 0) {
        // return if no campaigns are active in a group
        return {};
      } // checking other campaigns for whitelisting and user storage.


      var isWhitelistedOrStoredVariation = DecisionUtil._checkForStorageAndWhitelisting(config, settingsFile, groupName, campaignList, campaign, userId, userStorageData, variationTargetingVariables, isTrackUserAPI);

      if (isWhitelistedOrStoredVariation) {
        // other campaigns satisfy the whitelisting or storage, therfore returning
        logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CALLED_CAMPAIGN_NOT_WINNER, {
          userId: userId,
          groupName: groupName,
          file: file,
          campaignKey: campaignKey
        }));
        return {};
      } // none of the group campaigns satisfy whitelisting or user storage
      // check each campaign for pre-segmentation and traffic allocation.


      var inEligibleCampaignKeys = '';
      var eligibleCampaignKeys = '';

      var _DecisionUtil$getElig = DecisionUtil.getEligbleCampaigns(campaignList, userId, customVariables),
          eligibleCampaigns = _DecisionUtil$getElig.eligibleCampaigns,
          inEligibleCampaigns = _DecisionUtil$getElig.inEligibleCampaigns;

      inEligibleCampaigns.forEach(function (campaign) {
        inEligibleCampaignKeys = inEligibleCampaignKeys + campaign.key + ',';
      });
      eligibleCampaigns.forEach(function (campaign) {
        eligibleCampaignKeys = eligibleCampaignKeys + campaign.key + ',';
      });
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GOT_ELIGIBLE_CAMPAIGNS, {
        userId: userId,
        groupName: groupName,
        file: file,
        eligibleCampaignKeys: eligibleCampaignKeys.slice(0, -1),
        inEligibleText: inEligibleCampaignKeys === '' ? 'no campaigns' : "campaigns: ".concat(inEligibleCampaignKeys.slice(0, -1))
      }));
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_ELIGIBLE_CAMPAIGNS, {
        userId: userId,
        groupName: groupName,
        file: file,
        noOfEligibleCampaigns: eligibleCampaigns.length,
        noOfGroupCampaigns: inEligibleCampaigns.length + eligibleCampaigns.length
      }));

      if (eligibleCampaigns.length === 1) {
        // if the called campaign is the only winner.
        return DecisionUtil.evaluateTrafficAndGetVariation(config, eligibleCampaigns[0], eligibleCampaigns[0].key, userId, metaData, newGoalIdentifier, decision);
      } else {
        // normalize the eligible campaigns and decide winner
        return DecisionUtil._normalizeAndFindWinningCampaign(config, campaign, eligibleCampaigns, userId, groupName, groupId, metaData, newGoalIdentifier, decision);
      }
    } else {
      // campaign is not a part of mutually exclusive group
      // check if the user is eligible to become part of the campaign and assign variation.
      return DecisionUtil.evaluateTrafficAndGetVariation(config, campaign, campaignKey, userId, metaData, newGoalIdentifier, decision);
    }
  },
  // PRIVATE METHODS
  _evaluateWhitelisting: function _evaluateWhitelisting(campaign, campaignKey, userId, variationTargetingVariables) {
    var disableLogs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var whitelistedVariation;
    var status;
    var targetedVariations = [];
    campaign.variations.forEach(function (variation) {
      if (DataTypeUtil.isObject(variation.segments) && !Object.keys(variation.segments).length) {
        logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
          campaignKey: campaignKey,
          userId: userId,
          file: file,
          variation: campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT ? '' : ", for ".concat(variation.name)
        }), disableLogs);
        return;
      }

      if (DataTypeUtil.isObject(variation.segments) && SegmentEvaluator(variation.segments, variationTargetingVariables, campaignKey, userId, variation.name)) {
        status = StatusEnum.PASSED;
        targetedVariations.push(FunctionUtil.cloneObject(variation));
      } else {
        status = StatusEnum.FAILED;
      }

      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_STATUS, {
        campaignKey: campaignKey,
        userId: userId,
        customVariables: JSON.stringify(variationTargetingVariables),
        file: file,
        status: status,
        segmentationType: SegmentationTypeEnum.WHITELISTING,
        variation: campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT && status === StatusEnum.PASSED ? 'and becomes part of the rollout' : "for ".concat(variation.name)
      }), disableLogs);
    });

    if (targetedVariations.length > 1) {
      CampaignUtil.scaleVariationWeights(targetedVariations);

      for (var i = 0, currentAllocation = 0, stepFactor = 0; i < targetedVariations.length; i++) {
        stepFactor = CampaignUtil.assignRangeValues(targetedVariations[i], currentAllocation);
        currentAllocation += stepFactor;
      }

      whitelistedVariation = BucketingService._getVariation(targetedVariations, BucketingService.calculateBucketValue(CampaignUtil.getBucketingSeed(userId, campaign)));
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
  _getStoredVariationAndGoalIdentifiers: function _getStoredVariationAndGoalIdentifiers(config, settingsFile, campaignKey, userId, userStorageData) {
    var disableLogs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    var userData = DecisionUtil._getStoredUserData(config, userId, campaignKey, userStorageData, disableLogs);

    var variationName = userData.variationName,
        goalIdentifier = userData.goalIdentifier;

    if (userData && userData.campaignKey && variationName) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GETTING_STORED_VARIATION, {
        file: file,
        campaignKey: campaignKey,
        userId: userId,
        variationName: variationName
      }), disableLogs);
      return {
        storedVariation: CampaignUtil.getCampaignVariation(settingsFile, campaignKey, variationName),
        goalIdentifier: goalIdentifier
      };
    } // Log if stored variation is not found even after implementing UserStorageService


    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_STORED_VARIATION, {
      file: file,
      campaignKey: campaignKey,
      userId: userId
    }), disableLogs);
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
  _getStoredVariation: function _getStoredVariation(config, settingsFile, campaignKey, userId, userStorageData) {
    var data = DecisionUtil._getStoredVariationAndGoalIdentifiers(config, settingsFile, campaignKey, userId, userStorageData);

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
  _getStoredUserData: function _getStoredUserData(config, userId, campaignKey, userStorageData, disableLogs) {
    var userStorageMap = {
      userId: userId,
      variationName: null,
      campaignKey: campaignKey,
      goalIdentifier: null
    };

    if (!config.userStorageService) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_USER_STORAGE_SERVICE_GET, {
        file: file
      }), disableLogs);
      return userStorageMap;
    }

    try {
      var data = config.userStorageService.get(userId, campaignKey) || {}; // if data found

      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GETTING_DATA_USER_STORAGE_SERVICE, {
        file: file,
        userId: userId
      }), disableLogs);
      return Object.assign({}, data, userStorageData);
    } catch (err) {
      // if no data found
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_USER_STORAGE_SERVICE_FAILED, {
        file: file,
        userId: userId
      }), disableLogs);
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
  _saveUserData: function _saveUserData(config, campaign, variationName, userId, metaData, goalIdentifier) {
    var isSaved = false;

    if (!config.userStorageService) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_USER_STORAGE_SERVICE_SET, {
        file: file
      }));
      return isSaved;
    }

    try {
      var properties = {
        userId: userId,
        variationName: variationName,
        campaignKey: campaign.key
      };

      if (!DataTypeUtil.isUndefined(goalIdentifier)) {
        properties.goalIdentifier = goalIdentifier;
      }

      if (!DataTypeUtil.isUndefined(metaData)) {
        properties.metaData = metaData;
      }

      config.userStorageService.set(properties);
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SETTING_DATA_USER_STORAGE_SERVICE, {
        file: file,
        userId: userId
      }));
      isSaved = true;
    } catch (ex) {
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SET_USER_STORAGE_SERVICE_FAILED, {
        file: file,
        userId: userId
      }));
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
  _checkForStorageAndWhitelisting: function _checkForStorageAndWhitelisting(config, settingsFile, groupName, campaignList, calledCampaign, userId, userStorageData, variationTargetingVariables, isTrackUserAPI) {
    var otherCampaignWinner = false;
    campaignList.some(function (groupCampaign) {
      if (groupCampaign.id === calledCampaign.id) {
        return;
      } // create a local copy of the campaigns
      // groupCampaign = FunctionUtil.cloneObject(groupCampaign);
      // checking other campaigns for whitelisting or user storage.


      var whitelistedVariation = DecisionUtil._checkForWhitelisting(groupCampaign, groupCampaign.key, userId, variationTargetingVariables);

      if (whitelistedVariation) {
        // other campaign satisfy the whitelisting
        otherCampaignWinner = true;
        logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.OTHER_CAMPAIGN_SATISFIES_WHITELISTING_STORAGE, {
          file: file,
          campaignKey: groupCampaign.key,
          groupName: groupName,
          userId: userId,
          type: 'whitelisting'
        }));
        return true;
      }

      var storedVariation = DecisionUtil._checkForUserStorage(config, settingsFile, groupCampaign, groupCampaign.key, userId, userStorageData, isTrackUserAPI);

      if (storedVariation && DataTypeUtil.isObject(storedVariation) && Object.keys(storedVariation).length > 0) {
        // other campaign sastisfy the user storage
        otherCampaignWinner = true;
        logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.OTHER_CAMPAIGN_SATISFIES_WHITELISTING_STORAGE, {
          file: file,
          campaignKey: groupCampaign.key,
          groupName: groupName,
          userId: userId,
          type: 'user storage'
        }));
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
  _checkForPreSegmentation: function _checkForPreSegmentation(campaign, campaignKey, userId, customVariables, decision) {
    var status;

    if (DataTypeUtil.isObject(campaign.segments) && !Object.keys(campaign.segments).length) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
        campaignKey: campaignKey,
        userId: userId,
        file: file
      }), !decision);
      return true;
    } else {
      var preSegmentationResult = SegmentEvaluator(campaign.segments, customVariables, campaignKey, userId, !decision);

      if (!preSegmentationResult) {
        status = StatusEnum.FAILED;
      } else {
        status = StatusEnum.PASSED;
      }

      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SEGMENTATION_STATUS, {
        campaignKey: campaignKey,
        userId: userId,
        customVariables: JSON.stringify(customVariables || {}),
        file: file,
        status: status,
        segmentationType: SegmentationTypeEnum.PRE_SEGMENTATION,
        variation: ''
      }), !decision);

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
  evaluateTrafficAndGetVariation: function evaluateTrafficAndGetVariation(config, campaign, campaignKey, userId, metaData, newGoalIdentifier, decision) {
    var variation, variationName, variationId; // Use our core's VariationDecider utility to get the deterministic variation assigned to the userId for that campaign

    var _VariationDecider$get = VariationDecider.getVariationAllotted(userId, campaign);

    variation = _VariationDecider$get.variation;
    variationName = _VariationDecider$get.variationName;
    variationId = _VariationDecider$get.variationId;

    // Check if variation-name has been assigned to the userId. If not, return no variation
    if (variationName) {
      // If userStorageService is provided, look into it for the saved variation for the campaign and userId
      DecisionUtil._saveUserData(config, campaign, variationName, userId, metaData, newGoalIdentifier);

      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.VARIATION_ALLOCATED, {
        file: file,
        campaignKey: campaignKey,
        userId: userId,
        variationName: variationName
      }));
    } else {
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.NO_VARIATION_ALLOCATED, {
        file: file,
        campaignKey: campaignKey,
        userId: userId
      }));
    } // Executing the callback when SDK makes the decision


    HooksManager.execute(Object.assign({
      fromUserStorageService: false,
      isUserWhitelisted: false
    }, campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT ? {
      isFeatureEnabled: !!variationName
    } : {
      variationName: variationName,
      variationId: variationId
    }, decision));
    return {
      variation: variation && variation.variation,
      variationName: variationName,
      variationId: variationId
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
  _checkForWhitelisting: function _checkForWhitelisting(campaign, campaignKey, userId, variationTargetingVariables, decision) {
    var status;
    var variationName, variationId;

    if (campaign.isForcedVariationEnabled) {
      var whitelistingResult = DecisionUtil._evaluateWhitelisting(campaign, campaignKey, userId, variationTargetingVariables, !decision);

      var variationString;

      if (whitelistingResult) {
        status = StatusEnum.PASSED;
        variationString = whitelistingResult.variationName;
      } else {
        status = StatusEnum.FAILED;
        variationString = '';
      }

      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SEGMENTATION_STATUS, {
        campaignKey: campaignKey,
        userId: userId,
        customVariables: JSON.stringify(variationTargetingVariables),
        file: file,
        status: status,
        segmentationType: SegmentationTypeEnum.WHITELISTING,
        variation: campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT ? '' : "for variation: ".concat(variationString)
      }), !decision);

      if (whitelistingResult) {
        variationName = whitelistingResult.variationName;
        variationId = whitelistingResult.variationId; // Executing the callback when SDK has made a decision in case of whitelisting

        if (decision) {
          HooksManager.execute(Object.assign({
            fromUserStorageService: false,
            isUserWhitelisted: !!variationName
          }, campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT ? {
            isFeatureEnabled: !!variationName
          } : {
            variationName: variationName,
            variationId: variationId
          }, decision));
        }

        return whitelistingResult;
      }
    } else {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.WHITELISTING_SKIPPED, {
        campaignKey: campaignKey,
        userId: userId,
        file: file
      }), !decision);
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
  _checkForUserStorage: function _checkForUserStorage(config, settingsFile, campaign, campaignKey, userId, userStorageData, isTrackUserAPI, decision) {
    var variationName, variationId;
    var storedVariation, goalIdentifier; // If userStorageService is used, get the variation from the stored data

    var _ref = DecisionUtil._getStoredVariationAndGoalIdentifiers(config, settingsFile, campaign.key, userId, userStorageData, !decision) || {};

    storedVariation = _ref.storedVariation;
    goalIdentifier = _ref.goalIdentifier;

    // If stored variation is found, simply return the same
    if (storedVariation) {
      variationName = storedVariation.name;
      variationId = storedVariation.id;
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_STORED_VARIATION, {
        file: file,
        campaignKey: campaignKey,
        userId: userId,
        variationName: storedVariation.name
      }), !decision); // Executing the callback when SDK gets the decision from user storage service

      if (decision) {
        HooksManager.execute(Object.assign({
          fromUserStorageService: !!variationName,
          isUserWhitelisted: false
        }, campaign.type === CampaignTypeEnum.FEATURE_ROLLOUT ? {
          isFeatureEnabled: !!variationName
        } : {
          variationName: variationName,
          variationId: variationId
        }, decision));
      }

      return {
        variation: storedVariation,
        variationName: storedVariation.name,
        variationId: storedVariation.id,
        storedGoalIdentifier: goalIdentifier,
        isStoredVariation: true
      };
    } else if (!DataTypeUtil.isUndefined(config.userStorageService) && !isTrackUserAPI && DataTypeUtil.isUndefined(storedVariation)) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CAMPAIGN_NOT_ACTIVATED, {
        file: file,
        campaignKey: campaignKey,
        userId: userId,
        api: config.apiName
      }), !decision);
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CAMPAIGN_NOT_ACTIVATED, {
        file: file,
        campaignKey: campaignKey,
        userId: userId,
        reason: config.apiName === ApiEnum.TRACK ? 'track it' : 'get the decision/value'
      }), !decision);
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
  getEligbleCampaigns: function getEligbleCampaigns(campaignList, userId, customVariables) {
    var eligibleCampaigns = [];
    var inEligibleCampaigns = [];
    campaignList.forEach(function (groupCampaign) {
      var isPartOfCampaign = DecisionUtil._checkForPreSegmentation(groupCampaign, groupCampaign.key, userId, customVariables) && BucketingService.isUserPartOfCampaign(userId, groupCampaign, true);

      if (isPartOfCampaign) {
        groupCampaign = FunctionUtil.cloneObject(groupCampaign); // campaign satisfies the pre-segmentation

        eligibleCampaigns.push(groupCampaign);
      } else {
        inEligibleCampaigns.push(groupCampaign);
      }
    });
    return {
      eligibleCampaigns: eligibleCampaigns,
      inEligibleCampaigns: inEligibleCampaigns
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
  _normalizeAndFindWinningCampaign: function _normalizeAndFindWinningCampaign(config, calledCampaign, shortlistedCampaigns, userId, groupName, groupId, metaData, newGoalIdentifier, decision) {
    // normalise the weights of all the shortlisted campaigns
    shortlistedCampaigns.forEach(function (campaign) {
      campaign.weight = Math.floor(100 / shortlistedCampaigns.length);
    }); // re-distribute the traffic for each camapign

    CampaignUtil.setCampaignAllocation(shortlistedCampaigns);

    var winnerCampaign = BucketingService._getVariation(shortlistedCampaigns, BucketingService.calculateBucketValue(CampaignUtil.getBucketingSeed(userId, undefined, groupId)));

    logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_WINNER_CAMPAIGN, {
      userId: userId,
      groupName: groupName,
      file: file,
      campaignKey: winnerCampaign.key
    }));

    if (winnerCampaign.id === calledCampaign.id) {
      // if called campaign is the winner campaign, get the variation for the campaign
      return DecisionUtil.evaluateTrafficAndGetVariation(config, winnerCampaign, winnerCampaign.key, userId, metaData, newGoalIdentifier, decision);
    } else {
      // if winning campaign not the called camapaign, return
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CALLED_CAMPAIGN_NOT_WINNER, {
        userId: userId,
        groupName: groupName,
        file: file,
        campaignKey: calledCampaign.key
      }));
      return {};
    }
  }
};
module.exports = DecisionUtil;

/***/ }),

/***/ "./lib/utils/EventDispatcherUtil.js":
/*!******************************************!*\
  !*** ./lib/utils/EventDispatcherUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();

var FunctionUtil = __webpack_require__(/*! ./FunctionUtil */ "./lib/utils/FunctionUtil.js");

var EventEnum = __webpack_require__(/*! ../enums/EventEnum */ "./lib/enums/EventEnum.js");

var excludedProperties = ['url'];
var file = FileNameEnum.EventDispatcherUtil;
var EventDispatcher = {
  dispatchGetCall: function dispatchGetCall(properties) {
    var _this = this;

    var parsedUrl;
    var queryParams = '?';
    queryParams += FunctionUtil.convertObjectKeysToString(properties, excludedProperties);

    try {
      // Require files only if required in respective Engine i.e. Node / Browser
      if (true) {
        parsedUrl = new URL(properties.url);

        __webpack_require__(/*! ./HttpImageUtil */ "./lib/utils/HttpImageUtil.js").sendCall(parsedUrl, queryParams);
      } else { var url; }
    } catch (err) {
      var endPoint = properties.url;
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
        file: FileNameEnum.EventDispatcher,
        endPoint: endPoint,
        err: err
      }));
    }

    return false;
  },
  handleGetResponse: function handleGetResponse(properties, error, response) {
    if (error) {
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
        file: file,
        endPoint: response.endPoint
      }));
      return false;
    } else {
      var baseParams = {
        file: file,
        endPoint: response.endPoint,
        accountId: properties && properties.account_id
      };
      var params = {};

      if (baseParams.endPoint.includes('push')) {
        var customVariables = JSON.parse(properties.tags).u;
        params = Object.assign({}, baseParams, {
          customVariables: customVariables
        });
        params.mainKeys = "customDimension:".concat(JSON.stringify(params.customVariables));
      } else {
        params = Object.assign({}, baseParams, {
          campaignId: properties && properties.experiment_id,
          variationId: properties && properties.combination
        });
        params.mainKeys = "campaignId:".concat(params.campaignId, " and variationId:").concat(params.variationId);
      }

      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_SUCCESS, params));
      return true;
    }
  },
  dispatchPostCall: function dispatchPostCall(properties, payload) {
    var _this2 = this;

    var parsedUrl;
    var queryParams = '?';
    queryParams += FunctionUtil.convertObjectKeysToString(properties, excludedProperties);

    try {
      // Require files only if required in respective Engine i.e. Node / Browser
      var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

      parsedUrl = url.parse(properties.url);

      __webpack_require__(/*! ./HttpHandlerUtil */ "./lib/utils/HttpHandlerUtil.js").sendPostCall(parsedUrl, payload, queryParams, null, function (error) {
        _this2.handlePostResponse(properties, payload, error);
      });
    } catch (err) {
      var endPoint = properties.url;
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
        file: FileNameEnum.EventDispatcherUtil,
        endPoint: endPoint,
        err: err
      }));
    }

    return false;
  },
  handlePostResponse: function handlePostResponse(properties, payload, error) {
    var endPoint = properties.url;

    if (error) {
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
        file: file,
        endPoint: endPoint
      }));
      return false;
    } else {
      var event = "".concat(properties.en, " event");

      if (properties.en === EventEnum.VWO_SYNC_VISITOR_PROP) {
        delete payload.d.visitor.props.vwo_fs_environment;
        event = "visitor property:".concat(JSON.stringify(payload.d.visitor.props));
      }

      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_SUCCESS_FOR_EVENT_ARCH, {
        file: file,
        endPoint: endPoint,
        a: properties.a,
        event: event
      }));
      return true;
    }
  }
};
module.exports = EventDispatcher;

/***/ }),

/***/ "./lib/utils/FeatureUtil.js":
/*!**********************************!*\
  !*** ./lib/utils/FeatureUtil.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var CampaignUtil = __webpack_require__(/*! ./CampaignUtil */ "./lib/utils/CampaignUtil.js");

var DataTypeUtil = __webpack_require__(/*! ./DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var FeatureVariableTypeEnum = __webpack_require__(/*! ../enums/FeatureVariableTypeEnum */ "./lib/enums/FeatureVariableTypeEnum.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();
var file = FileNameEnum.FeatureUtil;
var FeatureUtil = {
  getVariableForFeature: function getVariableForFeature(campaign, variableKey) {
    var variableData = {};

    if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
      var variables = campaign.variables || [];

      for (var i = 0; i < variables.length; i++) {
        if (variables[i].key === variableKey) {
          variableData = variables[i];
          break;
        }
      }

      return variableData;
    }

    return variableData;
  },
  getVariableValueForVariation: function getVariableValueForVariation(campaign, variation, variableKey) {
    var variationVariable = {};

    if (CampaignUtil.isFeatureTestCampaign(campaign)) {
      if (!variation || !variation || !variation.variables) {
        return variationVariable;
      }

      if (!variation.isFeatureEnabled) {
        variation = CampaignUtil.getControlForCampaign(campaign);
      }

      for (var i = 0; i < variation.variables.length; i++) {
        var variable = variation.variables[i];

        if (variableKey === variable.key) {
          variationVariable = variable;
          break;
        }
      }
    }

    return variationVariable;
  },
  getTypeCastVariableValue: function getTypeCastVariableValue(variableValue, variableType) {
    var typeCastedValue;

    switch (variableType) {
      case FeatureVariableTypeEnum.INTEGER:
        typeCastedValue = parseInt(variableValue, 10);

        if (!DataTypeUtil.isNumber(typeCastedValue) || isNaN(typeCastedValue)) {
          logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, {
            file: file,
            variableValue: variableValue,
            variableType: variableType
          }));
          typeCastedValue = null;
        }

        break;

      case FeatureVariableTypeEnum.DOUBLE:
        typeCastedValue = parseFloat(variableValue);

        if (!DataTypeUtil.isNumber(typeCastedValue) || isNaN(typeCastedValue)) {
          logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, {
            file: file,
            variableValue: variableValue,
            variableType: variableType
          }));
          typeCastedValue = null;
        }

        break;

      case FeatureVariableTypeEnum.BOOLEAN:
        if (!DataTypeUtil.isBoolean(variableValue)) {
          logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, {
            file: file,
            variableValue: variableValue,
            variableType: variableType
          }));
          typeCastedValue = null;
        } else {
          typeCastedValue = variableValue;
        }

        break;

      case FeatureVariableTypeEnum.JSON:
        if (!DataTypeUtil.isObject(variableValue)) {
          logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, {
            file: file,
            variableValue: variableValue,
            variableType: variableType
          }));
          typeCastedValue = null;
        } else {
          typeCastedValue = variableValue;
        }

        break;

      default:
        typeCastedValue = variableValue;
        break;
    }

    return typeCastedValue;
  }
};
module.exports = FeatureUtil;

/***/ }),

/***/ "./lib/utils/FunctionUtil.js":
/*!***********************************!*\
  !*** ./lib/utils/FunctionUtil.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var FunctionUtil = {
  cloneObject: function cloneObject(obj) {
    if (!obj) {
      return obj;
    }

    var clonedObj = JSON.parse(JSON.stringify(obj));
    return clonedObj;
  },
  getRandomNumber: function getRandomNumber() {
    return Math.random();
  },
  getCurrentUnixTimestamp: function getCurrentUnixTimestamp() {
    return Math.ceil(+new Date() / 1000);
  },
  getCurrentUnixTimestampInMillis: function getCurrentUnixTimestampInMillis() {
    return +new Date();
  },
  matchWithRegex: function matchWithRegex(string, regex) {
    try {
      return string.match(new RegExp(regex));
    } catch (err) {
      var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

      var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

      var logger = logging.getLogger();
      var LogLevelEnum = logging.LogLevelEnum,
          LogMessageEnum = logging.LogMessageEnum,
          LogMessageUtil = logging.LogMessageUtil;
      var file = FileNameEnum.FunctionUtil;
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.REGEX_CREATION_FAILED, {
        file: file
      }));
      return null;
    }
  },
  getCurrentTime: function getCurrentTime() {
    return new Date().toISOString();
  },
  convertObjectKeysToString: function convertObjectKeysToString(properties, excludedProperties) {
    var queryParams = '';
    excludedProperties = excludedProperties || [];

    for (var prop in properties) {
      if (properties.hasOwnProperty(prop)) {
        if (excludedProperties.indexOf(prop) === -1) {
          queryParams += prop + '=' + properties[prop] + '&';
        }
      }
    }

    return queryParams;
  }
};
module.exports = FunctionUtil;

/***/ }),

/***/ "./lib/utils/HttpHandlerUtil.js":
/*!**************************************!*\
  !*** ./lib/utils/HttpHandlerUtil.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var https = __webpack_require__(/*! https */ "./node_modules/https-browserify/index.js");

var DataTypeUtil = __webpack_require__(/*! ./DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var HttpHandlerUtil = {
  sendGetCall: function sendGetCall(url, queryParams, authToken, callback) {
    var endPoint = "".concat(url.protocol === 'http' ? 'http' : 'https', "://").concat(url.host).concat(url.path);
    var options = {
      hostname: url.host,
      path: url.path + queryParams,
      agent: false // Create a new agent just for this one request

    };

    if (url.port) {
      options.port = url.port;
    }

    if (authToken) {
      options.headers = {
        Authorization: authToken
      };
    }

    https.get(options, function (res) {
      var rawData = ''; // eslint-disable-line no-unused-vars

      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        rawData += chunk;
      });
      res.on('end', function () {
        if (callback && DataTypeUtil.isFunction(callback)) {
          callback(null, {
            endPoint: endPoint,
            rawData: JSON.parse(rawData)
          });
        }
      });
      res.on('error', function (err) {
        callback(err, {
          endPoint: endPoint
        });
      });
    });
  },
  sendPostCall: function sendPostCall(url, postData, queryParams, authToken, callback) {
    postData = JSON.stringify(postData);
    var options = {
      method: 'POST',
      hostname: url.host,
      path: queryParams ? url.path + queryParams : url.path,
      agent: false,
      // Create a new agent just for this one request
      headers: {
        'Content-Length': postData.length
      }
    };

    if (authToken) {
      options.headers.Authorization = authToken;
    } else {
      // what should be the user-agent here?
      options.headers['User-Agent'] = Constants.SDK_NAME;
    }

    if (url.port) {
      options.port = url.port;
    }

    var req = https.request(options, function (res) {
      var rawData = ''; // eslint-disable-line no-unused-vars

      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        rawData += chunk;
      });
      res.on('end', function () {
        callback(null, res, rawData);
      });
    });
    req.on('error', function (e) {
      callback(e, null);
    });
    req.write(postData);
    req.end();
  }
};
module.exports = HttpHandlerUtil;

/***/ }),

/***/ "./lib/utils/HttpImageUtil.js":
/*!************************************!*\
  !*** ./lib/utils/HttpImageUtil.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var noop = function noop() {};

var HttpImageUtil = {
  sendCall: function sendCall(url, queryParams) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var endPoint = "https://".concat(url.host).concat(url.pathname).concat(queryParams);
    var successCallback = options.successCallback,
        errorCallback = options.errorCallback;
    var isCallbackCalled = false;
    var img = new Image();
    this.handleGetCall(img, successCallback, errorCallback, endPoint, isCallbackCalled);
  },
  handleGetCall: function handleGetCall(img, successCallback, errorCallback, endPoint, isCallbackCalled) {
    successCallback = successCallback || noop;
    errorCallback = errorCallback || noop;

    img.onload = function () {
      if (isCallbackCalled) {
        return;
      }

      isCallbackCalled = true;
      successCallback();
    };

    img.onerror = function () {
      if (isCallbackCalled) {
        return;
      }

      isCallbackCalled = true;
      errorCallback();
    };

    img.src = endPoint;
    return img;
  }
};
module.exports = HttpImageUtil;

/***/ }),

/***/ "./lib/utils/ImpressionUtil.js":
/*!*************************************!*\
  !*** ./lib/utils/ImpressionUtil.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var UrlEnum = __webpack_require__(/*! ../enums/UrlEnum */ "./lib/enums/UrlEnum.js");

var GoalTypeEnum = __webpack_require__(/*! ../enums/GoalTypeEnum */ "./lib/enums/GoalTypeEnum.js");

var UuidUtil = __webpack_require__(/*! ./UuidUtil */ "./lib/utils/UuidUtil.js");

var ValidateUtil = __webpack_require__(/*! ./ValidateUtil */ "./lib/utils/ValidateUtil.js");

var FunctionUtil = __webpack_require__(/*! ./FunctionUtil */ "./lib/utils/FunctionUtil.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var DataTypeUtil = __webpack_require__(/*! ./DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();
/**
 * Return primary properties required for every network call to VWO server
 * @param {Object} configObj
 * @param {String} userId
 *
 * @returns primary properties
 */

function getPrimaryProperties(configObj, userId) {
  return {
    sId: FunctionUtil.getCurrentUnixTimestamp(),
    u: UuidUtil.generateFor(userId, configObj.accountId)
  };
}
/**
 * Return base properties required for every network call to VWO server
 * @param {Object} configObj
 * @param {String} userId
 *
 * @returns base properties
 */


function getBaseProperties(configObj, userId) {
  var accountId = configObj.accountId;
  return Object.assign({}, getPrimaryProperties(configObj, userId), ImpressionUtil.getReportingProperties(configObj), {
    account_id: accountId,
    random: FunctionUtil.getRandomNumber(),
    ap: Constants.PLATFORM
  });
}

var ImpressionUtil = {
  /**
   * Build properties for the impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} tagKey the tag name
   * @param {String} tagValue the tag value
   */
  buildEventForPushing: function buildEventForPushing(configObj, tagKey, tagValue, userId) {
    var properties = Object.assign({}, getBaseProperties(configObj, userId));
    properties.url = Constants.HTTPS_PROTOCOL + UrlEnum.BASE_URL + UrlEnum.PUSH;
    properties.tags = JSON.stringify({
      u: _defineProperty({}, encodeURIComponent(tagKey), encodeURIComponent(tagValue))
    });
    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_PUSH, {
      file: FileNameEnum.ImpressionUtil,
      properties: this._getStringifiedLogProperties(properties)
    }));
    return properties;
  },

  /**
   * Build properties for the bulk impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} tagKey the tag name
   * @param {String} tagValue the tag value
   */
  buildBatchEventForPushing: function buildBatchEventForPushing(configObj, tagKey, tagValue, userId) {
    if (false) { var properties; }
  },

  /**
   * Build properties for the impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} campaignKey, the Campaign ID
   * @param {Number} variationId, the Variation ID
   *
   * @return null if campaign ID or variation ID is invalid
   */
  buildEventForTrackingUser: function buildEventForTrackingUser(configObj, campaignKey, variationId, userId, usageStats) {
    var properties = Object.assign({
      experiment_id: campaignKey,
      combination: variationId
    }, getBaseProperties(configObj, userId), usageStats);
    properties.ed = JSON.stringify({
      p: 'server'
    });
    properties.url = Constants.HTTPS_PROTOCOL + UrlEnum.BASE_URL + UrlEnum.TRACK_USER;
    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_TRACK_USER, {
      file: FileNameEnum.ImpressionUtil,
      properties: this._getStringifiedLogProperties(properties)
    }));
    return properties;
  },

  /**
   * Build properties for the bulk impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} campaignKey, the Campaign ID
   * @param {Number} variationId, the Variation ID
   *
   * @return null if campaign ID or variation ID is invalid
   */
  buildBatchEventForTrackingUser: function buildBatchEventForTrackingUser(configObj, campaignKey, variationId, userId) {
    if (false) { var properties; }
  },

  /**
   * Build properties for the impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} campaignKey, the Campaign ID
   * @param {Number} variationId, the Variation ID
   * @param {String} goalId, the Goal ID
   * @param {String} revenue, the revenue generated on conversion
   *
   * @return null if campaign ID or variation ID is invalid
   */
  buildEventForTrackingGoal: function buildEventForTrackingGoal(configObj, campaignKey, variationId, userId) {
    var goal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var revenue = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var goalId = goal.id;
    var properties = Object.assign({
      experiment_id: campaignKey,
      combination: variationId
    }, getBaseProperties(configObj, userId));
    properties.url = Constants.HTTPS_PROTOCOL + UrlEnum.BASE_URL + UrlEnum.TRACK_GOAL;
    properties['goal_id'] = goalId;

    if (goal.type === GoalTypeEnum.REVENUE && ValidateUtil.isValidValue(revenue)) {
      properties['r'] = revenue;
    }

    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_TRACK_GOAL, {
      file: FileNameEnum.ImpressionUtil,
      properties: this._getStringifiedLogProperties(properties)
    }));
    return properties;
  },

  /**
   * Build properties for the bulk impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} campaignKey, the Campaign ID
   * @param {Number} variationId, the Variation ID
   * @param {String} goalId, the Goal ID
   * @param {String} revenue, the revenue generated on conversion
   *
   * @return null if campaign ID or variation ID is invalid
   */
  buildBatchEventForTrackingGoal: function buildBatchEventForTrackingGoal(configObj, campaignKey, variationId, userId) {
    var goal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var revenue = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    if (false) { var properties; }
  },

  /**
   * Return an object containing properties required for segmenting reports
   * @param {Object} configObj
   * @returns reporting properties
   */
  getReportingProperties: function getReportingProperties(configObj) {
    var _ref;

    var sdkKey = configObj.sdkKey;
    return _ref = {}, _defineProperty(_ref, Constants.SDK_QUERY_PARAM, Constants.SDK_NAME), _defineProperty(_ref, Constants.SDK_VERSION_QUERY_PARAM, Constants.SDK_VERSION), _defineProperty(_ref, "env", sdkKey), _ref;
  },

  /**
   * Builds generic properties for different tracking calls required by VWO servers.
   * @param {Object} configObj
   * @param {String} eventName
   * @returns properties
   */
  getEventsBaseProperties: function getEventsBaseProperties(config, eventName) {
    var usageStats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var sdkKey = config.sdkKey;
    var properties = Object.assign({
      en: eventName,
      a: config.accountId,
      env: sdkKey,
      eTime: FunctionUtil.getCurrentUnixTimestampInMillis(),
      random: FunctionUtil.getRandomNumber(),
      p: 'FS'
    }, usageStats);
    properties.url = Constants.HTTPS_PROTOCOL + UrlEnum.BASE_URL + UrlEnum.EVENTS;
    return properties;
  },

  /**
   * Builds generic payload required by all the different tracking calls.
   * @param {Object} configObj
   * @param {String} userId
   * @param {String} eventName
   * @param {Object} usageStats
   * @returns properties
   */
  getEventBasePayload: function getEventBasePayload(configObj, userId, eventName) {
    var uuid = UuidUtil.generateFor(userId, configObj.accountId);
    var sdkKey = configObj.sdkKey;
    var props = {
      sdkName: Constants.SDK_NAME,
      sdkVersion: Constants.SDK_VERSION,
      $visitor: {
        props: {
          vwo_fs_environment: sdkKey
        }
      }
    }; // if (usageStats) {
    //   props = Object.assign({}, props, usageStats);
    // }

    var properties = {
      d: {
        msgId: "".concat(uuid, "-").concat(FunctionUtil.getCurrentUnixTimestamp()),
        visId: uuid,
        sessionId: FunctionUtil.getCurrentUnixTimestamp(),
        event: {
          props: props,
          name: eventName,
          time: FunctionUtil.getCurrentUnixTimestampInMillis()
        },
        visitor: {
          props: {
            vwo_fs_environment: sdkKey
          }
        }
      }
    };
    return properties;
  },

  /**
   * Builds payload to track the visitor.
   * @param {Object} configObj
   * @param {String} userId
   * @param {String} eventName
   * @param {String} campaignId
   * @param {Number} variationId
   * @returns track-user payload
   */
  getTrackUserPayloadData: function getTrackUserPayloadData(configObj, userId, eventName, campaignId, variationId) {
    var properties = this.getEventBasePayload(configObj, userId, eventName);
    properties.d.event.props.id = campaignId;
    properties.d.event.props.variation = variationId; // this is currently required by data-layer team, we can make changes on DACDN and remove it from here

    properties.d.event.props.isFirst = 1;
    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_EVENT_ARCH_TRACK_USER, {
      file: FileNameEnum.ImpressionUtil,
      a: configObj.accountId,
      u: userId,
      c: campaignId
    }));
    return properties;
  },

  /**
   * Builds payload to track the Goal.
   * @param {Object} configObj
   * @param {String} userId
   * @param {String} eventName
   * @param {Object} metricMap
   * @param {String} revenueValue
   * @returns track-goal payload
   */
  getTrackGoalPayloadData: function getTrackGoalPayloadData(configObj, userId, eventName, metricMap, revenueValue, revenuePropList) {
    var properties = this.getEventBasePayload(configObj, userId, eventName);
    var metric = {};
    Object.keys(metricMap).forEach(function (key) {
      metric["id_".concat(key)] = ["g_".concat(metricMap[key].goal.id)];
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_EVENT_ARCH_TRACK_GOAL, {
        file: FileNameEnum.ImpressionUtil,
        goalName: eventName,
        a: configObj.accountId,
        u: userId,
        c: key
      }));
    });
    properties.d.event.props.vwoMeta = {
      metric: metric
    };

    if (revenuePropList && revenueValue && revenuePropList.size > 0) {
      revenuePropList.forEach(function (revenueProp) {
        properties.d.event.props.vwoMeta[revenueProp] = revenueValue;
      });
    }

    properties.d.event.props.isCustomEvent = true;
    return properties;
  },

  /**
   * Builds payload to appply post segmentation on VWO campaign reports.
   * @param {Object} configObj
   * @param {String} userId
   * @param {String} eventName
   * @param {Object} customDimensionMap
   * @returns push payload
   */
  getPushPayloadData: function getPushPayloadData(configObj, userId, eventName, customDimensionMap) {
    var properties = this.getEventBasePayload(configObj, userId, eventName);
    properties.d.event.props.isCustomEvent = true;
    Object.keys(customDimensionMap).forEach(function (key) {
      var tagValue = DataTypeUtil.isString(customDimensionMap[key]) ? customDimensionMap[key] : JSON.stringify(customDimensionMap[key]);
      properties.d.event.props.$visitor.props[key] = tagValue;
      properties.d.visitor.props[key] = tagValue;
    });
    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_EVENT_ARCH_PUSH, {
      file: FileNameEnum.ImpressionUtil,
      a: configObj.accountId,
      u: userId,
      property: JSON.stringify(customDimensionMap)
    }));
    return properties;
  },

  /**
   * Remove the sensitive keys from the properties to te displayed in the log.
   * @param {Object} properties
   * @returns properties without sensitive keys
   */
  _getStringifiedLogProperties: function _getStringifiedLogProperties(properties) {
    var logProperties = Object.assign({}, properties);
    delete logProperties.env;
    return JSON.stringify(logProperties);
  }
};
module.exports = ImpressionUtil;

/***/ }),

/***/ "./lib/utils/LogMessageUtil.js":
/*!*************************************!*\
  !*** ./lib/utils/LogMessageUtil.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var DataTypeUtil = __webpack_require__(/*! ./DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var nargs = /\{([0-9a-zA-Z_]+)\}/g;
var LogMessageUtil = {
  /**
   * Took reference from: string-template
   *
   * Name: string-template
   * Published Name: string-template
   * URL: https://github.com/Matt-Esch/string-template
   * Description: A lightweight string replace engine for text-based templates
   * Author: Matt-Esch (https://github.com/Matt-Esch)
   * License: MIT License
   * Local Modifications: This library is not used as a dependency.
   *       Source code was referenced and is modified as per requirements.
   */
  build: function build(template, data) {
    try {
      return template.replace(nargs, function (match, key, index) {
        var result;
        var isKey;

        if (template[index - 1] === '{' && template[index + match.length] === '}') {
          return key;
        } else {
          isKey = data.hasOwnProperty(key);

          if (isKey) {
            var value = data[key];

            if (DataTypeUtil.isFunction(value)) {
              value = data[key]();
            }

            result = value;
          } else {
            result = null;
          }

          if (result === null || result === undefined) {
            return '';
          }

          return result;
        }
      });
    } catch (err) {
      return template;
    }
  }
};
module.exports = LogMessageUtil;

/***/ }),

/***/ "./lib/utils/ObjectUtil.js":
/*!*********************************!*\
  !*** ./lib/utils/ObjectUtil.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var ObjectUtil = {
  areObjectKeys: function areObjectKeys() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Object.keys(obj).length;
  },
  getKeyValue: function getKeyValue(obj) {
    if (!ObjectUtil.areObjectKeys(obj)) {
      return;
    }

    var key = Object.keys(obj)[0];
    var value = obj[key];
    return {
      key: key,
      value: value
    };
  },
  objectValues: function objectValues(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  }
};
module.exports = ObjectUtil;

/***/ }),

/***/ "./lib/utils/SegmentUtil.js":
/*!**********************************!*\
  !*** ./lib/utils/SegmentUtil.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var _require = __webpack_require__(/*! ../utils/FunctionUtil */ "./lib/utils/FunctionUtil.js"),
    matchWithRegex = _require.matchWithRegex;

var _require2 = __webpack_require__(/*! ../utils/ObjectUtil */ "./lib/utils/ObjectUtil.js"),
    getKeyValue = _require2.getKeyValue;

var SegmentEnum = __webpack_require__(/*! ../enums/segment */ "./lib/enums/segment/index.js");

var _SegmentEnum$SegmentO = SegmentEnum.SegmentOperandValueTypeRegexes,
    LOWER_MATCH = _SegmentEnum$SegmentO.LOWER_MATCH,
    WILDCARD_MATCH = _SegmentEnum$SegmentO.WILDCARD_MATCH,
    REGEX_MATCH = _SegmentEnum$SegmentO.REGEX_MATCH,
    STARTING_STAR = _SegmentEnum$SegmentO.STARTING_STAR,
    ENDING_STAR = _SegmentEnum$SegmentO.ENDING_STAR;
var _SegmentEnum$SegmentO2 = SegmentEnum.SegmentOperandValues,
    LOWER_VALUE = _SegmentEnum$SegmentO2.LOWER_VALUE,
    STARTING_ENDING_STAR_VALUE = _SegmentEnum$SegmentO2.STARTING_ENDING_STAR_VALUE,
    STARTING_STAR_VALUE = _SegmentEnum$SegmentO2.STARTING_STAR_VALUE,
    ENDING_STAR_VALUE = _SegmentEnum$SegmentO2.ENDING_STAR_VALUE,
    REGEX_VALUE = _SegmentEnum$SegmentO2.REGEX_VALUE,
    EQUAL_VALUE = _SegmentEnum$SegmentO2.EQUAL_VALUE;

function extractOperandValue(operand, regex) {
  return matchWithRegex(operand, regex) && matchWithRegex(operand, regex)[1];
}

function processValues(operandValue, tagValue) {
  // this is atomic, either both will be processed or none
  var processedOperandValue = parseFloat(operandValue, 10);
  var processedTagValue = parseFloat(tagValue, 10);

  if (!processedOperandValue || !processedTagValue) {
    return {
      operandValue: operandValue,
      tagValue: tagValue
    };
  } // now we have surity that both are numbers
  // now we can convert them independently to int type if they
  // are int rather than floats


  if (processedOperandValue === Math.floor(processedOperandValue)) {
    processedOperandValue = parseInt(processedOperandValue, 10);
  }

  if (processedTagValue === Math.floor(processedTagValue)) {
    processedTagValue = parseInt(processedTagValue, 10);
  } // convert it back to string and return


  return {
    operandValue: processedOperandValue.toString(),
    tagValue: processedTagValue.toString()
  };
}

function preProcessTagValue(tagValue) {
  if (tagValue === undefined) {
    tagValue = '';
  }

  if (DataTypeUtil.isBoolean(tagValue)) {
    if (tagValue) {
      tagValue = true;
    } else {
      tagValue = false;
    }
  }

  if (tagValue !== null) {
    tagValue = tagValue.toString();
  }

  return tagValue;
}

function preProcessOperandValue(operand) {
  var operandType;
  var operandValue;
  var startingStar;
  var endingStar; // Pre process operand value

  if (matchWithRegex(operand, LOWER_MATCH)) {
    operandType = LOWER_VALUE;
    operandValue = extractOperandValue(operand, LOWER_MATCH);
  } else if (matchWithRegex(operand, WILDCARD_MATCH)) {
    operandValue = extractOperandValue(operand, WILDCARD_MATCH);
    startingStar = matchWithRegex(operandValue, STARTING_STAR);
    endingStar = matchWithRegex(operandValue, ENDING_STAR); // In case of wildcard, the operand type is further divided into contains, startswith and endswith

    if (startingStar && endingStar) {
      operandType = STARTING_ENDING_STAR_VALUE;
    } else if (startingStar) {
      operandType = STARTING_STAR_VALUE;
    } else if (endingStar) {
      operandType = ENDING_STAR_VALUE;
    }

    operandValue = operandValue.replace(STARTING_STAR, '').replace(ENDING_STAR, '');
  } else if (matchWithRegex(operand, REGEX_MATCH)) {
    operandType = REGEX_VALUE;
    operandValue = extractOperandValue(operand, REGEX_MATCH);
  } else {
    operandType = EQUAL_VALUE;
    operandValue = operand;
  }

  return {
    operandType: operandType,
    operandValue: operandValue
  };
}

function operandCustomVariablesParser(operand, customVariables) {
  // Extract custom_variable_key and custom_variable_value from operand
  var _getKeyValue = getKeyValue(operand),
      key = _getKeyValue.key,
      value = _getKeyValue.value;

  var operandKey = key;
  operand = value;

  if (!customVariables.hasOwnProperty(key)) {
    // For handling ".*" regex case when key is not present in customVariables and matches regex is used.
    return false;
  }

  var tagValue = customVariables[operandKey]; // Pre process tag value

  tagValue = preProcessTagValue(tagValue);

  var _preProcessOperandVal = preProcessOperandValue(operand),
      operandType = _preProcessOperandVal.operandType,
      operandValue = _preProcessOperandVal.operandValue; // Process both operand and tag values


  var processedValues = processValues(operandValue, tagValue);
  tagValue = processedValues.tagValue;
  return extractResult(operandType, processedValues.operandValue, tagValue);
}

function operandUserParser(operand, customVariables) {
  var users = operand.split(',');

  for (var i = 0; i < users.length; i++) {
    if (users[i].trim() === customVariables._vwoUserId) {
      return true;
    }
  }

  return false;
}

function extractResult(operandType, operandValue, tagValue) {
  var result;

  switch (operandType) {
    case LOWER_VALUE:
      if (tagValue !== null) {
        result = operandValue.toLowerCase() === tagValue.toLowerCase();
      }

      break;

    case STARTING_ENDING_STAR_VALUE:
      if (tagValue !== null) {
        result = tagValue.indexOf(operandValue) > -1;
      }

      break;

    case STARTING_STAR_VALUE:
      if (tagValue !== null) {
        result = tagValue.endsWith(operandValue);
      }

      break;

    case ENDING_STAR_VALUE:
      if (tagValue !== null) {
        result = tagValue.startsWith(operandValue);
      }

      break;

    case REGEX_VALUE:
      try {
        var pattern = new RegExp(operandValue, 'g');
        result = !!pattern.test(tagValue);
      } catch (err) {
        result = false;
      }

      break;

    default:
      result = tagValue === operandValue;
  }

  return result;
}

module.exports = {
  extractOperandValue: extractOperandValue,
  processValues: processValues,
  preProcessTagValue: preProcessTagValue,
  preProcessOperandValue: preProcessOperandValue,
  operandCustomVariablesParser: operandCustomVariablesParser,
  operandUserParser: operandUserParser
};

/***/ }),

/***/ "./lib/utils/SettingsFileUtil.js":
/*!***************************************!*\
  !*** ./lib/utils/SettingsFileUtil.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var UrlEnum = __webpack_require__(/*! ../enums/UrlEnum */ "./lib/enums/UrlEnum.js");

var _require = __webpack_require__(/*! ./FunctionUtil */ "./lib/utils/FunctionUtil.js"),
    getRandomNumber = _require.getRandomNumber,
    getCurrentTime = _require.getCurrentTime;

var SettingsFileUtil = {
  get: function get(accountId, sdkKey, userStorageService) {
    var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (!accountId || !sdkKey) {
      console.error('AccountId and sdkKey are required for fetching account settings. Aborting!');
      return;
    }

    var protocol = 'https';
    var port;
    var hostname = UrlEnum.BASE_URL;
    var path = UrlEnum.SETTINGS_URL;

    if (config.isViaWebhook) {
      path = UrlEnum.WEBHOOK_SETTINGS_URL;
    }

    path += "?a=".concat(accountId, "&") + "i=".concat(sdkKey, "&") + "r=".concat(getRandomNumber(), "&") + "platform=".concat(Constants.PLATFORM, "&") + "".concat(Constants.SDK_QUERY_PARAM, "=").concat(Constants.SDK_NAME, "&") + "".concat(Constants.SDK_VERSION_QUERY_PARAM, "=").concat(Constants.SDK_VERSION);

    if (config.hostname && config.path) {
      protocol = config.protocol;
      port = config.port;
      hostname = config.hostname || hostname;
      path = config.path || path;
    }

    if (true) {
      return __webpack_require__(/*! ./XhrUtil */ "./lib/utils/XhrUtil.js").send({
        method: 'GET',
        url: "".concat(protocol, "://").concat(hostname).concat(path),
        userStorageService: userStorageService
      });
    } else { var https, http; }
  },
  handleHttpRequest: function handleHttpRequest(res, resolve, reject) {
    var statusCode = res.statusCode;
    var contentType = res.headers['content-type'];
    var error;
    var rawData = '';

    if (!/^application\/json/.test(contentType)) {
      error = "Invalid content-type.\nExpected application/json but received ".concat(contentType);
    }

    if (error) {
      console.error(error.message); // Consume response data to free up memory

      res.resume();
      reject(error);
      return;
    }

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      rawData += chunk;
    });
    res.on('end', function () {
      SettingsFileUtil.handleHttpResponse(statusCode, rawData, resolve, reject);
    });
  },
  handleHttpResponse: function handleHttpResponse(statusCode, rawData, resolve, reject) {
    try {
      var parsedData = JSON.parse(rawData);

      if (statusCode !== 200) {
        var error = "VWO-SDK - [ERROR]: ".concat(getCurrentTime(), " Request failed for fetching account settings. Got Status Code: ").concat(statusCode, " and message: ").concat(rawData);
        console.error(error);
        reject(error);
        return;
      }

      resolve(parsedData);
    } catch (err) {
      console.error("VWO-SDK - [ERROR]: ".concat(getCurrentTime(), " Request failed for fetching account settings - ").concat(err.message));
      reject(err);
    }
  }
};
module.exports = SettingsFileUtil;

/***/ }),

/***/ "./lib/utils/UuidUtil.js":
/*!*******************************!*\
  !*** ./lib/utils/UuidUtil.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var uuidv5 = __webpack_require__(/*! uuid/v5 */ "./node_modules/uuid/v5.js");

var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();
var VWO_NAMESPACE = uuidv5(Constants.SEED_URL, uuidv5.URL);
var UuidUtil = {
  generateFor: function generateFor(userId, accountId) {
    userId = "".concat(userId); // type-cast

    var hash = "".concat(accountId);
    var userIdNamespace = UuidUtil.generate(hash, VWO_NAMESPACE);
    var uuidForUserIdAccountId = UuidUtil.generate(userId, userIdNamespace);
    var desiredUuid = uuidForUserIdAccountId.replace(/-/gi, '').toUpperCase();
    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.UUID_FOR_USER, {
      file: FileNameEnum.UuidUtil,
      userId: userId,
      accountId: accountId,
      desiredUuid: desiredUuid
    }));
    return desiredUuid;
  },
  generate: function generate(name, namespace) {
    if (!name || !namespace) {
      return;
    }

    return uuidv5(name, namespace);
  }
};
module.exports = UuidUtil;

/***/ }),

/***/ "./lib/utils/ValidateUtil.js":
/*!***********************************!*\
  !*** ./lib/utils/ValidateUtil.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _APIMethodArgumentsVa;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var DataTypeUtil = __webpack_require__(/*! ./DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var DataTypeEnum = __webpack_require__(/*! ../enums/DataTypeEnum */ "./lib/enums/DataTypeEnum.js");

var ApiEnum = __webpack_require__(/*! ../enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var GoalTypeEnum = __webpack_require__(/*! ../enums/GoalTypeEnum */ "./lib/enums/GoalTypeEnum.js");

var APIMethodArgumentsValidationEnum = (_APIMethodArgumentsVa = {}, _defineProperty(_APIMethodArgumentsVa, ApiEnum.ACTIVATE, function (_ref) {
  var campaignKey = _ref.campaignKey,
      userId = _ref.userId,
      _ref$customVariables = _ref.customVariables,
      customVariables = _ref$customVariables === void 0 ? {} : _ref$customVariables,
      _ref$variationTargeti = _ref.variationTargetingVariables,
      variationTargetingVariables = _ref$variationTargeti === void 0 ? {} : _ref$variationTargeti,
      _ref$userStorageData = _ref.userStorageData,
      userStorageData = _ref$userStorageData === void 0 ? {} : _ref$userStorageData,
      _ref$shouldTrackRetur = _ref.shouldTrackReturningUser,
      shouldTrackReturningUser = _ref$shouldTrackRetur === void 0 ? false : _ref$shouldTrackRetur,
      _ref$metaData = _ref.metaData,
      metaData = _ref$metaData === void 0 ? {} : _ref$metaData;
  return [{
    key: 'campaignKey',
    value: campaignKey,
    type: DataTypeEnum.STRING
  }, {
    key: 'userId',
    value: userId,
    type: DataTypeEnum.STRING
  }, {
    key: 'customVariables',
    value: customVariables,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'variationTargetingVariables',
    value: variationTargetingVariables,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'userStorageData',
    value: userStorageData,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'shouldTrackReturningUser',
    value: shouldTrackReturningUser,
    type: DataTypeEnum.BOOLEAN
  }, {
    key: 'metaData',
    value: metaData,
    type: DataTypeEnum.OBJECT
  }];
}), _defineProperty(_APIMethodArgumentsVa, ApiEnum.TRACK, function (_ref2) {
  var campaignKey = _ref2.campaignKey,
      userId = _ref2.userId,
      goalIdentifier = _ref2.goalIdentifier,
      _ref2$customVariables = _ref2.customVariables,
      customVariables = _ref2$customVariables === void 0 ? {} : _ref2$customVariables,
      _ref2$variationTarget = _ref2.variationTargetingVariables,
      variationTargetingVariables = _ref2$variationTarget === void 0 ? {} : _ref2$variationTarget,
      _ref2$userStorageData = _ref2.userStorageData,
      userStorageData = _ref2$userStorageData === void 0 ? {} : _ref2$userStorageData,
      _ref2$goalTypeToTrack = _ref2.goalTypeToTrack,
      goalTypeToTrack = _ref2$goalTypeToTrack === void 0 ? GoalTypeEnum.ALL : _ref2$goalTypeToTrack,
      _ref2$shouldTrackRetu = _ref2.shouldTrackReturningUser,
      shouldTrackReturningUser = _ref2$shouldTrackRetu === void 0 ? false : _ref2$shouldTrackRetu,
      _ref2$metaData = _ref2.metaData,
      metaData = _ref2$metaData === void 0 ? {} : _ref2$metaData;
  return [{
    key: 'campaignKey',
    value: campaignKey,
    type: DataTypeEnum.STRING_NULL_UNDEFINED_ARRAY
  }, {
    key: 'userId',
    value: userId,
    type: DataTypeEnum.STRING
  }, {
    key: 'goalIdentifier',
    value: goalIdentifier,
    type: DataTypeEnum.STRING
  }, {
    key: 'customVariables',
    value: customVariables,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'variationTargetingVariables',
    value: variationTargetingVariables,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'userStorageData',
    value: userStorageData,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'goalTypeToTrack',
    value: goalTypeToTrack,
    type: DataTypeEnum.STRING
  }, {
    key: 'shouldTrackReturningUser',
    value: shouldTrackReturningUser,
    type: DataTypeEnum.BOOLEAN
  }, {
    key: 'metaData',
    value: metaData,
    type: DataTypeEnum.OBJECT
  }];
}), _defineProperty(_APIMethodArgumentsVa, ApiEnum.IS_FEATURE_ENABLED, function (_ref3) {
  var campaignKey = _ref3.campaignKey,
      userId = _ref3.userId,
      _ref3$customVariables = _ref3.customVariables,
      customVariables = _ref3$customVariables === void 0 ? {} : _ref3$customVariables,
      _ref3$variationTarget = _ref3.variationTargetingVariables,
      variationTargetingVariables = _ref3$variationTarget === void 0 ? {} : _ref3$variationTarget,
      _ref3$userStorageData = _ref3.userStorageData,
      userStorageData = _ref3$userStorageData === void 0 ? {} : _ref3$userStorageData,
      _ref3$shouldTrackRetu = _ref3.shouldTrackReturningUser,
      shouldTrackReturningUser = _ref3$shouldTrackRetu === void 0 ? false : _ref3$shouldTrackRetu,
      _ref3$metaData = _ref3.metaData,
      metaData = _ref3$metaData === void 0 ? {} : _ref3$metaData;
  return [{
    key: 'campaignKey',
    value: campaignKey,
    type: DataTypeEnum.STRING
  }, {
    key: 'userId',
    value: userId,
    type: DataTypeEnum.STRING
  }, {
    key: 'customVariables',
    value: customVariables,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'variationTargetingVariables',
    value: variationTargetingVariables,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'userStorageData',
    value: userStorageData,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'shouldTrackReturningUser',
    value: shouldTrackReturningUser,
    type: DataTypeEnum.BOOLEAN
  }, {
    key: 'metaData',
    value: metaData,
    type: DataTypeEnum.OBJECT
  }];
}), _defineProperty(_APIMethodArgumentsVa, ApiEnum.GET_FEATURE_VARIABLE_VALUE, function (_ref4) {
  var campaignKey = _ref4.campaignKey,
      variableKey = _ref4.variableKey,
      userId = _ref4.userId,
      _ref4$customVariables = _ref4.customVariables,
      customVariables = _ref4$customVariables === void 0 ? {} : _ref4$customVariables,
      _ref4$variationTarget = _ref4.variationTargetingVariables,
      variationTargetingVariables = _ref4$variationTarget === void 0 ? {} : _ref4$variationTarget,
      _ref4$userStorageData = _ref4.userStorageData,
      userStorageData = _ref4$userStorageData === void 0 ? {} : _ref4$userStorageData,
      _ref4$metaData = _ref4.metaData,
      metaData = _ref4$metaData === void 0 ? {} : _ref4$metaData;
  return [{
    key: 'campaignKey',
    value: campaignKey,
    type: DataTypeEnum.STRING
  }, {
    key: 'variableKey',
    value: variableKey,
    type: DataTypeEnum.STRING
  }, {
    key: 'userId',
    value: userId,
    type: DataTypeEnum.STRING
  }, {
    key: 'customVariables',
    value: customVariables,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'variationTargetingVariables',
    value: variationTargetingVariables,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'userStorageData',
    value: userStorageData,
    type: DataTypeEnum.OBJECT
  }, {
    key: 'metaData',
    value: metaData,
    type: DataTypeEnum.OBJECT
  }];
}), _defineProperty(_APIMethodArgumentsVa, ApiEnum.PUSH, function (_ref5) {
  var tagKey = _ref5.tagKey,
      tagValue = _ref5.tagValue,
      userId = _ref5.userId,
      customDimensionMap = _ref5.customDimensionMap;
  return [{
    key: 'tagKey',
    value: tagKey,
    type: DataTypeEnum.STRING
  }, {
    key: 'tagValue',
    value: tagValue,
    type: DataTypeEnum.STRING
  }, {
    key: 'userId',
    value: userId,
    type: DataTypeEnum.STRING
  }, {
    key: 'customDimensionMap',
    value: customDimensionMap,
    type: DataTypeEnum.OBJECT
  }];
}), _APIMethodArgumentsVa); // both have same

APIMethodArgumentsValidationEnum[ApiEnum.GET_VARIATION_NAME] = APIMethodArgumentsValidationEnum[ApiEnum.ACTIVATE];
var ValidateUtil = {
  isValidValue: function isValidValue(value) {
    return !!(value !== undefined && value);
  },
  isValidString: function isValidString(value) {
    return ValidateUtil.isValidValue(value) && DataTypeUtil.isString(value);
  },
  isValidNumber: function isValidNumber(value) {
    return ValidateUtil.isValidValue(value) && DataTypeUtil.isNumber(value);
  },
  isValidFunction: function isValidFunction(value) {
    return ValidateUtil.isValidValue(value) && DataTypeUtil.isFunction(value);
  },
  isValidBoolean: function isValidBoolean(value) {
    return value !== undefined && DataTypeUtil.isBoolean(value);
  },
  isValidObject: function isValidObject(value) {
    return value !== undefined && DataTypeUtil.isObject(value);
  },
  areValidParamsForAPIMethod: function areValidParamsForAPIMethod(argsObj) {
    var isValid = false;
    var args = APIMethodArgumentsValidationEnum[argsObj.method](argsObj);
    var validators = [];

    for (var i = 0; i < args.length; i++) {
      var argConfig = args[i];
      var argValue = argConfig.value;
      var dataType = argConfig.type; // let value;

      switch (dataType) {
        case DataTypeEnum.NUMBER:
          validators.push(ValidateUtil.isValidNumber(argValue));
          break;

        case DataTypeEnum.STRING:
          validators.push(ValidateUtil.isValidString(argValue));
          break;

        case DataTypeEnum.BOOLEAN:
          validators.push(ValidateUtil.isValidBoolean(argValue));
          break;
        // case DataTypeEnum.FUNCTION:
        //   validators.push(ValidateUtil.isValidFunction(argValue));
        //   break;

        case DataTypeEnum.OBJECT:
          validators.push(ValidateUtil.isValidObject(argValue));
          break;

        case DataTypeEnum.STRING_NULL_UNDEFINED_ARRAY:
          var value = ValidateUtil.isValidString(argValue) || DataTypeUtil.isUndefined(argValue) || DataTypeUtil.isNull(argValue) || DataTypeUtil.isArray(argValue);
          validators.push(value);
          break;
        // case DataTypeEnum.NUMBER_STRING:
        //   value = ValidateUtil.isValidNumber(argValue) || ValidateUtil.isValidString(argValue);
        //   validators.push(value);
        //   break;
      }
    }

    isValid = validators.every(function (val) {
      return val;
    });
    return isValid;
  }
};
module.exports = ValidateUtil;

/***/ }),

/***/ "./lib/utils/XhrUtil.js":
/*!******************************!*\
  !*** ./lib/utils/XhrUtil.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var _require = __webpack_require__(/*! ./FunctionUtil */ "./lib/utils/FunctionUtil.js"),
    getCurrentTime = _require.getCurrentTime;

var _require2 = __webpack_require__(/*! ./DataTypeUtil */ "./lib/utils/DataTypeUtil.js"),
    isObject = _require2.isObject,
    isFunction = _require2.isFunction;

var XhrUtil = {
  _getStoredSettings: function _getStoredSettings(userStorageService) {
    var isStoredData = false;
    var parsedSettings;

    if (userStorageService && isObject(userStorageService) && isFunction(userStorageService.getSettings)) {
      try {
        var settings = userStorageService.getSettings();
        parsedSettings = JSON.parse(settings);

        if (parsedSettings && isObject(parsedSettings) && Object.keys(parsedSettings).length > 3) {
          var info = "VWO-SDK - [INFO]: ".concat(getCurrentTime(), " VWO settings found in Storage Service.");
          console.info(info);
          isStoredData = true;
        } else if (parsedSettings) {
          var error = "VWO-SDK - [ERROR]: ".concat(getCurrentTime(), " VWO settings found in Storage Service is not valid.");
          console.error(error);
        } else {
          var warning = "VWO-SDK - [WARNING]: ".concat(getCurrentTime(), " VWO settings is empty in Storage Service.");
          console.warn(warning);
        }
      } catch (err) {
        var _error = "VWO-SDK - [ERROR]: ".concat(getCurrentTime(), " VWO settings found in Storage Service is not valid. ").concat(err);

        console.error(_error);
        isStoredData = false;
      }
    }

    return {
      isStoredData: isStoredData,
      parsedSettings: parsedSettings
    };
  },
  send: function send() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        method = _ref.method,
        url = _ref.url,
        userStorageService = _ref.userStorageService;

    if (!url || !method) {
      return;
    }

    return new Promise(function (resolve, reject) {
      var _XhrUtil$_getStoredSe = XhrUtil._getStoredSettings(userStorageService),
          isStoredData = _XhrUtil$_getStoredSe.isStoredData,
          parsedSettings = _XhrUtil$_getStoredSe.parsedSettings;

      if (isStoredData) {
        resolve(parsedSettings);
      } else {
        var xhr = new XMLHttpRequest();

        _this.xhrHandler(xhr, method, url, userStorageService, resolve, reject);
      }
    });
  },
  xhrHandler: function xhrHandler(xhr, method, url, userStorageService, resolve, reject) {
    var _this2 = this;

    xhr.onload = function () {
      _this2.xhrOnLoad(xhr, userStorageService, resolve);
    };

    xhr.onerror = function () {
      _this2.xhrOnError(xhr, reject);
    };

    xhr.open(method, url);
    xhr.send();
  },
  xhrOnLoad: function xhrOnLoad(xhr, userStorageService, resolve) {
    try {
      var parsedXhrResponse = JSON.parse(xhr.response);

      if (userStorageService && isObject(userStorageService) && isFunction(userStorageService.setSettings)) {
        userStorageService.setSettings(xhr.response);
      }

      resolve(parsedXhrResponse);
    } catch (err) {
      console.error(err);
    }
  },
  xhrOnError: function xhrOnError(xhr, reject) {
    var error = "VWO-SDK - [ERROR]: ".concat(getCurrentTime(), " Request failed for fetching account settings. Got Status Code: ").concat(xhr.status);
    console.error(error);
    reject(error);
  }
};
module.exports = XhrUtil;

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/builtin-status-codes/browser.js":
/*!******************************************************!*\
  !*** ./node_modules/builtin-status-codes/browser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}


/***/ }),

/***/ "./node_modules/core-util-is/lib/util.js":
/*!***********************************************!*\
  !*** ./node_modules/core-util-is/lib/util.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/https-browserify/index.js":
/*!************************************************!*\
  !*** ./node_modules/https-browserify/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var http = __webpack_require__(/*! http */ "./node_modules/stream-http/index.js")
var url = __webpack_require__(/*! url */ "./node_modules/url/url.js")

var https = module.exports

for (var key in http) {
  if (http.hasOwnProperty(key)) https[key] = http[key]
}

https.request = function (params, cb) {
  params = validateParams(params)
  return http.request.call(this, params, cb)
}

https.get = function (params, cb) {
  params = validateParams(params)
  return http.get.call(this, params, cb)
}

function validateParams (params) {
  if (typeof params === 'string') {
    params = url.parse(params)
  }
  if (!params.protocol) {
    params.protocol = 'https:'
  }
  if (params.protocol !== 'https:') {
    throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"')
  }
  return params
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/murmurhash/murmurhash.js":
/*!***********************************************!*\
  !*** ./node_modules/murmurhash/murmurhash.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var _global = this;

  /**
   * JS Implementation of MurmurHash2
   *
   * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
   * @see http://github.com/garycourt/murmurhash-js
   * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
   * @see http://sites.google.com/site/murmurhash/
   *
   * @param {string} str ASCII only
   * @param {number} seed Positive integer only
   * @return {number} 32-bit positive integer hash
   */
  function MurmurHashV2(str, seed) {
    var
      l = str.length,
      h = seed ^ l,
      i = 0,
      k;

    while (l >= 4) {
      k =
        ((str.charCodeAt(i) & 0xff)) |
        ((str.charCodeAt(++i) & 0xff) << 8) |
        ((str.charCodeAt(++i) & 0xff) << 16) |
        ((str.charCodeAt(++i) & 0xff) << 24);

      k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
      k ^= k >>> 24;
      k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));

    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;

      l -= 4;
      ++i;
    }

    switch (l) {
    case 3: h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
    case 2: h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
    case 1: h ^= (str.charCodeAt(i) & 0xff);
            h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    }

    h ^= h >>> 13;
    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    h ^= h >>> 15;

    return h >>> 0;
  };

  /**
   * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
   *
   * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
   * @see http://github.com/garycourt/murmurhash-js
   * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
   * @see http://sites.google.com/site/murmurhash/
   *
   * @param {string} key ASCII only
   * @param {number} seed Positive integer only
   * @return {number} 32-bit positive integer hash
   */
  function MurmurHashV3(key, seed) {
    var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

    remainder = key.length & 3; // key.length % 4
    bytes = key.length - remainder;
    h1 = seed;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;

    while (i < bytes) {
        k1 =
          ((key.charCodeAt(i) & 0xff)) |
          ((key.charCodeAt(++i) & 0xff) << 8) |
          ((key.charCodeAt(++i) & 0xff) << 16) |
          ((key.charCodeAt(++i) & 0xff) << 24);
      ++i;

      k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

      h1 ^= k1;
          h1 = (h1 << 13) | (h1 >>> 19);
      h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
      h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
    }

    k1 = 0;

    switch (remainder) {
      case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      case 1: k1 ^= (key.charCodeAt(i) & 0xff);

      k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
      h1 ^= k1;
    }

    h1 ^= key.length;

    h1 ^= h1 >>> 16;
    h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= h1 >>> 13;
    h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
  }

  var murmur = MurmurHashV3;
  murmur.v2 = MurmurHashV2;
  murmur.v3 = MurmurHashV3;

  if (true) {
    module.exports = murmur;
  } else { var _previousRoot; }
}());


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process-nextick-args/index.js":
/*!****************************************************!*\
  !*** ./node_modules/process-nextick-args/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_duplex.js":
/*!************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_duplex.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

var Readable = __webpack_require__(/*! ./_stream_readable */ "./node_modules/readable-stream/lib/_stream_readable.js");
var Writable = __webpack_require__(/*! ./_stream_writable */ "./node_modules/readable-stream/lib/_stream_writable.js");

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_passthrough.js":
/*!*****************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_passthrough.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(/*! ./_stream_transform */ "./node_modules/readable-stream/lib/_stream_transform.js");

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_readable.js":
/*!**************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_readable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(/*! ./internal/streams/stream */ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/readable-stream/node_modules/safe-buffer/index.js").Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(/*! util */ 0);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(/*! ./internal/streams/BufferList */ "./node_modules/readable-stream/lib/internal/streams/BufferList.js");
var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "./node_modules/readable-stream/lib/internal/streams/destroy.js");
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(/*! string_decoder/ */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(/*! string_decoder/ */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_transform.js":
/*!***************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_transform.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_writable.js":
/*!**************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_writable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(/*! util-deprecate */ "./node_modules/util-deprecate/browser.js")
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(/*! ./internal/streams/stream */ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/readable-stream/node_modules/safe-buffer/index.js").Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "./node_modules/readable-stream/lib/internal/streams/destroy.js");

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/BufferList.js":
/*!*************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/BufferList.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/readable-stream/node_modules/safe-buffer/index.js").Buffer;
var util = __webpack_require__(/*! util */ 1);

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/destroy.js":
/*!**********************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/destroy.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/stream-browser.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;


/***/ }),

/***/ "./node_modules/readable-stream/node_modules/safe-buffer/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/readable-stream/node_modules/safe-buffer/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "./node_modules/readable-stream/readable-browser.js":
/*!**********************************************************!*\
  !*** ./node_modules/readable-stream/readable-browser.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ./lib/_stream_readable.js */ "./node_modules/readable-stream/lib/_stream_readable.js");
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(/*! ./lib/_stream_writable.js */ "./node_modules/readable-stream/lib/_stream_writable.js");
exports.Duplex = __webpack_require__(/*! ./lib/_stream_duplex.js */ "./node_modules/readable-stream/lib/_stream_duplex.js");
exports.Transform = __webpack_require__(/*! ./lib/_stream_transform.js */ "./node_modules/readable-stream/lib/_stream_transform.js");
exports.PassThrough = __webpack_require__(/*! ./lib/_stream_passthrough.js */ "./node_modules/readable-stream/lib/_stream_passthrough.js");


/***/ }),

/***/ "./node_modules/safe-buffer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/safe-buffer/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/stream-http/index.js":
/*!*******************************************!*\
  !*** ./node_modules/stream-http/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var ClientRequest = __webpack_require__(/*! ./lib/request */ "./node_modules/stream-http/lib/request.js")
var response = __webpack_require__(/*! ./lib/response */ "./node_modules/stream-http/lib/response.js")
var extend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js")
var statusCodes = __webpack_require__(/*! builtin-status-codes */ "./node_modules/builtin-status-codes/browser.js")
var url = __webpack_require__(/*! url */ "./node_modules/url/url.js")

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.ClientRequest = ClientRequest
http.IncomingMessage = response.IncomingMessage

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.globalAgent = new http.Agent()

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/capability.js":
/*!****************************************************!*\
  !*** ./node_modules/stream-http/lib/capability.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream)

exports.writableStream = isFunction(global.WritableStream)

exports.abortController = isFunction(global.AbortController)

exports.blobConstructor = false
try {
	new Blob([new ArrayBuffer(1)])
	exports.blobConstructor = true
} catch (e) {}

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (global.XMLHttpRequest) {
		xhr = new global.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.
var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined'
var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice)

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || (haveArrayBuffer && checkTypeSupport('arraybuffer'))

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && haveSlice && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer &&
	checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

exports.vbArray = isFunction(global.VBArray)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/request.js":
/*!*************************************************!*\
  !*** ./node_modules/stream-http/lib/request.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var capability = __webpack_require__(/*! ./capability */ "./node_modules/stream-http/lib/capability.js")
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
var response = __webpack_require__(/*! ./response */ "./node_modules/stream-http/lib/response.js")
var stream = __webpack_require__(/*! readable-stream */ "./node_modules/readable-stream/readable-browser.js")
var toArrayBuffer = __webpack_require__(/*! to-arraybuffer */ "./node_modules/to-arraybuffer/index.js")

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else if (capability.vbArray && preferBinary) {
		return 'text:vbarray'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || ('requestTimeout' in opts && !capability.abortController)) {
		// If the use of XHR should be preferred. Not typically needed.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)
	self._fetchTimer = null

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	var headersObj = self._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
		if (capability.arraybuffer) {
			body = toArrayBuffer(Buffer.concat(self._body))
		} else if (capability.blobConstructor) {
			body = new global.Blob(self._body.map(function (buffer) {
				return toArrayBuffer(buffer)
			}), {
				type: (headersObj['content-type'] || {}).value || ''
			})
		} else {
			// get utf8 string
			body = Buffer.concat(self._body).toString()
		}
	}

	// create flattened list of headers
	var headersList = []
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name
		var value = headersObj[keyName].value
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v])
			})
		} else {
			headersList.push([name, value])
		}
	})

	if (self._mode === 'fetch') {
		var signal = null
		var fetchTimer = null
		if (capability.abortController) {
			var controller = new AbortController()
			signal = controller.signal
			self._fetchAbortController = controller

			if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
				self._fetchTimer = global.setTimeout(function () {
					self.emit('requestTimeout')
					if (self._fetchAbortController)
						self._fetchAbortController.abort()
				}, opts.requestTimeout)
			}
		}

		global.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin',
			signal: signal
		}).then(function (response) {
			self._fetchResponse = response
			self._connect()
		}, function (reason) {
			global.clearTimeout(self._fetchTimer)
			if (!self._destroyed)
				self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new global.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode.split(':')[0]

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('requestTimeout' in opts) {
			xhr.timeout = opts.requestTimeout
			xhr.ontimeout = function () {
				self.emit('requestTimeout')
			}
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1])
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress()
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode, self._fetchTimer)
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
	var self = this
	self._destroyed = true
	global.clearTimeout(self._fetchTimer)
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	else if (self._fetchAbortController)
		self._fetchAbortController.abort()
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setTimeout = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via'
]

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/response.js":
/*!**************************************************!*\
  !*** ./node_modules/stream-http/lib/response.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer, global) {var capability = __webpack_require__(/*! ./capability */ "./node_modules/stream-http/lib/capability.js")
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
var stream = __webpack_require__(/*! readable-stream */ "./node_modules/readable-stream/readable-browser.js")

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode, fetchTimer) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function (header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})

		if (capability.writableStream) {
			var writable = new WritableStream({
				write: function (chunk) {
					return new Promise(function (resolve, reject) {
						if (self._destroyed) {
							reject()
						} else if(self.push(new Buffer(chunk))) {
							resolve()
						} else {
							self._resumeFetch = resolve
						}
					})
				},
				close: function () {
					global.clearTimeout(fetchTimer)
					if (!self._destroyed)
						self.push(null)
				},
				abort: function (err) {
					if (!self._destroyed)
						self.emit('error', err)
				}
			})

			try {
				response.body.pipeTo(writable).catch(function (err) {
					global.clearTimeout(fetchTimer)
					if (!self._destroyed)
						self.emit('error', err)
				})
				return
			} catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this
		}
		// fallback for when writableStream or pipeTo aren't available
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				if (result.done) {
					global.clearTimeout(fetchTimer)
					self.push(null)
					return
				}
				self.push(new Buffer(result.value))
				read()
			}).catch(function (err) {
				global.clearTimeout(fetchTimer)
				if (!self._destroyed)
					self.emit('error', err)
			})
		}
		read()
	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {
	var self = this

	var resolve = self._resumeFetch
	if (resolve) {
		self._resumeFetch = null
		resolve()
	}
}

IncomingMessage.prototype._onXHRProgress = function () {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text:vbarray': // For IE9
			if (xhr.readyState !== rStates.DONE)
				break
			try {
				// This fails in IE8
				response = new global.VBArray(xhr.responseBody).toArray()
			} catch (e) {}
			if (response !== null) {
				self.push(new Buffer(response))
				break
			}
			// Falls through in IE8	
		case 'text':
			try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
				response = xhr.responseText
			} catch (e) {
				self._mode = 'text:vbarray'
				break
			}
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = new Buffer(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new global.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		self.push(null)
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/string_decoder/lib/string_decoder.js":
/*!***********************************************************!*\
  !*** ./node_modules/string_decoder/lib/string_decoder.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ "./node_modules/superstruct/lib/index.es.js":
/*!**************************************************!*\
  !*** ./node_modules/superstruct/lib/index.es.js ***!
  \**************************************************/
/*! exports provided: Struct, StructError, any, array, assert, boolean, coerce, coercion, date, defaulted, dynamic, empty, enums, func, instance, intersection, is, lazy, length, literal, map, masked, never, nullable, number, object, optional, partial, pattern, record, refinement, set, string, struct, tuple, type, union, validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Struct", function() { return Struct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructError", function() { return StructError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "any", function() { return any; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array", function() { return array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boolean", function() { return boolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coerce", function() { return coerce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coercion", function() { return coercion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "date", function() { return date; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaulted", function() { return defaulted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dynamic", function() { return dynamic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enums", function() { return enums; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "func", function() { return func; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instance", function() { return instance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersection", function() { return intersection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lazy", function() { return lazy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "literal", function() { return literal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "masked", function() { return masked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "never", function() { return never; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nullable", function() { return nullable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "object", function() { return object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optional", function() { return optional; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "partial", function() { return partial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pattern", function() { return pattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "record", function() { return record; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refinement", function() { return refinement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "string", function() { return string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "struct", function() { return struct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tuple", function() { return tuple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "union", function() { return union; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/**
 * Convert a validation result to an iterable of failures.
 */
function* toFailures(result, context) {
  if (result === true) ; else if (result === false) {
    yield context.fail();
  } else {
    yield* result;
  }
}
/**
 * Shifts (removes and returns) the first value from the `input` iterator.
 * Like `Array.prototype.shift()` but for an `Iterator`.
 */

function iteratorShift(input) {
  const {
    done,
    value
  } = input.next();
  return done ? undefined : value;
}

/**
 * `Struct` objects encapsulate the schema for a specific data type (with
 * optional coercion). You can then use the `assert`, `is` or `validate` helpers
 * to validate unknown data against a struct.
 */

class Struct {
  constructor(props) {
    const {
      type,
      schema,
      coercer = value => value,
      validator = () => [],
      refiner = () => []
    } = props;
    this.type = type;
    this.schema = schema;
    this.coercer = coercer;
    this.validator = validator;
    this.refiner = refiner;
  }

}
/**
 * `StructError` objects are thrown (or returned) by Superstruct when its
 * validation fails. The error represents the first error encountered during
 * validation. But they also have an `error.failures` property that holds
 * information for all of the failures encountered.
 */

class StructError extends TypeError {
  constructor(failure, moreFailures) {
    const {
      path,
      value,
      type,
      branch
    } = failure,
          rest = _objectWithoutProperties(failure, ["path", "value", "type", "branch"]);

    const message = `Expected a value of type \`${type}\`${path.length ? ` for \`${path.join('.')}\`` : ''} but received \`${JSON.stringify(value)}\`.`;
    let failuresResult;

    function failures() {
      if (!failuresResult) {
        failuresResult = [failure, ...moreFailures];
      }

      return failuresResult;
    }

    super(message);
    this.value = value;
    Object.assign(this, rest);
    this.type = type;
    this.path = path;
    this.branch = branch;
    this.failures = failures;
    this.stack = new Error().stack;
    this.__proto__ = StructError.prototype;
  }

}
/**
 * Assert that a value passes a `Struct`, throwing if it doesn't.
 */

function assert(value, struct) {
  const result = validate(value, struct);

  if (result[0]) {
    throw result[0];
  }
}
/**
 * Coerce a value with the coercion logic of `Struct` and validate it.
 */

function coerce(value, struct) {
  const ret = struct.coercer(value);
  assert(ret, struct);
  return ret;
}
/**
 * Check if a value passes a `Struct`.
 */

function is(value, struct) {
  const result = validate(value, struct);
  return !result[0];
}
/**
 * Validate a value against a `Struct`, returning an error if invalid.
 */

function validate(value, struct, coercing = false) {
  if (coercing) {
    value = struct.coercer(value);
  }

  const failures = check(value, struct);
  const failure = iteratorShift(failures);

  if (failure) {
    const error = new StructError(failure, failures);
    return [error, undefined];
  } else {
    return [undefined, value];
  }
}
/**
 * Check a value against a `Struct`, returning an iterable of failures.
 */

function* check(value, struct, path = [], branch = []) {
  const {
    type
  } = struct;
  const ctx = {
    value,
    type,
    branch,
    path,

    fail(props = {}) {
      return _objectSpread2({
        value,
        type,
        path,
        branch: [...branch, value]
      }, props);
    },

    check(v, s, parent, key) {
      const p = parent !== undefined ? [...path, key] : path;
      const b = parent !== undefined ? [...branch, parent] : branch;
      return check(v, s, p, b);
    }

  };
  const failures = toFailures(struct.validator(value, ctx), ctx);
  const failure = iteratorShift(failures);

  if (failure) {
    yield failure;
    yield* failures;
  } else {
    yield* toFailures(struct.refiner(value, ctx), ctx);
  }
}

/**
 * Augment a `Struct` to add an additional coercion step to its input.
 */

function coercion(struct, coercer) {
  const fn = struct.coercer;
  return new Struct(_objectSpread2(_objectSpread2({}, struct), {}, {
    coercer: value => {
      return fn(coercer(value));
    }
  }));
}
/**
 * Augment a struct to coerce a default value for missing values.
 *
 * Note: You must use `coerce(value, Struct)` on the value before validating it
 * to have the value defaulted!
 */

function defaulted(S, fallback, strict) {
  return coercion(S, x => {
    const f = typeof fallback === 'function' ? fallback() : fallback;

    if (x === undefined) {
      return f;
    }

    if (strict !== true && isPlainObject(x) && isPlainObject(f)) {
      const ret = _objectSpread2({}, x);

      let changed = false;

      for (const key in f) {
        if (ret[key] === undefined) {
          ret[key] = f[key];
          changed = true;
        }
      }

      if (changed) {
        return ret;
      }
    }

    return x;
  });
}
/**
 * Coerce a value to mask its properties to only that defined in the struct.
 */

function masked(S) {
  return coercion(S, x => {
    if (!isPlainObject(x)) {
      return x;
    }

    const ret = {};

    for (const key in S.schema) {
      ret[key] = x[key];
    }

    return ret;
  });
}
/**
 * Check if a value is a plain object.
 */

function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Augment a string or array struct to constrain its length to zero.
 */

function empty(S) {
  return refinement(S, `${S.type} & Empty`, value => {
    return value.length === 0;
  });
}
/**
 * Augment a string or array struct to constrain its length to being between a
 * minimum and maximum size.
 */

function length(S, min, max) {
  return refinement(S, `${S.type} & Length<${min},${max}>`, value => {
    return min < value.length && value.length < max;
  });
}
/**
 * Refine a string struct to match a specific regexp pattern.
 */

function pattern(S, regexp) {
  return refinement(S, `${S.type} & Pattern<${regexp.source}>`, value => {
    return regexp.test(value);
  });
}
/**
 * Augment a `Struct` to add an additional refinement to the validation.
 */

function refinement(struct, type, refiner) {
  const fn = struct.refiner;
  return new Struct(_objectSpread2(_objectSpread2({}, struct), {}, {
    type,

    *refiner(value, fail) {
      yield* toFailures(fn(value, fail), fail);
      yield* toFailures(refiner(value, fail), fail);
    }

  }));
}

/**
 * Validate any value.
 */

function any() {
  return struct('any', () => true);
}
function array(Element) {
  return new Struct({
    type: `Array<${Element ? Element.type : 'unknown'}>`,
    schema: Element,
    coercer: value => {
      return Element && Array.isArray(value) ? value.map(v => coerce(v, Element)) : value;
    },

    *validator(value, ctx) {
      if (!Array.isArray(value)) {
        yield ctx.fail();
        return;
      }

      if (Element) {
        for (const [i, v] of value.entries()) {
          yield* ctx.check(v, Element, value, i);
        }
      }
    }

  });
}
/**
 * Validate that boolean values.
 */

function boolean() {
  return struct('boolean', value => {
    return typeof value === 'boolean';
  });
}
/**
 * Validate that `Date` values.
 *
 * Note: this also ensures that the value is *not* an invalid `Date` object,
 * which can occur when parsing a date fails but still returns a `Date`.
 */

function date() {
  return struct('Date', value => {
    return value instanceof Date && !isNaN(value.getTime());
  });
}
/**
 * Validate that a value dynamically, determing which struct to use at runtime.
 */

function dynamic(fn) {
  return struct('Dynamic<...>', (value, ctx) => {
    return ctx.check(value, fn(value, ctx));
  });
}
function enums(values) {
  return struct(`Enum<${values.map(toLiteralString)}>`, value => {
    return values.includes(value);
  });
}
/**
 * Validate that a value is a function.
 */

function func() {
  return struct('Function', value => {
    return typeof value === 'function';
  });
}
/**
 * Validate that a value is an instance of a class.
 */

function instance(Class) {
  return struct(`InstanceOf<${Class.name}>`, value => {
    return value instanceof Class;
  });
}
function intersection(Structs) {
  return struct(Structs.map(s => s.type).join(' & '), function* (value, ctx) {
    for (const S of Structs) {
      yield* ctx.check(value, S);
    }
  });
}
/**
 * Validate a value lazily, by constructing the struct right before the first
 * validation. This is useful for cases where you want to have self-referential
 * structs for nested data structures.
 */

function lazy(fn) {
  let S;
  return struct('Lazy<...>', (value, ctx) => {
    if (!S) {
      S = fn();
    }

    return ctx.check(value, S);
  });
}
function literal(constant) {
  return struct(`Literal<${toLiteralString(constant)}>`, value => {
    return value === constant;
  });
}
/**
 * Validate that a value is a map with specific key and value entries.
 */

function map(Key, Value) {
  return struct(`Map<${Key.type},${Value.type}>`, function* (value, ctx) {
    if (!(value instanceof Map)) {
      yield ctx.fail();
      return;
    }

    for (const [k, v] of value.entries()) {
      yield* ctx.check(k, Key, value, k);
      yield* ctx.check(v, Value, value, k);
    }
  });
}
/**
 * Validate that a value always fails.
 */

function never() {
  return struct('never', () => false);
}
/**
 * Augment a struct to make it accept `null` values.
 */

function nullable(S) {
  return new Struct({
    type: `${S.type} | null`,
    schema: S.schema,
    validator: (value, ctx) => {
      return value === null || ctx.check(value, S);
    }
  });
}
/**
 * Validate that a value is a number.
 */

function number() {
  return struct(`number`, value => {
    return typeof value === 'number' && !isNaN(value);
  });
}
function object(Structs) {
  const knowns = Structs ? Object.keys(Structs) : [];
  const Never = never();
  return new Struct({
    type: Structs ? `Object<{${knowns.join(',')}}>` : 'Object',
    schema: Structs ? Structs : null,
    coercer: Structs ? createObjectCoercer(Structs) : x => x,

    *validator(value, ctx) {
      if (typeof value !== 'object' || value == null) {
        yield ctx.fail();
        return;
      }

      if (Structs) {
        const unknowns = new Set(Object.keys(value));

        for (const key of knowns) {
          unknowns.delete(key);
          const Value = Structs[key];
          const v = value[key];
          yield* ctx.check(v, Value, value, key);
        }

        for (const key of unknowns) {
          const v = value[key];
          yield* ctx.check(v, Never, value, key);
        }
      }
    }

  });
}
/**
 * Augment a struct to make it optionally accept `undefined` values.
 */

function optional(S) {
  return new Struct({
    type: `${S.type}?`,
    schema: S.schema,
    validator: (value, ctx) => {
      return value === undefined || ctx.check(value, S);
    }
  });
}
/**
 * Validate that a partial object with specific entry values.
 */

function partial(Structs) {
  if (Structs instanceof Struct) {
    Structs = Structs.schema;
  }

  const knowns = Object.keys(Structs);
  const Never = never();
  return new Struct({
    type: `Partial<{${knowns.join(',')}}>`,
    schema: Structs,
    coercer: createObjectCoercer(Structs),

    *validator(value, ctx) {
      if (typeof value !== 'object' || value == null) {
        yield ctx.fail();
        return;
      }

      const unknowns = new Set(Object.keys(value));

      for (const key of knowns) {
        unknowns.delete(key);

        if (!(key in value)) {
          continue;
        }

        const Value = Structs[key];
        const v = value[key];
        yield* ctx.check(v, Value, value, key);
      }

      for (const key of unknowns) {
        const v = value[key];
        yield* ctx.check(v, Never, value, key);
      }
    }

  });
}
/**
 * Validate that a value is a record with specific key and
 * value entries.
 */

function record(Key, Value) {
  return struct(`Record<${Key.type},${Value.type}>`, function* (value, ctx) {
    if (typeof value !== 'object' || value == null) {
      yield ctx.fail();
      return;
    }

    for (const k in value) {
      const v = value[k];
      yield* ctx.check(k, Key, value, k);
      yield* ctx.check(v, Value, value, k);
    }
  });
}
/**
 * Validate that a set of values matches a specific type.
 */

function set(Element) {
  return struct(`Set<${Element.type}>`, (value, ctx) => {
    if (!(value instanceof Set)) {
      return false;
    }

    for (const val of value) {
      const [failure] = ctx.check(val, Element);

      if (failure) {
        return false;
      }
    }

    return true;
  });
}
/**
 * Validate that a value is a string.
 */

function string() {
  return struct('string', value => {
    return typeof value === 'string';
  });
}
/**
 * Define a `Struct` instance with a type and validation function.
 */

function struct(name, validator) {
  return new Struct({
    type: name,
    validator,
    schema: null
  });
}
function tuple(Elements) {
  const Never = never();
  return struct(`[${Elements.map(s => s.type).join(',')}]`, function* (value, ctx) {
    if (!Array.isArray(value)) {
      yield ctx.fail();
      return;
    }

    for (const [index, Element] of Elements.entries()) {
      const v = value[index];
      yield* ctx.check(v, Element, value, index);
    }

    if (value.length > Elements.length) {
      const index = Elements.length;
      const v = value[index];
      yield* ctx.check(v, Never, value, index);
    }
  });
}
/**
 * Validate that a value matches a specific strutural interface, like the
 * structural typing that TypeScript uses.
 */

function type(Structs) {
  const keys = Object.keys(Structs);
  return struct(`Type<{${keys.join(',')}}>`, function* (value, ctx) {
    if (typeof value !== 'object' || value == null) {
      yield ctx.fail();
      return;
    }

    for (const key of keys) {
      const Value = Structs[key];
      const v = value[key];
      yield* ctx.check(v, Value, value, key);
    }
  });
}
function union(Structs) {
  return struct(`${Structs.map(s => s.type).join(' | ')}`, function* (value, ctx) {
    for (const S of Structs) {
      const [...failures] = ctx.check(value, S);

      if (failures.length === 0) {
        return;
      }
    }

    yield ctx.fail();
  });
}
/**
 * Convert a value to a literal string.
 */

function toLiteralString(value) {
  return typeof value === 'string' ? `"${value.replace(/"/g, '"')}"` : `${value}`;
}
/**
 * Coerce the values of an object-like struct.
 */


function createObjectCoercer(Structs) {
  const knowns = Object.keys(Structs);
  return value => {
    if (typeof value !== 'object' || value == null) {
      return value;
    }

    const ret = {};
    const unknowns = new Set(Object.keys(value));

    for (const key of knowns) {
      unknowns.delete(key);
      const Value = Structs[key];
      const v = value[key];
      ret[key] = coerce(v, Value);
    }

    for (const key of unknowns) {
      ret[key] = value[key];
    }

    return ret;
  };
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/to-arraybuffer/index.js":
/*!**********************************************!*\
  !*** ./node_modules/to-arraybuffer/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js").Buffer

module.exports = function (buf) {
	// If the buffer is backed by a Uint8Array, a faster version will work
	if (buf instanceof Uint8Array) {
		// If the buffer isn't a subarray, return the underlying ArrayBuffer
		if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
			return buf.buffer
		} else if (typeof buf.buffer.slice === 'function') {
			// Otherwise we need to get a proper copy
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
		}
	}

	if (Buffer.isBuffer(buf)) {
		// This is the slow version that will work with any Buffer
		// implementation (even in old browsers)
		var arrayCopy = new Uint8Array(buf.length)
		var len = buf.length
		for (var i = 0; i < len; i++) {
			arrayCopy[i] = buf[i]
		}
		return arrayCopy.buffer
	} else {
		throw new Error('Argument must be a Buffer')
	}
}


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/util-deprecate/browser.js":
/*!************************************************!*\
  !*** ./node_modules/util-deprecate/browser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/sha1-browser.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/lib/sha1-browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html


function f(s, x, y, z) {
  switch (s) {
    case 0: return (x & y) ^ (~x & z);
    case 1: return x ^ y ^ z;
    case 2: return (x & y) ^ (x & z) ^ (y & z);
    case 3: return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return (x << n) | (x>>> (32 - n));
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof(bytes) == 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
    bytes = new Array(msg.length);
    for (var i = 0; i < msg.length; i++) bytes[i] = msg.charCodeAt(i);
  }

  bytes.push(0x80);

  var l = bytes.length/4 + 2;
  var N = Math.ceil(l/16);
  var M = new Array(N);

  for (var i=0; i<N; i++) {
    M[i] = new Array(16);
    for (var j=0; j<16; j++) {
      M[i][j] =
        bytes[i * 64 + j * 4] << 24 |
        bytes[i * 64 + j * 4 + 1] << 16 |
        bytes[i * 64 + j * 4 + 2] << 8 |
        bytes[i * 64 + j * 4 + 3];
    }
  }

  M[N - 1][14] = ((bytes.length - 1) * 8) /
    Math.pow(2, 32); M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = ((bytes.length - 1) * 8) & 0xffffffff;

  for (var i=0; i<N; i++) {
    var W = new Array(80);

    for (var t=0; t<16; t++) W[t] = M[i][t];
    for (var t=16; t<80; t++) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var t=0; t<80; t++) {
      var s = Math.floor(t/20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
  }

  return [
    H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff,
    H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff,
    H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff,
    H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff,
    H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff
  ];
}

module.exports = sha1;


/***/ }),

/***/ "./node_modules/uuid/lib/v35.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/lib/v35.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var bytesToUuid = __webpack_require__(/*! ./bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function uuidToBytes(uuid) {
  // Note: We assume we're being passed a valid uuid string
  var bytes = [];
  uuid.replace(/[a-fA-F0-9]{2}/g, function(hex) {
    bytes.push(parseInt(hex, 16));
  });

  return bytes;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape
  var bytes = new Array(str.length);
  for (var i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

module.exports = function(name, version, hashfunc) {
  var generateUUID = function(value, namespace, buf, offset) {
    var off = buf && offset || 0;

    if (typeof(value) == 'string') value = stringToBytes(value);
    if (typeof(namespace) == 'string') namespace = uuidToBytes(namespace);

    if (!Array.isArray(value)) throw TypeError('value must be an array of bytes');
    if (!Array.isArray(namespace) || namespace.length !== 16) throw TypeError('namespace must be uuid string or an Array of 16 byte values');

    // Per 4.3
    var bytes = hashfunc(namespace.concat(value));
    bytes[6] = (bytes[6] & 0x0f) | version;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    if (buf) {
      for (var idx = 0; idx < 16; ++idx) {
        buf[off+idx] = bytes[idx];
      }
    }

    return buf || bytesToUuid(bytes);
  };

  // Function#name is not settable on some platforms (#270)
  try {
    generateUUID.name = name;
  } catch (err) {
  }

  // Pre-defined namespaces, per Appendix C
  generateUUID.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  generateUUID.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

  return generateUUID;
};


/***/ }),

/***/ "./node_modules/uuid/v5.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v5.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v35 = __webpack_require__(/*! ./lib/v35.js */ "./node_modules/uuid/lib/v35.js");
var sha1 = __webpack_require__(/*! ./lib/sha1 */ "./node_modules/uuid/lib/sha1-browser.js");
module.exports = v35('v5', 0x50, sha1);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/xtend/immutable.js":
/*!*****************************************!*\
  !*** ./node_modules/xtend/immutable.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),

/***/ 0:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
});
//# sourceMappingURL=vwo-javascript-sdk.js.map