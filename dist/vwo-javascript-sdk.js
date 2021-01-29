/*!
 * vwo-javascript-sdk - v1.11.0
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
 *  2. superstruct - ^0.8.3
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

var Constants;
var BatchEventsDispatcher;
var customEventUtil;

var EventQueue = __webpack_require__(/*! ./services/EventQueue */ "./lib/services/EventQueue.js");

var SettingsFileService = __webpack_require__(/*! ./services/SettingsFileManager */ "./lib/services/SettingsFileManager.js");

var BatchEventsQueue;

if (false) {}

var logging = __webpack_require__(/*! ./services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ./enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var file = FileNameEnum.VWO;

var VWO =
/*#__PURE__*/
function () {
  // Setting various services on the instance to be accessible by its member functions
  function VWO() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, VWO);

    this.getVariation = this.getVariationName; // to be backward compatible

    this.userStorageService = config.userStorageService;
    this.logger = config.logger;
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
        return api.push(self, tagKey, tagValue, userId);
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
      var _this = this;

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
        userStorageData = options.userStorageData; // Check if arguments have valid data-type

    if (ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.ACTIVATE,
      campaignKey: campaignKey,
      userId: userId,
      customVariables: customVariables,
      variationTargetingVariables: variationTargetingVariables,
      userStorageData: userStorageData
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


  var _DecisionUtil$getVari = DecisionUtil.getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables, variationTargetingVariables, userStorageData),
      variationId = _DecisionUtil$getVari.variationId,
      variationName = _DecisionUtil$getVari.variationName; // Check if variation-name has been assigned to the userId. If not, return no variation


  if (!ValidateUtil.isValidValue(variationName)) {
    vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.INVALID_VARIATION_KEY, {
      file: file,
      userId: userId,
      campaignKey: campaignKey
    }));
    return null;
  } // Variation found...let VWO server knows about it to show report stats


  if (config.batchEvents) {
    var properties = ImpressionUtil.buildBatchEventForTrackingUser(settingsFile, campaign.id, variationId, userId);
    vwoInstance.batchEventsQueue.enqueue(properties);
  } else {
    var _properties = ImpressionUtil.buildEventForTrackingUser(settingsFile, campaign.id, variationId, userId);

    vwoInstance.eventQueue.process(config, _properties, vwoInstance);
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
          userStorageData = options.userStorageData; // Check if arguments have valid data-type

      if (ValidateUtil.areValidParamsForAPIMethod({
        method: ApiEnum.GET_FEATURE_VARIABLE_VALUE,
        campaignKey: campaignKey,
        variableKey: variableKey,
        userId: userId,
        customVariables: customVariables,
        variationTargetingVariables: variationTargetingVariables,
        userStorageData: userStorageData
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
    var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api); // If no settings are found, simply return no variation

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

    var _DecisionUtil$getVari = DecisionUtil.getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables, variationTargetingVariables, userStorageData),
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
        userStorageData = options.userStorageData; // Check if arguments have valid data-type

    if (ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.GET_VARIATION_NAME,
      campaignKey: campaignKey,
      userId: userId,
      customVariables: customVariables,
      variationTargetingVariables: variationTargetingVariables,
      userStorageData: userStorageData
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
  var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api); // If no settings are found, simply return no variation

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

  var _DecisionUtil$getVari = DecisionUtil.getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables, variationTargetingVariables, userStorageData),
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
        userStorageData = options.userStorageData; // Check if arguments have valid data-type

    if (ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.IS_FEATURE_ENABLED,
      campaignKey: campaignKey,
      userId: userId,
      customVariables: customVariables,
      variationTargetingVariables: variationTargetingVariables,
      userStorageData: userStorageData
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
  } // Get the campaign settings based on campaignKey from the settings


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

  var _DecisionUtil$getVari = DecisionUtil.getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables, variationTargetingVariables, userStorageData),
      variation = _DecisionUtil$getVari.variation,
      variationName = _DecisionUtil$getVari.variationName,
      variationId = _DecisionUtil$getVari.variationId;

  var isFeatureEnabled = false;

  if (variationName && CampaignUtil.isFeatureTestCampaign(campaign)) {
    isFeatureEnabled = variation.isFeatureEnabled; // Variation found...let VWO server knows about it to show report stats

    if (config.batchEvents) {
      var properties = ImpressionUtil.buildBatchEventForTrackingUser(settingsFile, campaign.id, variationId, userId);
      vwoInstance.batchEventsQueue.enqueue(properties);
    } else {
      var _properties = ImpressionUtil.buildEventForTrackingUser(settingsFile, campaign.id, variationId, userId);

      vwoInstance.eventQueue.process(config, _properties, vwoInstance);
    }
  } else if (variationName && CampaignUtil.isFeatureRolloutCampaign(campaign)) {
    isFeatureEnabled = true;
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

var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var ImpressionUtil = __webpack_require__(/*! ../utils/ImpressionUtil */ "./lib/utils/ImpressionUtil.js");

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

function push(vwoInstance, tagKey, tagValue, userId) {
  var api = ApiEnum.PUSH;

  if (!ValidateUtil.areValidParamsForAPIMethod({
    method: ApiEnum.PUSH,
    tagKey: tagKey,
    tagValue: tagValue,
    userId: userId
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
  } // Get the cached configuration


  var config = vwoInstance.SettingsFileManager.getConfig();
  var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api); // If no settings are found, simply false

  if (!settingsFile) {
    return false;
  }

  if (config.batchEvents) {
    var properties = ImpressionUtil.buildBatchEventForPushing(settingsFile, tagKey, tagValue, userId);
    vwoInstance.batchEventsQueue.enqueue(properties);
  } else {
    var _properties = ImpressionUtil.buildEventForPushing(settingsFile, tagKey, tagValue, userId);

    vwoInstance.eventQueue.process(config, _properties, vwoInstance);
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
        shouldTrackReturningUser = options.shouldTrackReturningUser; // Check if arguments have valid data-type

    if (ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.TRACK,
      campaignKey: campaignKey,
      userId: userId,
      goalIdentifier: goalIdentifier,
      customVariables: customVariables,
      variationTargetingVariables: variationTargetingVariables,
      userStorageData: userStorageData,
      goalTypeToTrack: goalTypeToTrack,
      shouldTrackReturningUser: shouldTrackReturningUser
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
  var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api); // If no settings are found, simply do not track goal and return false

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
  campaigns.forEach(function (campaign) {
    return result[campaign.key] = trackCampaignGoal(vwoInstance, campaign, campaign.key, userId, settingsFile, goalIdentifier, revenueValue, config, customVariables, variationTargetingVariables, userStorageData, goalTypeToTrack, shouldTrackReturningUser);
  });

  if (!Object.keys(result).length) {
    return null;
  }

  return result;
}

function trackCampaignGoal(vwoInstance, campaign, campaignKey, userId, settingsFile, goalIdentifier, revenueValue, config, customVariables, variationTargetingVariables, userStorageData, goalTypeToTrack, shouldTrackReturningUser) {
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

  var _DecisionUtil$getVari = DecisionUtil.getVariation(config, settingsFile, campaign, campaignKey, userId, customVariables, variationTargetingVariables, userStorageData, goalIdentifier),
      variationId = _DecisionUtil$getVari.variationId,
      variationName = _DecisionUtil$getVari.variationName,
      storedGoalIdentifier = _DecisionUtil$getVari.storedGoalIdentifier; // Is User is a part of Campaign and has been decided to be a part of particular variation


  if (variationName) {
    if (storedGoalIdentifier) {
      var identifiers = storedGoalIdentifier.split(GOAL_IDENTIFIER_SEPERATOR);

      if (!identifiers.includes(goalIdentifier)) {
        storedGoalIdentifier += GOAL_IDENTIFIER_SEPERATOR + goalIdentifier;

        DecisionUtil._saveUserData(config, campaign, variationName, userId, storedGoalIdentifier);
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
    } else {
      var _properties = ImpressionUtil.buildEventForTrackingGoal(settingsFile, campaignId, variationId, userId, goal, revenueValue);

      vwoInstance.eventQueue.process(config, _properties, vwoInstance);
    }

    DecisionUtil._saveUserData(config, campaign, variationName, userId, goalIdentifier);

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
    version: "1.11.0"
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
  HTTPS_PROTOCOL: 'https://'
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
  _getBucketValueForUser: function _getBucketValueForUser(userId) {
    var hashValue = Hasher.v3(userId, Constants.SEED_VALUE);

    var bucketValue = BucketingService._generateBucketValue(hashValue, Constants.MAX_TRAFFIC_PERCENT);

    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_HASH_BUCKET_VALUE, {
      file: FileNameEnum.BucketingService,
      hashValue: hashValue,
      bucketValue: bucketValue,
      userId: userId
    }));
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
    if (!ValidateUtil.isValidValue(userId) || !campaign) {
      return false;
    }

    var trafficAllocation = campaign.percentTraffic;

    var valueAssignedToUser = BucketingService._getBucketValueForUser(userId);

    var isUserPart = valueAssignedToUser !== 0 && valueAssignedToUser <= trafficAllocation;
    logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_ELIGIBILITY_FOR_CAMPAIGN, {
      file: FileNameEnum.BucketingService,
      userId: userId,
      isUserPart: isUserPart
    }));
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

    var hashValue = BucketingService._generateHashValue(userId);

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
  calculateBucketValue: function calculateBucketValue(userId) {
    var multiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var hashValue = BucketingService._generateHashValue(userId);

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

  try {
    if (DataTypeUtil.isObject(dsl) && !Object.keys(dsl).length) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
        campaignKey: campaignKey,
        userId: userId,
        file: file
      }));
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
    }));
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
  STRING: 'string'
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
  HttpHandlerUtil: "".concat(UTIL_PATH, "/HttpHandlerUtil")
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
    FLUSH_EVENTS: '{{file}}: Manually flushing events for account:{accountId} having {queueLength} events'
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
    IMPRESSION_SUCCESS: '({file}): Impression event - {endPoint} was successfully received by VWO having main keys: accountId:{accountId}, User ID:{userId}, campaignId:{campaignId} and variationId:{variationId}',
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
    GOAL_ALREADY_TRACKED: '({file}): "Goal:{goalIdentifer} of Campaign:{campaignKey} for User ID:{userId} has already been tracked earlier. Skipping now',
    POLLING_SUCCESS: '({file}): Settings-file fetched successfully via polling for the accountId:{accountId}',
    SETTINGS_FILE_UPDATED: '({file}): vwo-sdk instance is updated with the latest settings-file for the accountId:{accountId}',
    USER_ELIGIBILITY_FOR_CAMPAIGN: '({file}): Is User ID:{userId} part of campaign? {isUserPart}',
    GOT_VARIATION_FOR_USER: '({file}): userId:{userId} for campaign:{campaignTestKey} got variationName:{variationName}',
    BULK_IMPRESSION_SUCCESS: '({file}): Impression event - {endPoint} was successfully received by VWO having accountId:{a}',
    AFTER_FLUSHING: '({file}): Events queue having {length} events has been flushed {manually}',
    SETTINGS_NOT_UPDATED: '{{file}}: Settings-file fetched are same as earlier fetched settings',
    GOT_STORED_VARIATION: '({file}): Got stored variation for User ID:{userId} of Campaign:{campaignKey} as Variation:{variationName}, found in UserStorageService'
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
  BATCH_EVENTS: '/server-side/batch-events'
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


    config.logger = config.logger || logger; // Create an instance of VWO class which exposes API methods

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
    superstruct = _require.superstruct,
    struct = _require.struct;

