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

const ValidateUtil = require('../../lib/utils/ValidateUtil');
const ApiEnum = require('../../lib/enums/ApiEnum');

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
      expect(ValidateUtil.isValidValue(function() {})).toBe(true);
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
      expect(ValidateUtil.isValidFunction(function() {})).toBe(true);
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
      expect(
        ValidateUtil.areValidParamsForAPIMethod({ method: ApiEnum.ACTIVATE, campaignKey: null, userId: null })
      ).toBe(false);
      expect(
        ValidateUtil.areValidParamsForAPIMethod({ method: ApiEnum.ACTIVATE, campaignKey: 'Hello', userId: null })
      ).toBe(false);
      expect(
        ValidateUtil.areValidParamsForAPIMethod({ method: ApiEnum.ACTIVATE, campaignKey: 'Hello', userId: 12345 })
      ).toBe(false);
      expect(
        ValidateUtil.areValidParamsForAPIMethod({ method: ApiEnum.ACTIVATE, campaignKey: 'Hello', userId: 'World' })
      ).toBe(true);

      expect(
        ValidateUtil.areValidParamsForAPIMethod({ method: ApiEnum.GET_VARIATION_NAME, campaignKey: null, userId: null })
      ).toBe(false);
      expect(
        ValidateUtil.areValidParamsForAPIMethod({
          method: ApiEnum.GET_VARIATION_NAME,
          campaignKey: 'Hello',
          userId: null
        })
      ).toBe(false);
      expect(
        ValidateUtil.areValidParamsForAPIMethod({
          method: ApiEnum.GET_VARIATION_NAME,
          campaignKey: 'Hello',
          userId: 12345
        })
      ).toBe(false);
      expect(
        ValidateUtil.areValidParamsForAPIMethod({
          method: ApiEnum.GET_VARIATION_NAME,
          campaignKey: 'Hello',
          userId: 'World'
        })
      ).toBe(true);

      expect(
        ValidateUtil.areValidParamsForAPIMethod({
          method: ApiEnum.TRACK,
          campaignKey: null,
          userId: null,
          goalIdentifier: null
        })
      ).toBe(false);
      expect(
        ValidateUtil.areValidParamsForAPIMethod({
          method: ApiEnum.TRACK,
          campaignKey: 'Hello',
          userId: null,
          goalIdentifier: null
        })
      ).toBe(false);
      expect(
        ValidateUtil.areValidParamsForAPIMethod({
          method: ApiEnum.TRACK,
          campaignKey: 'Hello',
          userId: 'World',
          goalIdentifier: null
        })
      ).toBe(false);
      expect(
        ValidateUtil.areValidParamsForAPIMethod({
          method: ApiEnum.TRACK,
          campaignKey: 'Hello',
          userId: 'World',
          goalIdentifier: 12345
        })
      ).toBe(false);
      expect(
        ValidateUtil.areValidParamsForAPIMethod({
          method: ApiEnum.TRACK,
          campaignKey: 'Hello',
          userId: 'World',
          goalIdentifier: 'GOAL'
        })
      ).toBe(true);
    });
  });
});
