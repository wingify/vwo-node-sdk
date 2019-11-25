/**
 * Copyright 2019 Wingify Software Pvt. Ltd.
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

const http = require('http');
const https = require('https');
const Constants = require('../constants');
const FunctionUtil = require('./FunctionUtil');

module.exports = {
  get: (accountId, sdkKey, config = {}) => {
    if (!accountId || !sdkKey) {
      console.error('AccountId and sdkKey are required for fetching account settings. Aborting!');
      return;
    }

    let protocol = 'https';
    let port;
    let hostname = Constants.ENDPOINTS.BASE_URL;
    let path = Constants.ENDPOINTS.ACCOUNT_SETTINGS;

    path +=
      `?a=${accountId}&` +
      `i=${sdkKey}&` +
      `r=${FunctionUtil.getRandomNumber()}&` +
      'platform=server&' +
      'api-version=2';

    if (config.hostname && config.path) {
      protocol = config.protocol;
      port = config.port;
      hostname = config.hostname || hostname;
      path = config.path || path;
    }

    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

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
          try {
            const parsedData = JSON.parse(rawData);

            if (statusCode !== 200) {
              let error = `Request failed for fetching account settings. Got Status Code: ${statusCode} and message: ${rawData}`;
              console.error(error);
              reject(error);

              return;
            }
            resolve(parsedData);
          } catch (e) {
            console.error(`Request failed for fetching account settings - ${e.message}`);
            reject(e);
          }
        });
      });
    });
  }
};
