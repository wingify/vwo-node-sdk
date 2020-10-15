/**
 * Copyright 2019-2020 Wingify Software Pvt. Ltd.
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
const FileNameEnum = require('../enums/FileNameEnum');
const logging = require('../services/logging');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const HttpHandlerUtil = {
  sendGetCall: function(url, queryParams, properties, callback) {
    let endPoint = `https://${url.host}${url.path}`;

    https.get(
      {
        hostname: url.host,
        path: url.path + queryParams,
        agent: false // Create a new agent just for this one request
      },
      res => {
        let rawData = ''; // eslint-disable-line no-unused-vars

        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          rawData += chunk;
        });
        res.on('end', function() {
          const baseParams = {
            file: FileNameEnum.EventDispatcher,
            endPoint,
            userId: properties && properties.uId,
            accountId: properties && properties.account_id
          };
          let params = {};
          if (endPoint.includes('push')) {
            params = Object.assign({}, baseParams, { customVariables: properties && properties.customVariables });
          } else {
            params = Object.assign({}, baseParams, {
              campaignId: properties && properties.experiment_id,
              variationId: properties && properties.combination
            });
          }

          logger.log(LogLevelEnum.INFO, LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_SUCCESS, params));

          if (callback && DataTypeUtil.isFunction(callback)) {
            callback(properties);
          }
        });
        res.on('error', function(err) {
          logger.log(
            LogLevelEnum.ERROR,
            LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
              file: FileNameEnum.EventDispatcher,
              endPoint
            })
          );
        });
      }
    );
  },
  sendPostCall: function(url, postData, callback, queryParams, authToken) {
    let endPoint = `https://${url.host}${url.path}`;
    const accountId = queryParams.a;
    queryParams = `?a=${queryParams.a}&sd=${queryParams.sd}&sv=${queryParams.sv}`;
    const eventsPerRequest = postData.ev.length;
    postData = JSON.stringify(postData);
    const options = {
      method: 'POST',
      hostname: url.host,
      path: url.path + queryParams,
      agent: false, // Create a new agent just for this one request
      headers: {
        'Content-Length': postData.length,
        Authorization: authToken
      }
    };
    const req = https.request(options, res => {
      let rawData = ''; // eslint-disable-line no-unused-vars
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        rawData += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          logger.log(
            LogLevelEnum.INFO,
            LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.BULK_IMPRESSION_SUCCESS, {
              a: accountId,
              endPoint,
              file: FileNameEnum.HttpHandlerUtil
            })
          );
          callback(null, postData);
        } else if (res.statusCode === 413) {
          const parsedData = JSON.parse(rawData);
          logger.log(
            LogLevelEnum.DEBUG,
            LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.BATCH_EVENT_LIMIT_EXCEEDED, {
              file: FileNameEnum.HttpHandlerUtil,
              accountId,
              endPoint,
              eventsPerRequest
            })
          );
          logger.log(
            LogLevelEnum.ERROR,
            LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
              file: FileNameEnum.HttpHandlerUtil,
              endPoint,
              err: parsedData.error
            })
          );
          callback(parsedData.error, postData);
        } else {
          const parsedData = JSON.parse(rawData);
          logger.log(
            LogLevelEnum.DEBUG,
            LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.BULK_NOT_PROCESSED, {
              file: FileNameEnum.HttpHandlerUtil
            })
          );
          logger.log(
            LogLevelEnum.ERROR,
            LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
              file: FileNameEnum.HttpHandlerUtil,
              endPoint,
              err: parsedData.message
            })
          );
          callback(parsedData.message, postData);
        }
      });
    });

    req.on('error', e => {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.BULK_NOT_PROCESSED, {
          file: FileNameEnum.HttpHandlerUtil
        })
      );
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
          file: FileNameEnum.HttpHandlerUtil,
          endPoint,
          err: e
        })
      );
      callback(e, postData);
    });

    req.write(postData);
    req.end();
  }
};

module.exports = HttpHandlerUtil;
