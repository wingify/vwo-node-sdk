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

const HttpHandlerUtil = {
  sendGetCall: function(url, queryParams, authToken, callback) {
    let endPoint = `${url.protocol === 'http' ? 'http' : 'https'}://${url.host}${url.path}`;

    const options = {
      hostname: url.host,
      path: url.path + queryParams,
      agent: false // Create a new agent just for this one request
    };

    if (url.port) {
      options.port = url.port;
    }

    if (authToken) {
      options.headers = {
        Authorization: authToken
      };
    }

    https.get(options, res => {
      let rawData = ''; // eslint-disable-line no-unused-vars

      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        rawData += chunk;
      });
      res.on('end', function() {
        if (callback && DataTypeUtil.isFunction(callback)) {
          callback(null, { endPoint, rawData: JSON.parse(rawData) });
        }
      });
      res.on('error', function(err) {
        callback(err, { endPoint });
      });
    });
  },

  sendPostCall: function(url, postData, queryParams, authToken, callback) {
    postData = JSON.stringify(postData);

    const options = {
      method: 'POST',
      hostname: url.host,
      path: queryParams ? url.path + queryParams : url.path,
      agent: false, // Create a new agent just for this one request
      headers: {
        'Content-Length': postData.length
      }
    };

    if (authToken) {
      options.headers.Authorization = authToken;
    } else {
      // what should be the user-agent here?
      options.headers['User-Agent'] = Constants.SDK_NAME;
    }

    if (url.port) {
      options.port = url.port;
    }

    const req = https.request(options, res => {
      let rawData = ''; // eslint-disable-line no-unused-vars
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        rawData += chunk;
      });
      res.on('end', function() {
        callback(null, res, rawData);
      });
    });

    req.on('error', e => {
      callback(e, null);
    });

    req.write(postData);
    req.end();
  }
};

module.exports = HttpHandlerUtil;
