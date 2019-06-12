const url = require('url');
const https = require('https');
const DataTypeUtil = require('./DataTypeUtil');

const excludedProperties = ['url'];

let EventDispatcher = {
  dispatch: function(properties, callback) {
    let parsedUrl = url.parse(properties.url);
    let queryParams = '?';

    for (let prop in properties) {
      if (properties.hasOwnProperty(prop)) {
        if (excludedProperties.indexOf(prop) === -1) {
          queryParams += prop + '=' + properties[prop] + '&';
        }
      }
    }

    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

    https.get(
      {
        hostname: parsedUrl.host,
        path: parsedUrl.path + queryParams,
        agent: false // Create a new agent just for this one request
      },
      res => {
        let rawData = '';

        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          rawData += chunk;
        });
        res.on('end', function() {
          console.log(properties.url + queryParams, rawData);

          if (callback && DataTypeUtil.isFunction(callback)) {
            callback(properties);
          }
        });
        res.on('error', function(err) {
          console.error(err);
        });
      }
    );

    return false;
  }
};

module.exports = EventDispatcher;
