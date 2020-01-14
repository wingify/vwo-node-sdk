/**
 * Copyright 2019 Wingify Software Pvt. Ltd.
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

const FunctionUtil = require('../../lib/utils/FunctionUtil');

describe('DataTypeUtil', () => {
  describe('method: cloneObject', () => {
    it('should clone an object', () => {
      const obj = {
        a: 1,
        b: 2
      };
      const newObj = FunctionUtil.cloneObject(obj);

      // change obj
      obj.a = 3;
      obj.b = 5;

      expect(obj.a).toBe(3);
      expect(obj.b).toBe(5);

      expect(newObj.a).toBe(1);
      expect(newObj.b).toBe(2);
    });
  });

  describe('method: getRandomNumber', () => {
    it('should return a number', () => {
      expect(FunctionUtil.getRandomNumber()).toBeDefined();
      expect(typeof FunctionUtil.getRandomNumber()).toBe('number');
    });
  });

  describe('method: getCurrentUnixTimestamp', () => {
    it('should return current time in unix format', () => {
      expect(FunctionUtil.getCurrentUnixTimestamp()).toBeDefined();
      expect(typeof FunctionUtil.getCurrentUnixTimestamp()).toBe('number');
    });
  });

  describe('method: matchWithRegex', () => {
    it('should return true', () => {
      expect(Boolean(FunctionUtil.matchWithRegex('str', /^str/))).toBe(true);
    });

    it('should return false', () => {
      expect(Boolean(FunctionUtil.matchWithRegex('str', /^string/))).toBe(false);
    });
  });
});