function objectOrArrayMatcher(value, schema) {
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return struct({}).test(value);
  } else if (Object.prototype.toString.call(value) === '[object Array]') {
    return schema.test(value);
  }

  return false;
}

struct = superstruct({
  types: {
    variationsType: function variationsType(value) {
      return objectOrArrayMatcher(value, campaignVariationSchema);
    },
    goalsType: function goalsType(value) {
      return objectOrArrayMatcher(value, campaignGoalSchema);
    },
    variablesType: function variablesType(value) {
      return objectOrArrayMatcher(value, variableObjectSchema);
    },
    campaignsType: function campaignsType(value) {
      return objectOrArrayMatcher(value, campaignObjectSchema);
    }
  }
});
var campaignGoalSchema = struct([{
  id: 'number|string',
  identifier: 'string',
  type: 'string'
}]);
var variableObjectSchema = struct([{
  id: 'number|string',
  type: 'string',
  key: 'string',
  value: 'number|string|boolean'
}]);
var campaignVariationSchema = struct([{
  id: 'number|string',
  name: 'string',
  weight: 'number|string',
  changes: 'object?',
  segments: 'object?',
  variables: 'variablesType?',
  isFeatureEnabled: 'boolean?',
  startVariationAllocation: 'number?',
  endVariationAllocation: 'number?'
}]);
var campaignObjectSchema = struct([{
  id: 'number|string',
  type: 'string',
  key: 'string',
  status: 'string',
  percentTraffic: 'number',
  goals: 'goalsType',
  variations: 'variationsType',
  variables: 'variablesType?',
  segments: 'object',
  isForcedVariationEnabled: 'boolean?'
}]);
var settingsFileSchema = struct({
  sdkKey: 'string?',
  version: 'number|string',
  accountId: 'number|string',
  campaigns: 'campaignsType'
});
module.exports = settingsFileSchema;

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
    value: function process(config, properties, vwoInstance) {
      if (config && config.isDevelopmentMode) {
        return;
      }

      this.enqueue(properties, vwoInstance);
    }
  }, {
    key: "enqueue",
    value: function enqueue(properties, vwoInstance) {
      this.queue.push({
        eventName: properties.eventName,
        properties: properties,
        callback: function callback() {
          EventDispatcher.dispatch(properties, function () {});
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
var settingsFileSchema = __webpack_require__(/*! ../schemas/SettingsFileSchema */ "./lib/schemas/SettingsFileSchema.js");

var CampaignUtil = __webpack_require__(/*! ../utils/CampaignUtil */ "./lib/utils/CampaignUtil.js");

var FunctionUtil = __webpack_require__(/*! ../utils/FunctionUtil */ "./lib/utils/FunctionUtil.js");

var SettingsFileUtil = __webpack_require__(/*! ../utils/SettingsFileUtil */ "./lib/utils/SettingsFileUtil.js");

var logging = __webpack_require__(/*! ./logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

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
      if (config.settingsFile && !config.settingsFile.campaigns) {
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

      var isValidSettingsFile = settingsFileSchema.test(this._clonedSettingsFile);

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
        SettingsFileUtil.get(accountId, sdkKey, {
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
   *  3. If Pre-segmentation is applied and passes then go further otherwise return early and no further processing
   *  4. If no user storage value, no whitelisted variation and pre-segmentation evaluates to true, get variation using hashing logic if campaign traffic passes for that userId
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
    var newGoalIdentifier = arguments.length > 8 ? arguments[8] : undefined;
    var status;
    var variation, variationName, variationId;

    if (campaign.isForcedVariationEnabled) {
      var whitelistingResult = DecisionUtil._evaluateWhitelisting(campaign, campaignKey, userId, variationTargetingVariables);

      var variationString;

      if (whitelistingResult) {
        status = StatusEnum.PASSED;
        variationString = "for ".concat(whitelistingResult.variationName);
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
        variation: variationString
      }));

      if (whitelistingResult) {
        variationName = whitelistingResult.variationName;
        return whitelistingResult;
      }
    } else {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.WHITELISTING_SKIPPED, {
        campaignKey: campaignKey,
        userId: userId,
        file: file
      }));
    } // If userStorageService is used, get the variation from the stored data


    var _ref = DecisionUtil._getStoredVariationAndGoalIdentifiers(config, settingsFile, campaign.key, userId, userStorageData) || {},
        storedVariation = _ref.storedVariation,
        goalIdentifier = _ref.goalIdentifier; // If stored variation is found, simply return the same


    if (storedVariation) {
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_STORED_VARIATION, {
        file: file,
        campaignKey: campaignKey,
        userId: userId,
        variationName: storedVariation.name
      }));
      return {
        variation: storedVariation,
        variationName: storedVariation.name,
        variationId: storedVariation.id,
        storedGoalIdentifier: goalIdentifier
      };
    }

    if (DataTypeUtil.isObject(campaign.segments) && !Object.keys(campaign.segments).length) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
        campaignKey: campaignKey,
        userId: userId,
        file: file
      }));
    } else {
      var preSegmentationResult = SegmentEvaluator(campaign.segments, customVariables, campaignKey, userId);

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
      }));

      if (status === StatusEnum.FAILED) {
        return {};
      }
    } // Use our core's VariationDecider utility to get the deterministic variation assigned to the userId for that campaign


    var _VariationDecider$get = VariationDecider.getVariationAllotted(userId, campaign);

    variation = _VariationDecider$get.variation;
    variationName = _VariationDecider$get.variationName;
    variationId = _VariationDecider$get.variationId;

    // Check if variation-name has been assigned to the userId. If not, return no variation
    if (variationName) {
      // If userStorageService is provided, look into it for the saved variation for the campaign and userId
      DecisionUtil._saveUserData(config, campaign, variationName, userId, newGoalIdentifier);

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
    }

    return {
      variation: variation && variation.variation,
      variationName: variationName,
      variationId: variationId
    };
  },
  // PRIVATE METHODS
  _evaluateWhitelisting: function _evaluateWhitelisting(campaign, campaignKey, userId, variationTargetingVariables) {
    var whitelistedVariation;
    var status;
    variationTargetingVariables = Object.assign({}, variationTargetingVariables, {
      _vwoUserId: userId
    });
    var targetedVariations = [];
    campaign.variations.forEach(function (variation) {
      if (DataTypeUtil.isObject(variation.segments) && !Object.keys(variation.segments).length) {
        logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
          campaignKey: campaignKey,
          userId: userId,
          file: file,
          variation: ", for ".concat(variation.name)
        }));
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
        variation: "for ".concat(variation.name)
      }));
    });

    if (targetedVariations.length > 1) {
      CampaignUtil.scaleVariationWeights(targetedVariations);

      for (var i = 0, currentAllocation = 0, stepFactor = 0; i < targetedVariations.length; i++) {
        stepFactor = CampaignUtil.assignRangeValues(targetedVariations[i], currentAllocation);
        currentAllocation += stepFactor;
      }

      whitelistedVariation = BucketingService._getVariation(targetedVariations, BucketingService.calculateBucketValue(userId));
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
    var userData = DecisionUtil._getStoredUserData(config, userId, campaignKey, userStorageData);

    var variationName = userData.variationName,
        goalIdentifier = userData.goalIdentifier;

    if (userData && userData.campaignKey && variationName) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GETTING_STORED_VARIATION, {
        file: file,
        campaignKey: campaignKey,
        userId: userId,
        variationName: variationName
      }));
      return {
        storedVariation: CampaignUtil.getCampaignVariation(settingsFile, campaignKey, variationName),
        goalIdentifier: goalIdentifier
      };
    } // Log if stored variation is not found even after implementing UserStorageService


    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_STORED_VARIATION, {
      file: file,
      campaignKey: campaignKey,
      userId: userId
    }));
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
  _getStoredUserData: function _getStoredUserData(config, userId, campaignKey, userStorageData) {
    var userStorageMap = {
      userId: userId,
      variationName: null,
      campaignKey: campaignKey,
      goalIdentifier: null
    };

    if (!config.userStorageService) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.NO_USER_STORAGE_SERVICE_GET, {
        file: file
      }));
      return userStorageMap;
    }

    try {
      var data = config.userStorageService.get(userId, campaignKey) || {}; // if data found

      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GETTING_DATA_USER_STORAGE_SERVICE, {
        file: file,
        userId: userId
      }));
      return Object.assign({}, data, userStorageData);
    } catch (err) {
      // if no data found
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_USER_STORAGE_SERVICE_FAILED, {
        file: file,
        userId: userId
      }));
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
  _saveUserData: function _saveUserData(config, campaign, variationName, userId, goalIdentifier) {
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
var excludedProperties = ['url'];
var EventDispatcher = {
  dispatch: function dispatch(properties, callback) {
    var parsedUrl;
    var queryParams = '?';

    for (var prop in properties) {
      if (properties.hasOwnProperty(prop)) {
        if (excludedProperties.indexOf(prop) === -1) {
          queryParams += prop + '=' + properties[prop] + '&';
        }
      }
    }

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
  }
};
module.exports = FunctionUtil;

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

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();

function getBaseProperties(configObj, userId) {
  var accountId = configObj.accountId;
  return {
    account_id: accountId,
    uId: encodeURIComponent(userId),
    random: FunctionUtil.getRandomNumber(),
    sId: FunctionUtil.getCurrentUnixTimestamp(),
    u: UuidUtil.generateFor(userId, accountId),
    sdk: Constants.SDK_NAME,
    'sdk-v': Constants.SDK_VERSION,
    ap: Constants.PLATFORM
  };
}

function getBasePropertiesForBulk(configObj, userId) {
  return {
    sId: FunctionUtil.getCurrentUnixTimestamp(),
    u: UuidUtil.generateFor(userId, configObj.accountId)
  };
}

module.exports = {
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
      properties: JSON.stringify(properties)
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
  buildEventForTrackingUser: function buildEventForTrackingUser(configObj, campaignKey, variationId, userId) {
    var properties = Object.assign({
      experiment_id: campaignKey,
      combination: variationId
    }, getBaseProperties(configObj, userId));
    properties.ed = JSON.stringify({
      p: 'server'
    });
    properties.url = Constants.HTTPS_PROTOCOL + UrlEnum.BASE_URL + UrlEnum.TRACK_USER;
    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_TRACK_USER, {
      file: FileNameEnum.ImpressionUtil,
      properties: JSON.stringify(properties)
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
      properties: JSON.stringify(properties)
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
  }
};

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

module.exports = {
  get: function get(accountId, sdkKey) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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

    path += "?a=".concat(accountId, "&") + "i=".concat(sdkKey, "&") + "r=".concat(getRandomNumber(), "&") + 'platform=server&' + "sdk=".concat(Constants.SDK_NAME, "&") + "sdk-v=".concat(Constants.SDK_VERSION, "&") + 'api-version=1';

    if (config.hostname && config.path) {
      protocol = config.protocol;
      port = config.port;
      hostname = config.hostname || hostname;
      path = config.path || path;
    }

    if (true) {
      return __webpack_require__(/*! ./XhrUtil */ "./lib/utils/XhrUtil.js").send({
        method: 'GET',
        url: "".concat(protocol, "://").concat(hostname).concat(path)
      });
    } else { var https, http; }
  }
};

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
      userStorageData = _ref$userStorageData === void 0 ? {} : _ref$userStorageData;
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
      shouldTrackReturningUser = _ref2$shouldTrackRetu === void 0 ? false : _ref2$shouldTrackRetu;
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
  }];
}), _defineProperty(_APIMethodArgumentsVa, ApiEnum.IS_FEATURE_ENABLED, function (_ref3) {
  var campaignKey = _ref3.campaignKey,
      userId = _ref3.userId,
      _ref3$customVariables = _ref3.customVariables,
      customVariables = _ref3$customVariables === void 0 ? {} : _ref3$customVariables,
      _ref3$variationTarget = _ref3.variationTargetingVariables,
      variationTargetingVariables = _ref3$variationTarget === void 0 ? {} : _ref3$variationTarget,
      _ref3$userStorageData = _ref3.userStorageData,
      userStorageData = _ref3$userStorageData === void 0 ? {} : _ref3$userStorageData;
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
      userStorageData = _ref4$userStorageData === void 0 ? {} : _ref4$userStorageData;
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
  }];
}), _defineProperty(_APIMethodArgumentsVa, ApiEnum.PUSH, function (_ref5) {
  var tagKey = _ref5.tagKey,
      tagValue = _ref5.tagValue,
      userId = _ref5.userId;
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

var XhrUtil = {
  send: function send() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        method = _ref.method,
        url = _ref.url;

    if (!url || !method) {
      return;
    }

    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.send();

      xhr.onload = function () {
        try {
          resolve(JSON.parse(xhr.response));
        } catch (err) {
          console.error(err);
        }
      };

      xhr.onerror = function () {
        var error = "VWO-SDK - [ERROR]: ".concat(getCurrentTime(), " Request failed for fetching account settings. Got Status Code: ").concat(xhr.status);
        console.error(error);
        reject(error);
      };
    });
  }
};
module.exports = XhrUtil;

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

