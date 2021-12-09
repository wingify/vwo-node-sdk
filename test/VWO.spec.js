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

const VWO = require('../lib/VWO');
const ImpressionUtil = require('../lib/utils/ImpressionUtil');
const logging = require('../lib/services/logging');
const indexFile = require('../lib/index');
require('regenerator-runtime/runtime');

const {
  settingsFile1,
  settingsFile2,
  settingsFile3,
  settingsFile4,
  settingsFile5,
  settingsFile6,
  settingsFile7,
  settingsFile8,
  settingsFile9,
  settingsFile11
} = require('./test-utils/data/settingsFiles');

const {
  FEATURE_ROLLOUT_TRAFFIC_0,
  FEATURE_ROLLOUT_TRAFFIC_25,
  FEATURE_ROLLOUT_TRAFFIC_50,
  FEATURE_ROLLOUT_TRAFFIC_75,
  FEATURE_ROLLOUT_TRAFFIC_100,
  FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100,
  FEATURE_ROLLOUT_TRAFFIC_100_WHITELISTING
} = require('./test-utils/data/feature-rollout-settingsFile');

const {
  FEATURE_TEST_TRAFFIC_0,
  // FEATURE_TEST_TRAFFIC_25,
  // FEATURE_TEST_TRAFFIC_50,
  // FEATURE_TEST_TRAFFIC_75,
  FEATURE_TEST_TRAFFIC_100,
  FEATURE_TEST_TRAFFIC_JSON_100,
  FEATURE_TEST_TRAFFIC_100_WHITELISTING
} = require('./test-utils/data/feature-test-settingsFile');

const settings = require('./test-utils/data/settingsFileAndUsersExpectation');
const testUtil = require('./test-utils/TestUtil');
const users = testUtil.getUsers();
const mockFn = jest.fn();
const GoalTypeEnum = require('../lib/enums/GoalTypeEnum');

jest.useFakeTimers();

const logger = { log: mockFn };

let vwoClientInstance;
let spyImpressionEventTrackUser;
let spyImpressionEventTrackGoal;
let spyImpressionEventPush;
let spyEventQueue;
let userId;
let campaignKey;
let goalIdentifier;
let trueCustomVariables = {
  contains_vwo: 'legends say that vwo is the best',
  regex_for_no_zeros: 1223123,
  regex_for_all_letters: 'dsfASF',
  regex_for_small_letters: 'sadfksjdf',
  regex_real_number: 12321.2242,
  regex_for_zeros: 0,
  is_equal_to: 'equal_to_variable',
  contains: 'contains_variable',
  regex_for_capital_letters: 'SADFLSDLF',
  is_not_equal_to: 'is_not_equal_to_variable',
  this_is_regex: 'this    is    regex',
  starts_with: 'starts_with_variable'
};

let falseCustomVariables = {
  contains_vwo: 'legends say that vwo is the best',
  regex_for_no_zeros: 1223123,
  regex_for_all_letters: 'dsfASF',
  regex_for_small_letters: 'sadfksjdf',
  regex_real_number: 12321.2242,
  regex_for_zeros: 0,
  is_equal_to: '!equal_to_variable',
  contains: 'contains_variable',
  regex_for_capital_letters: 'SADFLSDLF',
  is_not_equal_to: 'is_not_equal_to_variable',
  this_is_regex: 'this    is    regex',
  starts_with: 'starts_with_variable'
};

let trueWhitelistingTags = {
  chrome: 'false',
  safari: 'true',
  browser: 'chrome 107.107'
};

let falseWhitelistingTags = {
  chrome: 'true',
  safari: 'false',
  browser: 'firefox 106.69'
};

const bigStr =
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
let userStorageService = {
  set: mockFn,
  get: mockFn
};
let userData = {};
const userStorageService1 = {
  get: (userId, campaignKey) => {
    // Perform user profile lookup
    // returns an object like:

    /* return {
      userId: 'user-identifier',
      campaignKey: 'campaign unique key,
      variationName: 'Variation-2'
    } */

    // Example code which retrieves data from object. This object will reset on server restart.
    let data = {};

    if (userData[campaignKey]) {
      for (let i = 0; i < userData[campaignKey].length; i++) {
        if (userId === userData[campaignKey][i].userId) {
          data = userData[campaignKey][i];
          break;
        }
      }
    }

    return data;
  },
  set: userStorageData => {
    // Persist user profile based on userStorageData

    // Example code which saves data in object. This object will reset on server restart.
    // if (userIds.indexOf(userStorageData.userId) === -1) {
    userData[userStorageData.campaignKey] = userData[userStorageData.campaignKey] || [];
    let inserted = 0;
    for (let i = 0; i < userData[userStorageData.campaignKey].length; i++) {
      if (userData[userStorageData.campaignKey][i].userId === userStorageData.userId) {
        userData[userStorageData.campaignKey][i] = userStorageData;
        inserted = 1;
        break;
      }
    }

    if (!inserted) {
      userData[userStorageData.campaignKey].push(userStorageData);
    }
    // }
  }
};

beforeEach(() => {
  logging.setLogHandler(mockFn);
  logging.setLogLevel(logging.LogLevelEnum.ERROR);

  userId = testUtil.getRandomUser();
  campaignKey = settingsFile1.campaigns[0].key;
  goalIdentifier = settingsFile1.campaigns[0].goals[0].identifier;

  vwoClientInstance = new VWO({
    settingsFile: settingsFile1,
    logger,
    isDevelopmentMode: true,
    userStorageService
  });

  spyImpressionEventTrackUser = jest.spyOn(ImpressionUtil, 'buildEventForTrackingUser');
  spyImpressionEventTrackGoal = jest.spyOn(ImpressionUtil, 'buildEventForTrackingGoal');
  spyImpressionEventPush = jest.spyOn(ImpressionUtil, 'buildEventForPushing');
});

