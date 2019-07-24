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
});
