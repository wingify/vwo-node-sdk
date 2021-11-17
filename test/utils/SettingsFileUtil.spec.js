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

import { handleHttpResponse } from '../../lib/utils/SettingsFileUtil';
const SettingsFileUtil = require('../../lib/utils/SettingsFileUtil');
jest.mock('https');

let accountId;
let sdkKey;
beforeEach(() => {
  accountId = 12345;
  sdkKey = 'aa11110pp22222aa333ff4c5b66r77ee';
});

describe('SettingsFileUtil', () => {
  describe('method: get', () => {
    it('should return undefined if no paramter is passed', () => {
      expect(SettingsFileUtil.get()).toBeUndefined();
    });

    it('should return undefined if no sdkKey is passed', () => {
      expect(SettingsFileUtil.get(accountId)).toBeUndefined();
    });

    it('should return undefined if no accountId is passed', () => {
      expect(SettingsFileUtil.get(undefined, sdkKey)).toBeUndefined();
    });

    it('should return a promise if parameters passed are correct', () => {
      expect(typeof SettingsFileUtil.get(accountId, sdkKey).then).toBe('function');
    });

    it('should test for the invalid content type', () => {
      let reject = function(error) {
        expect(typeof error).toBe('string');
      };
      SettingsFileUtil.handleHttpRequest(
        { statusCode: 200, headers: { 'content-type': 'text' }, resume: () => {} },
        undefined,
        reject
      );
    });

    it('should return error if invalid statuscode is passed', () => {
      let res = {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        on: (event, chunk) => {
          if (event === 'end') {
            handleHttpResponse(400, JSON.stringify({ a: 'a', b: 'b' }), undefined, error => {
              expect(typeof error).toBe('string');
            });
          }
        },
        setEncoding: encoding => {}
      };
      SettingsFileUtil.handleHttpRequest(res);
    });

    it('should return error if correct statusCode is passed', () => {
      let data = { a: 'a', b: 'b' };
      let res = {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        on: (event, chunk) => {
          if (event === 'end') {
            handleHttpResponse(200, JSON.stringify(data), response => {
              expect(response).toStrictEqual(data);
            });
          }
        },
        setEncoding: encoding => {}
      };
      SettingsFileUtil.handleHttpRequest(res);
    });

    it('should return a promise if the the config params are passed', () => {
      process.env = undefined;
      expect(
        typeof SettingsFileUtil.get(accountId, sdkKey, undefined, {
          isViaWebhook: true,
          hostname: 'sample.com',
          path: 'path',
          port: 8000
        }).then
      ).toBe('function');
    });
  });
});
