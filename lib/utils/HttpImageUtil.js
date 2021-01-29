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

const noop = () => {};

const HttpImageUtil = {
  sendCall: function(url, queryParams, options = {}) {
    let endPoint = `https://${url.host}${url.pathname}${queryParams}`;

    let { successCallback, errorCallback } = options;
    let isCallbackCalled = false;
    let img = new Image();

    successCallback = successCallback || noop;
    errorCallback = errorCallback || noop;

    img.onload = function() {
      if (isCallbackCalled) {
        return;
      }
      isCallbackCalled = true;
      successCallback();
    };

    img.onerror = function() {
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
