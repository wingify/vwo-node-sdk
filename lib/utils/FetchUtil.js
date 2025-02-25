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

const FetchUtil = {
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

  send: function({ method, url, payload, userStorageService, customHeaders = {}, retries = 5, delay = 1000 } = {}) {
    if (!url || !method) {
      return;
    }

    const attemptRequest = attempt => {
      return new Promise((resolve, reject) => {
        const { isStoredData, parsedSettings } = FetchUtil._getStoredSettings(userStorageService);

        if (isStoredData) {
          resolve(parsedSettings);
        } else {
          const options = {
            method,
            headers: customHeaders
          };

          if (method === 'POST') {
            options.body = JSON.stringify(payload);
          }

          fetch(url, options)
            .then(res => {
              return res.text().then(text => {
                let jsonData = {};
                try {
                  jsonData = JSON.parse(text);
                } catch (err) {
                  console.info(
                    `VWO-SDK - [INFO]: ${getCurrentTime()} VWO didn't send JSON response which is expected: ${err}`
                  );
                }

                if (userStorageService && isObject(userStorageService) && isFunction(userStorageService.setSettings)) {
                  userStorageService.setSettings(jsonData);
                }

                if (res.status === 200) {
                  resolve(jsonData);
                } else {
                  let error = `VWO-SDK - [ERROR]: ${getCurrentTime()} Request failed for fetching account settings. Got Status Code: ${
                    res.status
                  }`;
                  console.error(error);

                  if (attempt < retries) {
                    setTimeout(() => {
                      console.warn(
                        `VWO-SDK - [WARNING]: ${getCurrentTime()} Retrying request in ${delay /
                          1000} seconds (Attempt ${attempt + 1}/${retries})`
                      );
                      attemptRequest(attempt + 1)
                        .then(resolve)
                        .catch(reject);
                    }, delay * Math.pow(2, attempt)); // Exponential backoff
                  } else {
                    reject(error);
                  }
                }
              });
            })
            .catch(err => {
              let error = `VWO-SDK - [ERROR]: ${getCurrentTime()} Request failed for fetching account settings. Error: ${err}`;
              console.error(error);

              if (attempt < retries) {
                setTimeout(() => {
                  console.warn(
                    `VWO-SDK - [WARNING]: ${getCurrentTime()} Retrying request in ${delay /
                      1000} seconds (Attempt ${attempt + 1}/${retries})`
                  );
                  attemptRequest(attempt + 1)
                    .then(resolve)
                    .catch(reject);
                }, delay * Math.pow(2, attempt)); // Exponential backoff
              } else {
                reject(error);
              }
            });
        }
      });
    };

    return attemptRequest(0);
  }
};

module.exports = FetchUtil;
