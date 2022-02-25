/*!
 * vwo-javascript-sdk - v1.32.3
 * URL - https://github.com/wingify/vwo-node-sdk
 * 
 * Copyright 2019-2022 Wingify Software Pvt. Ltd.
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
 *  4. vwo-sdk-log-messages - https://github.com/wingify/vwo-sdk-log-messages.git#v0.1.0
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
})(this, function() {
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
var api = __webpack_require__(/*! ./api */ "./lib/api/index.js");

var FileNameEnum = __webpack_require__(/*! ./enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var ApiEnum = __webpack_require__(/*! ./enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var DataTypeUtil = __webpack_require__(/*! ./utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var FunctionUtil = __webpack_require__(/*! ./utils/FunctionUtil */ "./lib/utils/FunctionUtil.js");

var EventQueue = __webpack_require__(/*! ./services/EventQueue */ "./lib/services/EventQueue.js");

var SettingsFileService = __webpack_require__(/*! ./services/SettingsFileManager */ "./lib/services/SettingsFileManager.js");

var logging = __webpack_require__(/*! ./services/logging */ "./lib/services/logging/index.js");

var HooksManager = __webpack_require__(/*! ./services/HooksManager */ "./lib/services/HooksManager.js");

var UrlService = __webpack_require__(/*! ./services/UrlService */ "./lib/services/UrlService.js");

var UsageStats = __webpack_require__(/*! ./services/UsageStats */ "./lib/services/UsageStats.js");

var BatchEventsDispatcher;
var customEventUtil;
var BatchEventsQueue;

