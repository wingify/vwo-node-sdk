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

const DataTypeUtil = require('../../lib/utils/DataTypeUtil');

describe('DataTypeUtil', () => {
  describe('method: isNumber', () => {
    it('should return false if number is not provided', () => {
      const val = '1';

      expect(DataTypeUtil.isNumber(val)).toBe(false);
    });

    it('should return true if number is provided', () => {
      const val = 1;

      expect(DataTypeUtil.isNumber(val)).toBe(true);
    });
  });

  describe('method: isString', () => {
    it('should return false if string is not provided', () => {
      const val = 123;

      expect(DataTypeUtil.isString(val)).toBe(false);
    });

    it('should return true if string is provided', () => {
      const val = 'HELLO';

      expect(DataTypeUtil.isString(val)).toBe(true);
    });
  });

  describe('method: isObject', () => {
    it('should return false if object is not provided', () => {
      const val = 'Hey';

      expect(DataTypeUtil.isObject(val)).toBe(false);
    });

    it('should return true if object is provided', () => {
      const val = { a: 1 };

      expect(DataTypeUtil.isObject(val)).toBe(true);
    });
  });

  describe('method: isFunction', () => {
    it('should return false if number is not provided', () => {
      const val = { a: 1 };

      expect(DataTypeUtil.isFunction(val)).toBe(false);
    });

    it('should return true if number is provided', () => {
      const val = function() {};

      expect(DataTypeUtil.isFunction(val)).toBe(true);
    });
  });

  describe('method: isBoolean', () => {
    it('should return false if string is not provided', () => {
      const val = 123;

      expect(DataTypeUtil.isBoolean(val)).toBe(false);
    });

    it('should return true if string is provided', () => {
      expect(DataTypeUtil.isBoolean(true)).toBe(true);
      expect(DataTypeUtil.isBoolean(false)).toBe(true);
    });
  });
});
