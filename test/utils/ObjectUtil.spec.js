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

const ObjectUtil = require('../../lib/utils/ObjectUtil');

describe('ObjectUtil', () => {
  describe('method: areObjectKeys', () => {
    it('should return a number', () => {
      expect(typeof ObjectUtil.areObjectKeys({})).toBe('number');
    });
  });

  describe('method: getKeyValue', () => {
    const result = ObjectUtil.getKeyValue({
      key: 'value'
    });
    it('should return correct values', () => {
      expect(ObjectUtil.getKeyValue({})).toBe(undefined);
      expect(result.key).toBe('key');
      expect(result.value).toBe('value');
    });
  });
});
