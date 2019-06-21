const url = require('url');
const https = require('https');
const DataTypeUtil = require('./DataTypeUtil');
const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const loggger = logging.getLogger();

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

      const endPoint = `https://${parsedUrl.host}${parsedUrl.path}`;

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
            loggger.log(
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
            loggger.log(
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
      loggger.log(
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
