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
const url = require('url');
const ImpressionUtil = require('./ImpressionUtil');
const logging = require('../services/logging');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();
const FunctionUtil = require('./FunctionUtil');
const FileNameEnum = require('../enums/FileNameEnum');
const HttpHandlerUtil = require('./HttpHandlerUtil');
const UrlService = require('../services/UrlService');

const file = FileNameEnum.EventDispatcher;

let customEventUtil;
let customEventEmitter;

if (typeof process.env !== 'undefined') {
  customEventUtil = require('./CustomEventUtil');
  customEventEmitter = customEventUtil.getInstance();
}

let BatchEventsDispatcher = {
  dispatch: function(properties, callback = () => {}, queryParams, authToken) {
    const parsedUrl = url.parse(Constants.HTTPS_PROTOCOL + UrlService.getBaseUrl() + UrlEnum.BATCH_EVENTS);
    let endPoint = `https://${parsedUrl.host}${parsedUrl.path}`;
    const reportingProperties = Object.assign(
      queryParams,
      ImpressionUtil.getReportingProperties({ sdkKey: authToken })
    );
    queryParams = '?' + FunctionUtil.convertObjectKeysToString(reportingProperties);

    HttpHandlerUtil.sendPostCall(parsedUrl, properties, queryParams, authToken, (error, res, rawData) => {
      BatchEventsDispatcher.handleBatchResponse(endPoint, properties, queryParams, error, res, rawData, callback);
    });
  },

  handleBatchResponse: function(endPoint, properties, queryParams, error, res, rawData, callback) {
    const eventsPerRequest = properties.ev.length;
    const accountIdFromQueryParams = /.*a=(\d+)&.*$/gi.exec(queryParams);
    const accountId = accountIdFromQueryParams && accountIdFromQueryParams[1];

    if (error) {
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_BATCH_FAILED, {
          file
        })
      );
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
          file,
          endPoint,
          err: error
        })
      );
      callback(error, JSON.stringify(properties));
      customEventEmitter.emit('batchCallCompleteion', false);
    } else {
      if (res.statusCode === 200) {
        logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_BATCH_SUCCESS, {
            accountId,
            endPoint,
            file
          })
        );
        callback(null, JSON.stringify(properties));
        customEventEmitter.emit('batchCallCompleteion', true);
      } else if (res.statusCode === 413) {
        rawData = JSON.parse(rawData);
        logger.log(
          LogLevelEnum.DEBUG,
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CONFIG_BATCH_EVENT_LIMIT_EXCEEDED, {
            file,
            accountId,
            endPoint,
            eventsPerRequest
          })
        );
        logger.log(
          LogLevelEnum.ERROR,
          LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
            file,
            endPoint,
            err: rawData.error
          })
        );
        callback(rawData.error, JSON.stringify(properties));
        customEventEmitter.emit('batchCallCompleteion', false);
      } else {
        rawData = JSON.parse(rawData);
        logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_BATCH_FAILED, {
            file
          })
        );
        logger.log(
          LogLevelEnum.ERROR,
          LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
            file,
            endPoint,
            err: rawData.message
          })
        );
        callback(rawData.message, JSON.stringify(properties));
        customEventEmitter.emit('batchCallCompleteion', false);
      }
    }
  }
};

module.exports = BatchEventsDispatcher;
