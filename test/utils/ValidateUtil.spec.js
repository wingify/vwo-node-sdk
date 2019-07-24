const ValidateUtil = require('../../lib/utils/ValidateUtil');
const Constants = require('../../lib/constants');

describe('ValidateUtil', () => {
  describe('method: isValidValue', () => {
    it('should return false if not defined value', () => {
      expect(ValidateUtil.isValidValue()).toBe(false);
    });

    it('should return true if value is defined', () => {
      expect(ValidateUtil.isValidValue('')).toBe(false);
      expect(ValidateUtil.isValidValue('111')).toBe(true);
      expect(ValidateUtil.isValidValue(111)).toBe(true);

      expect(ValidateUtil.isValidValue({})).toBe(true);
      expect(ValidateUtil.isValidValue(function () {})).toBe(true);
    });
  });

  describe('method: isValidString', () => {
    it('should return false if not defined value', () => {
      expect(ValidateUtil.isValidString()).toBe(false);
    });

    it('should return true if value is defined', () => {
      expect(ValidateUtil.isValidString('')).toBe(false);
      expect(ValidateUtil.isValidString('111')).toBe(true);
    });
  });

  describe('method: isValidNumber', () => {
    it('should return false if not defined value', () => {
      expect(ValidateUtil.isValidNumber()).toBe(false);
    });

    it('should return true if value is defined', () => {
      expect(ValidateUtil.isValidNumber('111')).toBe(false);
      expect(ValidateUtil.isValidValue(111)).toBe(true);
    });
  });

  describe('method: isValidFunction', () => {
    it('should return false if not defined value', () => {
      expect(ValidateUtil.isValidFunction()).toBe(false);
    });

    it('should return true if value is defined', () => {
      expect(ValidateUtil.isValidFunction('111')).toBe(false);
      expect(ValidateUtil.isValidFunction(function () {})).toBe(true);
    });
  });

  describe('method: isValidBoolean', () => {
    it('should return false if not defined value', () => {
      expect(ValidateUtil.isValidBoolean()).toBe(false);
    });

    it('should return true if value is defined', () => {
      expect(ValidateUtil.isValidBoolean('111')).toBe(false);
      expect(ValidateUtil.isValidBoolean(true)).toBe(true);
      expect(ValidateUtil.isValidBoolean(false)).toBe(true);
    });
  });

  describe('method: areValidParamsForAPIMethod', () => {
    it('should verify API methods params', () => {
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.ACTIVATE, null, null)).toBe(false);
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.ACTIVATE, 'Hello', null)).toBe(false);
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.ACTIVATE, 'Hello', 12345)).toBe(false);
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.ACTIVATE, 'Hello', 'World')).toBe(true);

      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.GET_VARIATION, null, null)).toBe(false);
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.GET_VARIATION, 'Hello', null)).toBe(false);
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.GET_VARIATION, 'Hello', 12345)).toBe(false);
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.GET_VARIATION, 'Hello', 'World')).toBe(true);

      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, null, null, null)).toBe(false);
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, 'Hello', null, null)).toBe(false);
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, 'Hello', 'World', null)).toBe(false);
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, 'Hello', 'World', 12345)).toBe(false);
      expect(ValidateUtil.areValidParamsForAPIMethod(Constants.API_METHODS.TRACK, 'Hello', 'World', 'GOAL')).toBe(true);
    });
  });
});
