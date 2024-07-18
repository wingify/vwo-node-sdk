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

const https = require('https');

const DataTypeUtil = require('./DataTypeUtil');
const Constants = require('../constants');
const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const HttpHandlerUtil = {
  sendGetCall: function(url, queryParams, authToken, callback, customHeaders = {}) {
    let endPoint = `${url.protocol === 'http' ? 'http' : 'https'}://${url.host}${url.path}`;
    const options = {
      hostname: url.host,
      path: url.path + queryParams,
      agent: false // Create a new agent just for this one request
    };

    if (url.port) {
      options.port = url.port;
    }
    options.headers = customHeaders;
    if (authToken) {
      options.headers['Authorization'] = authToken;
    }

    https.get(options, res => {
      let rawData = ''; // eslint-disable-line no-unused-vars

      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        rawData += chunk;
      });
      res.on('end', function() {
        if (callback && DataTypeUtil.isFunction(callback)) {
          try {
            callback(null, { endPoint, rawData: JSON.parse(rawData) });
          } catch (err) {
            const serverResponse = err + ', Server Response -- ' + rawData;
            logger.log(
              LogLevelEnum.ERROR,
              LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
                file: FileNameEnum.EventDispatcher,
                endPoint,
                err: serverResponse
              })
            );
          }
        }
      });
      res.on('error', function(err) {
        callback(err, { endPoint });
      });
    });
  },

  sendPostCall: function(url, postData, queryParams, authToken, callback, customHeaders = {}) {
    let retry = 0;
    const maxRetries = 5;
    const delay = 1000;
    postData = JSON.stringify(postData);
    customHeaders['Content-Length'] = Buffer.byteLength(postData);
    const options = {
      method: 'POST',
      hostname: url.host,
      path: queryParams ? url.path + queryParams : url.path,
      agent: false, // Create a new agent just for this one request
      headers: customHeaders
    };

    if (authToken) {
      options.headers.Authorization = authToken;
    } else {
      // Set the user-agent here
      options.headers['User-Agent'] = Constants.SDK_NAME;
    }

    if (url.port) {
      options.port = url.port;
    }

    const sendRequest = retries => {
      const req = https.request(options, res => {
        let rawData = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          rawData += chunk;
        });
        res.on('end', function() {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            callback(null, res, rawData);
          } else {
            if (retries < maxRetries) {
              logger.log(
                LogLevelEnum.ERROR,
                `Retrying request... Attempt ${retries + 1} of ${maxRetries} due to status code: ${res.statusCode}`
              );
              setTimeout(() => sendRequest(retries + 1), delay * (retries + 1)); // Exponential backoff
            } else {
              logger.log(
                LogLevelEnum.ERROR,
                `Request failed after ${maxRetries} attempts with status code: ${res.statusCode}`
              );
              callback(
                new Error(`Request failed after ${maxRetries} attempts with status code: ${res.statusCode}`),
                res,
                rawData
              );
            }
          }
        });
      });

      req.on('error', e => {
        if (retries < maxRetries) {
          logger.log(
            LogLevelEnum.ERROR,
            `Retrying request due to error... Attempt ${retries + 1} of ${maxRetries}. Error: ${e.message}`
          );
          setTimeout(() => sendRequest(retries + 1), delay * (retries + 1)); // Exponential backoff
        } else {
          logger.log(LogLevelEnum.ERROR, `Request failed after ${maxRetries} attempts due to error: ${e.message}`);
          callback(e, null);
        }
      });

      req.write(postData);
      req.end();
    };
    sendRequest(retry);
  }
};

module.exports = HttpHandlerUtil;
