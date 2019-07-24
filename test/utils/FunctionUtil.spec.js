const FunctionUtil = require('../../lib/utils/FunctionUtil');

describe('DataTypeUtil', () => {
  describe('method: cloneObject', () => {
    it('should clone an object', () => {
      const obj = {
        a: 1,
        b: 2
      }
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
});