/***/ "./node_modules/superstruct/lib/index.es.js":
/*!**************************************************!*\
  !*** ./node_modules/superstruct/lib/index.es.js ***!
  \**************************************************/
/*! exports provided: StructError, Types, isStruct, struct, superstruct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructError", function() { return StructError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Types", function() { return Types; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStruct", function() { return isStruct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "struct", function() { return struct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "superstruct", function() { return superstruct; });
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

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var toString = Object.prototype.toString;

var kindOf = function kindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';

  var type = typeof val;
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'symbol') return 'symbol';
  if (type === 'function') {
    return isGeneratorFn(val) ? 'generatorfunction' : 'function';
  }

  if (isArray(val)) return 'array';
  if (isBuffer(val)) return 'buffer';
  if (isArguments(val)) return 'arguments';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  if (isRegexp(val)) return 'regexp';

  switch (ctorName(val)) {
    case 'Symbol': return 'symbol';
    case 'Promise': return 'promise';

    // Set, Map, WeakSet, WeakMap
    case 'WeakMap': return 'weakmap';
    case 'WeakSet': return 'weakset';
    case 'Map': return 'map';
    case 'Set': return 'set';

    // 8-bit typed arrays
    case 'Int8Array': return 'int8array';
    case 'Uint8Array': return 'uint8array';
    case 'Uint8ClampedArray': return 'uint8clampedarray';

    // 16-bit typed arrays
    case 'Int16Array': return 'int16array';
    case 'Uint16Array': return 'uint16array';

    // 32-bit typed arrays
    case 'Int32Array': return 'int32array';
    case 'Uint32Array': return 'uint32array';
    case 'Float32Array': return 'float32array';
    case 'Float64Array': return 'float64array';
  }

  if (isGeneratorObj(val)) {
    return 'generator';
  }

  // Non-plain objects
  type = toString.call(val);
  switch (type) {
    case '[object Object]': return 'object';
    // iterators
    case '[object Map Iterator]': return 'mapiterator';
    case '[object Set Iterator]': return 'setiterator';
    case '[object String Iterator]': return 'stringiterator';
    case '[object Array Iterator]': return 'arrayiterator';
  }

  // other
  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
};

function ctorName(val) {
  return val.constructor ? val.constructor.name : null;
}

function isArray(val) {
  if (Array.isArray) return Array.isArray(val);
  return val instanceof Array;
}

function isError(val) {
  return val instanceof Error || (typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number');
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function'
    && typeof val.getDate === 'function'
    && typeof val.setDate === 'function';
}

function isRegexp(val) {
  if (val instanceof RegExp) return true;
  return typeof val.flags === 'string'
    && typeof val.ignoreCase === 'boolean'
    && typeof val.multiline === 'boolean'
    && typeof val.global === 'boolean';
}

function isGeneratorFn(name, val) {
  return ctorName(name) === 'GeneratorFunction';
}

function isGeneratorObj(val) {
  return typeof val.throw === 'function'
    && typeof val.return === 'function'
    && typeof val.next === 'function';
}

function isArguments(val) {
  try {
    if (typeof val.length === 'number' && typeof val.callee === 'function') {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }
  return false;
}

/**
 * Superstruct ships by default with an unopinionated set of scalar types that
 * express all of the data types that are built-in to JavaScript.
 */

