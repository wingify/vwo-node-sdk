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
  send: function({ method, url, payload, userStorageService } = {}) {
    if (!url || !method) {
      return;
    }

    return new Promise((resolve, reject) => {
      const { isStoredData, parsedSettings } = XhrUtil._getStoredSettings(userStorageService);

      if (isStoredData) {
        resolve(parsedSettings);
      } else {
        let xhr = new XMLHttpRequest();
        this.xhrHandler(xhr, method, url, payload, userStorageService, resolve, reject);
      }
    });
  },

  xhrHandler: function(xhr, method, url, payload, userStorageService, resolve, reject) {
    if (method === 'GET') {
      xhr.onload = () => {
        this.xhrOnLoad(xhr, userStorageService, resolve);
      };
      xhr.onerror = () => {
        this.xhrOnError(xhr, reject);
      };

      xhr.open(method, url);
      xhr.send();
    } else if (method === 'POST') {
      xhr.onload = () => {
        resolve();
      };
      xhr.onerror = () => {
        reject('Something went wrong');
      };

      xhr.open(method, url, true);
      xhr.send(JSON.stringify(payload));
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
