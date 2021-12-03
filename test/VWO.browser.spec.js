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
  settingsFile10
} = require('./test-utils/data/settingsFiles');

const {
  FEATURE_ROLLOUT_TRAFFIC_0,
  FEATURE_ROLLOUT_TRAFFIC_25,
  FEATURE_ROLLOUT_TRAFFIC_50,
  FEATURE_ROLLOUT_TRAFFIC_75,
  FEATURE_ROLLOUT_TRAFFIC_100,
  FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100
} = require('./test-utils/data/feature-rollout-settingsFile');

const {
  FEATURE_TEST_TRAFFIC_0,
  // FEATURE_TEST_TRAFFIC_25,
  // FEATURE_TEST_TRAFFIC_50,
  // FEATURE_TEST_TRAFFIC_75,
  FEATURE_TEST_TRAFFIC_100,
  FEATURE_TEST_TRAFFIC_100_WHITELISTING
} = require('./test-utils/data/feature-test-settingsFile');

const settings = require('./test-utils/data/settingsFileAndUsersExpectation');
const testUtil = require('./test-utils/TestUtil');
const users = testUtil.getUsers();
const mockFn = jest.fn();
const GoalTypeEnum = require('../lib/enums/GoalTypeEnum');

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
  process.env = undefined;
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

    test('should initialize VWO instance when the no campaigns are present in the settings file', () => {
      vwoClientInstance = new VWO({
        settingsFile: settingsFile10,
        logger,
        isDevelopmentMode: true,
        userStorageService
      });

      expect(vwoClientInstance.SettingsFileManager._clonedSettingsFile.campaigns.length).toBe(0);
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

    test('should return false if metadata is not passed as object', () => {
      let options = {
        metaData: false
      };
      expect(vwoClientInstance.activate(campaignKey, userId, options)).toBe(null);
      options.metaData = 'any_string';
      expect(vwoClientInstance.activate(campaignKey, userId, options)).toBe(null);
      options.metaData = 20;
      expect(vwoClientInstance.activate(campaignKey, userId, options)).toBe(null);
    });

    test('should return metaData in set method of userStorage when passed as an object', () => {
      const campaignKey = settingsFile1.campaigns[0].key;
      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      let options = {
        metaData: {
          username: 'any_user'
        }
      };
      let spyUserStorage = jest.spyOn(vwoClientInstance.userStorageService, 'set');
      vwoClientInstance.activate(campaignKey, 'Ashley', options);
      let userData = spyUserStorage.mock.calls[0][0];
      expect(userData.metaData).toBe(options.metaData);
      spyUserStorage.mockRestore();
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

    test('should return false if metadata is not passed as object', () => {
      let options = {
        metaData: false
      };
      expect(vwoClientInstance.getVariationName(campaignKey, userId, options)).toBe(null);
      options.metaData = 'any_string';
      expect(vwoClientInstance.getVariationName(campaignKey, userId, options)).toBe(null);
      options.metaData = 20;
      expect(vwoClientInstance.getVariationName(campaignKey, userId, options)).toBe(null);
    });

    test('should return metaData in set method of userStorage when passed as an object', () => {
      const campaignKey = settingsFile2.campaigns[0].key;
      vwoClientInstance = new VWO({
        settingsFile: settingsFile2,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      let options = {
        metaData: {
          username: 'any_user'
        }
      };
      let spyUserStorage = jest.spyOn(vwoClientInstance.userStorageService, 'set');
      vwoClientInstance.activate(campaignKey, userId, options);
      vwoClientInstance.getVariationName(campaignKey, userId, options);
      let userData = spyUserStorage.mock.calls[0][0];
      expect(userData.metaData).toBe(options.metaData);
      spyUserStorage.mockRestore();
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
        isDevelopmentMode: true,
        userStorageService
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

    test('should return false if metadata is not passed as object', () => {
      let options = {
        metaData: false
      };
      expect(vwoClientInstance.track(campaignKey, userId, goalIdentifier, options)).toBe(null);
      options.metaData = 'any_string';
      expect(vwoClientInstance.track(campaignKey, userId, goalIdentifier, options)).toBe(null);
      options.metaData = 20;
      expect(vwoClientInstance.track(campaignKey, userId, goalIdentifier, options)).toBe(null);
    });

    test('should return metaData in set method of userStorage when passed as an object', () => {
      const campaignKey = settingsFile1.campaigns[0].key;
      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      let options = {
        metaData: {
          username: 'any_user'
        }
      };
      let spyUserStorage = jest.spyOn(vwoClientInstance.userStorageService, 'set');
      vwoClientInstance.activate(campaignKey, 'Bob', options);
      vwoClientInstance.track(campaignKey, 'Bob', goalIdentifier, options);
      let userData = spyUserStorage.mock.calls[1][0];
      expect(userData.metaData).toBe(options.metaData);
      expect(userData.goalIdentifier).toBe(goalIdentifier);
      spyUserStorage.mockRestore();
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

    test('should return false if metadata is not passed as object', () => {
      let options = {
        metaData: false
      };
      expect(vwoClientInstance.isFeatureEnabled(campaignKey, userId, options)).toBe(false);
      options.metaData = 'any_string';
      expect(vwoClientInstance.isFeatureEnabled(campaignKey, userId, options)).toBe(false);
      options.metaData = 20;
      expect(vwoClientInstance.isFeatureEnabled(campaignKey, userId, options)).toBe(false);
    });

    test('should return metaData in set method of userStorage when passed as an object', () => {
      const campaignKey = FEATURE_ROLLOUT_TRAFFIC_100.campaigns[0].key;
      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_TRAFFIC_100,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      let options = {
        metaData: {
          username: 'any_user'
        }
      };
      let spyUserStorage = jest.spyOn(vwoClientInstance.userStorageService, 'set');
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Faizan', options);
      let userData = spyUserStorage.mock.calls[0][0];
      expect(userData.metaData).toBe(options.metaData);
      spyUserStorage.mockRestore();
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
        expect(vwoClientInstance.isFeatureEnabled(campaignKey, users[j])).toBe(!!settings[campaignKey][i].variation);
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
        expect(vwoClientInstance.isFeatureEnabled(campaignKey, users[j])).toBe(!!settings[campaignKey][i].variation);
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
        expect(vwoClientInstance.isFeatureEnabled(campaignKey, users[j])).toBe(!!settings[campaignKey][i].variation);
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
        expect(vwoClientInstance.isFeatureEnabled(campaignKey, users[j])).toBe(settings[campaignKey][i].variation);
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

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(vwoClientInstance.isFeatureEnabled(campaignKey, users[j])).toBe(!!settings[campaignKey][i].variation);
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

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(
          vwoClientInstance.isFeatureEnabled(campaignKey, users[j], { customVariables: trueCustomVariables })
        ).toBe(!!settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100 with dsl', () => {
      const campaignKey = FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100,
        logger,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(
          vwoClientInstance.isFeatureEnabled(campaignKey, users[j], { customVariables: trueCustomVariables })
        ).toBe(!!settings[campaignKey][i].variation);
      }
    });

    test('should test against a campaign settings: FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100 with dsl', () => {
      const campaignKey = FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100.campaigns[0].key;

      vwoClientInstance = new VWO({
        settingsFile: FEATURE_ROLLOUT_WITH_SEGMENTS_TRAFFIC_100,
        logger,
        userStorageService
      });

      for (let i = 0, j = 0; i < settings[campaignKey].length; i++, j++) {
        expect(
          vwoClientInstance.isFeatureEnabled(campaignKey, users[j], { customVariables: falseCustomVariables })
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
    });
    test('should return false if params length is more than 3', () => {
      expect(vwoClientInstance.push({}, 'a', 'a', 'a')).toBe(false);
    });
    test('should test against correct params', () => {
      vwoClientInstance = new VWO({
        settingsFile: settingsFile1,
        logger,
        userStorageService
      });

      spyEventQueue = jest.spyOn(vwoClientInstance.eventQueue, 'process');
      expect(vwoClientInstance.push('1', '1', '1')).toEqual({ '1': true });
      expect(vwoClientInstance.push({ a: 'a' }, '1')).toEqual({ a: true });
      expect(spyImpressionEventPush).toHaveBeenCalled();
      expect(spyEventQueue).toHaveBeenCalled();
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

    test('should return null if catch block is executed', () => {
      let testClient = new VWO({
        settingsFile: settingsFile1,
        logger,
        isDevelopmentMode: true,
        shouldTrackReturningUser: true
      });
      testClient.SettingsFileManager._clonedSettingsFile = 'settingsFile';
      expect(testClient.getFeatureVariableValue('DEV_TEST_1', 'variable-key', userId)).toBe(null);
    });

    test('should return false if metadata is not passed as object', () => {
      let options = {
        metaData: false
      };
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'variable-key', userId, options)).toBe(null);
      options.metaData = 'any_string';
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'variable-key', userId, options)).toBe(null);
      options.metaData = 20;
      expect(vwoClientInstance.getFeatureVariableValue(campaignKey, 'variable-key', userId, options)).toBe(null);
    });

    test('should return metaData in set method of userStorage when passed as an object', () => {
      const campaignKey = FEATURE_TEST_TRAFFIC_100.campaigns[0].key;
      vwoClientInstance = new VWO({
        settingsFile: FEATURE_TEST_TRAFFIC_100,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      let options = {
        metaData: {
          username: 'any_user'
        }
      };
      let spyUserStorage = jest.spyOn(vwoClientInstance.userStorageService, 'set');
      vwoClientInstance.isFeatureEnabled(campaignKey, 'Faizan', options);
      vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Faizan', options);
      let userData = spyUserStorage.mock.calls[0][0];
      expect(userData.metaData).toBe(options.metaData);
      spyUserStorage.mockRestore();
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
});
