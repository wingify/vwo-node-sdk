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
  send: function({ method, url, payload, userStorageService, customHeaders = {}, logger, maxRetries = 5 } = {}) {
    if (!url || !method) return;

    return new Promise((resolve, reject) => {
      const { isStoredData, parsedSettings } = XhrUtil._getStoredSettings(userStorageService);

      if (isStoredData) {
        resolve(parsedSettings);
      } else {
        if (method === 'GET') {
          // Implement retry mechanism for GET requests
          this.sendGetRequestWithRetry(
            0,
            maxRetries,
            logger,
            customHeaders,
            method,
            url,
            userStorageService,
            resolve,
            reject
          );
        } else if (method === 'POST') {
          // Use the existing retry logic for POST requests (no changes)
          this.sendRequest(0, maxRetries, logger, customHeaders, payload, method, url, resolve, reject);
        }
      }
    });
  },

  /**
   * Sends a GET request with retry mechanism using exponential backoff
   * @param {*} attempt - The current attempt number
   * @param {*} maxRetries - The maximum number of retries
   * @param {*} logger - The logger instance
   * @param {*} customHeaders - Additional headers to include in the request
   * @param {*} method - The HTTP method (GET, POST, etc.)
   * @param {*} url - The URL to request
   * @param {*} userStorageService - The user storage service instance
   * @param {*} resolve - The resolve function of the Promise
   * @param {*} reject - The reject function of the Promise
   */
  sendGetRequestWithRetry: function(
    attempt,
    maxRetries,
    logger,
    customHeaders,
    method,
    url,
    userStorageService,
    resolve,
    reject
  ) {
    let delay = 1000 * Math.pow(2, attempt); // Exponential backoff (1s, 2s, 4s, 8s, 16s)
    let xhr = new XMLHttpRequest();
    xhr.timeout = 5000; // Set timeout to 5 seconds

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          let parsedXhrResponse = JSON.parse(xhr.response);

          if (userStorageService && isObject(userStorageService) && isFunction(userStorageService.setSettings)) {
            userStorageService.setSettings(xhr.response);
          }

          resolve(parsedXhrResponse);
        } catch (err) {
          console.error(`VWO-SDK - [ERROR]: ${getCurrentTime()} JSON parse error: ${err}`);
          reject(err);
        }
      } else {
        console.error(
          `VWO-SDK - [ERROR]: ${getCurrentTime()} Request failed with status ${xhr.status}, response: ${
            xhr.responseText
          }`
        );
        this.retryGetRequest(
          attempt,
          maxRetries,
          delay,
          logger,
          method,
          url,
          customHeaders,
          userStorageService,
          resolve,
          reject,
          xhr
        );
      }
    };

    xhr.onerror = () => {
      console.error(`VWO-SDK - [ERROR]: ${getCurrentTime()} Network error while calling ${url}`);
      this.retryGetRequest(
        attempt,
        maxRetries,
        delay,
        logger,
        method,
        url,
        customHeaders,
        userStorageService,
        resolve,
        reject,
        xhr
      );
    };

    xhr.ontimeout = () => {
      console.error(`VWO-SDK - [ERROR]: ${getCurrentTime()} Timeout error while calling ${url}`);
      this.retryGetRequest(
        attempt,
        maxRetries,
        delay,
        logger,
        method,
        url,
        customHeaders,
        userStorageService,
        resolve,
        reject,
        xhr
      );
    };

    xhr.open(method, url);
    for (let header in customHeaders) {
      if (customHeaders.hasOwnProperty(header)) {
        xhr.setRequestHeader(header, customHeaders[header]);
      }
    }

    xhr.send();
  },

  /**
   * Retries the GET request with exponential backoff if the request fails
   * @param {*} attempt - The current attempt number
   * @param {*} maxRetries - The maximum number of retries
   * @param {*} delay - The delay in milliseconds before retrying
   * @param {*} logger - The logger instance
   * @param {*} method - The HTTP method (GET, POST, etc.)
   * @param {*} url - The URL to request
   * @param {*} customHeaders - Additional headers to include in the request
   * @param {*} userStorageService - The user storage service instance
   * @param {*} resolve - The resolve function of the Promise
   * @param {*} reject - The reject function of the Promise
   * @param {*} xhr - The XMLHttpRequest instance
   */
  retryGetRequest: function(
    attempt,
    maxRetries,
    delay,
    logger,
    method,
    url,
    customHeaders,
    userStorageService,
    resolve,
    reject,
    xhr
  ) {
    if (attempt < maxRetries) {
      console.warn(
        `VWO-SDK - [WARNING]: ${getCurrentTime()} Retrying GET request to ${url} in ${delay /
          1000} seconds (Attempt ${attempt + 1}/${maxRetries})`
      );

      setTimeout(() => {
        this.sendGetRequestWithRetry(
          attempt + 1,
          maxRetries,
          logger,
          customHeaders,
          method,
          url,
          userStorageService,
          resolve,
          reject
        );
      }, delay);
    } else {
      let errorMsg = `VWO-SDK - [ERROR]: ${getCurrentTime()} GET request to ${url} failed after ${maxRetries} retries. Status: ${
        xhr.status
      }, Response: ${xhr.responseText}`;
      console.error(errorMsg);
      reject(errorMsg);
    }
  },

  // send request function definition (to allow for retries)
  sendRequest: function(retries, maxRetries, logger, customHeaders, payload, method, url, resolve, reject) {
    let delay = 1000 * Math.pow(2, retries); // Exponential backoff (1s, 2s, 4s, 8s, 16s)
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
            `Error with Status Code : ${xhr.status}, and Response : ${xhr.responseText}. Retrying request in ${delay /
              1000} seconds (Attempt ${retries + 1}/${maxRetries})`
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
        logger.log(
          LogLevelEnum.ERROR,
          `Network error: ${xhr.statusText}, Status Code: ${xhr.status}. Retrying request in ${delay /
            1000} seconds (Attempt ${retries + 1}/${maxRetries})`
        );
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
        logger.log(
          LogLevelEnum.ERROR,
          `Timeout error: ${xhr.statusText}, Status Code: ${xhr.status}. Retrying request in ${delay /
            1000} seconds (Attempt ${retries + 1}/${maxRetries})`
        );
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
