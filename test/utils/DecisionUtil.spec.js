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

const DecisionUtil = require('../../lib/utils/DecisionUtil');
const VariationDecider = require('../../lib/core/VariationDecider');
const SettingsFileService = require('../../lib/services/SettingsFileManager');

const logging = require('../../lib/services/logging');
const logger = logging.getLogger();

const { settingsFile1 } = require('../test-utils/data/settingsFiles');

const globalConfig = {
  settingsFile: settingsFile1,
  logger
};

const userId = 'Alice';
const campaign = settingsFile1.campaigns[0];

let spyOnGetStoredVariation;
let spyOnVariationAllotted;
let spyOnSaveUserProfiel;
let output;

beforeEach(() => {
  let SettingsFileManager = new SettingsFileService(globalConfig);

  SettingsFileManager.processsettingsFile(globalConfig);
});

describe('DecisionUtil', () => {
  describe('method: getVariation', () => {
    beforeEach(() => {
      spyOnGetStoredVariation = jest.spyOn(DecisionUtil, '_getStoredVariation');
      spyOnVariationAllotted = jest.spyOn(VariationDecider, 'getVariationAllotted');
      spyOnSaveUserProfiel = jest.spyOn(DecisionUtil, '_saveUserData');

      output = DecisionUtil.getVariation(globalConfig, campaign, 'DEV_TEST_1', userId);
    });

    it('should first look into USS for fetching stored variation', () => {
      expect(spyOnGetStoredVariation).toHaveBeenCalled();
    });

    it('should use method to allot variation if USS is not provided', () => {
      expect(spyOnVariationAllotted).toHaveBeenCalled();
      expect(output).toBeDefined();
      expect(output.variationName).toBe('Control');
      expect(output.variationId).toBe(1);
    });

    it('should save data into USS if provided', () => {
      expect(spyOnSaveUserProfiel).toHaveBeenCalled();
    });
  });

  describe('method: _getStoredVariation', () => {
    it('should return null if data not found in campaignUserDataMapping', () => {
      expect(DecisionUtil._getStoredVariation(globalConfig, 'DEV_TEST_1', userId)).toBe(null);
    });
  });

  describe('method: _getStoredUserData', () => {
    it('should return USS stored data', () => {
      const userStorageService = {
        get: (userId, campaignKey) => {
          // Perform user storage set
          // return an object like:
          return {
            userId: userId,
            campaignKey: 'DEV_TEST_1',
            variationName: 'Control'
          };
        }
      };

      const config = Object.assign({}, globalConfig, { userStorageService });

      output = DecisionUtil._getStoredUserData(config, userId);

      expect(output.campaignKey).toBe('DEV_TEST_1');
      expect(output.variationName).toBe('Control');
    });

    it('should return USS stored data even if end-user manipulated it', () => {
      const userStorageService = {
        get: (userId, campaignKey) => {
          // Perform user storage get
          // return an object like:
          return {
            userId: userId,
            campaignKey: 'DEV_TEST_1',
            variationName: 'Control - Garbage added'
          };
        }
      };

      const config = Object.assign({}, globalConfig, { userStorageService });

      output = DecisionUtil._getStoredUserData(config, userId);

      expect(output.campaignKey).toBe('DEV_TEST_1');
      expect(output.variationName).toBe('Control - Garbage added');
    });
  });

  describe('method: _saveUserData', () => {
    it('should return false if USS is not provided', () => {
      output = DecisionUtil._saveUserData(globalConfig, campaign, 'Control', userId, {});
      expect(output).toBe(false);
    });

    it('should return USS stored data even if end-user manipulated it', () => {
      const userStorageService = {
        set: () => {}
      };
      const config = Object.assign({}, globalConfig, { userStorageService });

      output = DecisionUtil._saveUserData(config, campaign, 'Control', userId, {});
      expect(output).toBe(true);
    });
  });
});
