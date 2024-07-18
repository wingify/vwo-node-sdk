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

const logging = require('../services/logging');
const { LogLevelEnum } = logging;
const { getCurrentTime } = require('./FunctionUtil');
const { isObject, isFunction } = require('./DataTypeUtil');

const XhrUtil = {
  _getStoredSettings: function(userStorageService) {
    let isStoredData = false;
    let parsedSettings;

    if (userStorageService && isObject(userStorageService) && isFunction(userStorageService.getSettings)) {
      try {
        const settings = userStorageService.getSettings();
        parsedSettings = JSON.parse(settings);

        if (parsedSettings && isObject(parsedSettings) && Object.keys(parsedSettings).length > 3) {
          const info = `VWO-SDK - [INFO]: ${getCurrentTime()} VWO settings found in Storage Service.`;

          console.info(info);

          isStoredData = true;
        } else if (parsedSettings) {
          const error = `VWO-SDK - [ERROR]: ${getCurrentTime()} VWO settings found in Storage Service is not valid.`;

          console.error(error);
        } else {
          const warning = `VWO-SDK - [WARNING]: ${getCurrentTime()} VWO settings is empty in Storage Service.`;

          console.warn(warning);
        }
      } catch (err) {
        const error = `VWO-SDK - [ERROR]: ${getCurrentTime()} VWO settings found in Storage Service is not valid. ${err}`;

        console.error(error);
        isStoredData = false;
      }
    }

    return {
      isStoredData,
      parsedSettings
    };
  },
  send: function({ method, url, payload, userStorageService, customHeaders, logger } = {}) {
    if (!url || !method) {
      return;
    }

    return new Promise((resolve, reject) => {
      const { isStoredData, parsedSettings } = XhrUtil._getStoredSettings(userStorageService);

      if (isStoredData) {
        resolve(parsedSettings);
      } else {
        let xhr = new XMLHttpRequest();
        this.xhrHandler(xhr, method, url, payload, userStorageService, customHeaders, logger, resolve, reject);
      }
    });
  },

  // send request function definition (to allow for retries)
  sendRequest: function(retries, maxRetries, logger, customHeaders, payload, method, url, resolve, reject) {
    let delay = 1000 * (retries + 1);
    let xhr = new XMLHttpRequest();

    // Configure timeout
    xhr.timeout = 5000; // Set timeout to 5 seconds (5000 ms)

    // onload event
    xhr.onload = () => {
      // retry if error and less than max retries
      if (xhr.status < 200 || xhr.status >= 300) {
        if (retries < maxRetries) {
          retries++;

          // log retried times
          logger.log(
            LogLevelEnum.ERROR,
            `Retrying with Status Code : ${xhr.status}, and Response : ${xhr.responseText}`
          );

          // call send request again, after delay
          setTimeout(() => {
            this.sendRequest(retries, maxRetries, logger, customHeaders, payload, method, url, resolve, reject);
          }, delay);
        } else {
          // log errors with status (clean up later)
          logger.log(
            LogLevelEnum.ERROR,
            `Request failed with Status Code : ${xhr.status} and Response : ${xhr.responseText}`
          );
          reject(`Got Error: ${xhr.statusText} and Status Code: ${xhr.status}`);
        }
      } else {
        // resolve the promise if all well
        resolve(xhr.responseText);
      }
    };

    // onerror event
    xhr.onerror = () => {
      if (retries < maxRetries) {
        retries++;
        logger.log(LogLevelEnum.ERROR, 'Retrying due to network error');
        setTimeout(() => {
          this.sendRequest(retries, maxRetries, logger, customHeaders, payload, method, url, resolve, reject);
        }, delay);
      } else {
        reject(`Network error: ${xhr.statusText}, Status Code: ${xhr.status}`);
      }
    };

    // ontimeout event
    xhr.ontimeout = () => {
      if (retries < maxRetries) {
        retries++;
        logger.log(LogLevelEnum.ERROR, 'Retrying due to timeout');
        setTimeout(() => {
          this.sendRequest(retries, maxRetries, logger, customHeaders, payload, method, url, resolve, reject);
        }, delay);
      } else {
        reject(`Timeout error: ${xhr.statusText}, Status Code: ${xhr.status}`);
      }
    };

    // open connection and add headers if any, and then send
    xhr.open(method, url, true);
    for (var newHeaderName in customHeaders) {
      if (customHeaders.hasOwnProperty(newHeaderName)) {
        xhr.setRequestHeader(newHeaderName, customHeaders[newHeaderName]);
      }
    }
    xhr.send(JSON.stringify(payload));
  },

  xhrHandler: function(xhr, method, url, payload, userStorageService, customHeaders = {}, logger, resolve, reject) {
    if (method === 'GET') {
      try {
        xhr.onload = () => {
          this.xhrOnLoad(xhr, userStorageService, resolve);
        };
        xhr.onerror = () => {
          this.xhrOnError(xhr, reject);
        };

        xhr.open(method, url);
        for (var headerName in customHeaders) {
          if (customHeaders.hasOwnProperty(headerName)) {
            xhr.setRequestHeader(headerName, customHeaders[headerName]);
          }
        }
        xhr.send();
      } catch (e) {
        console.log(e.message);
      }
    } else if (method === 'POST') {
      // retry params
      let retries = 0;
      let maxRetries = 5;

      // send request
      this.sendRequest(retries, maxRetries, logger, customHeaders, payload, method, url, resolve, reject);
    }
  },

  xhrOnLoad: function(xhr, userStorageService, resolve) {
    try {
      let parsedXhrResponse = JSON.parse(xhr.response);

      if (userStorageService && isObject(userStorageService) && isFunction(userStorageService.setSettings)) {
        userStorageService.setSettings(xhr.response);
      }

      resolve(parsedXhrResponse);
    } catch (err) {
      console.error(err);
    }
  },

  xhrOnError: function(xhr, reject) {
    let error = `VWO-SDK - [ERROR]: ${getCurrentTime()} Request failed for fetching account settings. Got Status Code: ${
      xhr.status
    }`;

    console.error(error);
    reject(error);
  }
};

module.exports = XhrUtil;
