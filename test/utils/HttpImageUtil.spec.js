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

const HttpImageUtil = require('../../lib/utils/HttpImageUtil');

global.URLSearchParams = jest.fn(x => ({
  get: jest.fn(y => (x.includes(y) ? 'url does contain get parameter' : 'url does not contain get parameter'))
}));

describe('HttpImageUtil', () => {
  it('should call the successCallback for the load', () => {
    const successCallback = jest.fn((response, status) => {
      expect(response).toBe(null);
      expect(JSON.stringify(status)).toEqual(JSON.stringify({ status: 'success' }));
    });

    const errorCallback = jest.fn();

    const imageUrl = 'https://github.com/wingify';

    let img = HttpImageUtil.handleGetCall(imageUrl, '', {}, successCallback, errorCallback, imageUrl, false);

    img.onload();

    img = HttpImageUtil.handleGetCall(imageUrl, '', {}, successCallback, errorCallback, imageUrl, true);
    img.onload();
  });

  it('should call the errorCallback for the error', () => {
    const successCallback = jest.fn();

    const errorCallback = jest.fn((response, status) => {
      expect(response).toBe(null);
      expect(JSON.stringify(status)).toEqual(JSON.stringify({ status: 'success' }));
    });

    const imageUrl = 'https://github.com/wingify';
    let img = HttpImageUtil.handleGetCall(imageUrl, '', {}, successCallback, errorCallback, imageUrl, false);
    img.onerror();

    img = HttpImageUtil.handleGetCall(imageUrl, '', {}, successCallback, errorCallback, imageUrl, true);
    img.onerror();
  });
});