var Types = {
  /**
   * Matches any value other than `undefined`.
   *
   * ```js
   * 'anything'
   * true
   * ```
   */
  any: function any(value) {
    return value !== undefined;
  },

  /**
   * Matches an `arguments` object.
   *
   * ```js
   * arguments
   * ```
   */
  arguments: function _arguments(value) {
    return kindOf(value) === 'arguments';
  },

  /**
   * Matches an `Array`.
   *
   * ```js
   * [1, 2, 3]
   * ```
   */
  array: function array(value) {
    return kindOf(value) === 'array';
  },

  /**
   * Matches a boolean.
   *
   * ```js
   * true
   * false
   * ```
   */
  boolean: function boolean(value) {
    return kindOf(value) === 'boolean';
  },

  /**
   * Matches a Node.js `Buffer`.
   *
   * ```js
   * Buffer.from('string')
   * ```
   */
  buffer: function buffer(value) {
    return kindOf(value) === 'buffer';
  },

  /**
   * Matches a **valid** `Date` object.
   *
   * ```js
   * new Date()
   * ```
   *
   * Note: Invalid `Date` objects that equal `NaN` are not matched.
   */
  date: function date(value) {
    return kindOf(value) === 'date' && !isNaN(value);
  },

  /**
   * Matches an error object.
   *
   * ```js
   * new Error()
   * ```
   */
  error: function error(value) {
    return kindOf(value) === 'error';
  },

  /**
   * Matches a `Float32Array` object.
   */
  float32array: function float32array(value) {
    return kindOf(value) === 'float32array';
  },

  /**
   * Matches a `Float64Array` object.
   */
  float64array: function float64array(value) {
    return kindOf(value) === 'float64array';
  },

  /**
   * Matches a function.
   *
   * ```js
   * () => {}
   * function () {}
   * ```
   */
  function: function _function(value) {
    return kindOf(value) === 'function';
  },

  /**
   * Matches a generator function.
   *
   * ```js
   * function* () {}
   * ```
   */
  generatorfunction: function generatorfunction(value) {
    return kindOf(value) === 'generatorfunction';
  },

  /**
   * Matches a `Int16Array` object.
   */
  int16array: function int16array(value) {
    return kindOf(value) === 'int16array';
  },

  /**
   * Matches a `Int32Array` object.
   */
  int32array: function int32array(value) {
    return kindOf(value) === 'int32array';
  },

  /**
   * Matches a `Int8Array` object.
   */
  int8array: function int8array(value) {
    return kindOf(value) === 'int8array';
  },

  /**
   * Matches a `Map` object.
   *
   * ```js
   * new Map()
   * ```
   */
  map: function map(value) {
    return kindOf(value) === 'map';
  },

  /**
   * Matches the `null` literal value.
   *
   * ```js
   * null
   * ```
   */
  null: function _null(value) {
    return kindOf(value) === 'null';
  },

  /**
   * Matches a number.
   *
   * ```js
   * 42
   * ```
   */
  number: function number(value) {
    return kindOf(value) === 'number';
  },

  /**
   * Matches a plain object.
   *
   * ```js
   * { key: 'value' }
   * { something: true }
   * ```
   */
  object: function object(value) {
    return kindOf(value) === 'object';
  },

  /**
   * Matches a `Promise` object.
   *
   * ```js
   * Promise.resolve()
   * ```
   */
  promise: function promise(value) {
    return kindOf(value) === 'promise';
  },

  /**
   * Matches a regular expression object.
   *
   * ```js
   * /a-z/g
   * ```
   */
  regexp: function regexp(value) {
    return kindOf(value) === 'regexp';
  },

  /**
   * Matches a `Set` object.
   *
   * ```js
   * new Set()
   * ```
   */
  set: function set(value) {
    return kindOf(value) === 'set';
  },

  /**
   * Matches a string.
   *
   * ```js
   * 'text'
   * ```
   */
  string: function string(value) {
    return kindOf(value) === 'string';
  },

  /**
   * Matches a `Symbol`.
   *
   * ```js
   * Symbol()
   * ```
   */
  symbol: function symbol(value) {
    return kindOf(value) === 'symbol';
  },

  /**
   * Matches a `Uint16Array` object.
   */
  uint16array: function uint16array(value) {
    return kindOf(value) === 'uint16array';
  },

  /**
   * Matches a `Uint32Array` object.
   */
  uint32array: function uint32array(value) {
    return kindOf(value) === 'uint32array';
  },

  /**
   * Matches a `Uint8Array` object.
   */
  uint8array: function uint8array(value) {
    return kindOf(value) === 'uint8array';
  },

  /**
   * Matches a `Uint8ClampedArray` object.
   */
  uint8clampedarray: function uint8clampedarray(value) {
    return kindOf(value) === 'uint8clampedarray';
  },

  /**
   * Matches the `undefined` literal value.
   *
   * ```js
   * undefined
   * ```
   */
  undefined: function undefined$1(value) {
    return kindOf(value) === 'undefined';
  },

  /**
   * Matches a `WeakMap` object.
   *
   * ```js
   * new WeakMap()
   * ```
   */
  weakmap: function weakmap(value) {
    return kindOf(value) === 'weakmap';
  },

  /**
   * Matches a `WeakSet` object.
   *
   * ```js
   * new WeakSet()
   * ```
   */
  weakset: function weakset(value) {
    return kindOf(value) === 'weakset';
  }
};

