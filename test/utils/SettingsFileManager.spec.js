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

const VWO = require('../../lib/VWO');
const mockFn = jest.fn();
const logger = { log: mockFn };

const { settingsFile1 } = require('../test-utils/data/settingsFiles');

describe('SettingsFileManager', () => {
  describe('test Settings File', () => {
    test('should update settings file if a valid settings file is passed', () => {
      let vwoInstance = new VWO({
        settingsFile: settingsFile1,
        logger
      });

      let spy = jest.spyOn(vwoInstance.SettingsFileManager, 'processSettingsFile');
      vwoInstance.SettingsFileManager.updateSettingsFile(settingsFile1);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should get and update settings file', () => {
      let vwoInstance = new VWO({
        settingsFile: settingsFile1,
        logger
      });

      expect(typeof vwoInstance.SettingsFileManager.getAndUpdateSettingsFile(12345, 'wsdfbfndf').then).toBe('function');
    });
  });
});
