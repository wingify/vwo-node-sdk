const https = require('https');
const Constants = require('../constants');
const FunctionUtil = require('./FunctionUtil');

module.exports = {
  get: (accountId, sdkKey) => {
    if (!accountId || !sdkKey) {
      console.error('AccountId and sdkKey are required for fetching account settings. Aborting!');
      return;
    }

    let path = Constants.ENDPOINTS.ACCOUNT_SETTINGS;
    path +=
      `?a=${accountId}&` +
      `i=${sdkKey}&` +
      `r=${FunctionUtil.getRandomNumber()}&` +
      'platform=server&' +
      'api-version=2';

    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

    return new Promise((resolve, reject) => {
      https.get(
        {
          hostname: Constants.ENDPOINTS.BASE_URL,
          path,
          agent: false
        },
        res => {
          const { statusCode } = res;
          const contentType = res.headers['content-type'];

          let error;
          let rawData = '';

          if (!/^application\/json/.test(contentType)) {
            error = `Invalid content-type.\nExpected application/json but received ${contentType}`;
          }

          if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            reject(error);

            return;
          }

          res.setEncoding('utf8');

          res.on('data', chunk => {
            rawData += chunk;
          });

          res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);

              if (statusCode !== 200) {
                let error = `Request failed for fetching account settings. Got Status Code: ${statusCode} and message: ${rawData}`;
                console.error(error);
                reject(error);

                return;
              }
              resolve(parsedData);
            } catch (e) {
              console.error(`Request failed for fetching account settings - ${e.message}`);
              reject(e);
            }
          });
        }
      );
    });
  }
};
