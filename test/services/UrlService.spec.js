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

const UrlService = require('../../lib/services/UrlService');
const UrlEnum = require('../../lib/enums/UrlEnum');

describe('UrlService', () => {
  describe('method: getBaseUrl', () => {
    test('should return base URL without data residency location', () => {
      const urlService = UrlService.init();
      expect(urlService.getBaseUrl()).toBe(UrlEnum.BASE_URL);
    });

    test('should return base URL with data residency location', () => {
      const collectionPrefix = 'eu';
      const urlService = UrlService.init({ collectionPrefix });
      expect(urlService.getBaseUrl()).toBe(`${UrlEnum.BASE_URL}/${collectionPrefix}`);
    });
  });
});
