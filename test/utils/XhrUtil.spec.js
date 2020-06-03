/**
 * Copyright 2019-2020 Wingify Software Pvt. Ltd.
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

const XhrUtil = require('../../lib/utils/XhrUtil');

describe('XhrUtil', () => {
  describe('method: send', () => {
    it('should return if no url/method is passed', () => {
      expect(XhrUtil.send()).toBeUndefined();
      expect(XhrUtil.send({ method: 'GET' })).toBeUndefined();
      expect(XhrUtil.send({ url: 'https://vwo.com' })).toBeUndefined();
      const promise = XhrUtil.send({ url: 'https://vwo.com', method: 'GET' });
      expect(typeof promise.then).toBe('function');
    });
  });
});
