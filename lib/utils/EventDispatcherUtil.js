const url = require('url');
const https = require('https');
const DataTypeUtil = require('./DataTypeUtil');
const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const excludedProperties = ['url'];

let EventDispatcher = {
  dispatch: function(config = {}, properties = {}, successCallback, failureCallback) {
    const { retryTimeout } = config;
    const parsedUrl = url.parse(properties.url);

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

      var httpsRequest = https.request(
        {
          protocol: 'https:',
          method: 'GET',
          host: parsedUrl.host,
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
                endPoint: 'https://' + parsedUrl.host + parsedUrl.path + queryParams,
                campaignId: properties && properties.experiment_id,
                userId: properties && properties.uId,
                accountId: properties && properties.account_id,
                variationId: properties && properties.combination
              })
            );

            if (successCallback && DataTypeUtil.isFunction(successCallback)) {
              successCallback(properties);
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

            if (failureCallback && DataTypeUtil.isFunction(failureCallback)) {
              logger.log(
                LogLevelEnum.INFO,
                LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.RETRY_FAILED_IMPRESSION_AFTER_DELAY, {
                  file: FileNameEnum.EventDispatcher,
                  endPoint,
                  retryTimeout
                })
              );
              // failureCallback(retryTimeout); // uncommetn it if retry failed event is required
            }
          });
        }
      );

      httpsRequest.end();
    } catch (e) {
      let endPoint = `https://${parsedUrl.host}${parsedUrl.path}`;

      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.IMPRESSION_FAILED, {
          file: FileNameEnum.EventDispatcher,
          endPoint
        })
      );

      if (failureCallback && DataTypeUtil.isFunction(failureCallback)) {
        logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.RETRY_FAILED_IMPRESSION_AFTER_DELAY, {
            file: FileNameEnum.EventDispatcher,
            endPoint,
            retryTimeout
          })
        );
        // failureCallback(retryTimeout); // uncommetn it if retry failed event is required
      }
    }

    return false;
  }
};

module.exports = EventDispatcher;
