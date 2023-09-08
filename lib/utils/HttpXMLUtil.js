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

const noop = () => {};

const printLog = (url, queryParams) => {
  const properties = new URLSearchParams(queryParams);

  const baseParams = {
    file,
    endPoint: `https://${url.host}${url.pathname}`,
    accountId: properties && properties.get('account_id')
  };
  let params = {};
  if (baseParams.endPoint.includes('push')) {
    let customVariables = JSON.parse(properties.get('tags')).u;
    params = Object.assign({}, baseParams, { customVariables: customVariables });
    params.mainKeys = `customDimension:${JSON.stringify(params.customVariables)}`;
  } else {
    params = Object.assign({}, baseParams, {
      campaignId: properties && properties.get('experiment_id'),
      variationId: properties && properties.get('combination')
    });
    params.mainKeys = `campaignId:${params.campaignId} and variationId:${params.variationId}`;
  }
  logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_SUCCESS, params));
};

const HttpXMLUtil = {
  sendCall: function(url, queryParams, options = {}, customHeaders = {}) {
    let endPoint = `https://${url.host}${url.pathname}${queryParams}`;

    let { successCallback, errorCallback } = options;

    errorCallback = errorCallback || successCallback;

    let isCallbackCalled = false;
    if (typeof XMLHttpRequest === 'undefined') {
      // if (typeof Image === 'undefined') {
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
          isCallbackCalled = true;
          errorCallback(null, { status: 'success' });
          printLog(url, queryParams);
        });

      return;
    }
    this.handleGetCall(url, queryParams, successCallback, errorCallback, endPoint, isCallbackCalled, customHeaders);
  },

  handleGetCall: function(
    url,
    queryParams,
    successCallback,
    errorCallback,
    endPoint,
    isCallbackCalled,
    customHeaders = {}
  ) {
    successCallback = successCallback || noop;
    errorCallback = errorCallback || noop;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', endPoint, true);
    console.log('headers are ' + JSON.stringify(customHeaders));
    // Set custom headers using setRequestHeader
    for (var headerName in customHeaders) {
      if (customHeaders.hasOwnProperty(headerName)) {
        xhr.setRequestHeader(headerName, customHeaders[headerName]);
      }
    }
    console.log('Headers added to the request:', xhr.getAllResponseHeaders());

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = xhr.responseText;
        successCallback(response);
        printLog(url, queryParams);
      } else {
        errorCallback(xhr.statusText);
        printLog(url, queryParams);
      }
    };

    xhr.onerror = function() {
      errorCallback(xhr.statusText);
      printLog(url, queryParams);
    };

    xhr.send();
  }
};
module.exports = HttpXMLUtil;