var isProduction = "development" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  } else {
    throw new Error(prefix + ": " + (message || ''));
  }
}

/**
 * `StructError` objects are thrown (or returned) by Superstruct when its
 * validation fails. The error represents the first error encountered during
 * validation. But they also have an `error.failures` property that holds
 * information for all of the failures encountered.
 */

var StructError =
/*#__PURE__*/
function (_TypeError) {
  _inheritsLoose(StructError, _TypeError);

  function StructError(failures) {
    var _this;

    invariant(failures.length > 0, "StructError requires being passed a failure, but received: " + failures);
    var first = failures[0];

    var path = first.path,
        value = first.value,
        type = first.type,
        branch = first.branch,
        rest = _objectWithoutPropertiesLoose(first, ["path", "value", "type", "branch"]);

    var message = "Expected a value of type `" + type + "`" + (path.length ? " for `" + path.join('.') + "`" : '') + " but received `" + JSON.stringify(value) + "`.";
    _this = _TypeError.call(this, message) || this;
    _this.type = type;
    _this.value = value;
    Object.assign(_assertThisInitialized(_this), rest);
    _this.path = path;
    _this.branch = branch;
    _this.failures = failures;
    _this.stack = new Error().stack;
    _this.__proto__ = StructError.prototype;
    return _this;
  }

  return StructError;
}(_wrapNativeSuper(TypeError));

/**
 * A symbol to set on `Struct` objects to test them against later.
 */
var STRUCT = Symbol('STRUCT');
/**
 * Check if a value is a `Struct` object.
 */

var isStruct = function isStruct(value) {
  return typeof value === 'function' && value[STRUCT];
};
/**
 * This abstract `Struct` factory creates a generic struct that validates values
 * against a `Validator` function.
 */

