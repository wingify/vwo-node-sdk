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

const url = require('url');
const https = require('https');
const DataTypeUtil = require('./DataTypeUtil');
const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const excludedProperties = ['url'];

let EventDispatcher = {
  dispatch: function(properties, callback) {
    let parsedUrl = url.parse(properties.url);

    try {
      let queryParams = '?';

      for (let prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          if (excludedProperties.indexOf(prop) === -1) {
            queryParams += prop + '=' + properties[prop] + '&';
          }
        }
      }

      // Only for debugging
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

      let endPoint = `https://${parsedUrl.host}${parsedUrl.path}`;

      https.get(
        {
          hostname: parsedUrl.host,
          path: parsedUrl.path + queryParams,
          agent: false // Create a new agent just for this one request
        },
        res => {
          let rawData = ''; // eslint-disable-line no-unused-vars

          res.setEncoding('utf8');
          res.on('data', function(chunk) {
            rawData += chunk;
          });
          res.on('end', function() {
            logger.log(
              LogLevelEnum.INFO,
              LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_SUCCESS, {
                file: FileNameEnum.EventDispatcher,
                endPoint,
                campaignId: properties && properties.experiment_id,
                userId: properties && properties.uId,
                accountId: properties && properties.account_id,
                variationId: properties && properties.combination
              })
            );

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
    } catch (e) {
      let endPoint = `https://${parsedUrl.host}${parsedUrl.path}`;
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
          file: FileNameEnum.EventDispatcher,
          endPoint
        })
      );
    }

    return false;
  }
};

module.exports = EventDispatcher;
