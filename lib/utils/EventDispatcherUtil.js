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

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const excludedProperties = ['url'];

let EventDispatcher = {
  dispatch: function(properties, callback) {
    let parsedUrl;

    let queryParams = '?';

    for (let prop in properties) {
      if (properties.hasOwnProperty(prop)) {
        if (excludedProperties.indexOf(prop) === -1) {
          queryParams += prop + '=' + properties[prop] + '&';
        }
      }
    }
    try {
      if (typeof process.env !== 'undefined') {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
      }

      // Require files only if required in respective Engine i.e. Node / Browser
      if (typeof process.env === 'undefined') {
        parsedUrl = new URL(properties.url);

        require('./HttpImageUtil').sendCall(parsedUrl, queryParams);
      } else {
        const url = require('url');

        parsedUrl = url.parse(properties.url);

        require('./HttpHandlerUtil').sendGetCall(parsedUrl, queryParams, properties, callback);
      }
    } catch (err) {
      let endPoint = properties.url;

      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
          file: FileNameEnum.EventDispatcher,
          endPoint,
          err
        })
      );
    }

    return false;
  }
};

module.exports = EventDispatcher;