describe('Class VWO', () => {
  describe('constructor', () => {
    test('should set stuff on the object itself to be referenced later in code', () => {
      vwoClientInstance = new VWO({
        logger,
        isDevelopmentMode: true,
        userStorageService
      });
      expect(vwoClientInstance.logger).toBeDefined();
      expect(vwoClientInstance.userStorageService).toBeDefined();
    });

    test('should not process settingsFile if settingsFile is not provided or corrupted', () => {
      vwoClientInstance = new VWO({
        logger,
        isDevelopmentMode: true,
        userStorageService
      });
      expect(vwoClientInstance.SettingsFileManager).toBeUndefined();
    });

    test('should process settingsFile if it is provided and is valid', () => {
      expect(vwoClientInstance.SettingsFileManager).toBeDefined();
      expect(vwoClientInstance.eventQueue).toBeDefined();
    });
  });

  describe('Event Batching', () => {
    test('Event Batching should be undefined if batchEvents is not passed', () => {
      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });
      expect(vwoClientInstance.batchEventsQueue).toBeUndefined();
    });

    test('Event Batching should be undefined if batchEvents is not passed an object', () => {
      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService,
        batchEvents: 4
      });
      expect(vwoClientInstance.batchEventsQueue).toBeUndefined();
    });

    test('Event Batching should be undefined if requestTimeInterval is not a number', () => {
      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService,
        batchEvents: {
          requestTimeInterval: 'u'
        }
      });
      expect(vwoClientInstance.batchEventsQueue).toBeUndefined();
    });

    test('Event Batching should be undefined if eventsPerRequest is not a number', () => {
      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService,
        batchEvents: {
          eventsPerRequest: false
        }
      });
      expect(vwoClientInstance.batchEventsQueue).toBeUndefined();
    });

    test('Event Batching should be undefined if flushCallback is not a function', () => {
      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService,
        batchEvents: {
          eventsPerRequest: 3,
          flushCallback: {}
        }
      });
      expect(vwoClientInstance.batchEventsQueue).toBeUndefined();
    });

    test('Event Batching should be defined if passed correct settings', () => {
      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService,
        batchEvents: {
          requestTimeInterval: 100,
          eventsPerRequest: 10,
          flushCallback: () => {}
        }
      });
      expect(vwoClientInstance.batchEventsQueue).toBeDefined();
    });

    test('Event Batching: enqueue should queue an event, flushEvents should flush queue', () => {
      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService,
        batchEvents: {
          requestTimeInterval: 100,
          eventsPerRequest: 10,
          flushCallback: () => {}
        }
      });
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0);
      vwoClientInstance.batchEventsQueue.enqueue(1);
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(1);
      vwoClientInstance.flushEvents();
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0);
    });

    test('Event Batching: queue should be flushed if eventsPerRequest is reached', () => {
      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService,
        batchEvents: {
          requestTimeInterval: 1000,
          eventsPerRequest: 2,
          flushCallback: () => {}
        }
      });
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0);
      vwoClientInstance.batchEventsQueue.enqueue(1);
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(1);
      vwoClientInstance.batchEventsQueue.enqueue(1);
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0);
    });

    test('Event Batching: queue should be flushed if requestTimeInterval is reached', () => {
      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService,
        batchEvents: {
          requestTimeInterval: 1000,
          eventsPerRequest: 3,
          flushCallback: () => {}
        }
      });
      setTimeout(() => expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0), 1000);
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0);
      vwoClientInstance.batchEventsQueue.enqueue(1);
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(1);
      vwoClientInstance.batchEventsQueue.enqueue(2);
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(2);
    });

    test('Event Batching: queue should be flushed if flushEvents api is called', () => {
      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService,
        batchEvents: {
          requestTimeInterval: 1000,
          eventsPerRequest: 100,
          flushCallback: () => {}
        }
      });
      setTimeout(() => expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0), 1000);
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0);
      vwoClientInstance.batchEventsQueue.enqueue(1);
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(1);
      vwoClientInstance.batchEventsQueue.enqueue(2);
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(2);
      vwoClientInstance.flushEvents();
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0);

      vwoClientInstance = indexFile.launch({
        settingsFile: settingsFile1,
        logger,
        userStorageService,
        batchEvents: {
          requestTimeInterval: 1000,
          eventsPerRequest: 1,
          flushCallback: () => {}
        }
      });

      vwoClientInstance.batchEventsQueue.enqueue(1);
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0);
    });
  });

  describe('method: activate', () => {
    test('should return null if no argument is passed', () => {
      expect(vwoClientInstance.activate()).toBe(null);
    });

    test('should return null if no campaignKey is passed', () => {
      expect(vwoClientInstance.activate('', userId)).toBe(null);
    });

    test('should return null if no userId is passed', () => {
      expect(vwoClientInstance.activate(campaignKey)).toBe(null);
    });

    test('should return null if campaignKey is not found in settingsFile', () => {
      expect(vwoClientInstance.activate('NO_SUCH_CAMPAIGN_KEY', userId)).toBe(null);
    });

    test('should return null if catch block is executed', () => {
      let testClient = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: true
      });
      testClient.SettingsFileManager._clonedSettingsFile = 'settingsFile';
      expect(testClient.activate('campaign_key', userId)).toBe(null);
    });

    test('should return null if shouldTrackReturningUser is not passed as boolean', () => {
      let options = {
        shouldTrackReturningUser: 20
      };
      expect(vwoClientInstance.activate('campaign_key', userId, options)).toBe(null);
      options.shouldTrackReturningUser = 'string';
      expect(vwoClientInstance.activate('campaign_key', userId, options)).toBe(null);
      options.shouldTrackReturningUser = [20];
      expect(vwoClientInstance.activate('campaign_key', userId, options)).toBe(null);
      options.shouldTrackReturningUser = { 20: 20 };
      expect(vwoClientInstance.activate('campaign_key', userId, options)).toBe(null);
    });

    test('should return variation and send track user impression if userStorageService is not passed', () => {
      const campaignKey = settingsFile1.campaigns[0].key;

      // without user storage
      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: true
      });

      let options = {
        shouldTrackReturningUser: false
      };

      let spyTrackUser = jest.spyOn(ImpressionUtil, 'buildEventForTrackingUser');

      vwoClientInstance.activate(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(1);
      vwoClientInstance.activate(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(2);

      // shouldTrackReturning user set to true
      options.shouldTrackReturningUser = true;
      vwoClientInstance.activate(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(3);
      vwoClientInstance.activate(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(4);
      spyTrackUser.mockRestore();
    });

    test('should return variation and no trackuser impression should be sent if userstorage is passed and shouldTrack is false', () => {
      const campaignKey = settingsFile1.campaigns[0].key;

      // without user storage
      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: false,
        userStorageService: userStorageService1
      });

      let options = {
        shouldTrackReturningUser: false
      };

      let spyTrackUser = jest.spyOn(ImpressionUtil, 'buildEventForTrackingUser');

      vwoClientInstance.activate(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(1);
      vwoClientInstance.activate(campaignKey, 'Ashley', options);
      // should not be tracked again
      expect(spyTrackUser.mock.calls.length).toBe(1);

      // shouldTrackReturning user set to true
      options.shouldTrackReturningUser = true;
      // shoudl be tracked now
      vwoClientInstance.activate(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(2);
      vwoClientInstance.activate(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(3);

      // when options are not passed in activate api, global value of shouldTrackReturningUser should be used.
      vwoClientInstance.activate(campaignKey, 'Ashley');
      // should not be tracked again
      expect(spyTrackUser.mock.calls.length).toBe(3);

      // change global value to true
      vwoClientInstance.SettingsFileManager._configObj.shouldTrackReturningUser = true;
      vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(spyTrackUser.mock.calls.length).toBe(4);

      // when the global or local shouldTrackReturningUser is not passed, by default it should be false
      vwoClientInstance.SettingsFileManager._configObj.shouldTrackReturningUser = undefined;
      vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(spyTrackUser.mock.calls.length).toBe(4);
      spyTrackUser.mockRestore();
    });

    test('should return whitelisted variation as the user hash passes the whitelisting', () => {
      const campaignKey = settingsFile1.campaigns[0].key;

      // without user storage
      let vwoInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true
      });

      // when traffic percentage is zero
      vwoInstance.SettingsFileManager._clonedSettingsFile.campaigns[0].isForcedVariationEnabled = true;
      vwoInstance.SettingsFileManager._clonedSettingsFile.campaigns[0].percentTraffic = 0;
      let variation = vwoInstance.activate(campaignKey, 'Ashley');
      expect(variation).toBe(null);

      // when correct hash value is passed
      vwoInstance.SettingsFileManager._clonedSettingsFile.campaigns[0].isUserListEnabled = true;
      vwoInstance.SettingsFileManager._clonedSettingsFile.campaigns[0].variations[1].segments = {
        and: [
          {
            user: 'A46F7AA3A53150368683EE064793BAFD'
          }
        ]
      };
      variation = vwoInstance.activate(campaignKey, 'Ashley');
      expect(variation).toBe('Variation-1');

      // when incorrect hash value is passed
      vwoInstance.SettingsFileManager._clonedSettingsFile.campaigns[0].percentTraffic = 100;
      vwoInstance.SettingsFileManager._clonedSettingsFile.campaigns[0].variations[1].segments = {
        and: [
          {
            user: 'A46F7AA3A53150368683EE064793BAFL'
          }
        ]
      };
      variation = vwoInstance.activate(campaignKey, 'Ashley');
      expect(variation).toBe('Control');
    });

    test('should test against a campaign settings: traffic:50 and split:50-50', () => {
      const campaignKey = settingsFile1.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j]);

        expect(variationName).toBe(settings[campaignKey][i].variation);
        if (variationName) {
          expect(spyImpressionEventTrackUser).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:50-50', () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j]);

        expect(variationName).toBe(settings[campaignKey][i].variation);
        if (variationName) {
          expect(spyImpressionEventTrackUser).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:20-80', () => {
      const campaignKey = settingsFile3.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile3,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j]);

        expect(variationName).toBe(settings[campaignKey][i].variation);
        if (variationName) {
          expect(spyImpressionEventTrackUser).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
        }
      }
    });

    test('should test against a campaign settings: traffic:20 and split:10-90', () => {
      const campaignKey = settingsFile4.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile4,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j]);

        expect(variationName).toBe(settings[campaignKey][i].variation);
        if (variationName) {
          expect(spyImpressionEventTrackUser).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:0-100', () => {
      const campaignKey = settingsFile5.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile5,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j]);

        expect(variationName).toBe(settings[campaignKey][i].variation);
        if (variationName) {
          expect(spyImpressionEventTrackUser).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333', () => {
      const campaignKey = settingsFile6.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile6,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j]);

        expect(variationName).toBe(settings[campaignKey][i].variation);
        if (variationName) {
          expect(spyImpressionEventTrackUser).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
        }
      }
    });

    test('should test against a campaign settings: traffic:100, split:33.3333:33.3333:33.3333 and no dsl', () => {
      const campaignKey = settingsFile6.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile6,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j], {
          customVariables: trueCustomVariables
        });

        expect(variationName).toBe(settings[campaignKey][i].variation);
        if (variationName) {
          expect(spyImpressionEventTrackUser).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
        }
      }
    });

    test('should test against a campaign settings: traffic:100, split:33.3333:33.3333:33.3333 and with dsl', () => {
      const campaignKey = settingsFile7.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile7,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j], {
          customVariables: trueCustomVariables
        });

        expect(variationName).toBe(settings[campaignKey][i].variation);
        if (variationName) {
          expect(spyImpressionEventTrackUser).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
        }
      }
    });
    test('should test against a campaign settings: traffic:100, split:33.3333:33.3333:33.3333 and with dsl', () => {
      const campaignKey = settingsFile7.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile7,
        logger,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j], {
          customVariables: falseCustomVariables
        });

        expect(variationName).toBe(null);
      }
    });

    test('should test against a campaign settings: traffic:100, split:33.3333:33.3333:33.3333 and with dsl and whitelisting', () => {
      const campaignKey = settingsFile8.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile8,
        logger,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j], {
          customVariables: falseCustomVariables,
          variationTargetingVariables: falseWhitelistingTags
        });

        expect(variationName).toBe(null);
      }
    });

    test('should test against a campaign settings: traffic:100, split:33.3333:33.3333:33.3333 and with dsl and whitelisting', () => {
      const campaignKey = settingsFile8.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile8,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const variationName = vwoClientInstance.activate(campaignKey, users[j], {
          customVariables: falseCustomVariables,
          variationTargetingVariables: trueWhitelistingTags
        });

        expect(variationName).toBe(settings[campaignKey][i].variation);
        if (variationName) {
          expect(spyImpressionEventTrackUser).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
        }
      }
    });

    test('should test with returnPromiseFor against a campaign settings: traffic:100 and split:50-50', async () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          activate: true
        }
      });

      await expect(vwoClientInstance.activate('wrong-key', users[0])).resolves.toBe(null);
      await expect(vwoClientInstance.activate(campaignKey, users[0])).resolves.toBe(settings[campaignKey][0].variation);
    });

    test('should test with returnPromiseFor and isDevelopmentMode set to true against a campaign settings: traffic:100 and split:50-50', async () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        isDevelopmentMode: true,
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          activate: true
        }
      });

      await expect(vwoClientInstance.activate('wrong-key', users[0])).resolves.toBe(null);
      await expect(vwoClientInstance.activate(campaignKey, users[0])).resolves.toBe(settings[campaignKey][0].variation);
    });
  });

  describe('method: getVariation', () => {
    test('should return null if no argument is passed', () => {
      expect(vwoClientInstance.getVariationName()).toBe(null);
    });

    test('should return null if no campaignKey is passed', () => {
      expect(vwoClientInstance.getVariationName('', userId)).toBe(null);
    });

    test('should return null if no userId is passed', () => {
      expect(vwoClientInstance.getVariationName(campaignKey)).toBe(null);
    });

    test('should return null if campaignKey is not found in settingsFile', () => {
      expect(vwoClientInstance.getVariationName('NO_SUCH_CAMPAIGN_KEY', userId)).toBe(null);
    });

    test('should return null if catch block is executed', () => {
      let testClient = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: true
      });
      testClient.SettingsFileManager._clonedSettingsFile = 'settingsFile';
      expect(testClient.getVariationName('campaign_key', userId)).toBe(null);
    });

    test('should return null if called before activate API with userStorage passed', () => {
      const campaignKey = settingsFile2.campaigns[0].key;
      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      expect(vwoClientInstance.getVariationName(campaignKey, 'Ashley')).toBe(null);

      // activate the api
      let variationName = vwoClientInstance.activate(campaignKey, 'Ashley');
      // verify the getVariation API again, this time a variation will be returned
      expect(vwoClientInstance.getVariationName(campaignKey, 'Ashley')).toBe(variationName);
      userData = {};
    });

    test('should return variation if called before activate API with no userStorage passed', () => {
      const campaignKey = settingsFile2.campaigns[0].key;
      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        isDevelopmentMode: true
      });

      expect(vwoClientInstance.getVariationName(campaignKey, 'Ashley')).toBe('Control');
    });

    test('should test against a campaign settings: traffic:50 and split:50-50', () => {
      const campaignKey = settingsFile1.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.getVariationName(campaignKey, users[j])).toBe(settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:50-50', () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.getVariationName(campaignKey, users[j])).toBe(settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:20-80', () => {
      const campaignKey = settingsFile3.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile3,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.getVariationName(campaignKey, users[j])).toBe(settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: traffic:20 and split:10-90', () => {
      const campaignKey = settingsFile4.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile4,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.getVariationName(campaignKey, users[j])).toBe(settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:0-100', () => {
      const campaignKey = settingsFile5.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile5,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.getVariationName(campaignKey, users[j])).toBe(settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333', () => {
      const campaignKey = settingsFile6.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile6,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.getVariationName(campaignKey, users[j])).toBe(settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333 with no dsl', () => {
      const campaignKey = settingsFile6.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile6,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.getVariation(campaignKey, users[j], { customVariables: trueCustomVariables })).toBe(
          settings[campaignKey][i].variation
        );
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333 with dsl', () => {
      const campaignKey = settingsFile7.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile7,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.getVariation(campaignKey, users[j], { customVariables: trueCustomVariables })).toBe(
          settings[campaignKey][i].variation
        );
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333 with dsl', () => {
      const campaignKey = settingsFile7.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile7,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.getVariation(campaignKey, users[j], { customVariables: falseCustomVariables })).toBe(
          null
        );
        expect(vwoClientInstance.getVariation(campaignKey, users[j])).toBe(null);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333 with dsl with whitelisting', () => {
      const campaignKey = settingsFile8.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile8,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(
          vwoClientInstance.getVariation(campaignKey, users[j], {
            customVariables: falseCustomVariables,
            variationTargetingVariables: falseWhitelistingTags
          })
        ).toBe(null);
        expect(vwoClientInstance.getVariation(campaignKey, users[j])).toBe(null);
      }
    });
    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333 with dsl with whitelisting', () => {
      const campaignKey = settingsFile8.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile8,
        logger,
        isDevelopmentMode: true
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(
          vwoClientInstance.getVariation(campaignKey, users[j], {
            customVariables: falseCustomVariables,
            variationTargetingVariables: trueWhitelistingTags
          })
        ).toBe(settings[campaignKey][i].variation);
      }
    });

    test('should test with returnPromiseFor against a campaign settings: traffic:100 and split:50-50', async () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          getVariationName: true
        }
      });

      await expect(vwoClientInstance.getVariationName('wrong-key', users[0])).resolves.toBe(null);
      await expect(vwoClientInstance.getVariationName(campaignKey, users[0])).resolves.toBe(
        settings[campaignKey][0].variation
      );
    });

    test('should test with returnPromiseFor and isDevelopment set to true against a campaign settings: traffic:100 and split:50-50', async () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        isDevelopmentMode: true,
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          getVariationName: true
        }
      });

      await expect(vwoClientInstance.getVariationName('wrong-key', users[0])).resolves.toBe(null);
      await expect(vwoClientInstance.getVariationName(campaignKey, users[0])).resolves.toBe(
        settings[campaignKey][0].variation
      );
    });
  });

  describe('method: track', () => {
    test('should return null if no argument is passed', () => {
      expect(vwoClientInstance.track()).toBe(null);
    });

    test('should return false if no campaignKey is passed', () => {
      expect(vwoClientInstance.track('', userId)).toBe(null);
    });

    test('should return false if no userId is passed', () => {
      expect(vwoClientInstance.track(campaignKey)).toBe(null);
    });

    test('should return false if no goalIdentifier is passed', () => {
      expect(vwoClientInstance.track(campaignKey, userId)).toBe(null);
    });

    test('should return false if campaignKey is not found in settingsFile', () => {
      expect(vwoClientInstance.track('NO_SUCH_CAMPAIGN_KEY', userId, goalIdentifier).NO_SUCH_CAMPAIGN_KEY).toBe(false);
    });

    test('should return false if goalIdentifier is not found in settingsFile', () => {
      expect(vwoClientInstance.track(campaignKey, userId, 'NO_SUCH_GOAL_IDENTIFIER')[campaignKey]).toBe(false);
    });

    test('should return null if catch block is executed', () => {
      let testClient = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: true
      });
      testClient.SettingsFileManager._clonedSettingsFile = 'settingsFile';
      expect(testClient.track('campaign_key', userId, 'goal_identifier')).toBe(null);
    });

    test('should return true if revenue prop is passed in the goal', () => {
      vwoClientInstance = new VWO({
        settingsFile: settingsFile11,
        logger,
        isDevelopmentMode: true
      });
      // calling track api without activating
      let trackResponse = vwoClientInstance.track(null, 'Ashley', 'track3', { revenueValue: 200 });
      expect(trackResponse.track1).toBe(true);
    });

    test('should return false if called before activate/isFeatureEnabled with storage service', () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });
      // calling track api without activating
      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.track(campaignKey, users[j], goalIdentifier)[campaignKey]).toBe(false);
      }

      // calling track goal after activating user
      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        vwoClientInstance.activate(campaignKey, users[j]);
        expect(vwoClientInstance.track(campaignKey, users[j], goalIdentifier)[campaignKey]).toBe(true);
      }
    });

    test('should always return true if called before activate/isFeatureEnabled and without storage', () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        isDevelopmentMode: true
      });
      // calling track api without activating
      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.track(campaignKey, users[j], goalIdentifier)[campaignKey]).toBe(true);
      }

      // calling track goal after activating user
      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        vwoClientInstance.activate(campaignKey, users[j]);
        expect(vwoClientInstance.track(campaignKey, users[j], goalIdentifier)[campaignKey]).toBe(true);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_0', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_0.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_0,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.track(campaignKey, users[j], goalIdentifier)[campaignKey]).toBe(false);
      }
    });

    test('should test against a campaign settings: traffic:50 and split:50-50', () => {
      const campaignKey = settingsFile1.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier);

        if (isTracked[campaignKey]) {
          expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
          expect(isTracked[campaignKey]).toBe(true);
        } else {
          expect(isTracked[campaignKey]).toBe(false);
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:50-50', () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier);

        if (isTracked[campaignKey]) {
          expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
          expect(isTracked[campaignKey]).toBe(true);
        } else {
          expect(isTracked[campaignKey]).toBe(false);
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:50-50', () => {
      const campaignKey = settingsFile2.campaigns[0].key;
      const campaignKey1 = 'track1';
      const campaignKey2 = 'track2';

      vwoClientInstance = new VWO({
        settingsFile: settingsFile9,
        logger,
        isDevelopmentMode: true
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(null, users[j], 'track');

        expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
        expect(spyEventQueue).toHaveBeenCalled();
        expect(isTracked[campaignKey1]).toBe(true);
        expect(isTracked[campaignKey2]).toBe(false);
      }

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(null, users[j], 'track', {
          revenueValue: 1
        });

        expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
        expect(spyEventQueue).toHaveBeenCalled();
        expect(isTracked[campaignKey1]).toBe(true);
        expect(isTracked[campaignKey2]).toBe(true);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:50-50', () => {
      const campaignKey = settingsFile2.campaigns[0].key;
      const campaignKey1 = 'track1';
      const campaignKey2 = 'track2';

      vwoClientInstance = new VWO({
        settingsFile: settingsFile9,
        logger,
        isDevelopmentMode: true
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(null, users[j], 'track2', {
          revenueValue: 1,
          goalTypeToTrack: GoalTypeEnum.CUSTOM
        });

        expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
        expect(spyEventQueue).toHaveBeenCalled();
        expect(isTracked[campaignKey1]).toBe(true);
        expect(isTracked[campaignKey2]).toBe(true);
      }

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(null, users[j], 'track2', {
          revenueValue: 1,
          goalTypeToTrack: GoalTypeEnum.REVENUE
        });

        expect(isTracked).toBe(null);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:50-50', () => {
      const campaignKey = settingsFile2.campaigns[0].key;
      const campaignKey1 = 'track1';
      const campaignKey2 = 'track2';

      vwoClientInstance = new VWO({
        settingsFile: settingsFile9,
        logger,
        isDevelopmentMode: true
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(null, users[j], 'track3', {
          revenueValue: 1,
          goalTypeToTrack: GoalTypeEnum.REVENUE
        });

        expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
        expect(spyEventQueue).toHaveBeenCalled();
        expect(isTracked[campaignKey1]).toBe(true);
        expect(isTracked[campaignKey2]).toBe(true);
      }

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(null, users[j], 'track3', {
          revenueValue: 1,
          goalTypeToTrack: GoalTypeEnum.CUSTOM
        });

        expect(isTracked).toBe(null);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:50-50', () => {
      const campaignKey = settingsFile2.campaigns[0].key;
      const campaignKey1 = 'track1';
      const campaignKey2 = 'track2';

      vwoClientInstance = new VWO({
        settingsFile: settingsFile9,
        logger,
        isDevelopmentMode: true
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(['track1', 'track2'], users[j], 'track');

        expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
        expect(spyEventQueue).toHaveBeenCalled();
        expect(isTracked[campaignKey1]).toBe(true);
        expect(isTracked[campaignKey2]).toBe(false);
      }

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(null, users[j], 'track', {
          revenueValue: 1
        });

        expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
        expect(spyEventQueue).toHaveBeenCalled();
        expect(isTracked[campaignKey1]).toBe(true);
        expect(isTracked[campaignKey2]).toBe(true);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:50-50', () => {
      const campaignKey = settingsFile2.campaigns[0].key;
      const campaignKey1 = 'track1';
      const campaignKey2 = 'track2';

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');
      vwoClientInstance = new VWO({
        settingsFile: settingsFile9,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1,
        shouldTrackReturningUser: false
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        vwoClientInstance.isFeatureEnabled(campaignKey1, users[j]);
        vwoClientInstance.activate(campaignKey2, users[j]);
        let isTracked = vwoClientInstance.track([campaignKey1, campaignKey2], users[j], 'track', {
          revenueValue: 1,
          shouldTrackReturningUser: false
        });

        expect(isTracked[campaignKey1]).toBe(true);
        expect(isTracked[campaignKey2]).toBe(true);

        isTracked = vwoClientInstance.track([campaignKey1, campaignKey2], users[j], 'track', {
          revenueValue: 1,
          shouldTrackReturningUser: false
        });

        expect(isTracked[campaignKey1]).toBe(false);
        expect(isTracked[campaignKey2]).toBe(false);

        isTracked = vwoClientInstance.track([campaignKey1, campaignKey2], users[j], 'track', {
          revenueValue: 1,
          shouldTrackReturningUser: true
        });

        expect(isTracked[campaignKey1]).toBe(true);
        expect(isTracked[campaignKey2]).toBe(true);

        isTracked = vwoClientInstance.track([campaignKey1, campaignKey2], users[j], 'track', {
          revenueValue: 1
        });

        expect(isTracked[campaignKey1]).toBe(false);
        expect(isTracked[campaignKey2]).toBe(false);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:20-80', () => {
      const campaignKey = settingsFile3.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile3,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier);

        if (isTracked[campaignKey]) {
          expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
          expect(isTracked[campaignKey]).toBe(true);
        } else {
          expect(isTracked[campaignKey]).toBe(false);
        }
      }
    });

    test('should test against a campaign settings: traffic:20 and split:10-90', () => {
      const campaignKey = settingsFile4.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile4,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier);

        if (isTracked[campaignKey]) {
          expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
          expect(isTracked[campaignKey]).toBe(true);
        } else {
          expect(isTracked[campaignKey]).toBe(false);
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:0-100', () => {
      const campaignKey = settingsFile5.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile5,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier);

        if (isTracked[campaignKey]) {
          expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
          expect(isTracked[campaignKey]).toBe(true);
        } else {
          expect(isTracked[campaignKey]).toBe(false);
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333', () => {
      const campaignKey = settingsFile6.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile6,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier);

        if (isTracked[campaignKey]) {
          expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
          expect(isTracked[campaignKey]).toBe(true);
        } else {
          expect(isTracked[campaignKey]).toBe(false);
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333 with no dsl', () => {
      const campaignKey = settingsFile6.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile6,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier, {
          customVariables: trueCustomVariables
        });

        if (isTracked[campaignKey]) {
          expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
          expect(isTracked[campaignKey]).toBe(true);
        } else {
          expect(isTracked[campaignKey]).toBe(false);
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333 with dsl', () => {
      const campaignKey = settingsFile7.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile6,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier, {
          customVariables: trueCustomVariables
        });

        if (isTracked[campaignKey]) {
          expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
          expect(isTracked[campaignKey]).toBe(true);
        } else {
          expect(isTracked[campaignKey]).toBe(false);
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333 with dsl', () => {
      const campaignKey = settingsFile7.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile6,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier, {
          customVariables: falseCustomVariables
        });

        if (isTracked[campaignKey]) {
          expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
          expect(spyEventQueue).toHaveBeenCalled();
          expect(isTracked[campaignKey]).toBe(true);
        } else {
          expect(isTracked[campaignKey]).toBe(false);
        }
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333 with dsl and whitelisting', () => {
      const campaignKey = settingsFile8.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile8,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier, {
          customVariables: falseCustomVariables,
          variationTargetingVariables: falseWhitelistingTags
        });
        expect(isTracked[campaignKey]).toBe(false);
      }
    });

    test('should test against a campaign settings: traffic:100 and split:33.3333:33.3333:33.3333 with dsl and whitelisting', () => {
      const campaignKey = settingsFile8.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile8,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isTracked = vwoClientInstance.track(campaignKey, users[j], goalIdentifier, {
          customVariables: falseCustomVariables,
          variationTargetingVariables: trueWhitelistingTags
        });
        expect(spyImpressionEventTrackGoal).toHaveBeenCalled();
        expect(spyEventQueue).toHaveBeenCalled();
        expect(isTracked[campaignKey]).toBe(true);
      }
    });

    test('should test with returnPromiseFor against a wrong campaign', async () => {
      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          track: true
        }
      });

      await expect(vwoClientInstance.track('wrong-key', users[0], goalIdentifier)).resolves.toEqual({
        'wrong-key': false
      });
    });

    test('should test with returnPromiseFor against a campaign settings: traffic:100 and split:50-50', async () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          track: true
        }
      });

      await expect(vwoClientInstance.track(campaignKey, users[0], goalIdentifier)).resolves.toEqual({
        [campaignKey]: true
      });
    });

    test('should test with returnPromiseFor and isDevelopmentMode set to true against a campaign settings: traffic:100 and split:50-50', async () => {
      const campaignKey = settingsFile2.campaigns[0].key;

      vwoClientInstance = new VWO({
        isDevelopmentMode: true,
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          track: true
        }
      });

      await expect(vwoClientInstance.track(campaignKey, users[0], goalIdentifier)).resolves.toEqual({
        [campaignKey]: true
      });
    });
  });

  describe('method: isFeatureEnabled', () => {
    test('should return false if no argument is passed', () => {
      expect(vwoClientInstance.isFeatureEnabled()).toBe(false);
    });

    test('should return false if no campaignKey is passed', () => {
      expect(vwoClientInstance.isFeatureEnabled('', userId)).toBe(false);
    });

    test('should return false if no userId is passed', () => {
      expect(vwoClientInstance.isFeatureEnabled(campaignKey)).toBe(false);
    });

    test('should return false if campaignKey is not found in settingsFile', () => {
      expect(vwoClientInstance.isFeatureEnabled('NO_SUCH_CAMPAIGN_KEY', userId)).toBe(false);
    });

    test('should return true/false if the whitelisting is satisfied/unsatisfied for feature-rollout campaign', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100_WHITELISTING.campaigns[0].key;
      let vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_100_WHITELISTING,
        logger,
        isDevelopmentMode: true
      });

      let options = {
        variationTargetingVariables: {
          safari: true
        }
      };
      // whitelisting is satisfied.
      let isFeatureEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(isFeatureEnabled).toBe(true);

      // whitelisting is not satisfied but still the user is eligible for the campaign as the
      // traffic percentage is set to 100
      options.variationTargetingVariables.safari = false;
      isFeatureEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(isFeatureEnabled).toBe(true);

      // whitelisting is not satisfied and campaign traffic is set to 10
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[0].percentTraffic = 10;

      isFeatureEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(isFeatureEnabled).toBe(false);

      // whitelisting is satisfied and campaign traffic is set to 0
      options.variationTargetingVariables.safari = true;
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[0].percentTraffic = 0;

      isFeatureEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(isFeatureEnabled).toBe(true);
    });

    test('should return null if catch block is executed', () => {
      let testClient = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: true
      });
      testClient.SettingsFileManager._clonedSettingsFile = 'settingsFile';
      expect(testClient.isFeatureEnabled('campaign_key', userId)).toBe(false);
    });

    test('should return null if shouldTrackReturningUser is not passed as boolean', () => {
      let options = {
        shouldTrackReturningUser: 20
      };
      expect(vwoClientInstance.isFeatureEnabled('campaign_key', userId, options)).toBe(false);
      options.shouldTrackReturningUser = 'string';
      expect(vwoClientInstance.isFeatureEnabled('campaign_key', userId, options)).toBe(false);
      options.shouldTrackReturningUser = [20];
      expect(vwoClientInstance.isFeatureEnabled('campaign_key', userId, options)).toBe(false);
      options.shouldTrackReturningUser = { 20: 20 };
      expect(vwoClientInstance.isFeatureEnabled('campaign_key', userId, options)).toBe(false);
    });

    test('should return result and send track user impression if userStorageService is not passed', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100.campaigns[0].key;

      // without user storage
      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: true
      });

      let options = {
        shouldTrackReturningUser: false
      };

      spyImpressionEventTrackUser.mockRestore();
      let spyTrackUser = jest.spyOn(ImpressionUtil, 'buildEventForTrackingUser');

      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(1);
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(2);

      // shouldTrackReturning user set to true
      options.shouldTrackReturningUser = true;
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(3);
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(spyTrackUser.mock.calls.length).toBe(4);
      spyTrackUser.mockRestore();
    });

    test('should return variation and no trackuser impression should be sent if userstorage is passed and shouldTrack is false', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100.campaigns[0].key;

      // without user storage
      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: false,
        userStorageService: userStorageService1
      });

      let options = {
        shouldTrackReturningUser: false
      };

      spyImpressionEventTrackUser = jest.spyOn(ImpressionUtil, 'buildEventForTrackingUser');

      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(1);
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      // should not be tracked again
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(1);

      // shouldTrackReturning user set to true
      options.shouldTrackReturningUser = true;
      // shoudl be tracked now
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(2);
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(3);

      // when options are not passed in isFeatureEnabled api, global value of shouldTrackReturningUser should be used.
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley');
      // should not be tracked again
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(3);

      // change global value to true
      vwoClientInstance.SettingsFileManager._configObj.shouldTrackReturningUser = true;
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley');
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(4);

      // when the global or local shouldTrackReturningUser is not passed, by default it should be false
      vwoClientInstance.SettingsFileManager._configObj.shouldTrackReturningUser = undefined;
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley');
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(4);
      userData = {};
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_0', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_0.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_0,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isFeatureEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, users[j]);

        expect(isFeatureEnabled).toBe(!!settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_25', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_25.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_25,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isFeatureEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, users[j]);

        expect(isFeatureEnabled).toBe(!!settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_50', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_50.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_50,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isFeatureEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, users[j]);

        expect(isFeatureEnabled).toBe(!!settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_75', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_75.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_75,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isFeatureEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, users[j]);

        expect(isFeatureEnabled).toBe(!!settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_100', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_100,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyImpressionEventTrackUser.mockClear();
      spyImpressionEventTrackUser = jest.spyOn(ImpressionUtil, 'buildEventForTrackingUser');
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(0);

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isFeatureEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, users[j]);

        expect(isFeatureEnabled).toBe(!!settings[campaignKey][i].variation);
        expect(spyImpressionEventTrackUser.mock.calls.length).toBe(i + 1);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_100', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_100,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      spyImpressionEventTrackUser.mockClear();
      spyImpressionEventTrackUser = jest.spyOn(ImpressionUtil, 'buildEventForTrackingUser');
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(0);

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(
          vwoClientInstance.isFeatureEnabled(campaignKey, users[j], { customVariables: trueCustomVariables })
        ).toBe(!!settings[campaignKey][i].variation);
        expect(spyImpressionEventTrackUser.mock.calls.length).toBe(i + 1);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100 with dsl', () => {
      const campaignKey = FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100,
        logger,
        userStorageService
      });

      spyImpressionEventTrackUser.mockClear();
      spyImpressionEventTrackUser = jest.spyOn(ImpressionUtil, 'buildEventForTrackingUser');
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(0);

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        const isFeatureEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, users[j], {
          customVariables: trueCustomVariables
        });

        expect(isFeatureEnabled).toBe(!!settings[campaignKey][i].variation);
        expect(spyImpressionEventTrackUser.mock.calls.length).toBe(i + 1);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100 with dsl', () => {
      const campaignKey = FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100,
        logger,
        userStorageService
      });

      spyImpressionEventTrackUser.mockClear();
      spyImpressionEventTrackUser = jest.spyOn(ImpressionUtil, 'buildEventForTrackingUser');
      expect(spyImpressionEventTrackUser.mock.calls.length).toBe(0);

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(
          vwoClientInstance.isFeatureEnabled(campaignKey, users[j], { customVariables: falseCustomVariables })
        ).toBe(false);
        expect(spyImpressionEventTrackUser.mock.calls.length).toBe(0);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_10 with dsl and whitelisting', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100_WHITELISTING.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100_WHITELISTING,
        logger,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(
          vwoClientInstance.isFeatureEnabled(campaignKey, users[j], {
            customVariables: falseCustomVariables,
            variationTargetingVariables: falseWhitelistingTags
          })
        ).toBe(false);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_10 with dsl and whitelisting', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100_WHITELISTING.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100_WHITELISTING,
        logger,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(
          vwoClientInstance.isFeatureEnabled(campaignKey, users[j], {
            customVariables: trueCustomVariables,
            variationTargetingVariables: trueWhitelistingTags
          })
        ).toBe(!!settings[campaignKey][i].variation);
      }
    });

    test('should not return feature variable value against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_100 when not activated', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_100,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: false,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', users[j])).toBe(null);
      }
    });

    test('should return feature variable value against a campaign settings: FEATURE_ROLLOUT_TRAFFIC_100 when activated', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_100,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: false,
        userStorageService: userStorageService1
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        vwoClientInstance.isFeatureEnabled(campaignKey, users[j]);

        expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', users[j])).not.toBe(null);
      }
    });

    test('should test with returnPromiseFor against a campaign settings: traffic:100 and split:50-50', async () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          isFeatureEnabled: true
        }
      });

      await expect(vwoClientInstance.isFeatureEnabled('wrong-key', users[0])).resolves.toBe(false);
      await expect(vwoClientInstance.isFeatureEnabled(campaignKey, users[0])).resolves.toBe(false);
    });

    test('should test with returnPromiseFor and isDevelopmentMode set to true against a campaign settings: traffic:100 and split:50-50', async () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        isDevelopmentMode: true,
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          isFeatureEnabled: true
        }
      });

      await expect(vwoClientInstance.isFeatureEnabled('wrong-key', users[0])).resolves.toBe(false);
      await expect(vwoClientInstance.isFeatureEnabled(campaignKey, users[0])).resolves.toBe(false);
    });
  });

  describe('method: push', () => {
    test('should return false if no argument is passed', () => {
      expect(vwoClientInstance.push()).toBe(false);
    });
    test('should return false if tagKey is not string', () => {
      expect(vwoClientInstance.push(1, 'a', 'a')).toBe(false);
    });
    test('should return false if tagValue is not string', () => {
      expect(vwoClientInstance.push('a', 1, 'a')).toBe(false);
    });
    test('should return false if userId is not string', () => {
      expect(vwoClientInstance.push('a', 'a', 1)).toBe(false);
    });
    test("should return false if tagKey's length is more than 255", () => {
      expect(vwoClientInstance.push(bigStr, 'a', 'a')).toBe(false);
    });
    test("should return false if tagValue's length is more than 255", () => {
      expect(vwoClientInstance.push('a', bigStr, 'a')).toBe(false);
    });
    test('should return false if customDimension is not an Object', () => {
      expect(vwoClientInstance.push('a', 'a')).toBe(false);
      expect(vwoClientInstance.push(123, 'a')).toBe(false);
      expect(vwoClientInstance.push(false, 'a')).toBe(false);
      expect(vwoClientInstance.push(undefined, 'a')).toBe(false);
      expect(vwoClientInstance.push({}, 'a')).toBe(false);
    });
    test('should return false if params length is more than 3', () => {
      expect(vwoClientInstance.push({}, 'a', 'a', 'a')).toBe(false);
    });

    test('should return null if catch block is executed', () => {
      let testClient = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: true
      });
      testClient.SettingsFileManager._clonedSettingsFile = 'settingsFile';
      expect(testClient.push(' ', ' ', userId)).toBe(false);
    });

    test('should test against correct params', () => {
      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');
      expect(vwoClientInstance.push('1', '1', '1')).toEqual({ '1': true });
      expect(vwoClientInstance.push({ a: 'a' }, 'userId')).toEqual({ a: true });
      expect(spyImpressionEventPush).toHaveBeenCalled();
      expect(spyEventQueue).toHaveBeenCalled();
    });

    test('should test for multiple custom dimensions when event batching and event architecture is not enabled', () => {
      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');
      expect(vwoClientInstance.push('tagKey', 'tagValue', 'userId')).toEqual({ tagKey: true });
      expect(spyEventQueue).toHaveBeenCalledTimes(1);
      expect(
        vwoClientInstance.push(
          {
            tag_key_1: 'tag_value_1',
            tag_key_2: 'tag_value_2',
            tag_key_3: 'tag_value_3'
          },
          'userId'
        )
      ).toEqual({ tag_key_1: true, tag_key_2: true, tag_key_3: true });
      expect(spyEventQueue).toHaveBeenCalledTimes(4);
    });

    test('should test for multiple custom dimensions when event batching is not enabled and event architecture is enabled', () => {
      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        userStorageService
      });

      vwoClientInstance.SettingsFileManager._clonedSettingsFile.isEventArchEnabled = true;

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');
      expect(vwoClientInstance.push('tagKey', 'tagValue', 'userId')).toEqual({ success: true });
      expect(spyEventQueue).toHaveBeenCalledTimes(1);
      expect(
        vwoClientInstance.push(
          {
            tag_key_1: 'tag_value_1',
            tag_key_2: 'tag_value_2',
            tag_key_3: 'tag_value_3'
          },
          'userId'
        )
      ).toEqual({ success: true });
      expect(spyEventQueue).toHaveBeenCalledTimes(2);
    });

    test('should test for multiple custom dimensions when event batching and event architecture is enabled', () => {
      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        userStorageService,
        batchEvents: {
          eventsPerRequest: 5,
          flushCallback: {}
        }
      });

      vwoClientInstance.SettingsFileManager._clonedSettingsFile.isEventArchEnabled = true;

      expect(vwoClientInstance.push('tagKey', 'tagValue', 'userId')).toEqual({ tagKey: true });
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(1);
      expect(
        vwoClientInstance.push(
          {
            tag_key_1: 'tag_value_1',
            tag_key_2: 'tag_value_2',
            tag_key_3: 'tag_value_3'
          },
          'userId'
        )
      ).toEqual({ tag_key_1: true, tag_key_2: true, tag_key_3: true });
      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(4);
    });

    test('should test with returnPromiseFor', async () => {
      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          push: true
        }
      });

      await expect(vwoClientInstance.push({ a: 'a' }, 'a')).resolves.toEqual({ a: true });
    });

    test('should test with returnPromiseFor and isDevelopmentMode set to true', async () => {
      vwoClientInstance = new VWO({
        isDevelopmentMode: true,
        settingsFile: settingsFile2,
        logger,
        returnPromiseFor: {
          push: true
        }
      });

      await expect(vwoClientInstance.push({ a: 'a' }, 'a')).resolves.toEqual({ a: true });
    });
  });

  describe('method: getFeatureVariableValue', () => {
    test('should return null if no argument is passed', () => {
      expect(vwoClientInstance.getFeatureVariableValue()).toBe(null);
    });

    test('should return null if no campaignKey is passed', () => {
      expect(vwoClientInstance.getFeatureVariableValue('', userId)).toBe(null);
    });

    test('should return null if no userId is passed', () => {
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey)).toBe(null);
    });

    test('should return null if no variableKey is passed', () => {
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'variable-key', userId)).toBe(null);
    });

    test('should return null if campaignKey is not found in settingsFile', () => {
      expect(vwoClientInstance.getFeatureVariableValue('NO_SUCH_CAMPAIGN_KEY', 'variable-key', userId)).toBe(null);
    });

    test('should return null if campaignKey is not found in settingsFile', () => {
      expect(vwoClientInstance.getFeatureVariableValue('DEV_TEST_1', 'variable-key', userId)).toBe(null);
    });

    test('should return json variable', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_JSON_100.campaigns[0].key;
      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_JSON_100,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      // call the track api
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Faizan');
      // verify the getVariation API again, this time a variation will be returned
      let variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'JSON_VARIABLE1', 'Faizan');
      expect(variableValue).toStrictEqual({
        type: 'json',
        value: 'json'
      });

      variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'JSON_VARIABLE2', 'Faizan');
      expect(variableValue).toStrictEqual({
        json: {
          type: 'json',
          value: 'json'
        },
        json1: {
          type: 'json1',
          value: 'json1'
        }
      });

      vwoClientInstance.isFeatureEnabled(campaignKey, 'Chris');
      variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'JSON_VARIABLE1', 'Chris');
      expect(variableValue).toStrictEqual({
        jsonArray: [
          {
            type: 'json',
            value: 'json'
          }
        ]
      });

      variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'JSON_VARIABLE2', 'Chris');
      expect(variableValue).toStrictEqual({
        jsonObject: {
          type: 'json',
          value: 'json'
        },
        jsonArray: [
          {
            type1: 'json1',
            value1: 'json1'
          },
          {
            type2: 'json2',
            value2: 'json2'
          }
        ]
      });
      variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'JSON_VARIABLE3', 'Chris');
      expect(variableValue).toStrictEqual(null);
      variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'JSON_VARIABLE4', 'Chris');
      expect(variableValue).toStrictEqual(null);
      variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'JSON_VARIABLE5', 'Chris');
      expect(variableValue).toStrictEqual(null);
    });

    test('should return null if called before isFeatureEnabled API with userStorage passed', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100.campaigns[0].key;
      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Faizan')).toBe(null);

      // call the track api
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Faizan');
      // verify the getVariation API again, this time a variation will be returned
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Faizan')).toBe(
        'Variation-2 string'
      );
    });

    test('should return variation if called before activate API with no userStorage passed', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100.campaigns[0].key;
      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100,
        logger,
        isDevelopmentMode: true
      });

      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Faizan')).toBe(
        'Variation-2 string'
      );
    });

    test('should return null if feature rollout campaign but percent traffic is 0', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_0.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_0,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', userId)).toBe(null);
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'INTEGER_VARIABLE', userId)).toBe(null);
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'FLOAT_VARIABLE', userId)).toBe(null);
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'BOOLEAN_VARIABLE', userId)).toBe(null);
    });

    test('should return variable value if feature rollout campaign but percent traffic is 100', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_100,
        logger,
        isDevelopmentMode: true
      });

      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', userId)).toBe(
        'this_is_a_string'
      );
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'INTEGER_VARIABLE', userId)).toBe(123);
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'FLOAT_VARIABLE', userId)).toBe(123.456);
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'BOOLEAN_VARIABLE', userId)).toBe(true);
    });

    test('should return null if feature test campaign but percent traffic is 0', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_0.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_0,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', userId)).toBe(null);
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'INTEGER_VARIABLE', userId)).toBe(null);
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'FLOAT_VARIABLE', userId)).toBe(null);
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'BOOLEAN_VARIABLE', userId)).toBe(null);
    });

    test('should return variable value if feature test campaign but percent traffic is 100', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100,
        logger,
        isDevelopmentMode: true
      });

      expect(
        vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Ashley', {
          customVariables: trueCustomVariables
        })
      ).toBe('Variation-2 string');
      expect(
        vwoClientInstance.getFeatureVariableValue(campaignKey, 'INTEGER_VARIABLE', 'Ashley', {
          customVariables: trueCustomVariables
        })
      ).toBe(789);
    });
    test('should return null if feature test campaign but percent traffic is 100 with whitelisting and dsl', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100_WHITELISTING.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100_WHITELISTING,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      expect(
        vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', userId, {
          variationTargetingVariables: falseWhitelistingTags,
          customVariables: falseCustomVariables
        })
      ).toBe(null);
      expect(
        vwoClientInstance.getFeatureVariableValue(campaignKey, 'INTEGER_VARIABLE', userId, {
          variationTargetingVariables: falseWhitelistingTags,
          customVariables: falseCustomVariables
        })
      ).toBe(null);
      expect(
        vwoClientInstance.getFeatureVariableValue(campaignKey, 'FLOAT_VARIABLE', userId, {
          variationTargetingVariables: falseWhitelistingTags,
          customVariables: falseCustomVariables
        })
      ).toBe(null);
      expect(
        vwoClientInstance.getFeatureVariableValue(campaignKey, 'BOOLEAN_VARIABLE', userId, {
          variationTargetingVariables: falseWhitelistingTags,
          customVariables: falseCustomVariables
        })
      ).toBe(null);
    });
    test('should return variable value if feature test campaign but percent traffic is 100 with whitelisting and dsl', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100_WHITELISTING.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100_WHITELISTING,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      expect(
        vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Ashley', {
          customVariables: falseCustomVariables,
          variationTargetingVariables: trueWhitelistingTags
        })
      ).toBe('Variation-2 string');
      expect(
        vwoClientInstance.getFeatureVariableValue(campaignKey, 'INTEGER_VARIABLE', 'Ashley', {
          customVariables: falseCustomVariables,
          variationTargetingVariables: trueWhitelistingTags
        })
      ).toBe(789);
    });
    test('should return variable value if feature test campaign but percent traffic is 100 with dsl', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100_WHITELISTING.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100_WHITELISTING,
        logger,
        isDevelopmentMode: true
      });

      expect(
        vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Ashley', {
          customVariables: trueCustomVariables
        })
      ).toBe('Variation-2 string');
      expect(
        vwoClientInstance.getFeatureVariableValue(campaignKey, 'INTEGER_VARIABLE', 'Ashley', {
          customVariables: trueCustomVariables
        })
      ).toBe(789);
    });
  });

  test('should test with returnPromiseFor against a campaign settings: traffic:100 and split:50-50', async () => {
    const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100.campaigns[0].key;

    vwoClientInstance = new VWO({
      settingsFile: FEATURE_ROLLOUT_TRAFFIC_100,
      logger,
      returnPromiseFor: {
        getFeatureVariableValue: true
      }
    });

    await expect(vwoClientInstance.getFeatureVariableValue('wrong-kwy', 'STRING_VARIABLE', userId)).resolves.toBe(null);
    await expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', userId)).resolves.toBe(
      'this_is_a_string'
    );
  });

  test('should test with returnPromiseFor and isDevelopmentMode set to true against a campaign settings: traffic:100 and split:50-50', async () => {
    const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100.campaigns[0].key;

    vwoClientInstance = new VWO({
      isDevelopmentMode: true,
      settingsFile: FEATURE_ROLLOUT_TRAFFIC_100,
      logger,
      returnPromiseFor: {
        getFeatureVariableValue: true
      }
    });

    await expect(vwoClientInstance.getFeatureVariableValue('wrong-kwy', 'STRING_VARIABLE', userId)).resolves.toBe(null);
    await expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', userId)).resolves.toBe(
      'this_is_a_string'
    );
  });

  describe('opt-out', () => {
    test('opt-out is enabled for non-promisified VISUAL_AB APIs', () => {
      let campaignKey = settingsFile1.campaigns[0].key;
      let goalIdentifier = settingsFile1.campaigns[0].goals[0].identifier;

      let vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        batchEvents: {
          eventsPerRequest: 1000
        }
      });
      let variationName = vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(variationName).toBe('Variation-1');

      let getVariationName = vwoClientInstance.getVariationName(campaignKey, 'Ashley');
      expect(getVariationName).toBe('Variation-1');

      let trackResponse = vwoClientInstance.track(campaignKey, 'Ashley', goalIdentifier);
      expect(trackResponse[campaignKey]).toBe(true);

      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(2);
      // enable the opt-out
      expect(vwoClientInstance.setOptOut()).toBe(true);

      expect(vwoClientInstance.batchEventsQueue.queue.length).toBe(0);
      expect(vwoClientInstance.SettingsFileManager).toStrictEqual(undefined);
      expect(vwoClientInstance.usageStats).toStrictEqual(undefined);
      expect(vwoClientInstance.eventQueue).toStrictEqual(undefined);
      expect(vwoClientInstance.userStorageService).toStrictEqual(undefined);
      expect(vwoClientInstance.optOut).toStrictEqual(true);

      variationName = vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(variationName).toBe(null);

      getVariationName = vwoClientInstance.getVariationName(campaignKey, 'Ashley');
      expect(getVariationName).toBe(null);

      trackResponse = vwoClientInstance.track(campaignKey, 'Ashley', goalIdentifier);
      expect(trackResponse).toBe(null);
    });

    test('opt-out is enabled for promisified VISUAL_AB APIs', async () => {
      let campaignKey = settingsFile1.campaigns[0].key;
      let goalIdentifier = settingsFile1.campaigns[0].goals[0].identifier;

      let vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        returnPromiseFor: {
          activate: true,
          getVariationName: true,
          track: true,
          optOut: true
        },
        logger
      });
      await expect(vwoClientInstance.activate(campaignKey, 'Ashley')).resolves.toBe('Variation-1');
      await expect(vwoClientInstance.getVariationName(campaignKey, 'Ashley')).resolves.toBe('Variation-1');
      let trackResponse = await vwoClientInstance.track(campaignKey, 'Ashley', goalIdentifier);
      expect(trackResponse[campaignKey]).toBe(true);

      // enable the opt-out
      await expect(vwoClientInstance.setOptOut()).resolves.toBe(true);
      expect(vwoClientInstance.SettingsFileManager).toStrictEqual(undefined);
      expect(vwoClientInstance.usageStats).toStrictEqual(undefined);
      expect(vwoClientInstance.eventQueue).toStrictEqual(undefined);
      expect(vwoClientInstance.userStorageService).toStrictEqual(undefined);
      expect(vwoClientInstance.optOut).toStrictEqual(true);

      await expect(vwoClientInstance.activate(campaignKey, 'Ashley')).resolves.toBe(null);
      await expect(vwoClientInstance.getVariationName(campaignKey, 'Ashley')).resolves.toBe(null);
      trackResponse = await vwoClientInstance.track(campaignKey, 'Ashley', goalIdentifier);
      expect(trackResponse).toBe(null);
    });

    test('opt-out is enabled for non-promisified FEATURE Rollout/Test APIs', () => {
      let featureCampaignKey = FEATURE_TEST_TRAFFIC_100.campaigns[0].key;
      let variableKey = FEATURE_TEST_TRAFFIC_100.campaigns[0].variations[0].variables[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100,
        logger,
        isDevelopmentMode: true
      });

      let isFeatureEnabled = vwoClientInstance.isFeatureEnabled(featureCampaignKey, 'Ashley');
      expect(isFeatureEnabled).toBe(true);

      let variableValue = vwoClientInstance.getFeatureVariableValue(featureCampaignKey, variableKey, 'Ashley');
      expect(variableValue).toBe('Variation-2 string');

      let push = vwoClientInstance.push('tagKey', 'tagValue', 'Ashley');
      expect(push.tagKey).toBe(true);

      // enable the opt-out
      expect(vwoClientInstance.setOptOut()).toBe(true);

      isFeatureEnabled = vwoClientInstance.isFeatureEnabled(featureCampaignKey, 'Ashley');
      expect(isFeatureEnabled).toBe(false);

      variableValue = vwoClientInstance.getFeatureVariableValue(featureCampaignKey, variableKey, 'Ashley');
      expect(variableValue).toBe(null);

      push = vwoClientInstance.push('tagKey', 'tagValue', 'Ashley');
      expect(push).toBe(null);
    });

    test('opt-out is enabled for promisified FEATURE Rollout/Test APIs', async () => {
      let featureCampaignKey = FEATURE_TEST_TRAFFIC_100.campaigns[0].key;
      let variableKey = FEATURE_TEST_TRAFFIC_100.campaigns[0].variations[0].variables[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100,
        logger,
        returnPromiseFor: {
          isFeatureEnabled: true,
          getFeatureVariableValue: true,
          push: true,
          optOut: true
        }
      });

      await expect(vwoClientInstance.isFeatureEnabled(featureCampaignKey, 'Ashley')).resolves.toBe(true);
      await expect(vwoClientInstance.getFeatureVariableValue(featureCampaignKey, variableKey, 'Ashley')).resolves.toBe(
        'Variation-2 string'
      );
      let pushResponse = await vwoClientInstance.push('tagKey', 'tagValue', 'Ashley');
      expect(pushResponse.tagKey).toBe(true);

      // enable the opt-out
      await expect(vwoClientInstance.setOptOut()).resolves.toBe(true);

      expect(vwoClientInstance.SettingsFileManager).toStrictEqual(undefined);
      expect(vwoClientInstance.usageStats).toStrictEqual(undefined);
      expect(vwoClientInstance.eventQueue).toStrictEqual(undefined);
      expect(vwoClientInstance.userStorageService).toStrictEqual(undefined);
      expect(vwoClientInstance.optOut).toStrictEqual(true);

      await expect(vwoClientInstance.isFeatureEnabled(featureCampaignKey, 'Ashley')).resolves.toBe(false);
      await expect(vwoClientInstance.getFeatureVariableValue(featureCampaignKey, variableKey, 'Ashley')).resolves.toBe(
        null
      );
      pushResponse = await vwoClientInstance.push('tagKey', 'tagValue', 'Ashley');
      expect(pushResponse).toBe(null);

      // new initializing the instance should return expected results for APIs

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100,
        logger,
        returnPromiseFor: {
          isFeatureEnabled: true,
          getFeatureVariableValue: true,
          push: true
        }
      });

      await expect(vwoClientInstance.isFeatureEnabled(featureCampaignKey, 'Ashley')).resolves.toBe(true);
      await expect(vwoClientInstance.getFeatureVariableValue(featureCampaignKey, variableKey, 'Ashley')).resolves.toBe(
        'Variation-2 string'
      );
      pushResponse = await vwoClientInstance.push('tagKey', 'tagValue', 'Ashley');
      expect(pushResponse.tagKey).toBe(true);
    });
  });
});
