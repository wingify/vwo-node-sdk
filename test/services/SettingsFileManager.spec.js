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

const SettingsFileService = require('../../lib/services/SettingsFileManager');
const logging = require('../../lib/services/logging');
const logger = logging.getLogger();

const { settingsFile1 } = require('../test-utils/data/settingsFiles');

let SettingsFileManager;
let globalConfig = {
  settingsFile: settingsFile1,
  logger
};

beforeEach(() => {
  SettingsFileManager = new SettingsFileService(globalConfig);
});

describe('Service SettingsFileManager', () => {
  describe('contructor', () => {
    it('should set default values to keys of settingsFile if somwhow not provided', () => {
      const config = {
        settingsFile: {}
      };

      SettingsFileManager = new SettingsFileService(config);

      expect(config.settingsFile.campaigns).toBeDefined();
      expect(config.settingsFile.campaigns.length).toBe(0);
    });
  });

  describe('method: isSettingsFileValid', () => {
    it('should return false if config is not defined', () => {
      const config = undefined;

      SettingsFileManager = new SettingsFileService(config);
      expect(SettingsFileManager.isSettingsFileValid(config)).toBe(false);
    });

    it('should return false if config.settingsFile is not defined', () => {
      const config = {};

      SettingsFileManager = new SettingsFileService(config);
      expect(SettingsFileManager.isSettingsFileValid(config)).toBe(false);
    });

    it('should return false if settingsFile has bad campaign schema', () => {
      const config = {
        settingsFile: {
          campaigns: [
            {
              id: true,
              variations: {
                oh: 'SHOULD_BE_ARRAY_OF_OBJECTS'
              }
            }
          ]
        },
        logger
      };
      const spyInvalidateSettingsFileLog = jest.spyOn(config.logger, 'log');

      SettingsFileManager = new SettingsFileService(config);
      expect(SettingsFileManager.isSettingsFileValid(config)).toBe(false);
      expect(spyInvalidateSettingsFileLog).toHaveBeenCalled();
    });

    it('should return false if settingsFile has bad campaign variation schema', () => {
      const config = {
        settingsFile: {
          campaigns: [
            {
              id: 1,
              variations: [
                {
                  id: 'SHOULD_BE_NUMBER',
                  name: 123 // should be string
                }
              ]
            }
          ]
        },
        logger
      };
      const spyInvalidateSettingsFileLog = jest.spyOn(config.logger, 'log');

      SettingsFileManager = new SettingsFileService(config);
      expect(SettingsFileManager.isSettingsFileValid(config)).toBe(false);
      expect(spyInvalidateSettingsFileLog).toHaveBeenCalled();
    });

    it('should return false if settingsFile has bad campaign goal schema', () => {
      const config = {
        settingsFile: {
          campaigns: [
            {
              id: 'Hello',
              goals: [
                {
                  id: 12,
                  identifier: 12, // should be a string
                  type: 2 // should be a string
                }
              ]
            }
          ]
        },
        logger
      };
      const spyInvalidateSettingsFileLog = jest.spyOn(config.logger, 'log');

      SettingsFileManager = new SettingsFileService(config);
      expect(SettingsFileManager.isSettingsFileValid(config)).toBe(false);
      expect(spyInvalidateSettingsFileLog).toHaveBeenCalled();
    });

    it('should return true if config is valid', () => {
      const isValid = SettingsFileManager.isSettingsFileValid(globalConfig);

      expect(isValid).toBe(true);
    });
  });

  describe('metho: processsettingsFile', () => {
    it('should call _setVariationBucketing for each campaign in settingsFile', () => {
      const spySetVariationBucketingMethod = jest.spyOn(SettingsFileManager, '_setVariationBucketing');
      const spyLog = jest.spyOn(globalConfig.logger, 'log');

      SettingsFileManager.processsettingsFile(globalConfig);
      expect(spySetVariationBucketingMethod).toHaveBeenCalled();
      expect(spyLog).toHaveBeenCalled();
    });
  });

  describe('method: getConfig', () => {
    it('should return config', () => {
      expect(SettingsFileManager.getConfig()).toEqual(globalConfig);
    });
  });

  describe('method: getSettingsFile', () => {
    it('should return settingsFile', () => {
      expect(SettingsFileManager.getSettingsFile()).toEqual(globalConfig.settingsFile);
    });
  });
});