if (false) {}

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
    this.logger = config.logger;
    this.returnPromiseFor = config.returnPromiseFor;
    this.optOut = false;
    var settingsFileManager = new SettingsFileService(config); // Validate the config file i.e. check if required fields contain appropriate data

    if (!settingsFileManager.isSettingsFileValid()) {
      this.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SETTINGS_FILE_INVALID, {
        file: file
      }));
      return;
    }

    this.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_VALID, {
      file: file
    })); // Initialize Hooks manager so that callbacks can be invoked

    HooksManager.init(config); // Setup event quque for sending impressions to VWO server

    this.eventQueue = new EventQueue();
    this.usageStats = new UsageStats();
    this.SettingsFileManager = settingsFileManager;
    settingsFileManager.checkAndPoll(); // Checks if pollingInterval is passed then starts polling settingsFile

    if (!config.isDevelopmentMode) {
      this.usageStats.collectUsageStats(settingsFileManager.getConfig());
    } // Only for Node.js SDK


    if (false) { var sdkKey, accountId; } // Process settingsFile for various things. For eg: assign bucket range to variation, etc.


    this.SettingsFileManager.processSettingsFile();
    this.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SDK_INITIALIZED, {
      file: file
    }));
    this.UrlService = UrlService.init(config.settingsFile);
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
    value: function activate(campaignKey, userId) {
      var _this2 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      try {
        var self = this; // Check if returnPromiseFor is provided. If yes, return a promise instead of value
        // i.e. wait till the network call is not successful

        if (self.returnPromiseFor && (self.returnPromiseFor.activate || self.returnPromiseFor.all)) {
          self.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file: file,
            method: ApiEnum.ACTIVATE
          }));
          return new Promise(function (resolve) {
            if (_this2.optOut) {
              _this2.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file: file,
                api: ApiEnum.ACTIVATE
              }));

              resolve(null);
            } else {
              var variationName;

              options.responseCallback = function (_error, _response) {
                resolve(variationName);
              };

              variationName = api.activate(self, campaignKey, userId, options); // If we get null from the API i.e. no tracking call was sent
              // In this case, respponseCallback will not be fired and hence we have to manually resolve the promise

              if (!variationName) {
                resolve(variationName);
              } else if (DataTypeUtil.isObject(variationName)) {
                resolve(variationName.variationName);
              }
            }
          });
        }

        if (this.optOut) {
          this.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file: file,
            api: ApiEnum.ACTIVATE
          }));
          return null;
        }

        var apiResponse = api.activate(self, campaignKey, userId, options);

        if (DataTypeUtil.isObject(apiResponse)) {
          return apiResponse.variationName;
        }

        return apiResponse;
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
    value: function getVariationName(campaignKey, userId) {
      var _this3 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      try {
        var self = this; // Check if returnPromiseFor is provided. If yes, return a promise instead of value

        if (self.returnPromiseFor && (self.returnPromiseFor.getVariationName || self.returnPromiseFor.all)) {
          self.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file: file,
            method: ApiEnum.GET_VARIATION_NAME
          }));
          return new Promise(function (resolve) {
            if (_this3.optOut) {
              _this3.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file: file,
                api: ApiEnum.GET_VARIATION_NAME
              }));

              resolve(null);
            } else {
              // since this API does not send any async call, we can simply resolve the returned value
              resolve(api.getVariation(self, campaignKey, userId, options));
            }
          });
        }

        if (this.optOut) {
          this.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file: file,
            api: ApiEnum.GET_VARIATION_NAME
          }));
          return null;
        }

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
    value: function track(campaignSpecifier, userId, goalIdentifier) {
      var _this4 = this;

      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      try {
        var self = this; // Check if returnPromiseFor is provided. If yes, return a promise instead of value
        // i.e. wait till the network call is not successful

        if (self.returnPromiseFor && (self.returnPromiseFor.track || self.returnPromiseFor.all)) {
          self.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file: file,
            method: ApiEnum.TRACK
          }));
          return new Promise(function (resolve) {
            if (_this4.optOut) {
              _this4.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file: file,
                api: ApiEnum.TRACK
              }));

              resolve(null);
            } else {
              var trackResponse;
              var counter = 0;

              options.responseCallback = function (_error, _response) {
                counter += 1; // In case of global goals, when all campaigns are tracked, then only resolve

                if (counter === FunctionUtil.objectValues(trackResponse).filter(Boolean).length) {
                  resolve(trackResponse);
                }
              };

              trackResponse = api.track(self, campaignSpecifier, userId, goalIdentifier, options); // If we get null/false from the API i.e. no tracking call was sent
              // In this case, respponseCallback will not be fired and hence we have to manually resolve the promise
              // Or, in case of global goals, if none campaign got success, manually resolve

              if (!trackResponse || !FunctionUtil.objectValues(trackResponse).some(Boolean)) {
                resolve(trackResponse);
              } else if (trackResponse && trackResponse.isDevelopmentMode) {
                delete trackResponse.isDevelopmentMode;
                resolve(trackResponse);
              }
            }
          });
        }

        if (this.optOut) {
          this.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file: file,
            api: ApiEnum.TRACK
          }));
          return null;
        }

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
    value: function isFeatureEnabled(campaignKey, userId) {
      var _this5 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      try {
        var self = this; // Check if returnPromiseFor is provided. If yes, return a promise instead of value
        // i.e. wait till the network call is not successful

        if (self.returnPromiseFor && (self.returnPromiseFor.isFeatureEnabled || self.returnPromiseFor.all)) {
          self.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file: file,
            method: ApiEnum.IS_FEATURE_ENABLED
          }));
          return new Promise(function (resolve) {
            if (_this5.optOut) {
              _this5.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file: file,
                api: ApiEnum.IS_FEATURE_ENABLED
              }));

              resolve(false);
            } else {
              var isFeatureEnabledApiResponse;

              options.responseCallback = function (_error, _response) {
                resolve(!!isFeatureEnabledApiResponse);
              };

              isFeatureEnabledApiResponse = api.isFeatureEnabled(self, campaignKey, userId, options); // If we get null from the API i.e. no tracking call was sent
              // In this case, respponseCallback will not be fired and hence we have to manually resolve the promise

              if (DataTypeUtil.isNull(isFeatureEnabledApiResponse)) {
                resolve(false);
              } else if (DataTypeUtil.isObject(isFeatureEnabledApiResponse)) {
                resolve(!!isFeatureEnabledApiResponse.isFeatureEnabled);
              }
            }
          });
        }

        if (this.optOut) {
          this.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file: file,
            api: ApiEnum.IS_FEATURE_ENABLED
          }));
          return false;
        }

        var apiResponse = api.isFeatureEnabled(self, campaignKey, userId, options);

        if (DataTypeUtil.isObject(apiResponse)) {
          return !!apiResponse.isFeatureEnabled;
        }

        return !!apiResponse;
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
    value: function getFeatureVariableValue(campaignKey, variableKey, userId) {
      var _this6 = this;

      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      try {
        var self = this; // Check if returnPromiseFor is provided. If yes, return a promise instead of value

        if (self.returnPromiseFor && (self.returnPromiseFor.getFeatureVariableValue || self.returnPromiseFor.all)) {
          self.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file: file,
            method: ApiEnum.GET_FEATURE_VARIABLE_VALUE
          }));
          return new Promise(function (resolve) {
            if (_this6.optOut) {
              _this6.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file: file,
                api: ApiEnum.GET_FEATURE_VARIABLE_VALUE
              }));

              resolve(null);
            } else {
              // since this API does not send any async call, we can simply resolve the returned value
              resolve(api.getFeatureVariableValue(self, campaignKey, variableKey, userId, options));
            }
          });
        }

        if (this.optOut) {
          this.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file: file,
            api: ApiEnum.GET_FEATURE_VARIABLE_VALUE
          }));
          return null;
        }

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
      var _this7 = this;

      try {
        var self = this;
        var customDimensionMap;

        if (arguments.length === 2) {
          // Argument reshuffling.
          customDimensionMap = tagKey;
          userId = tagValue;
          tagKey = ' ';
          tagValue = ' ';
        } else if (arguments.length === 3) {
          customDimensionMap = {};
        } else {
          this.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_BAD_PARAMETERS, {
            file: file,
            api: ApiEnum.PUSH
          }));
          return false;
        } // Check if returnPromiseFor is provided. If yes, return a promise instead of value
        // i.e. wait till the network call is not successful


        if (self.returnPromiseFor && (self.returnPromiseFor.push || self.returnPromiseFor.all)) {
          self.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file: file,
            method: ApiEnum.PUSH
          }));
          return new Promise(function (resolve) {
            if (_this7.optOut) {
              _this7.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file: file,
                api: ApiEnum.PUSH
              }));

              resolve(null);
            } else {
              var apiResponse;
              var counter = 0;
              var options = {
                responseCallback: function responseCallback(_error, _response) {
                  counter += 1; // In case of multiple custom dimensions, when all are tracked, then only resolve

                  if (counter === FunctionUtil.objectValues(apiResponse).filter(Boolean).length) {
                    resolve(apiResponse);
                  }
                }
              };
              apiResponse = api.push(self, tagKey, tagValue, userId, customDimensionMap, options); // If we get false from the API i.e. no tracking call was sent
              // In this case, respponseCallback will not be fired and hence we have to manually resolve the promise

              if (!apiResponse) {
                resolve(false);
              } else if (apiResponse && apiResponse.isDevelopmentMode) {
                delete apiResponse.isDevelopmentMode;
                resolve(apiResponse);
              }
            }
          });
        }

        if (this.optOut) {
          this.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file: file,
            api: ApiEnum.PUSH
          }));
          return null;
        }

        return api.push(self, tagKey, tagValue, userId, customDimensionMap);
      } catch (err) {
        this.logger.log(LogLevelEnum.ERROR, err.message);
        return false;
      }
    }
  }, {
    key: "setOptOut",
    value: function setOptOut() {
      var _this8 = this;

      this.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.OPT_OUT_API_CALLED, {
        file: file
      }));

      if (this.returnPromiseFor && (this.returnPromiseFor.optOut || this.returnPromiseFor.all)) {
        return new Promise(function (resolve) {
          _this8._destroyInstanceVariables();

          if (_this8.batchEventsQueue) {
            _this8.flushEvents().then(function () {
              _this8.batchEventsQueue = undefined;
              resolve(true);
            });
          } else {
            resolve(true);
          }
        });
      }

      if (this.batchEventsQueue) {
        this.flushEvents().then(function () {
          _this8.batchEventsQueue = undefined;
        });
      }

      this._destroyInstanceVariables();

      return true;
    }
    /**
     * Manually flush impression events to VWO which are queued in batch queue as per batchEvents config
     */

  }, {
    key: "flushEvents",
    value: function flushEvents() {
      var _this9 = this;

      var accountId = this.SettingsFileManager.getSettingsFile().accountId;

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
      if (this.optOut) {
        this.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
          file: file,
          api: 'getAndUpdateSettingsFile'
        }));
        return new Promise(function (resolve) {
          resolve(null);
        });
      }

      return this.SettingsFileManager.getAndUpdateSettingsFile(accountId, sdkKey);
    }
  }, {
    key: "_destroyInstanceVariables",
    value: function _destroyInstanceVariables() {
      this.userStorageService = undefined;
      this.SettingsFileManager = undefined;
      this.usageStats = undefined;
      this.eventQueue = undefined;
      this.optOut = true;
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
        metaData = options.metaData,
        responseCallback = options.responseCallback; // Check if arguments have valid data-type

    if (ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.ACTIVATE,
      campaignKey: campaignKey,
      userId: userId,
      customVariables: customVariables,
      variationTargetingVariables: variationTargetingVariables,
      userStorageData: userStorageData,
      shouldTrackReturningUser: shouldTrackReturningUser,
      metaData: metaData,
      responseCallback: responseCallback
    })) {
      areParamsValid = true;
    }
  }

  if (areParamsValid === false) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_BAD_PARAMETERS, {
      file: file,
      api: ApiEnum.ACTIVATE
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
    vwoInstance.logger.log(LogLevelEnum.WARN, LogMessageUtil.build(LogMessageEnum.WARNING_MESSAGES.CAMPAIGN_NOT_RUNNING, {
      file: file,
      campaignKey: campaignKey,
      api: api
    }));
    return null;
  }

  if (!CampaignUtil.isAbCampaign(campaign)) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_NOT_APPLICABLE, {
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
    vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.DECISION_NO_VARIATION_ALLOTED, {
      file: file,
      userId: userId,
      campaignKey: campaignKey
    }));
    return null;
  } // check if variation found from storage. return it without sending a call to VWO server


  if (isStoredVariation && !shouldTrackReturningUser) {
    vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CAMPAIGN_USER_ALREADY_TRACKED, {
      file: file,
      userId: userId,
      campaignKey: campaignKey,
      api: api
    }));
    return {
      variationName: variationName
    };
  } // Variation found...let VWO server knows about it to show report stats


  if (config.batchEvents) {
    var properties = ImpressionUtil.buildBatchEventForTrackingUser(settingsFile, campaign.id, variationId, userId);
    vwoInstance.batchEventsQueue.enqueue(properties);
  } else if (settingsFile.isEventArchEnabled) {
    var _properties = ImpressionUtil.getEventsBaseProperties(settingsFile, EventEnum.VWO_VARIATION_SHOWN, vwoInstance.usageStats.getUsageStats());

    var payload = ImpressionUtil.getTrackUserPayloadData(settingsFile, userId, EventEnum.VWO_VARIATION_SHOWN, campaign.id, variationId);
    vwoInstance.eventQueue.process(config, _properties, vwoInstance, {
      payload: payload,
      responseCallback: responseCallback
    });
  } else {
    var _properties2 = ImpressionUtil.buildEventForTrackingUser(settingsFile, campaign.id, variationId, userId, vwoInstance.usageStats.getUsageStats());

    vwoInstance.eventQueue.process(config, _properties2, vwoInstance, {
      responseCallback: responseCallback
    });
  }

  if (config.isDevelopmentMode) {
    return {
      variationName: variationName
    };
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
      vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_BAD_PARAMETERS, {
        file: file,
        api: ApiEnum.GetFeatureVariableValue
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
      vwoInstance.logger.log(LogLevelEnum.WARN, LogMessageUtil.build(LogMessageEnum.WARNING_MESSAGES.CAMPAIGN_NOT_RUNNING, {
        file: file,
        campaignKey: campaignKey,
        api: api
      }));
      return null;
    }

    if (CampaignUtil.isAbCampaign(campaign)) {
      // API not allowed for full-stack AB campaigns
      vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_NOT_APPLICABLE, {
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
      vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_STATUS, {
        file: file,
        campaignKey: campaignKey,
        userId: userId,
        status: 'disabled'
      }));
      return null;
    }

    if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
      variable = FeatureUtil.getVariableForFeature(campaign, variableKey);
    } else if (CampaignUtil.isFeatureTestCampaign(campaign)) {
      variable = FeatureUtil.getVariableValueForVariation(campaign, variation, variableKey);

      if (ObjectUtil.areObjectKeys(variable) && variation.isFeatureEnabled) {
        vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_VARIABLE_VALUE, {
          file: file,
          variableKey: variableKey,
          campaignKey: campaign.key,
          variableValue: variable.value,
          userId: userId
        }));
      } else if (ObjectUtil.areObjectKeys(variable) && !variation.isFeatureEnabled) {
        vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_VARIABLE_DEFAULT_VALUE, {
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
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_BAD_PARAMETERS, {
      file: file,
      api: ApiEnum.GET_VARIATION_NAME
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
    vwoInstance.logger.log(LogLevelEnum.WARN, LogMessageUtil.build(LogMessageEnum.WARNING_MESSAGES.CAMPAIGN_NOT_RUNNING, {
      file: file,
      campaignKey: campaignKey,
      api: api
    }));
    return null;
  }

  if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_NOT_APPLICABLE, {
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
        metaData = options.metaData,
        responseCallback = options.responseCallback; // Check if arguments have valid data-type

    if (ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.IS_FEATURE_ENABLED,
      campaignKey: campaignKey,
      userId: userId,
      customVariables: customVariables,
      variationTargetingVariables: variationTargetingVariables,
      userStorageData: userStorageData,
      shouldTrackReturningUser: shouldTrackReturningUser,
      metaData: metaData,
      responseCallback: responseCallback
    })) {
      areParamsValid = true;
    }
  }

  if (areParamsValid === false) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_BAD_PARAMETERS, {
      file: file,
      api: ApiEnum.isFeatureEnabled
    }));
    return null;
  } // Get the cached configuration


  var config = vwoInstance.SettingsFileManager.getConfig();
  var settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api); // If no settings are found, simply log and return false

  if (!settingsFile) {
    return null;
  }

  shouldTrackReturningUser = shouldTrackReturningUser || config.shouldTrackReturningUser || false; // Get the campaign settings based on campaignKey from the settings

  var campaign = CampaignUtil.getCampaign(settingsFile, campaignKey);

  if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
    vwoInstance.logger.log(LogLevelEnum.WARN, LogMessageUtil.build(LogMessageEnum.WARNING_MESSAGES.CAMPAIGN_NOT_RUNNING, {
      file: file,
      campaignKey: campaignKey,
      api: api
    }));
    return null;
  }

  if (CampaignUtil.isAbCampaign(campaign)) {
    // API not allowed for full-stack AB campaigns
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_NOT_APPLICABLE, {
      file: file,
      campaignKey: campaignKey,
      campaignType: campaign.type,
      userId: userId,
      api: api
    }));
    return null;
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
      vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CAMPAIGN_USER_ALREADY_TRACKED, {
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
        vwoInstance.eventQueue.process(config, _properties, vwoInstance, {
          payload: payload,
          responseCallback: responseCallback
        });
      } else {
        var _properties2 = ImpressionUtil.buildEventForTrackingUser(settingsFile, campaign.id, variationId, userId, vwoInstance.usageStats.getUsageStats());

        vwoInstance.eventQueue.process(config, _properties2, vwoInstance, {
          responseCallback: responseCallback
        });
      }

      vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_STATUS, {
        file: file,
        campaignKey: campaignKey,
        userId: userId,
        status: isFeatureEnabled ? 'enabled' : 'disabled'
      }));

      if (config.isDevelopmentMode) {
        return {
          isFeatureEnabled: isFeatureEnabled
        };
      }

      return isFeatureEnabled;
    }
  }

  vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.FEATURE_STATUS, {
    file: file,
    campaignKey: campaignKey,
    userId: userId,
    status: isFeatureEnabled ? 'enabled' : 'disabled'
  }));

  if (isStoredVariation || config.isDevelopmentMode) {
    return {
      isFeatureEnabled: isFeatureEnabled
    };
  }

  return {
    isFeatureEnabled: isFeatureEnabled
  };
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
var ApiEnum = __webpack_require__(/*! ../enums/ApiEnum */ "./lib/enums/ApiEnum.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var EventEnum = __webpack_require__(/*! ../enums/EventEnum */ "./lib/enums/EventEnum.js");

var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var ImpressionUtil = __webpack_require__(/*! ../utils/ImpressionUtil */ "./lib/utils/ImpressionUtil.js");

var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var BatchEventsDispatcher;

if (false) {}

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
  var _ref = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {},
      responseCallback = _ref.responseCallback;

  var api = ApiEnum.PUSH;

  if (!ValidateUtil.areValidParamsForAPIMethod({
    method: ApiEnum.PUSH,
    tagKey: tagKey,
    tagValue: tagValue,
    userId: userId,
    customDimensionMap: customDimensionMap,
    responseCallback: responseCallback
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
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.PUSH_INVALID_PARAMS, {
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

  var result = {};

  if (config.batchEvents) {
    Object.keys(customDimensionMap).forEach(function (key) {
      var tagValue = DataTypeUtil.isString(customDimensionMap[key]) ? customDimensionMap[key] : JSON.stringify(customDimensionMap[key]);
      var properties = ImpressionUtil.buildBatchEventForPushing(settingsFile, key, tagValue, userId);
      vwoInstance.batchEventsQueue.enqueue(properties);
      result[key] = true;
    });
  } else if (settingsFile.isEventArchEnabled) {
    var properties = ImpressionUtil.getEventsBaseProperties(settingsFile, EventEnum.VWO_SYNC_VISITOR_PROP);
    var payload = ImpressionUtil.getPushPayloadData(settingsFile, userId, EventEnum.VWO_SYNC_VISITOR_PROP, customDimensionMap);
    vwoInstance.eventQueue.process(config, properties, vwoInstance, {
      payload: payload,
      responseCallback: responseCallback
    });
    result.success = true;
  } else {
    var events = [];
    var customDimensionKeys = Object.keys(customDimensionMap);
    customDimensionKeys.forEach(function (key) {
      var properties;
      var tagValue = DataTypeUtil.isString(customDimensionMap[key]) ? customDimensionMap[key] : JSON.stringify(customDimensionMap[key]);

      if (true) {
        properties = ImpressionUtil.buildEventForPushing(settingsFile, key, tagValue, userId);
        vwoInstance.eventQueue.process(config, properties, vwoInstance, {
          responseCallback: responseCallback
        });
      } else {}

      events.push(properties);
      result[key] = true;
    });

    if (false) {}
  }

  if (config.isDevelopmentMode) {
    return Object.assign({}, result, {
      isDevelopmentMode: config.isDevelopmentMode
    });
  }

  return result;
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
var BatchEventsDispatcher;

if (false) {}
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
        metaData = options.metaData,
        responseCallback = options.responseCallback; // Check if arguments have valid data-type

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
      metaData: metaData,
      responseCallback: responseCallback
    }) && (!goalTypeToTrack || goalTypeToTrack && objectValues(GoalTypeEnum).includes(goalTypeToTrack))) {
      areParamsValid = true;
    }
  }

  if (areParamsValid === false) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_BAD_PARAMETERS, {
      file: file,
      api: ApiEnum.TRACK
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
  var events = [];
  var areGlobalGoals =  true ? false : undefined;
  campaigns.forEach(function (campaign) {
    return result[campaign.key] = trackCampaignGoal(vwoInstance, campaign, campaign.key, userId, settingsFile, goalIdentifier, revenueValue, config, customVariables, variationTargetingVariables, userStorageData, goalTypeToTrack, shouldTrackReturningUser, metaData, metricMap, revenuePropList, events, areGlobalGoals);
  });

  if (!Object.keys(result).length) {
    return null;
  }

  if (true) {
    if (events && events.length) {
      for (var k = 0; k < events.length; k++) {
        vwoInstance.eventQueue.process(config, events[k], vwoInstance, {
          responseCallback: responseCallback
        });
      }
    }
  } else {}

  if (settingsFile.isEventArchEnabled && Object.keys(metricMap).length > 0) {
    var properties = ImpressionUtil.getEventsBaseProperties(settingsFile, goalIdentifier);
    var payload = ImpressionUtil.getTrackGoalPayloadData(settingsFile, userId, goalIdentifier, metricMap, revenueValue, revenuePropList);
    vwoInstance.eventQueue.process(config, properties, vwoInstance, {
      payload: payload,
      responseCallback: responseCallback
    });
    Object.keys(metricMap).forEach(function (key) {
      DecisionUtil._saveUserData(config, metricMap[key].campaign, metricMap[key].variationName, metricMap[key].userId, metricMap[key].metaData, goalIdentifier);
    });
  }

  if (config.isDevelopmentMode) {
    return Object.assign({}, result, {
      isDevelopmentMode: config.isDevelopmentMode
    });
  }

  return result;
}

function trackCampaignGoal(vwoInstance, campaign, campaignKey, userId, settingsFile, goalIdentifier, revenueValue, config, customVariables, variationTargetingVariables, userStorageData, goalTypeToTrack, shouldTrackReturningUser, metaData, metricMap, revenuePropList, events, areGlobalGoals) {
  // If matching campaign is not found with campaignKey or if found but is in not RUNNING state, simply return no variation
  if (!campaign || campaign.status !== Constants.STATUS_RUNNING) {
    vwoInstance.logger.log(LogLevelEnum.WARN, LogMessageUtil.build(LogMessageEnum.WARNING_MESSAGES.CAMPAIGN_NOT_RUNNING, {
      file: file,
      campaignKey: campaignKey,
      api: api
    }));
    return false;
  }

  if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
    vwoInstance.logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_NOT_APPLICABLE, {
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
        vwoInstance.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CAMPAIGN_GOAL_ALREADY_TRACKED, {
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
      var _properties = {};

      if (areGlobalGoals) {
        _properties = ImpressionUtil.buildBatchEventForTrackingGoal(settingsFile, campaignId, variationId, userId, goal, revenueValue);
      } else {
        _properties = ImpressionUtil.buildEventForTrackingGoal(settingsFile, campaignId, variationId, userId, goal, revenueValue);
      }

      events.push(_properties);
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

/* global SDK_NAME, SDK_VERSION */
var packageFile = {}; // For javascript-sdk, to keep the build size low
// avoid adding the whole package file in the file

if (true) {
  packageFile = {
    name: "vwo-javascript-sdk",
    version: "1.32.3"
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
var file = FileNameEnum.BucketingService;
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
      file: file,
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

    if (!campaign) {
      return false;
    }

    var trafficAllocation = campaign.percentTraffic;

    var valueAssignedToUser = BucketingService._getBucketValueForUser(CampaignUtil.getBucketingSeed(userId, campaign), userId, disableLog);

    var isUserPart = valueAssignedToUser !== 0 && valueAssignedToUser <= trafficAllocation;
    logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_CAMPAIGN_ELIGIBILITY, {
      file: file,
      userId: userId,
      campaignKey: campaign.key,
      status: isUserPart ? 'eligible' : 'not eligible'
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

    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_CAMPAIGN_BUCKET_VALUES, {
      file: file,
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
var ValidateUtil = __webpack_require__(/*! ../utils/ValidateUtil */ "./lib/utils/ValidateUtil.js");

var Bucketer = __webpack_require__(/*! ./BucketingService */ "./lib/core/BucketingService.js");

var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();
var file = FileNameEnum.VariationDecider;
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
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.USER_ID_INVALID, {
        file: file,
        userId: userId
      }));
      return response;
    }

    if (Bucketer.isUserPartOfCampaign(userId, campaign)) {
      var variation = VariationDecider.getVariationOfCampaignForUser(userId, campaign) || {};
      response.variation = variation;
      response.variationId = variation.id;
      response.variationName = variation.name;
    } else {
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_NOT_PART_OF_CAMPAIGN, {
        file: file,
        userId: userId,
        campaignKey: campaign.key
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
    if (!campaign) {
      return null;
    }

    var variation = Bucketer.bucketUserToVariation(userId, campaign);

    if (variation && variation.name) {
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_VARIATION_STATUS, {
        file: file,
        userId: userId,
        campaignKey: campaign.key,
        status: "got Varation:".concat(variation.name)
      }));
      return {
        variation: variation,
        name: variation.name,
        id: variation.id
      };
    }

    logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_VARIATION_STATUS, {
      file: file,
      userId: userId,
      campaignKey: campaign.key,
      status: 'got no variation'
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
  HttpImageUtil: "".concat(UTIL_PATH, "/HttpImageUtil"),
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

/***/ "./lib/enums/StatusEnum.js":
/*!*********************************!*\
  !*** ./lib/enums/StatusEnum.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

var ApiEnum = __webpack_require__(/*! ./enums/ApiEnum */ "./lib/enums/ApiEnum.js");

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

function logError() {
  var parameter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var log = LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CONFIG_PARAMETER_INVALID, {
    file: file,
    parameter: parameter,
    type: type,
    api: ApiEnum.LAUNCH
  });
  throw new Error(logger.log(LogLevelEnum.ERROR, log));
}

function logInfo() {
  var parameter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var log = LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_PARAMETER_USED, {
    file: file,
    parameter: parameter,
    type: type
  });
  console.info("VWO-SDK - [INFO]:   ".concat(FunctionUtil.getCurrentTime(), " ").concat(log));
}

module.exports = {
  logging: logging,
  setLogger: setLogHandler,
  setLogLevel: setLogLevel,
  getSettingsFile: SettingsFileUtil.get,
  GoalTypeEnum: GoalTypeEnum,
  LogLevelEnum: LogLevelEnum,

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
        logError('shouldTrackReturningUser', 'boolean');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.shouldTrackReturningUser)) {
        logInfo('shouldTrackReturningUser', 'boolean');
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.isDevelopmentMode) && !DataTypeUtil.isBoolean(sdkConfig.isDevelopmentMode)) {
        logError('isDevelopmentMode', 'boolean');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.isDevelopmentMode)) {
        logInfo('isDevelopmentMode', 'boolean');
      }

      if (sdkConfig.goalTypeToTrack && !objectValues(GoalTypeEnum).includes(sdkConfig.goalTypeToTrack)) {
        logError('goalTypeToTrack', 'string(REVENUE_TRACKING, CUSTOM_GOAL, ALL)');
      } else if (sdkConfig.goalTypeToTrack) {
        logInfo('goalTypeToTrack', 'string(REVENUE_TRACKING, CUSTOM_GOAL, ALL)');
      }

      if (sdkConfig.logging && sdkConfig.logging.level && !objectValues(LogLevelEnum).includes(sdkConfig.logging.level)) {
        logError('logLevel', 'number(1,2,3,4)');
      } else if (sdkConfig.logging && sdkConfig.logging.level) {
        logInfo('logLevel', 'number(1,2,3,4)');
      }

      if (sdkConfig.pollingInterval && !DataTypeUtil.isNumber(sdkConfig.pollingInterval)) {
        logError('pollingInterval', 'number(in miliiseconds)');
      } else if (sdkConfig.pollingInterval) {
        logInfo('pollingInterval', 'number(in miliiseconds)');
      }

      if (sdkConfig.pollingInterval && DataTypeUtil.isUndefined(sdkConfig.sdkKey)) {
        logError();
      }

      if (sdkConfig.pollingInterval && !DataTypeUtil.isString(sdkConfig.sdkKey)) {
        logError('sdkKey', 'string');
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.batchEvents) && !DataTypeUtil.isObject(sdkConfig.batchEvents)) {
        logError('batchEvents', 'object');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.batchEvents)) {
        logInfo('batchEvents', 'object');
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.returnPromiseFor) && !DataTypeUtil.isObject(sdkConfig.returnPromiseFor)) {
        logError('returnPromiseFor', 'object');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.returnPromiseFor)) {
        logInfo('returnPromiseFor', 'object');
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.integrations) && !DataTypeUtil.isObject(sdkConfig.integrations)) {
        logError('integrations', 'object');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.integrations)) {
        logInfo('integrations', 'object');
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.userStorageService) && !DataTypeUtil.isObject(sdkConfig.userStorageService)) {
        logError('userStorageService', 'object');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.userStorageService)) {
        logInfo('userStorageService', 'object');
      } // For JavaScript SDK, batching is not required and is not available


      if (DataTypeUtil.isObject(sdkConfig.batchEvents) && "undefined" === 'undefined') {
        sdkConfig.batchEvents = null;
      } // For Node.js SDK


      if (false) {}

      config = sdkConfig;
    } catch (err) {
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CONFIG_CORRUPTED, {
        file: file,
        api: ApiEnum.LAUNCH
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
        logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CONFIG_CUSTOM_LOGGER_USED, {
          file: file
        }));
      } else if (config.logging.logger) {
        logError('logging.logger', 'object');
      }

      if (config.logging.level !== undefined) {
        logging.setLogLevel(config.logging.level);
        logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CONFIG_LOG_LEVEL_SET, {
          file: file,
          level: LogNumberLevel['_' + config.logging.level]
        }));
      }
    } // DEBUG log for knowing whether it's DEV mode


    if (config.isDevelopmentMode) {
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CONFIG_DEVELOPMENT_MODE_STATUS, {
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
  collectionPrefix: optional(string()),
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
var DataTypeUtil = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js");

var EventDispatcher = __webpack_require__(/*! ../utils/EventDispatcherUtil */ "./lib/utils/EventDispatcherUtil.js");

var logging = __webpack_require__(/*! ./logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();
var file = FileNameEnum.EventQueue;

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
      var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
          payload = _ref.payload,
          responseCallback = _ref.responseCallback;

      if (config && config.isDevelopmentMode) {
        logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CONFIG_DEVELOPMENT_MODE_STATUS, {
          file: file
        }));
        return;
      }

      this.enqueue(properties, vwoInstance, {
        payload: payload,
        responseCallback: responseCallback
      });
    }
  }, {
    key: "enqueue",
    value: function enqueue(properties, vwoInstance, _ref2) {
      var payload = _ref2.payload,
          responseCallback = _ref2.responseCallback;
      this.queue.push({
        eventName: properties.eventName,
        properties: properties,
        callback: function callback() {
          if (payload) {
            EventDispatcher.dispatchPostCall(properties, payload, {
              responseCallback: responseCallback
            });
          } else {
            EventDispatcher.dispatchGetCall(properties, {
              responseCallback: responseCallback
            });
          }
        }
      });
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.EVENT_QUEUE, {
        file: file,
        queueType: 'normal',
        event: 'VWO_MASKED_PAYLOAD'
      }));
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

            _this._configObj.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.POLLING_SETTINGS_FILE_UPDATED, {
              file: file,
              accountId: _this._clonedSettingsFile.accountId
            }));
          } else {
            _this._configObj.logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.POLLING_SETTINGS_FILE_NOT_UPDATED, {
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

      this._configObj.logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.POLLING_SETTINGS_FILE_REGISTERED, {
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
        file: file,
        accountId: this._clonedSettingsFile.accountId
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

/***/ "./lib/services/UrlService.js":
/*!************************************!*\
  !*** ./lib/services/UrlService.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var UrlEnum = __webpack_require__(/*! ../enums/UrlEnum */ "./lib/enums/UrlEnum.js");

var _require = __webpack_require__(/*! ../utils/DataTypeUtil */ "./lib/utils/DataTypeUtil.js"),
    isString = _require.isString;

var UrlService = {
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        collectionPrefix = _ref.collectionPrefix;

    if (collectionPrefix && isString(collectionPrefix)) {
      UrlService.collectionPrefix = collectionPrefix;
    }

    return UrlService;
  },
  getBaseUrl: function getBaseUrl() {
    var baseUrl = UrlEnum.BASE_URL;

    if (UrlService.collectionPrefix) {
      return "".concat(baseUrl, "/").concat(UrlService.collectionPrefix);
    }

    return baseUrl;
  }
};
module.exports = UrlService;

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
// TODO: change path
var LogMessageEnum = {
  DEBUG_MESSAGES: __webpack_require__(/*! vwo-sdk-log-messages/src/debug-messages.json */ "./node_modules/vwo-sdk-log-messages/src/debug-messages.json"),
  INFO_MESSAGES: __webpack_require__(/*! vwo-sdk-log-messages/src/info-messages.json */ "./node_modules/vwo-sdk-log-messages/src/info-messages.json"),
  WARNING_MESSAGES: __webpack_require__(/*! vwo-sdk-log-messages/src/warning-messages.json */ "./node_modules/vwo-sdk-log-messages/src/warning-messages.json"),
  ERROR_MESSAGES: __webpack_require__(/*! vwo-sdk-log-messages/src/error-messages.json */ "./node_modules/vwo-sdk-log-messages/src/error-messages.json")
};

var _require = __webpack_require__(/*! ../../enums/LogLevelEnum */ "./lib/enums/LogLevelEnum.js"),
    LogLevelEnum = _require.LogLevelEnum,
    LogNumberLevel = _require.LogNumberLevel;

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
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CAMPAIGN_NOT_FOUND_FOR_GOAL, {
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
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.VARIATION_RANGE_ALLOCATION, {
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
    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_UUID, {
      file: FileNameEnum.UuidUtil,
      userId: userId,
      accountId: settingsFile.accountId,
      uuid: vwoUserId
    }));
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
        logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.MEG_CALLED_CAMPAIGN_NOT_WINNER, {
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
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.MEG_ELIGIBLE_CAMPAIGNS, {
        userId: userId,
        groupName: groupName,
        file: file,
        eligibleCampaignKeys: eligibleCampaignKeys.slice(0, -1),
        inEligibleText: inEligibleCampaignKeys === '' ? 'no campaigns' : "campaigns: ".concat(inEligibleCampaignKeys.slice(0, -1))
      }));
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.MEG_ELIGIBLE_CAMPAIGNS, {
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
      return {
        storedVariation: CampaignUtil.getCampaignVariation(settingsFile, campaignKey, variationName),
        goalIdentifier: goalIdentifier
      };
    } // Log if stored variation is not found even after implementing UserStorageService


    logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_STORAGE_SERVICE_NO_STORED_DATA, {
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
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_STORAGE_SERVICE_NOT_CONFIGURED, {
        file: file
      }), disableLogs);
      return userStorageMap;
    }

    try {
      var data = config.userStorageService.get(userId, campaignKey) || {}; // if data found

      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GETTING_DATA_USER_STORAGE_SERVICE, {
        file: file,
        userId: userId,
        campaignKey: campaignKey
      }), disableLogs);
      return Object.assign({}, data, userStorageData);
    } catch (err) {
      // if no data found
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.USER_STORAGE_SERVICE_GET_FAILED, {
        file: file,
        userId: userId,
        error: err
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
      logger.log(LogLevelEnum.DEBUG, LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_STORAGE_SERVICE_NOT_CONFIGURED, {
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
        userId: userId,
        campaignKey: campaign.key
      }));
      isSaved = true;
    } catch (err) {
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.USER_STORAGE_SERVICE_SET_FAILED, {
        file: file,
        userId: userId,
        error: err
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
    logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_VARIATION_ALLOCATION_STATUS, {
      file: file,
      campaignKey: campaignKey,
      userId: userId,
      status: variationName ? "got variation:".concat(variationName) : 'did not get any variation'
    })); // Check if variation-name has been assigned to the userId. If not, return no variation

    if (variationName) {
      // If userStorageService is provided, look into it for the saved variation for the campaign and userId
      DecisionUtil._saveUserData(config, campaign, variationName, userId, metaData, newGoalIdentifier);
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
      logger.log(LogLevelEnum.WARN, LogMessageUtil.build(LogMessageEnum.WARNING_MESSAGES.CAMPAIGN_NOT_ACTIVATED, {
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

    logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.MEG_GOT_WINNER_CAMPAIGN, {
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
      logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.MEG_CALLED_CAMPAIGN_NOT_WINNER, {
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
  dispatchGetCall: function dispatchGetCall(properties, _ref) {
    var _this = this;

    var responseCallback = _ref.responseCallback;
    var parsedUrl;
    var queryParams = '?';
    queryParams += FunctionUtil.convertObjectKeysToString(properties, excludedProperties);

    try {
      // Require files only if required in respective Engine i.e. Node / Browser
      if (true) {
        parsedUrl = new URL(properties.url);

        __webpack_require__(/*! ./HttpImageUtil */ "./lib/utils/HttpImageUtil.js").sendCall(parsedUrl, queryParams, {
          successCallback: responseCallback
        });
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
        endPoint: response.endPoint,
        err: error
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
  dispatchPostCall: function dispatchPostCall(properties, payload, _ref2) {
    var _this2 = this;

    var responseCallback = _ref2.responseCallback;
    var parsedUrl;
    var queryParams = '?';
    queryParams += FunctionUtil.convertObjectKeysToString(properties, excludedProperties);

    try {
      // Require files only if required in respective Engine i.e. Node / Browser
      if (true) {
        __webpack_require__(/*! ./XhrUtil */ "./lib/utils/XhrUtil.js").send({
          method: 'POST',
          url: "".concat(properties.url).concat(queryParams),
          payload: payload
        }).then(function () {
          _this2.handlePostResponse(properties, payload);

          if (responseCallback) {
            responseCallback(null, {
              status: 'success'
            });
          }
        })["catch"](function (error) {
          _this2.handlePostResponse(properties, payload, error);

          responseCallback(error, {
            status: 'failure'
          });
        });
      } else { var url; }
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
        endPoint: endPoint,
        err: error
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
        accountId: properties.a,
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
      logger.log(LogLevelEnum.ERROR, LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SEGMENTATION_REGEX_CREATION_FAILED, {
        file: file,
        regex: regex
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
  },
  objectValues: function objectValues(obj) {
    var values = [];

    for (var prop in obj) {
      values.push(obj[prop]);
    }

    return values;
  }
};
module.exports = FunctionUtil;

/***/ }),

/***/ "./lib/utils/HttpImageUtil.js":
/*!************************************!*\
  !*** ./lib/utils/HttpImageUtil.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var logging = __webpack_require__(/*! ../services/logging */ "./lib/services/logging/index.js");

var FileNameEnum = __webpack_require__(/*! ../enums/FileNameEnum */ "./lib/enums/FileNameEnum.js");

var LogLevelEnum = logging.LogLevelEnum,
    LogMessageEnum = logging.LogMessageEnum,
    LogMessageUtil = logging.LogMessageUtil;
var logger = logging.getLogger();
var file = FileNameEnum.HttpImageUtil;

var noop = function noop() {};

var printLog = function printLog(url, queryParams) {
  var properties = new URLSearchParams(queryParams);
  var baseParams = {
    file: file,
    endPoint: "https://".concat(url.host).concat(url.pathname),
    accountId: properties && properties.get('account_id')
  };
  var params = {};

  if (baseParams.endPoint.includes('push')) {
    var customVariables = JSON.parse(properties.get('tags')).u;
    params = Object.assign({}, baseParams, {
      customVariables: customVariables
    });
    params.mainKeys = "customDimension:".concat(JSON.stringify(params.customVariables));
  } else {
    params = Object.assign({}, baseParams, {
      campaignId: properties && properties.get('experiment_id'),
      variationId: properties && properties.get('combination')
    });
    params.mainKeys = "campaignId:".concat(params.campaignId, " and variationId:").concat(params.variationId);
  }

  logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_SUCCESS, params));
};

var HttpImageUtil = {
  sendCall: function sendCall(url, queryParams) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var endPoint = "https://".concat(url.host).concat(url.pathname).concat(queryParams);
    var successCallback = options.successCallback,
        errorCallback = options.errorCallback;
    errorCallback = errorCallback || successCallback;
    var isCallbackCalled = false;
    var img = new Image();
    this.handleGetCall(url, queryParams, img, successCallback, errorCallback, endPoint, isCallbackCalled);
  },
  handleGetCall: function handleGetCall(url, queryParams, img, successCallback, errorCallback, endPoint, isCallbackCalled) {
    successCallback = successCallback || noop;
    errorCallback = errorCallback || noop;

    img.onload = function () {
      if (isCallbackCalled) {
        return;
      }

      isCallbackCalled = true;
      successCallback(null, {
        status: 'success'
      });
      printLog(url, queryParams);
    };

    img.onerror = function () {
      if (isCallbackCalled) {
        return;
      }

      isCallbackCalled = true;
      errorCallback(null, {
        status: 'success'
      });
      printLog(url, queryParams);
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

var UrlService = __webpack_require__(/*! ../services/UrlService */ "./lib/services/UrlService.js");
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
    properties.url = Constants.HTTPS_PROTOCOL + UrlService.getBaseUrl() + UrlEnum.PUSH;
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
    properties.url = Constants.HTTPS_PROTOCOL + UrlService.getBaseUrl() + UrlEnum.TRACK_USER;
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
    properties.url = Constants.HTTPS_PROTOCOL + UrlService.getBaseUrl() + UrlEnum.TRACK_GOAL;
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
    properties.url = Constants.HTTPS_PROTOCOL + UrlService.getBaseUrl() + UrlEnum.EVENTS;
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
      accountId: configObj.accountId,
      userId: userId,
      campaignId: campaignId
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
        accountId: configObj.accountId,
        u: userId,
        campaignId: key
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
      accountId: configObj.accountId,
      userId: userId,
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
var uuidv5 = __webpack_require__(/*! uuid/v5 */ "./node_modules/uuid/v5.js");

var Constants = __webpack_require__(/*! ../constants */ "./lib/constants/index.js");

var VWO_NAMESPACE = uuidv5(Constants.SEED_URL, uuidv5.URL);
var UuidUtil = {
  generateFor: function generateFor(userId, accountId) {
    userId = "".concat(userId); // type-cast

    var hash = "".concat(accountId);
    var userIdNamespace = UuidUtil.generate(hash, VWO_NAMESPACE);
    var uuidForUserIdAccountId = UuidUtil.generate(userId, userIdNamespace);
    var desiredUuid = uuidForUserIdAccountId.replace(/-/gi, '').toUpperCase();
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
        payload = _ref.payload,
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

        _this.xhrHandler(xhr, method, url, payload, userStorageService, resolve, reject);
      }
    });
  },
  xhrHandler: function xhrHandler(xhr, method, url, payload, userStorageService, resolve, reject) {
    var _this2 = this;

    if (method === 'GET') {
      xhr.onload = function () {
        _this2.xhrOnLoad(xhr, userStorageService, resolve);
      };

      xhr.onerror = function () {
        _this2.xhrOnError(xhr, reject);
      };

      xhr.open(method, url);
      xhr.send();
    } else if (method === 'POST') {
      xhr.onload = function () {
        resolve();
      };

      xhr.onerror = function () {
        reject('Something went wrong');
      };

      xhr.open(method, url, true);
      xhr.send(JSON.stringify(payload));
    }
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

/***/ "./node_modules/vwo-sdk-log-messages/src/debug-messages.json":
/*!*******************************************************************!*\
  !*** ./node_modules/vwo-sdk-log-messages/src/debug-messages.json ***!
  \*******************************************************************/
/*! exports provided: CONFIG_BATCH_EVENT_LIMIT_EXCEEDED, CONFIG_LOG_LEVEL_SET, CONFIG_CUSTOM_LOGGER_USED, CONFIG_DEVELOPMENT_MODE_STATUS, POLLING_SETTINGS_FILE_REGISTERED, SETTINGS_FILE_PROCESSED, IMPRESSION_FOR_TRACK_USER, IMPRESSION_FOR_TRACK_GOAL, IMPRESSION_FOR_PUSH, IMPRESSION_FOR_EVENT_ARCH_TRACK_USER, IMPRESSION_FOR_EVENT_ARCH_TRACK_GOAL, IMPRESSION_FOR_EVENT_ARCH_PUSH, EVENT_BATCH_BEFORE_FLUSHING, EVENT_BATCH_FLUSH, USER_STORAGE_SERVICE_NOT_CONFIGURED, USER_STORAGE_SERVICE_NO_STORED_DATA, VARIATION_RANGE_ALLOCATION, MEG_ELIGIBLE_CAMPAIGNS, SEGMENTATION_SKIPPED, SEGMENTATION_STATUS, WHITELISTING_SKIPPED, USER_UUID, USER_HASH_BUCKET_VALUE, USER_CAMPAIGN_BUCKET_VALUES, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"CONFIG_BATCH_EVENT_LIMIT_EXCEEDED\":\"({file}): Impression event - {endPoint} failed due to exceeding payload size. Parameter eventsPerRequest in batchEvents config in launch API has value:{eventsPerRequest} for account ID:{accountId}. Please read the official documentation for knowing the size limits\",\"CONFIG_LOG_LEVEL_SET\":\"({file}): Log level set to {level}\",\"CONFIG_CUSTOM_LOGGER_USED\":\"({file}): Custom logger used\",\"CONFIG_DEVELOPMENT_MODE_STATUS\":\"({file}): DEVELOPMENT mode is ON. No tracking call will be made to VWO Server\",\"POLLING_SETTINGS_FILE_REGISTERED\":\"({file}): Polling of settings-file is registered with a periodic interval of {pollingInterval} ms\",\"SETTINGS_FILE_PROCESSED\":\"({file}): settings-file matches the schema, validated and properly processed for the Account ID:{accountId}\",\"IMPRESSION_FOR_TRACK_USER\":\"({file}): Impression built for tracking user - {properties}\",\"IMPRESSION_FOR_TRACK_GOAL\":\"({file}): Impression built for tracking goal - {properties}\",\"IMPRESSION_FOR_PUSH\":\"({file}): Impression built for pushing custom dimension - {properties}\",\"IMPRESSION_FOR_EVENT_ARCH_TRACK_USER\":\"({file}): Impression built for vwo_variationShown event for Account ID:{accountId}, User ID:{userId}, and Campaign ID:{campaignId}\",\"IMPRESSION_FOR_EVENT_ARCH_TRACK_GOAL\":\"({file}): Impression built for {goalName} event for Account ID:{accountId}, User ID:{userId}, and Campaign ID:{campaignId}\",\"IMPRESSION_FOR_EVENT_ARCH_PUSH\":\"({file}): Impression built for visitor-property:{property} for Account ID:{accountId} and User ID:{userId}\",\"EVENT_BATCH_BEFORE_FLUSHING\":\"({file}): flushing event queue {manually} having {length} events for Account ID:{accountId}. {timer}\",\"EVENT_BATCH_FLUSH\":\"{{file}}: Manually flushing batch events for Account ID:{accountId} having {queueLength} events\",\"USER_STORAGE_SERVICE_NOT_CONFIGURED\":\"({file}): User Storage Service is not configured to get/set the data\",\"USER_STORAGE_SERVICE_NO_STORED_DATA\":\"({file}): No stored variation for User ID:{userId} for Campaign:{campaignKey} found in User Storage Service\",\"VARIATION_RANGE_ALLOCATION\":\"({file}): Variation:{variationName} of Campaign:{campaignKey} having weight:{variationWeight} got bucketing range: ( {start} - {end} )\",\"MEG_ELIGIBLE_CAMPAIGNS\":\"({file}): Campaigns: {eligibleCampaignKeys} are eligible, {inEligibleText} are ineligible from the Group:{groupName} for the User ID:{userId}\",\"SEGMENTATION_SKIPPED\":\"({file}): Segmentation is not used for Campaign:{campaignKey}, hence skipping evaluating segmentation{variation} for User ID:{userId}\",\"SEGMENTATION_STATUS\":\"({file}): User ID:{userId} for Campaign:{campaignKey} with variables:{customVariables} {status} {segmentationType} {variation}\",\"WHITELISTING_SKIPPED\":\"({file}): Whitelisting is not used for Campaign:{campaignKey}, hence skipping evaluating whitelisting for User ID:{userId}\",\"USER_UUID\":\"({file}): VWO UUID generated for Account Id:{accountId} and User ID:{userId} is {uuid}\",\"USER_HASH_BUCKET_VALUE\":\"({file}): User ID:{userId} having hash:{hashValue} got bucketValue:{bucketValue}\",\"USER_CAMPAIGN_BUCKET_VALUES\":\"({file}): User ID:{userId} for Campaign:{campaignKey} having percent-traffic:{percentTraffic} got hash-value:{hashValue} and bucket-value:{bucketValue}\"}");

/***/ }),

/***/ "./node_modules/vwo-sdk-log-messages/src/error-messages.json":
/*!*******************************************************************!*\
  !*** ./node_modules/vwo-sdk-log-messages/src/error-messages.json ***!
  \*******************************************************************/
/*! exports provided: CONFIG_PARAMETER_INVALID, CONFIG_POLLING_SDK_KEY_NOT_PROVIVED, CONFIG_CORRUPTED, SETTINGS_FILE_INVALID, SETTINGS_FILE_CORRUPTED, BATCH_QUEUE_EMPTY, API_HAS_CORRUPTED_SETTINGS_FILE, API_BAD_PARAMETERS, API_NOT_APPLICABLE, USER_ID_INVALID, CAMPAIGN_NOT_FOUND_FOR_GOAL, POLLING_FAILED, SEGMENTATION_REGEX_CREATION_FAILED, SEGMENTATION_ERROR, USER_STORAGE_SERVICE_GET_FAILED, USER_STORAGE_SERVICE_SET_FAILED, IMPRESSION_FAILED, TAG_KEY_LENGTH_EXCEEDED, TAG_VALUE_LENGTH_EXCEEDED, TRACK_API_GOAL_NOT_FOUND, TRACK_API_REVENUE_NOT_PASSED_FOR_REVENUE_GOAL, UNABLE_TO_CAST_VALUE, VARIABLE_NOT_FOUND, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"CONFIG_PARAMETER_INVALID\":\"({file}): {parameter} paased in {api} API is not correct. It should be of type:{type}\",\"CONFIG_POLLING_SDK_KEY_NOT_PROVIVED\":\"({file}): SDK Key is required along with pollingInterval to poll the settings-file\",\"CONFIG_CORRUPTED\":\"({file}): Config passed to {api} API is invalid. Please refer developer docs\",\"SETTINGS_FILE_INVALID\":\"({file}): Settings file passed while instantiating SDK instance is invalid\",\"SETTINGS_FILE_CORRUPTED\":\"({file}): Fetched settings-file doesn't match the desired schema. Please contact VWO Support for help\",\"BATCH_QUEUE_EMPTY\":\"{{file}}: No batch queue present for account:{accountId} when calling flushEvents API. Check batchEvents config in launch API\",\"API_HAS_CORRUPTED_SETTINGS_FILE\":\"({file}): {api} API has corrupted settings-file. Please check or reach out to VWO support\",\"API_BAD_PARAMETERS\":\"({file}): {api} API got bad parameters. Refer the developer docs\",\"API_NOT_APPLICABLE\":\"({file}): {api} API is not valid for Campaign:{campaignKey} having type:{campaignType} for User ID:{userId}\",\"USER_ID_INVALID\":\"({file}): Invalid User Id:{userId} passed to the API\",\"CAMPAIGN_NOT_FOUND_FOR_GOAL\":\"({file}): No such campaign found corresponding to goalIdentifier:{goalIdentifier}. Please verify from VWO app\",\"POLLING_FAILED\":\"({file}): Fetching of settings-file failed via polling for the accountId:{accountId}\",\"SEGMENTATION_REGEX_CREATION_FAILED\":\"({file}): Regular expression:{regex} used for targeting cound not be evaluated\",\"SEGMENTATION_ERROR\":\"({file}): Could not segment the User ID:{userId} for Campaign:{campaignKey}{variation} with customVariables:{customVariables}. Error message: {err}\",\"USER_STORAGE_SERVICE_GET_FAILED\":\"({file}): Getting data from User Storage Service failed for User ID:{userId}. Error: {error}\",\"USER_STORAGE_SERVICE_SET_FAILED\":\"({file}): Saving data into User Storage Service failed for User ID:{userId}. Error: {error}\",\"IMPRESSION_FAILED\":\"({file}): Impression event could not be sent to VWO - {endPoint}. Reason: {err}\",\"TAG_KEY_LENGTH_EXCEEDED\":\"({file}): Length of custom dimension key:{tagKey} for User Id:{userId} can not be greater than 255\",\"TAG_VALUE_LENGTH_EXCEEDED\":\"({file}): Length of custom dimension value:{tagValue} of tagKey:{tagKey} for User Id:{userId} can not be greater than 255\",\"TRACK_API_GOAL_NOT_FOUND\":\"({file}): Goal:{goalIdentifier} not found for Campaign:{campaignKey} and User Id:{userId}\",\"TRACK_API_REVENUE_NOT_PASSED_FOR_REVENUE_GOAL\":\"({file}): Revenue value should be passed for revenue goal:{goalIdentifier} for Campaign:{campaignKey} and User Id:{userId}\",\"UNABLE_TO_CAST_VALUE\":\"({file}): Unable to cast value:{variableValue} to type:{variableType}, returning null\",\"VARIABLE_NOT_FOUND\":\"({file}): Variable:{variableKey} for User ID:{userId} is not found in settings-file, returning null\"}");

/***/ }),

/***/ "./node_modules/vwo-sdk-log-messages/src/info-messages.json":
/*!******************************************************************!*\
  !*** ./node_modules/vwo-sdk-log-messages/src/info-messages.json ***!
  \******************************************************************/
/*! exports provided: CONFIG_VALID, CONFIG_PARAMETER_USED, CONFIG_RETURN_PROMISE, SDK_INITIALIZED, POLLING_SUCCESS, POLLING_SETTINGS_FILE_UPDATED, POLLING_SETTINGS_FILE_NOT_UPDATED, DECISION_NO_VARIATION_ALLOTED, EVENT_BATCH_DEFAULTS, EVENT_QUEUE, EVENT_BATCH_After_FLUSHING, CAMPAIGN_NOT_ACTIVATED, CAMPAIGN_USER_ALREADY_TRACKED, CAMPAIGN_GOAL_ALREADY_TRACKED, GOT_STORED_VARIATION, GETTING_DATA_USER_STORAGE_SERVICE, SETTING_DATA_USER_STORAGE_SERVICE, IMPRESSION_SUCCESS, IMPRESSION_SUCCESS_FOR_EVENT_ARCH, IMPRESSION_BATCH_SUCCESS, IMPRESSION_BATCH_FAILED, MEG_ELIGIBLE_CAMPAIGNS, OTHER_CAMPAIGN_SATISFIES_WHITELISTING_STORAGE, SEGMENTATION_STATUS, MEG_CALLED_CAMPAIGN_NOT_WINNER, MEG_GOT_WINNER_CAMPAIGN, FEATURE_STATUS, FEATURE_VARIABLE_VALUE, FEATURE_VARIABLE_DEFAULT_VALUE, USER_NOT_PART_OF_CAMPAIGN, USER_VARIATION_STATUS, USER_CAMPAIGN_ELIGIBILITY, USER_VARIATION_ALLOCATION_STATUS, OPT_OUT_API_CALLED, API_NOT_ENABLED, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"CONFIG_VALID\":\"({file}): SDK configuration and account settings-file are valid\",\"CONFIG_PARAMETER_USED\":\"({file}): {parameter} paased in launch API having type:{type}\",\"CONFIG_RETURN_PROMISE\":\"({file}): {method} API returns a promise as returnPromiseFor is set to true for this API\",\"SDK_INITIALIZED\":\"({file}): SDK is properly initialzed with the passed configuration\",\"POLLING_SUCCESS\":\"({file}): settings-file fetched successfully via polling for the accountId:{accountId}\",\"POLLING_SETTINGS_FILE_UPDATED\":\"({file}): SDK instance is updated with the latest settings-file for the accountId:{accountId}\",\"POLLING_SETTINGS_FILE_NOT_UPDATED\":\"{{file}}: settings-file fetched via polling is same as earlier fetched settings\",\"DECISION_NO_VARIATION_ALLOTED\":\"({file}): Variation was not assigned to the User ID:{userId} for Campaign:{campaignKey}\",\"EVENT_BATCH_DEFAULTS\":\"({file}): {parameter} not passed in SDK configuration, setting it default to {defaultValue}\",\"EVENT_QUEUE\":\"({file}): Event with payload:{event} pushed to the {queueType} queue\",\"EVENT_BATCH_After_FLUSHING\":\"({file}): Event queue having {length} events has been flushed {manually}\",\"CAMPAIGN_NOT_ACTIVATED\":\"({file}): Activate the campaign:{campaignKey} first for User ID:{userId} to {reason}\",\"CAMPAIGN_USER_ALREADY_TRACKED\":\"({file}): User ID:{userId} for Campaign:{campaignKey} has already been tracked earlier for \\\"{api}\\\" API. No tracking call is made to VWO server\",\"CAMPAIGN_GOAL_ALREADY_TRACKED\":\"({file}): Goal:{goalIdentifier} of Campaign:{campaignKey} for User ID:{userId} has already been tracked earlier. No tracking call is made to VWO server\",\"GOT_STORED_VARIATION\":\"({file}): Got stored variation from User Storage Service for User ID:{userId} for Campaign:{campaignKey} as Variation:{variationName}\",\"GETTING_DATA_USER_STORAGE_SERVICE\":\"({file}): Read data from User Storage Service for User ID:{userId} and Campaign:{campaignKey}\",\"SETTING_DATA_USER_STORAGE_SERVICE\":\"({file}): Set data into User Storage Service for User ID:{userId} and Campaign:{campaignKey}\",\"IMPRESSION_SUCCESS\":\"({file}): Impression event - {endPoint} was successfully received by VWO having main keys: Account ID:{accountId}, {mainKeys}\",\"IMPRESSION_SUCCESS_FOR_EVENT_ARCH\":\"({file}): Impression for {event} - {endPoint} was successfully received by VWO for Account ID:{accountId}\",\"IMPRESSION_BATCH_SUCCESS\":\"({file}): Impression event - {endPoint} was successfully received by VWO having Account ID:{accountId}\",\"IMPRESSION_BATCH_FAILED\":\"({file}): Batch events couldn\\\"t be received by VWO. Calling Flush Callback with error and data\",\"MEG_ELIGIBLE_CAMPAIGNS\":\"({file}): Got {noOfEligibleCampaigns} eligible winners out of {noOfGroupCampaigns} campaigns from the Group:{groupName} and for User ID:{userId}\",\"OTHER_CAMPAIGN_SATISFIES_WHITELISTING_STORAGE\":\"({file}): Campaign:{campaignKey} of Group:{groupName} satisfies {type} for User ID:{userId}\",\"SEGMENTATION_STATUS\":\"({file}): User ID:{userId} for Campaign:{campaignKey} with variables:{customVariables} {status} {segmentationType} {variation}\",\"MEG_CALLED_CAMPAIGN_NOT_WINNER\":\"({file}): Campaign:{campaignKey} does not qualify from the mutually exclusive group:{groupName} for User ID:{userId}\",\"MEG_GOT_WINNER_CAMPAIGN\":\"({file}): Campaign:{campaignKey} is selected from the mutually exclusive group:{groupName} for the User ID:{userId}\",\"FEATURE_STATUS\":\"({file}): Campaign:{campaignKey} is {status} for user ID:{userId}\",\"FEATURE_VARIABLE_VALUE\":\"({file}): For User ID:{userId}, value for variable:{variableKey} of feature:{campaignKey} is:{variableValue}\",\"FEATURE_VARIABLE_DEFAULT_VALUE\":\"({file}): Feature is not enabled for variation:{variationName}. Returning default value for the variable:{variableKey}\",\"USER_NOT_PART_OF_CAMPAIGN\":\"({file}): User ID:{userId} did not qualify for Campaign:{campaignKey}\",\"USER_VARIATION_STATUS\":\"({file}): User ID:{userId} for Campaign:{campaignKey} {status}\",\"USER_CAMPAIGN_ELIGIBILITY\":\"({file}): User ID:{userId} for Campaign:{campaignKey} is {status} to become part of campaign\",\"USER_VARIATION_ALLOCATION_STATUS\":\"({file}): User ID:{userId} for Campaign:{campaignKey} {status}\",\"OPT_OUT_API_CALLED\":\"({file}): You have opted out for not tracking i.e. all API calls will stop functioning and will simply early return\",\"API_NOT_ENABLED\":\"({file}): {api} API is disabled as you opted out for tracking. Reinitialize the SDK to enable the normal functioning of all APIs.\"}");

/***/ }),

/***/ "./node_modules/vwo-sdk-log-messages/src/warning-messages.json":
/*!*********************************************************************!*\
  !*** ./node_modules/vwo-sdk-log-messages/src/warning-messages.json ***!
  \*********************************************************************/
/*! exports provided: CAMPAIGN_NOT_RUNNING, CAMPAIGN_NOT_ACTIVATED, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"CAMPAIGN_NOT_RUNNING\":\"({file}): {api} API called with Campaign:{campaignKey} but the campaign is not RUNNING. Please verify from VWO App\",\"CAMPAIGN_NOT_ACTIVATED\":\"({file}): Campaign:{campaignKey} for User ID:{userId} is not yet activated for API:{api}. Use activate API to activate A/B test or isFeatureEnabled API to activate Feature Test\"}");

/***/ })

/******/ });
});
//# sourceMappingURL=vwo-javascript-sdk.js.map