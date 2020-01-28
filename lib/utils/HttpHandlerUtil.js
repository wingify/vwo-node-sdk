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
  }
};

module.exports = HttpHandlerUtil;
