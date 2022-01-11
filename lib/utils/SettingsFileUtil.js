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

const Constants = require('../constants');
const UrlEnum = require('../enums/UrlEnum');
const { getRandomNumber, getCurrentTime } = require('./FunctionUtil');

let SettingsFileUtil = {
  get: (accountId, sdkKey, userStorageService, config = {}) => {
    if (!accountId || !sdkKey) {
      console.error('AccountId and sdkKey are required for fetching account settings. Aborting!');
      return;
    }

    let protocol = 'https';
    let port;
    let hostname = UrlEnum.BASE_URL;
    let path = UrlEnum.SETTINGS_URL;

    if (config.isViaWebhook) {
      path = UrlEnum.WEBHOOK_SETTINGS_URL;
    }

    path +=
      `?a=${accountId}&` +
      `i=${sdkKey}&` +
      `r=${getRandomNumber()}&` +
      `platform=${Constants.PLATFORM}&` +
      `${Constants.SDK_QUERY_PARAM}=${Constants.SDK_NAME}&` +
      `${Constants.SDK_VERSION_QUERY_PARAM}=${Constants.SDK_VERSION}`;

    if (config.hostname && config.path) {
      protocol = config.protocol;
      port = config.port;
      hostname = config.hostname || hostname;
      path = config.path || path;
    }

    if (typeof process.env === 'undefined') {
      return require('./XhrUtil').send({
        method: 'GET',
        url: `${protocol}://${hostname}${path}`,
        userStorageService
      });
    } else {
      const http = require('http');
      const https = require('https');

      return new Promise((resolve, reject) => {
        const options = {
          hostname,
          path,
          agent: false
        };

        if (port) {
          options.port = port;
        }

        (protocol === 'https' ? https : http).get(options, res => {
          SettingsFileUtil.handleHttpRequest(res, resolve, reject);
        });
      });
    }
  },

  handleHttpRequest: (res, resolve, reject) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    let rawData = '';

    if (!/^application\/json/.test(contentType)) {
      error = `Invalid content-type.\nExpected application/json but received ${contentType}`;
    }

    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      reject(error);

      return;
    }

    res.setEncoding('utf8');

    res.on('data', chunk => {
      rawData += chunk;
    });

    res.on('end', () => {
      SettingsFileUtil.handleHttpResponse(statusCode, rawData, resolve, reject);
    });
  },

  handleHttpResponse: (statusCode, rawData, resolve, reject) => {
    try {
      const parsedData = JSON.parse(rawData);

      if (statusCode !== 200) {
        let error = `VWO-SDK - [ERROR]: ${getCurrentTime()} Request failed for fetching account settings. Got Status Code: ${statusCode} and message: ${rawData}`;
        console.error(error);
        reject(error);

        return;
      }
      resolve(parsedData);
    } catch (err) {
      console.error(
        `VWO-SDK - [ERROR]: ${getCurrentTime()} Request failed for fetching account settings - ${err.message}`
      );
      reject(err);
    }
  }
};

module.exports = SettingsFileUtil;