var createStruct = function createStruct(props) {
  var struct = props.struct;
  var Error = struct.Error;

  var Struct = function Struct(value) {
    return Struct.assert(value);
  }; // Set a hidden symbol property so that we can check it later to see if an
  // object is a struct object.


  Object.defineProperty(Struct, STRUCT, {
    value: true
  });
  Struct.kind = props.kind;
  Struct.type = props.type;

  Struct.default = function () {
    return typeof props.defaults === 'function' ? props.defaults() : props.defaults;
  };

  Struct.test = function (value) {
    var _Struct$check = Struct.check(value, [value], []),
        failures = _Struct$check[0];

    return !failures;
  };

  Struct.assert = function (value) {
    var _Struct$check2 = Struct.check(value, [value], []),
        failures = _Struct$check2[0],
        result = _Struct$check2[1];

    if (failures) {
      throw new Error(failures);
    } else {
      return result;
    }
  };

  Struct.validate = function (value) {
    var _Struct$check3 = Struct.check(value, [value], []),
        failures = _Struct$check3[0],
        result = _Struct$check3[1];

    if (failures) {
      return [new Error(failures)];
    } else {
      return [undefined, result];
    }
  };

  Struct.check = function (value, branch, path) {
    if (value === void 0) {
      value = Struct.default();
    }

    var failures = [Struct.fail({
      value: value,
      branch: branch,
      path: path
    })];
    return [failures];
  };

  Struct.fail = function (obj) {
    return _objectSpread2({}, obj, {
      type: 'type' in obj ? obj.type : Struct.type
    });
  };

  return Struct;
};

var createArray = function createArray(schema, defaults, struct) {
  invariant(Array.isArray(schema) && schema.length === 1, "Array structs must be defined as an array with one element, but you passed: " + schema);
  var Element = struct(schema[0], undefined);
  var Struct = createStruct({
    kind: 'array',
    type: Element.type + "[]",
    defaults: defaults,
    struct: struct
  });

  Struct.check = function (value, branch, path) {
    if (value === void 0) {
      value = Struct.default();
    }

    if (!Array.isArray(value)) {
      return [[Struct.fail({
        value: value,
        branch: branch,
        path: path
      })]];
    }

    var result = [];
    var failures = [];

    for (var i = 0; i < value.length; i++) {
      var v = value[i];

      var _Element$check = Element.check(v, branch.concat(v), path.concat(i)),
          efs = _Element$check[0],
          er = _Element$check[1];

      if (efs) {
        failures.push.apply(failures, efs);
        continue;
      }

      result[i] = er;
    }

    return failures.length ? [failures] : [undefined, result];
  };

  return Struct;
};

var createDynamic = function createDynamic(schema, defaults, struct) {
  invariant(typeof schema === 'function', "Dynamic structs must be defined as a function, but you passed: " + schema);
  var Dynamic = createStruct({
    kind: 'dynamic',
    type: "dynamic<\u2026>",
    defaults: defaults,
    struct: struct
  });

  Dynamic.check = function (value, branch, path) {
    if (value === void 0) {
      value = Dynamic.default();
    }

    var Struct = schema(value, branch, path);
    return Struct.check(value, branch, path);
  };

  return Dynamic;
};

var createEnum = function createEnum(schema, defaults, struct) {
  invariant(Array.isArray(schema), "Enum structs must be defined as an array, but you passed: " + schema);

  var validator = function validator(value) {
    return schema.includes(value);
  };

  var Struct = struct(validator, defaults);
  Struct.kind = 'enum';
  Struct.type = schema.map(function (s) {
    return typeof s === 'string' ? "\"" + s + "\"" : "" + s;
  }).join(' | ');
  return Struct;
};

var createFunction = function createFunction(schema, defaults, struct) {
  var Struct = createStruct({
    kind: 'function',
    type: "function<\u2026>",
    defaults: defaults,
    struct: struct
  });

  Struct.check = function (value, branch, path) {
    if (value === void 0) {
      value = Struct.default();
    }

    var result = schema(value, branch, path);

    if (result === true) {
      return [undefined, value];
    }

    var failures = [];

    if (result === false) {
      failures.push(Struct.fail({
        value: value,
        branch: branch,
        path: path
      }));
    } else if (Array.isArray(result) && result.length > 0) {
      for (var _iterator = result, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var r = _ref;
        failures.push(Struct.fail(_objectSpread2({
          value: value,
          branch: branch,
          path: path
        }, r)));
      }
    } else if (typeof result === 'object') {
      failures.push(Struct.fail(_objectSpread2({
        value: value,
        branch: branch,
        path: path
      }, result)));
    } else {
      invariant(false, "Validator functions must return a boolean, a failure object, or an array of failure objects, but you passed: " + result);
    }

    return [failures];
  };

  return Struct;
};

var createInstance = function createInstance(schema, defaults, struct) {
  invariant(typeof schema === 'function', "Instance structs must be defined as a function, but you passed: " + schema);

  var validator = function validator(value) {
    return value instanceof schema;
  };

  var Struct = struct(validator, defaults);
  Struct.kind = 'instance';
  Struct.type = "instance<" + schema.name + ">";
  return Struct;
};

var createInterface = function createInterface(schema, defaults, struct) {
  invariant(typeof schema === 'object', "Interface structs must be defined as an object, but you passed: " + schema);
  var Props = {};

  for (var key in schema) {
    Props[key] = struct(schema[key]);
  }

  var Struct = createStruct({
    kind: 'interface',
    type: "interface<{" + Object.keys(schema).join() + "}>",
    defaults: defaults,
    struct: struct
  });

  Struct.check = function (value, branch, path) {
    if (value === void 0) {
      value = Struct.default();
    }

    if (typeof value !== 'object' && typeof value !== 'function') {
      return [[Struct.fail({
        value: value,
        branch: branch,
        path: path
      })]];
    }

    var failures = [];

    for (var k in Props) {
      var Prop = Props[k];
      var v = value[k];

      var _Prop$check = Prop.check(v, branch.concat(v), path.concat(k)),
          pfs = _Prop$check[0];

      if (pfs) {
        failures.push.apply(failures, pfs);
      }
    }

    return failures.length ? [failures] : [undefined, value];
  };

  return Struct;
};

var createIntersection = function createIntersection(schema, defaults, struct) {
  invariant(Array.isArray(schema) && schema.length !== 0, "Intersection structs must be defined as a non-empty array, but you passed: " + schema);
  var Structs = schema.map(function (sch) {
    return struct(sch);
  });
  var type = Structs.map(function (s) {
    return s.type;
  }).join(' & ');
  var Struct = createStruct({
    kind: 'intersection',
    type: type,
    defaults: defaults,
    struct: struct
  });

  Struct.check = function (value, branch, path) {
    if (value === void 0) {
      value = Struct.default();
    }

    var result = value;

    for (var _iterator = Structs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _struct = _ref;

      var _struct$check = _struct.check(value, branch, path),
          fs = _struct$check[0],
          v = _struct$check[1];

      if (fs) {
        return [[Struct.fail({
          value: value,
          branch: branch,
          path: path
        })]];
      } else {
        result = v;
      }
    }

    return [undefined, result];
  };

  return Struct;
};

