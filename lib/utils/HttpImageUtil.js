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
const file = FileNameEnum.HttpImageUtil;

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

const HttpImageUtil = {
  sendCall: function(url, queryParams, options = {}) {
    let endPoint = `https://${url.host}${url.pathname}${queryParams}`;

    let { successCallback, errorCallback } = options;

    errorCallback = errorCallback || successCallback;

    let isCallbackCalled = false;

    let img = new Image();

    this.handleGetCall(url, queryParams, img, successCallback, errorCallback, endPoint, isCallbackCalled);
  },

  handleGetCall: function(url, queryParams, img, successCallback, errorCallback, endPoint, isCallbackCalled) {
    successCallback = successCallback || noop;
    errorCallback = errorCallback || noop;

    img.onload = function() {
      if (isCallbackCalled) {
        return;
      }
      isCallbackCalled = true;
      successCallback(null, { status: 'success' });
      printLog(url, queryParams);
    };

    img.onerror = function() {
      if (isCallbackCalled) {
        return;
      }
      isCallbackCalled = true;
      errorCallback(null, { status: 'success' });
      printLog(url, queryParams);
    };

    img.src = endPoint;

    return img;
  }
};
module.exports = HttpImageUtil;
