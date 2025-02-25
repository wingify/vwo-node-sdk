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
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();
const file = FileNameEnum.HttpXMLUtil;
const { getCurrentTime } = require('./FunctionUtil');

const noop = () => {};

const printLog = properties => {
  const baseParams = {
    file,
    endPoint: properties.url,
    accountId: properties && properties.account_id
  };
  let params = {};
  if (baseParams.endPoint.includes('push')) {
    let customVariables = JSON.parse(properties.tags).u;
    params = Object.assign({}, baseParams, { customVariables: customVariables });
    params.mainKeys = `customDimension:${JSON.stringify(params.customVariables)}`;
  } else {
    params = Object.assign({}, baseParams, {
      campaignId: properties && properties.experiment_id,
      variationId: properties && properties.combination
    });
    params.mainKeys = `campaignId:${params.campaignId} and variationId:${params.variationId}`;
  }
  logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_SUCCESS, params));
};

const HttpXMLUtil = {
  sendCall: function(properties, queryParams, options = {}, customHeaders = {}) {
    let endPoint = `${properties.url}${queryParams}`;

    let { successCallback, errorCallback } = options;

    errorCallback = errorCallback || successCallback;

    let isCallbackCalled = false;
    if (typeof XMLHttpRequest === 'undefined') {
      const maxRetries = 5; // Number of retry attempts
      const initialDelay = 1000; // Initial retry delay in ms (1 second)
      let attempt = 0;

      const makeRequest = () => {
        let delay = initialDelay * Math.pow(2, attempt); // Exponential backoff (1s, 2s, 4s, 8s, 16s)

        fetch(endPoint, { method: 'GET', headers: customHeaders })
          .then(() => {
            if (isCallbackCalled) {
              return;
            }
            isCallbackCalled = true;
            successCallback(null, { status: 'success' });
          })
          .catch(_err => {
            if (isCallbackCalled) {
              return;
            }

            console.error(
              `VWO-SDK - [ERROR]: ${getCurrentTime()} Request failed. Attempt ${attempt + 1}/${maxRetries}`
            );

            if (attempt < maxRetries) {
              console.warn(
                `VWO-SDK - [WARNING]: ${getCurrentTime()} Retrying request in ${delay /
                  1000} seconds (Attempt ${attempt + 1}/${maxRetries})`
              );

              setTimeout(() => {
                attempt++;
                makeRequest();
              }, delay);
            } else {
              isCallbackCalled = true;
              errorCallback(null, { status: 'success' });
              printLog(properties);
            }
          });
      };

      makeRequest(); // Initial request
      return;
    }
    this.handleGetCall(
      properties,
      queryParams,
      successCallback,
      errorCallback,
      endPoint,
      isCallbackCalled,
      customHeaders
    );
  },

  handleGetCall: function(
    properties,
    queryParams,
    successCallback,
    errorCallback,
    endPoint,
    isCallbackCalled,
    customHeaders = {}
  ) {
    successCallback = successCallback || noop;
    errorCallback = errorCallback || noop;

    const maxRetries = 5;
    const initialDelay = 1000;
    let attempt = 0;

    const makeXHRRequest = () => {
      const xhr = new XMLHttpRequest();
      const delay = initialDelay * Math.pow(2, attempt); // Exponential backoff

      xhr.open('GET', endPoint, true);

      // Set custom headers using setRequestHeader
      for (var headerName in customHeaders) {
        if (customHeaders.hasOwnProperty(headerName)) {
          xhr.setRequestHeader(headerName, customHeaders[headerName]);
        }
      }

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = xhr.responseText;
          successCallback(response);
          printLog(properties);
        } else if (attempt < maxRetries) {
          console.warn(
            `VWO-SDK - [WARNING]: ${getCurrentTime()} Request failed with status ${xhr.status} (${
              xhr.statusText
            }). Retrying request in ${delay / 1000} seconds (attempt ${attempt + 1} of ${maxRetries})`
          );
          setTimeout(() => {
            attempt++;
            makeXHRRequest();
          }, delay);
        } else {
          console.error(`VWO-SDK - [ERROR]: ${getCurrentTime()} Request failed after ${maxRetries} attempts`);
          errorCallback(xhr.statusText);
          printLog(properties);
        }
      };

      xhr.onerror = function() {
        if (attempt < maxRetries) {
          console.warn(
            `VWO-SDK - [WARNING]: ${getCurrentTime()} Request failed with status ${xhr.status} (${
              xhr.statusText
            }). Retrying in ${delay / 1000} seconds (attempt ${attempt + 1} of ${maxRetries})`
          );
          setTimeout(() => {
            attempt++;
            makeXHRRequest();
          }, delay);
        } else {
          console.error(`VWO-SDK - [ERROR]: ${getCurrentTime()} Request failed after ${maxRetries} attempts`);
          errorCallback(xhr.statusText);
          printLog(properties);
        }
      };

      xhr.send();
    };

    makeXHRRequest(); // Initial request
  }
};
module.exports = HttpXMLUtil;
