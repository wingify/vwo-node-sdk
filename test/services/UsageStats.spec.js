/**
 * Copyright 2019-2021 Wingify Software Pvt. Ltd.
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

const index = require('../../lib/index');
const settingsFile1 = require('../test-utils/data/settingsFile-1');
const GoalTypeEnum = require('../../lib/enums/GoalTypeEnum');

const mockFn = jest.fn();
const logger = { logger: { log: mockFn } };

let userStorageService = {
  set: mockFn,
  get: mockFn
};
describe('UsageStats', () => {
  describe('method: collectUsageStats', () => {
    it('when vwo is launched only with settings file', () => {
      let vwoClientInstance = index.launch({
        settingsFile: settingsFile1
      });

      expect(vwoClientInstance.usageStats.getUsageStats()).toStrictEqual({});
    });

    it('when vwo is launched along with logging config', () => {
      let vwoClientInstance = index.launch({
        settingsFile: settingsFile1,
        logging: logger
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['is_cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_ss']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['is_i']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['tru']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['poll']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['is_eb']).toBeUndefined();
    });

    it('when vwo is launched along with userStorageService config', () => {
      let vwoClientInstance = index.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['is_ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_i']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['tru']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['poll']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['is_eb']).toBeUndefined();
    });

    it('when vwo is launched along with integrations config', () => {
      let vwoClientInstance = index.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService,
        integrations: {
          callback: function() {
            console.log('sdfg');
          }
        }
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['is_ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_i']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['tru']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['poll']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['is_eb']).toBeUndefined();
    });

    it('when vwo is launched along with shouldTrackReturningUser as true config', () => {
      let vwoClientInstance = index.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService,
        integrations: {
          callback: function() {
            console.log('sdfg');
          }
        },
        shouldTrackReturningUser: true
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['is_ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_i']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['tru']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['poll']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['is_eb']).toBeUndefined();
    });

    it('when vwo is launched along with goalTypeToTrack config', () => {
      let vwoClientInstance = index.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService,
        integrations: {
          callback: function() {
            console.log('sdfg');
          }
        },
        shouldTrackReturningUser: true,
        goalTypeToTrack: GoalTypeEnum.CUSTOM
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['is_ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_i']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['tru']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['poll']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['is_eb']).toBeUndefined();
    });

    it('when vwo is launched along with polling config', () => {
      let vwoClientInstance = index.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService,
        integrations: {
          callback: function() {
            console.log('sdfg');
          }
        },
        shouldTrackReturningUser: true,
        goalTypeToTrack: GoalTypeEnum.CUSTOM,
        pollingInterval: 50000,
        sdkKey: 'edsfghgfdasdfgf'
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['is_ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_i']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['tru']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['poll']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_eb']).toBeUndefined();
    });

    it('when vwo is launched along with polling config', () => {
      let vwoClientInstance = index.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService,
        integrations: {
          callback: function() {
            console.log('sdfg');
          }
        },
        shouldTrackReturningUser: true,
        goalTypeToTrack: GoalTypeEnum.CUSTOM,
        pollingInterval: 50000,
        sdkKey: 'edsfghgfdasdfgf',
        batchEvents: {
          eventsPerRequest: 2,
          requestTimeInterval: 200000
        }
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['is_ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_i']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['tru']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['poll']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['is_eb']).toBe(1);
    });
  });
});