var createLazy = function createLazy(schema, defaults, struct) {
  invariant(typeof schema === 'function', "Lazy structs must be defined as a function, but you passed: " + schema);
  var Lazy = createStruct({
    kind: 'lazy',
    type: "lazy<\u2026>",
    defaults: defaults,
    struct: struct
  });

  Lazy.check = function () {
    Object.assign(Lazy, schema());
    return Lazy.check.apply(Lazy, arguments);
  };

  return Lazy;
};

var createSize = function createSize(schema, defaults, struct) {
  invariant(Array.isArray(schema) && schema.length === 2 && schema.every(function (n) {
    return typeof n === 'number';
  }), "Size structs must be defined as an array with two number elements, but you passed: " + schema);
  var min = schema[0],
      max = schema[1];

  var validator = function validator(value) {
    return value != null && typeof value.length === 'number' && value.length >= min && value.length <= max;
  };

  var Struct = struct(validator, defaults);
  Struct.kind = 'size';
  Struct.type = "size<" + min + "," + max + ">";
  return Struct;
};

var createLiteral = function createLiteral(schema, defaults, struct) {
  var validator = function validator(value) {
    return value === schema;
  };

  var Struct = struct(validator, defaults);
  Struct.kind = 'literal';
  Struct.type = typeof schema === 'string' ? "\"" + schema + "\"" : "" + schema;
  return Struct;
};

var createObject = function createObject(schema, defaults, struct) {
  invariant(typeof schema === 'object', "Object structs must be defined as an object, but you passed: " + schema);
  var Props = {};

  for (var key in schema) {
    Props[key] = struct(schema[key]);
  }

  var Struct = createStruct({
    kind: 'object',
    type: "{" + Object.keys(schema).join() + "}",
    defaults: defaults,
    struct: struct
  });

  Struct.check = function (value, branch, path) {
    if (value === void 0) {
      value = Struct.default();
    }

    var d = Struct.default();

    if (value === undefined) {
      value = d;
    }

    if (kindOf(value) !== 'object') {
      return [[Struct.fail({
        value: value,
        branch: branch,
        path: path
      })]];
    }

    var result = {};
    var failures = [];
    var keys = new Set(Object.keys(Props).concat(Object.keys(value)));

    for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var k = _ref;
      var v = value[k];
      var p = path.concat(k);
      var b = branch.concat(v);
      var Prop = Props[k];

      if (v === undefined && d != null && k in d) {
        v = typeof d[k] === 'function' ? d[k](value, branch, path) : d[k];
      }

      if (!(k in Props)) {
        failures.push(Struct.fail({
          type: undefined,
          value: v,
          path: p,
          branch: value
        }));
        continue;
      }

      var _Prop$check = Prop.check(v, b, p),
          pfs = _Prop$check[0],
          pr = _Prop$check[1];

      if (pfs) {
        failures.push.apply(failures, pfs);
      } else if (pr !== undefined && k in Props) {
        result[k] = pr;
      }
    }

    return failures.length ? [failures] : [undefined, result];
  };

  return Struct;
};

var createPartial = function createPartial(schema, defaults, struct) {
  invariant(typeof schema === 'object', "Partial structs must be defined as an object, but you passed: " + schema);
  var Props = {};

  for (var key in schema) {
    Props[key] = struct.union([schema[key], 'undefined']);
  }

  var Struct = createStruct({
    kind: 'object',
    type: "{" + Object.keys(schema).join() + "}",
    defaults: defaults,
    struct: struct
  });

  Struct.check = function (value, branch, path) {
    if (value === void 0) {
      value = Struct.default();
    }

    var d = Struct.default();

    if (value === undefined) {
      value = d;
    }

    if (kindOf(value) !== 'object') {
      return [[Struct.fail({
        value: value,
        branch: branch,
        path: path
      })]];
    }

    var result = {};
    var failures = [];

    for (var _iterator = value, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var k = _ref;
      var v = value[k];
      var p = path.concat(k);
      var b = branch.concat(v);
      var Prop = Props[k];

      if (v === undefined && d != null && k in d) {
        v = typeof d[k] === 'function' ? d[k](value, branch, path) : d[k];
      }

      if (!(k in Props)) {
        failures.push(Struct.fail({
          type: undefined,
          value: v,
          path: p,
          branch: value
        }));
        continue;
      }

      var _Prop$check = Prop.check(v, b, p),
          pfs = _Prop$check[0],
          pr = _Prop$check[1];

      if (pfs) {
        failures.push.apply(failures, pfs);
      } else if (pr !== undefined && k in Props) {
        result[k] = pr;
      }
    }

    return failures.length ? [failures] : [undefined, result];
  };

  return Struct;
};

var createPick = function createPick(schema, defaults, struct) {
  invariant(typeof schema === 'object', "Pick structs must be defined as an object, but you passed: " + schema);
  var Props = {};

  for (var key in schema) {
    Props[key] = struct(schema[key]);
  }

  var Struct = createStruct({
    kind: 'pick',
    type: "pick<{" + Object.keys(schema).join() + "}>",
    defaults: defaults,
    struct: struct
  });

  Struct.check = function (value, branch, path) {
    if (value === void 0) {
      value = Struct.default();
    }

    var d = Struct.default();

    if (value === undefined) {
      value = d;
    }

    if (kindOf(value) !== 'object') {
      return [[Struct.fail({
        value: value,
        branch: branch,
        path: path
      })]];
    }

    var result = {};
    var failures = [];

    for (var k in Props) {
      var v = value[k];
      var p = path.concat(k);
      var b = branch.concat(v);
      var Prop = Props[k];

      if (v === undefined && d != null && k in d) {
        v = typeof d[k] === 'function' ? d[k](value, branch, path) : d[k];
      }

      var _Prop$check = Prop.check(v, b, p),
          pfs = _Prop$check[0],
          pr = _Prop$check[1];

      if (pfs) {
        failures.push.apply(failures, pfs);
      } else if (pr !== undefined && k in Props) {
        result[k] = pr;
      }
    }

    return failures.length ? [failures] : [undefined, result];
  };

  return Struct;
};

var createRecord = function createRecord(schema, defaults, struct) {
  invariant(Array.isArray(schema) && schema.length === 2, "Record structs must be defined as an array with two elements, but you passed: " + schema);
  var Key = struct(schema[0]);
  var Value = struct(schema[1]);
  var Struct = createStruct({
    kind: 'record',
    type: "record<" + Key.type + "," + Value.type + ">",
    defaults: defaults,
    struct: struct
  });

  Struct.check = function (value, branch, path) {
    // Record structs have a special default handling behavior, where the defaults
    // are for the entries themselves, not for the entire value. So we can't use
    // JavaScript's built-in default handling here.
    var defs = Struct.default();
    value = defs ? _objectSpread2({}, defs, {}, value) : value;

    if (kindOf(value) !== 'object') {
      return [[Struct.fail({
        value: value,
        branch: branch,
        path: path
      })]];
    }

    var result = {};
    var failures = [];

    for (var k in value) {
      var v = value[k];
      var p = path.concat(k);
      var b = branch.concat(v);

      var _Key$check = Key.check(k, b, p),
          kfs = _Key$check[0],
          kr = _Key$check[1];

      if (kfs) {
        failures.push.apply(failures, kfs);
      } else {
        var _Value$check = Value.check(v, b, p),
            vfs = _Value$check[0],
            vr = _Value$check[1];

        if (vfs) {
          failures.push.apply(failures, vfs);
        } else {
          result[kr] = vr;
        }
      }
    }

    return failures.length ? [failures] : [undefined, result];
  };

  return Struct;
};

