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
const vwo = require('../../lib');
const settingsFile1 = require('../test-utils/data/settingsFile-1');
const GoalTypeEnum = require('../../lib/enums/GoalTypeEnum');
const SettingsFileManager = require('../../lib/services/SettingsFileManager');

const mockFn = jest.fn();
const logger = { logger: { log: mockFn } };

let userStorageService = {
  set: mockFn,
  get: mockFn
};
describe('UsageStats', () => {
  describe('method: collectUsageStats', () => {
    it('when vwo is launched only with settings file', () => {
      const vwoClientInstance = vwo.launch({
        settingsFile: settingsFile1
      });

      expect(vwoClientInstance.usageStats.getUsageStats()).toStrictEqual({});
    });

    it('when vwo is launched along with logging config', () => {
      const vwoClientInstance = vwo.launch({
        settingsFile: settingsFile1,
        logging: logger
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['_l']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['ss']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['ig']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['tr']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['pi']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['eb']).toBeUndefined();
    });

    it('when vwo is launched along with userStorageService config', () => {
      const vwoClientInstance = vwo.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['_l']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['ig']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['tr']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['pi']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['eb']).toBeUndefined();
    });

    it('when vwo is launched along with integrations config', () => {
      const vwoClientInstance = vwo.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService,
        integrations: {
          callback: function(data) {
            console.log(data);
          }
        }
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['_l']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['ig']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['tr']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['pi']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['eb']).toBeUndefined();
    });

    it('when vwo is launched along with shouldTrackReturningUser as true config', () => {
      const vwoClientInstance = vwo.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService,
        integrations: {
          callback: function(data) {
            console.log(data);
          }
        },
        shouldTrackReturningUser: true
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['_l']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['ig']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['tr']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['pi']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['eb']).toBeUndefined();
    });

    it('when vwo is launched along with goalTypeToTrack config', () => {
      const vwoClientInstance = vwo.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService,
        integrations: {
          callback: function(data) {
            console.log(data);
          }
        },
        shouldTrackReturningUser: true,
        goalTypeToTrack: GoalTypeEnum.CUSTOM
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['_l']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['ig']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['tr']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['pi']).toBeUndefined();
      expect(vwoClientInstance.usageStats.getUsageStats()['eb']).toBeUndefined();
    });

    it('when vwo is launched along with polling config', done => {
      const spyPolling = (SettingsFileManager.checkAndPoll = jest.spyOn(SettingsFileManager.prototype, 'checkAndPoll'));
      spyPolling.mockImplementation(() => undefined);

      const vwoClientInstance = vwo.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService,
        integrations: {
          callback: function(data) {
            console.log(data);
          }
        },
        shouldTrackReturningUser: true,
        goalTypeToTrack: GoalTypeEnum.CUSTOM,
        pollingInterval: 50000,
        sdkKey: 'po87170ad94079aa190bc7c9b85d26mm'
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['_l']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['ig']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['tr']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['pi']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['eb']).toBeUndefined();

      done();
    });

    it('when vwo is launched along with polling config', done => {
      const spyPolling = (SettingsFileManager.checkAndPoll = jest.spyOn(SettingsFileManager.prototype, 'checkAndPoll'));
      spyPolling.mockImplementation(() => undefined);

      const vwoClientInstance = vwo.launch({
        settingsFile: settingsFile1,
        logging: logger,
        userStorageService,
        integrations: {
          callback: function(data) {
            console.log(data);
          }
        },
        shouldTrackReturningUser: true,
        goalTypeToTrack: GoalTypeEnum.CUSTOM,
        pollingInterval: 50000,
        sdkKey: 'po87170ad94079aa190bc7c9b85d26mm',
        batchEvents: {
          eventsPerRequest: 2,
          requestTimeInterval: 200000
        }
      });

      expect(vwoClientInstance.usageStats.getUsageStats()['ss']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['cl']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['_l']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['ig']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['tr']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['gt']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['pi']).toBe(1);
      expect(vwoClientInstance.usageStats.getUsageStats()['eb']).toBe(1);

      done();
    });
  });
});
