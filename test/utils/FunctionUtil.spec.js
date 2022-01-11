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

const FunctionUtil = require('../../lib/utils/FunctionUtil');

describe('FunctionUtil', () => {
  describe('method: cloneObject', () => {
    it('should clone an object', () => {
      const obj = {
        a: 1,
        b: 2,
        c: {
          c1: {
            c2: 'c12'
          }
        }
      };
      const newObj = FunctionUtil.cloneObject(obj);

      // change obj
      obj.a = 3;
      obj.b = 5;
      obj.c.c1.c2 = 'c12-new';

      expect(obj.a).toBe(3);
      expect(obj.b).toBe(5);
      expect(obj.c.c1.c2).toBe('c12-new');

      expect(newObj.a).toBe(1);
      expect(newObj.b).toBe(2);
      expect(newObj.c.c1.c2).toBe('c12');
    });

    it('should fail if key is a function', () => {
      const obj = {
        a: 1,
        b: function() {}
      };
      const newObj = FunctionUtil.cloneObject(obj);

      expect(newObj.b).toBeUndefined();
    });

    it('should fail if key is undefined', () => {
      const obj = {
        a: 1,
        b: undefined
      };
      const newObj = FunctionUtil.cloneObject(obj);

      expect(newObj.b).toBeUndefined();
    });

    it('should return the value for falsy values', () => {
      expect(FunctionUtil.cloneObject(0)).toBe(0);
      expect(FunctionUtil.cloneObject(null)).toBe(null);
      expect(FunctionUtil.cloneObject(undefined)).toBe(undefined);
      expect(FunctionUtil.cloneObject('')).toBe('');
      expect(FunctionUtil.cloneObject(false)).toBe(false);
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

    it('should return null for incorrect first arg', () => {
      expect(FunctionUtil.matchWithRegex({}, '')).toBe(null);
    });
  });

  describe('method: getCurrentTime', () => {
    test('should return a string value', () => {
      expect(typeof FunctionUtil.getCurrentTime()).toBe('string');
    });
  });
});