var createScalar = function createScalar(schema, defaults, struct) {
  invariant(typeof schema === 'string', "Scalar structs must be defined as a string, but you passed: " + schema);
  var Types = struct.Types;
  invariant(schema in Types, "No struct validator function found for type \"" + schema + "\".");
  var Struct = struct(Types[schema], defaults);
  Struct.kind = 'scalar';
  Struct.type = schema;
  return Struct;
};

var createShorthand = function createShorthand(schema, defaults, struct) {
  if (isStruct(schema)) {
    return schema;
  }

  if (Array.isArray(schema)) {
    if (schema.length === 1) {
      var _schema = schema,
          first = _schema[0];
      return struct.array([first], defaults);
    } else if (schema.length > 1) {
      return struct.tuple(schema, defaults);
    }
  }

  if (typeof schema === 'function') {
    return struct.function(schema, defaults);
  }

  if (typeof schema === 'object') {
    return struct.object(schema, defaults);
  }

  if (typeof schema === 'string') {
    var optional = false;
    var Struct;

    if (schema.endsWith('?')) {
      optional = true;
      schema = schema.slice(0, -1);
    }

    if (schema.includes('|')) {
      var scalars = schema.split(/\s*\|\s*/g);
      Struct = struct.union(scalars, defaults);
    } else if (schema.includes('&')) {
      var _scalars = schema.split(/\s*&\s*/g);

      Struct = struct.intersection(_scalars, defaults);
    } else {
      Struct = struct.scalar(schema, defaults);
    }

    if (optional) {
      Struct = struct.union([Struct, 'undefined'], undefined);
    }

    return Struct;
  }

  throw new Error("A schema definition must be an object, array, string or function, but you passed: " + schema);
};

var createTuple = function createTuple(schema, defaults, struct) {
  invariant(Array.isArray(schema), "Tuple structs must be defined as an array, but you passed: " + schema);
  var Elements = schema.map(function (s) {
    return struct(s);
  });
  var Struct = createStruct({
    kind: 'tuple',
    type: "[" + Elements.map(function (S) {
      return S.type;
    }).join() + "]",
    defaults: defaults,
    struct: struct
  });

  Struct.check = function (value, branch, path) {
    if (value === void 0) {
      value = Struct.default();
    }

    if (!Array.isArray(value)) {
      return [[Struct.fail({
        value: value,
        branch: branch,
        path: path
      })]];
    }

    var result = [];
    var failures = [];
    var length = Math.max(value.length, Elements.length);

    for (var i = 0; i < length; i++) {
      var Element = Elements[i];
      var v = value[i];
      var p = path.concat(i);
      var b = branch.concat(v);

      if (!Element) {
        failures.push(Struct.fail({
          type: undefined,
          value: v,
          path: p,
          branch: b
        }));
      } else {
        var _Element$check = Element.check(v, b, p),
            efs = _Element$check[0],
            er = _Element$check[1];

        if (efs) {
          failures.push.apply(failures, efs);
        } else {
          result[i] = er;
        }
      }
    }

    return failures.length ? [failures] : [undefined, result];
  };

  return Struct;
};

var createUnion = function createUnion(schema, defaults, struct) {
  invariant(Array.isArray(schema) && schema.length !== 0, "Union structs must be defined as a non-empty array, but you passed: " + schema);
  var Structs = schema.map(function (sch) {
    return struct(sch);
  });
  var type = Structs.map(function (s) {
    return s.type;
  }).join(' | ');
  var Struct = createStruct({
    kind: 'union',
    type: type,
    defaults: defaults,
    struct: struct
  });

  Struct.check = function (value, branch, path) {
    if (value === void 0) {
      value = Struct.default();
    }

    for (var _iterator = Structs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _struct = _ref;

      var _struct$check = _struct.check(value, branch, path),
          fs = _struct$check[0],
          v = _struct$check[1];

      if (!fs) {
        return [undefined, v];
      }
    }

    return [[Struct.fail({
      value: value,
      branch: branch,
      path: path
    })]];
  };

  return Struct;
};

/**
 * Create a struct singleton with settings that include your own domain-specific
 * data `types`, and an optional custom `Error` class.
 */

var superstruct = function superstruct(settings) {
  if (settings === void 0) {
    settings = {};
  }

  var struct = function struct(schema, defaults) {
    return createShorthand(schema, defaults, struct);
  };

  struct.array = function (schema, defaults) {
    return createArray(schema, defaults, struct);
  };

  struct.dynamic = function (schema, defaults) {
    return createDynamic(schema, defaults, struct);
  };

  struct.enum = function (schema, defaults) {
    return createEnum(schema, defaults, struct);
  };

  struct.function = function (schema, defaults) {
    return createFunction(schema, defaults, struct);
  };

  struct.instance = function (schema, defaults) {
    return createInstance(schema, defaults, struct);
  };

  struct.interface = function (schema, defaults) {
    return createInterface(schema, defaults, struct);
  };

  struct.intersection = function (schema, defaults) {
    return createIntersection(schema, defaults, struct);
  };

  struct.lazy = function (schema, defaults) {
    return createLazy(schema, defaults, struct);
  };

  struct.literal = function (schema, defaults) {
    return createLiteral(schema, defaults, struct);
  };

  struct.object = function (schema, defaults) {
    return createObject(schema, defaults, struct);
  };

  struct.optional = function (schema, defaults) {
    return createUnion([schema, 'undefined'], defaults, struct);
  };

  struct.partial = function (schema, defaults) {
    return createPartial(schema, defaults, struct);
  };

  struct.pick = function (schema, defaults) {
    return createPick(schema, defaults, struct);
  };

  struct.record = function (schema, defaults) {
    return createRecord(schema, defaults, struct);
  };

  struct.scalar = function (schema, defaults) {
    return createScalar(schema, defaults, struct);
  };

  struct.size = function (schema, defaults) {
    return createSize(schema, defaults, struct);
  };

  struct.tuple = function (schema, defaults) {
    return createTuple(schema, defaults, struct);
  };

  struct.union = function (schema, defaults) {
    return createUnion(schema, defaults, struct);
  };

  struct.Error = settings.error || StructError;
  struct.Types = _objectSpread2({}, Types, {}, settings.types);
  return struct;
};

/**
 * The singleton instance of Superstruct that is exported by default, configured
 * with types for all of the JavaScript built-in data types.
 *
 * You can use it if you don't need any custom types. However, if you do want to
 * define custom types, use the [[superstruct]] factory to configure your own
 * [[Superstruct]] instance.
 */

var struct = superstruct();


//# sourceMappingURL=index.es.js.map


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


/***/ })

/******/ });
});
//# sourceMappingURL=vwo-javascript-sdk.js.map