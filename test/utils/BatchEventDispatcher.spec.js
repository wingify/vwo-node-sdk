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

const BatchEventsDispatcher = require('../../lib/utils/BatchEventsDispatcher');

let properties = {
  ev: 'dcsdfdds'
};

let rawData = {
  error: 'failure',
  message: 'something went wrong'
};

let queryParams = {
  a: 123
};

describe('BatchEventDispatcher', () => {
  describe('test bulk impression', () => {
    test('handleBatchResponse: when error is returned', () => {
      BatchEventsDispatcher.handleBatchResponse(
        'https://vwo.com',
        properties,
        queryParams,
        'error is received',
        null,
        null,
        error => {
          expect(error).toBe('error is received');
        }
      );
    });

    test('handleBatchResponse: when response is received and statusCode is 200 is returned', () => {
      BatchEventsDispatcher.handleBatchResponse(
        'https://vwo.com',
        properties,
        queryParams,
        null,
        { statusCode: 200 },
        null,
        (error, response) => {
          expect(response).toBe(JSON.stringify(properties));
        }
      );
    });

    test('handleBatchResponse: when response is received and statusCode is 413 is returned', () => {
      BatchEventsDispatcher.handleBatchResponse(
        'https://vwo.com',
        properties,
        queryParams,
        null,
        { statusCode: 413 },
        JSON.stringify(rawData),
        (error, response) => {
          expect(response).toBe(JSON.stringify(properties));
          expect(error).toBe(rawData.error);
        }
      );
    });

    test('handleBatchResponse: when response is received but something went wrong', () => {
      BatchEventsDispatcher.handleBatchResponse(
        'https://vwo.com',
        properties,
        queryParams,
        null,
        { statusCode: 500 },
        JSON.stringify(rawData),
        (error, response) => {
          expect(response).toBe(JSON.stringify(properties));
          expect(error).toBe(rawData.message);
        }
      );
    });
  });
});
