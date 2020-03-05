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

const CachingUtil = require('../../lib/utils/CachingUtil');

const keyPrefix = '__random_prefix__';
const key = '__random_key__';
const wrongKey = '__wrong_key__';
const data = '__random_data__';

describe('CachingUtil', () => {
  describe('method: set and get', () => {
    CachingUtil.set(keyPrefix, key, data);
    test('should return false if no params are passed', () => {
      expect(CachingUtil.get()).toBe(false);
    });
    test('should return correct value if correct params are passed', () => {
      expect(CachingUtil.get(keyPrefix, key)).toBe(data);
    });
    test('should return false if wrong key is passed', () => {
      expect(CachingUtil.get(keyPrefix, wrongKey)).toBe(false);
    });
    test('should return false if wrong keyPrefix is passed', () => {
      expect(CachingUtil.get(wrongKey, key)).toBe(false);
    });
    test('should return false if both key and keyPrefix are wrong', () => {
      expect(CachingUtil.get(wrongKey, wrongKey)).toBe(false);
    });
    test('should return false if cache already has been set', () => {
      expect(CachingUtil.set(keyPrefix, key, data)).toBe(false);
    });
  });

  /* describe('method: remove', () => {
    test('should return false if no params are passed', () => {
      expect(CachingUtil.remove()).toBe(false);
    });
    test('should remove the value from cache', () => {
      CachingUtil.set(keyPrefix, key, data);
      expect(CachingUtil.get(keyPrefix, key)).toBe(data);
      CachingUtil.remove(keyPrefix, key);
      expect(CachingUtil.get(keyPrefix, key)).toBe(false);
    });
  }); */

  describe('method: resetCache', () => {
    test('should remove the value from cache', () => {
      CachingUtil.set(keyPrefix, key, data);
      expect(CachingUtil.get(keyPrefix, key)).toBe(data);
      CachingUtil.resetCache();
      expect(CachingUtil.get(keyPrefix, key)).toBe(false);
    });
  });
});
