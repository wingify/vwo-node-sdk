/**
 * Copyright 2019-2021 Wingify Software Pvt. Ltd.
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
const FunctionUtil = require('./FunctionUtil');
const EventEnum = require('../enums/EventEnum');
const excludedProperties = ['url'];

const file = FileNameEnum.EventDispatcherUtil;

let EventDispatcher = {
  dispatchGetCall: function(properties) {
    let parsedUrl;
    let queryParams = '?';

    queryParams += FunctionUtil.convertObjectKeysToString(properties, excludedProperties);

    try {
      // Require files only if required in respective Engine i.e. Node / Browser
      if (typeof process.env === 'undefined') {
        parsedUrl = new URL(properties.url);

        require('./HttpImageUtil').sendCall(parsedUrl, queryParams);
      } else {
        const url = require('url');

        parsedUrl = url.parse(properties.url);

        require('./HttpHandlerUtil').sendGetCall(parsedUrl, queryParams, null, (error, response) => {
          if (error) {
            logger.log(
              LogLevelEnum.ERROR,
              LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
                file,
                endPoint: response.endPoint
              })
            );
          } else {
            const baseParams = {
              file,
              endPoint: response.endPoint,
              accountId: properties && properties.account_id
            };
            let params = {};
            if (baseParams.endPoint.includes('push')) {
              let customVariables = JSON.parse(properties.tags).u;
              params = Object.assign({}, baseParams, { customVariables: customVariables });
              params.mainKeys = `customDimension:${JSON.stringify(params.customVariables)}`;
            } else {
              params = Object.assign({}, baseParams, {
                campaignId: properties && properties.experiment_id,
                variationId: properties && properties.combination
              });
              params.mainKeys = `campaignId:${params.campaignId} and variationId:${params.variationId}`;
            }
            logger.log(
              LogLevelEnum.INFO,
              LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_SUCCESS, params)
            );
          }
        });
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
  },

  dispatchPostCall: function(properties, payload) {
    let parsedUrl;
    let queryParams = '?';

    queryParams += FunctionUtil.convertObjectKeysToString(properties, excludedProperties);

    try {
      // Require files only if required in respective Engine i.e. Node / Browser

      const url = require('url');

      parsedUrl = url.parse(properties.url);
      let endPoint = properties.url;

      require('./HttpHandlerUtil').sendPostCall(parsedUrl, payload, queryParams, null, error => {
        if (error) {
          logger.log(
            LogLevelEnum.ERROR,
            LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
              file,
              endPoint: endPoint
            })
          );
        } else {
          let event = `${properties.en} event`;
          if (properties.en === EventEnum.VWO_SYNC_VISITOR_PROP) {
            delete payload.d.visitor.props.vwo_fs_environment;
            event = `visitor property:${JSON.stringify(payload.d.visitor.props)}`;
          }

          logger.log(
            LogLevelEnum.INFO,
            LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.IMPRESSION_SUCCESS_FOR_EVENT_ARCH, {
              file,
              endPoint,
              a: properties.a,
              event: event
            })
          );
        }
      });
    } catch (err) {
      let endPoint = properties.url;

      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
          file: FileNameEnum.EventDispatcherUtil,
          endPoint,
          err
        })
      );
    }

    return false;
  }
};

module.exports = EventDispatcher;
