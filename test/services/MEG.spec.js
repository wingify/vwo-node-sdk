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

const logger = { log: jest.fn() };
const { settingsFileMeg, settingsFileNewMeg } = require('../test-utils/data/settingsFiles');
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

describe('MEG', () => {
  describe('method: isPartOfMEG', () => {
    it('should return a variation as whitelisting is satisfied for the called campaign', () => {
      const campaignKey = settingsFileMeg.campaigns[2].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true
      });

      let options = {
        variationTargetingVariables: {
          chrome: false
        }
      };

      // called campaign satisfies the whitelisting
      const variation = vwoClientInstance.activate(campaignKey, 'Ashley', options);
      const isGoalTracked = vwoClientInstance.track(campaignKey, 'Ashley', 'CUSTOM', options);
      const variationName = vwoClientInstance.getVariationName(campaignKey, 'Ashley', options);
      expect(variation).toBe('Variation-1');
      expect(variationName).toBe('Variation-1');
      expect(isGoalTracked[campaignKey]).toBe(true);
    });

    it('should return null as other campaign satisfies whitelisting', () => {
      const campaignKey = settingsFileMeg.campaigns[3].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true
      });

      let options = {
        variationTargetingVariables: {
          chrome: false
        }
      };
      // called campaign does not become part of MEG, variation null be assigned since campaign traffic is 10%
      var variation = vwoClientInstance.activate(campaignKey, 'Ashley', options);
      const isGoalTracked = vwoClientInstance.track(campaignKey, 'Ashley', 'CUSTOM', options);
      const variationName = vwoClientInstance.getVariationName(campaignKey, 'Ashley', options);
      expect(variationName).toBe(null);
      expect(isGoalTracked[campaignKey]).toBe(false);
      expect(variation).toBe(null);
    });

    it('should return a variation as storage condition is satisfied for the called campaign', () => {
      const campaignKey = settingsFileMeg.campaigns[2].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      expect(userData[campaignKey]).toStrictEqual(undefined);

      var variation = vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(variation).toBe('Control');
      expect(userData[campaignKey][0]['campaignKey']).toBe(campaignKey);

      // called campaign satisfies the storage condition
      variation = vwoClientInstance.activate(campaignKey, 'Ashley');
      let variationName = vwoClientInstance.getVariationName(campaignKey, 'Ashley');
      expect(variation).toBe('Control');
      expect(variationName).toBe('Control');
      expect(userData[campaignKey][0]['campaignKey']).toBe(campaignKey);

      // track goal for the stored campaign
      let isGoalTracked = vwoClientInstance.track(campaignKey, 'Ashley', 'CUSTOM');
      expect(isGoalTracked[campaignKey]).toBe(true);
      expect(userData[campaignKey][0]['goalIdentifier']).toBe('CUSTOM');
    });

    it('should return null as other campaign satisfies storage', () => {
      const campaignKey = settingsFileMeg.campaigns[2].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      userData = {};
      var variation = vwoClientInstance.activate(campaignKey, 'Ashley');
      var variationName = vwoClientInstance.getVariationName(campaignKey, 'Ashley');
      var isGoalTracked = vwoClientInstance.track(campaignKey, 'Ashley', 'CUSTOM');
      expect(variation).toBe('Control');
      expect(variationName).toBe('Control');
      expect(isGoalTracked[campaignKey]).toBe(true);
      expect(userData[campaignKey][0]['campaignKey']).toBe(campaignKey);
      variation = vwoClientInstance.activate(settingsFileMeg.campaigns[3].key, 'Ashley');
      variationName = vwoClientInstance.getVariationName(settingsFileMeg.campaigns[3].key, 'Ashley');
      isGoalTracked = vwoClientInstance.track(settingsFileMeg.campaigns[3].key, 'Ashley', 'CUSTOM');
      expect(variation).toBe(null);
      expect(variationName).toBe(null);
      expect(isGoalTracked[settingsFileMeg.campaigns[3].key]).toBe(false);
    });

    it('should return variation as called campaign satifies storage even if other campaign satisfies whitelisting', () => {
      const campaignKey = settingsFileMeg.campaigns[2].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      userData = {};
      let options = {
        browser: 'chrome'
      };

      let segmentPassed = {
        or: [
          {
            custom_variable: {
              browser: 'chrome'
            }
          }
        ]
      };

      var variation = vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(variation).toBe('Control');
      expect(userData[campaignKey][0]['campaignKey']).toBe(campaignKey);
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[3].segments = segmentPassed;
      variation = vwoClientInstance.activate(settingsFileMeg.campaigns[2].key, 'Ashley', options);
      expect(variation).toBe('Control');
    });

    it('should return null as campaign is not a part of MEG group and traffic percentage for campaign is 10%', () => {
      const campaignKey = settingsFileMeg.campaigns[4].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true
      });
      // called campaign does not become part of MEG, variation null be assigned since campaign traffic is 10%
      var variation = vwoClientInstance.activate(campaignKey, 'Ashley');
      var variationName = vwoClientInstance.getVariationName(campaignKey, 'Ashley');
      var isGoalTracked = vwoClientInstance.track(campaignKey, 'Ashley', 'CUSTOM');
      expect(variation).toBe(null);
      expect(variationName).toBe(null);
      expect(isGoalTracked[campaignKey]).toBe(false);
    });

    it('should return false as none of the campaigns satisfies the pre-segmentation condition', () => {
      const campaignKey = settingsFileMeg.campaigns[0].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true
      });
      let options = {
        customVariables: {
          browser: 'chrome'
        }
      };

      let segment = {
        or: [
          {
            custom_variable: {
              chrome: 'false'
            }
          }
        ]
      };

      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[0].segments = segment;
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[1].segments = segment;
      var variation = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      var variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Ashley', options);
      expect(variableValue).toBe(null);
      expect(variation).toBe(false);

      // implementing the same condition with zero traffic percentage
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[0].percentTraffic = 0;
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[1].percentTraffic = 0;
      variation = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Ashley', options);
      expect(variableValue).toBe(null);
      expect(variation).toBe(false);
    });

    it('should return false as called campaign does not satisfy the pre-segmentation condition', () => {
      const campaignKey = settingsFileMeg.campaigns[0].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true
      });
      let options = {
        customVariables: {
          browser: 'chrome'
        }
      };

      let segmentFailed = {
        or: [
          {
            custom_variable: {
              chrome: 'false'
            }
          }
        ]
      };

      let segmentPassed = {
        or: [
          {
            custom_variable: {
              browser: 'chrome'
            }
          }
        ]
      };

      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[0].segments = segmentFailed;
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[1].segments = segmentPassed;
      var variation = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      var variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Ashley', options);
      expect(variableValue).toBe(null);
      expect(variation).toBe(false);

      // implementing the same condition with different traffic distribution
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[0].percentTraffic = 0;
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[1].percentTraffic = 100;
      variation = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Ashley', options);
      expect(variableValue).toBe(null);
      expect(variation).toBe(false);
    });

    it('should return true as only called campaign satisfies the pre-segmentation condition', () => {
      const campaignKey = settingsFileMeg.campaigns[0].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true
      });
      let options = {
        customVariables: {
          browser: 'chrome'
        }
      };

      let segmentFailed = {
        or: [
          {
            custom_variable: {
              chrome: 'false'
            }
          }
        ]
      };

      let segmentPassed = {
        or: [
          {
            custom_variable: {
              browser: 'chrome'
            }
          }
        ]
      };

      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[0].segments = segmentPassed;
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[1].segments = segmentFailed;
      var variation = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      var variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Ashley', options);
      expect(variableValue).toBe('Control string');
      expect(variation).toBe(true);

      // implementing the same condition with different traffic distribution
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[0].percentTraffic = 100;
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[1].percentTraffic = 0;
      variation = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley', options);
      variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Ashley', options);
      expect(variableValue).toBe('Control string');
      expect(variation).toBe(true);
    });

    it('should return true/variationName as called campaign is the winner campaign after traffic normalization', () => {
      const campaignKey = settingsFileMeg.campaigns[0].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true
      });

      // implementing the same condition with different traffic distribution
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[0].percentTraffic = 100;
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[1].percentTraffic = 100;
      var variation = vwoClientInstance.isFeatureEnabled(campaignKey, 'Ashley');
      var variableValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'STRING_VARIABLE', 'Ashley');
      expect(variableValue).toBe('Control string');
      expect(variation).toBe(true);

      variation = vwoClientInstance.activate(settingsFileMeg.campaigns[2].key, 'Ashley');
      var variationName = vwoClientInstance.getVariationName(settingsFileMeg.campaigns[2].key, 'Ashley');
      var isGoalTracked = vwoClientInstance.track(settingsFileMeg.campaigns[2].key, 'Ashley', 'CUSTOM');
      expect(variation).toBe('Control');
      expect(variationName).toBe('Control');
      expect(isGoalTracked[settingsFileMeg.campaigns[2].key]).toBe(true);
    });

    it('should return null as called campaign is the not winner campaign after traffic normalization', () => {
      const campaignKey = settingsFileMeg.campaigns[0].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true
      });

      // implementing the same condition with different traffic distribution
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[0].percentTraffic = 100;
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[1].percentTraffic = 100;
      var variation = vwoClientInstance.isFeatureEnabled(campaignKey, 'lisa');
      expect(variation).toBe(false);

      variation = vwoClientInstance.activate(settingsFileMeg.campaigns[2].key, 'BILL');
      expect(variation).toBe(null);
    });

    it('should return variation after equally distributing traffic among eligible campaigns', () => {
      const campaignKey = settingsFileMeg.campaigns[2].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true
      });

      // implementing the same condition with different traffic distribution
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[2].percentTraffic = 80;
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaigns[3].percentTraffic = 50;

      var variation = vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(variation).toBe('Variation-1');
    });

    it('when both the campaigns are new to the user', () => {
      const campaignKey = settingsFileMeg.campaigns[2].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true
      });

      // campaigns are newly added to MEG.
      // user could be a part of any one of the campaign.
      var variation = vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(variation).toBe('Control');
      variation = vwoClientInstance.activate(settingsFileMeg.campaigns[3].key, 'Ashley');
      expect(variation).toBe(null);
    });

    it('when user was already a part of a campaign and new campaign is added to the group', () => {
      const campaignKey = settingsFileMeg.campaigns[2].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      userData = {};
      // user is already a part of a campaign
      var variation = vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(variation).toBe('Control');

      // new campaign is added to the group
      vwoClientInstance.SettingsFileManager.getSettingsFile().campaignGroups['164'] = 2;
      vwoClientInstance.SettingsFileManager.getSettingsFile().groups['2'].campaigns.push(164);
      variation = vwoClientInstance.activate(settingsFileMeg.campaigns[4].key, 'Ashley');
      expect(variation).toBe(null);
    });

    it('when a viewed campaign is removed from the MEG group', () => {
      const campaignKey = settingsFileMeg.campaigns[2].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileMeg,
        logger,
        isDevelopmentMode: true,
        userStorageService: userStorageService1
      });

      userData = {};
      // user is already a part of a campaign
      var variation = vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(variation).toBe('Control');

      // old campaign is removed from the group
      delete vwoClientInstance.SettingsFileManager.getSettingsFile().campaignGroups['162'];
      vwoClientInstance.SettingsFileManager.getSettingsFile().groups['2'].campaigns = [163];
      // since user has already seen that campaign, they will continue to become part of that campaign
      variation = vwoClientInstance.activate(campaignKey, 'Ashley');
      expect(variation).toBe('Control');
    });

    it('should return an empty object when no winner campaign is found in advanced option', () => {
      const campaignKey = settingsFileNewMeg.campaigns[0].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileNewMeg,
        logger,
        isDevelopmentMode: true
      });

      vwoClientInstance.SettingsFileManager.getSettingsFile(1).groups['3'].p = [];
      var variation = vwoClientInstance.activate(campaignKey, 'George');
      var variationName = vwoClientInstance.getVariationName(campaignKey, 'George');
      var isGoalTracked = vwoClientInstance.track(campaignKey, 'George', 'CUSTOM');
      expect(variation).toBe(null);
      expect(variationName).toBe(null);
      expect(isGoalTracked[campaignKey]).toBe(false);
    });

    it('should return an empty object when winner campaign is not the called campaign after priority', () => {
      const campaignKey = settingsFileNewMeg.campaigns[0].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileNewMeg,
        logger,
        isDevelopmentMode: true
      });

      var variation = vwoClientInstance.activate(campaignKey, 'George');
      var variationName = vwoClientInstance.getVariationName(campaignKey, 'George');
      var isGoalTracked = vwoClientInstance.track(campaignKey, 'George', 'CUSTOM');
      expect(variation).toBe(null);
      expect(variationName).toBe(null);
      expect(isGoalTracked[campaignKey]).toBe(false);
    });

    it('should return an empty object when winner campaign is not the called campaign after random weightage distribution', () => {
      // winnerCampaign is not the called campaign for most of the times
      // distributions is 80:20 for winner and calledCampaign
      // Called campaign (id - 34) has just 20% weighted distribution
      const campaignKey = settingsFileNewMeg.campaigns[4].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileNewMeg,
        logger,
        isDevelopmentMode: true
      });

      let wt = {
        31: 80,
        34: 20
      };
      vwoClientInstance.SettingsFileManager.getSettingsFile().groups['3'].p = [];
      vwoClientInstance.SettingsFileManager.getSettingsFile().groups['3'].wt = wt;

      const iterations = 1000; // number of times to call the function
      const expectedRatio = 0.2; // expected ratio for campaignId - 34 (20%) (called campaign -34)
      const allowedError = 0.05; // allowed error range (5%)

      let winners = 0;
      for (let i = 0; i < iterations; i++) {
        var userID = 'user' + i;
        var variation = vwoClientInstance.activate(campaignKey, userID);
        winners = variation !== null ? winners + 1 : winners;
      }

      const actualRatio = winners / iterations;
      expect(actualRatio).toBeGreaterThan(expectedRatio - allowedError);
      expect(actualRatio).toBeLessThan(expectedRatio + allowedError);
    });

    it('should return the variation when winner campaign found through priority', () => {
      const campaignKey = settingsFileNewMeg.campaigns[4].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileNewMeg,
        logger,
        isDevelopmentMode: true
      });

      var variation = vwoClientInstance.activate(campaignKey, 'George');
      var variationName = vwoClientInstance.getVariationName(campaignKey, 'George');
      var isGoalTracked = vwoClientInstance.track(campaignKey, 'George', 'CUSTOM');
      expect(variation).toBe('Control');
      expect(variationName).toBe('Control');
      expect(isGoalTracked[campaignKey]).toBe(true);
    });

    it('should return the variation when winner campaign found through weightage ', () => {
      const campaignKey = settingsFileNewMeg.campaigns[1].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileNewMeg,
        logger,
        isDevelopmentMode: true
      });

      vwoClientInstance.SettingsFileManager.getSettingsFile().groups['3'].p = [];
      const iterations = 1000; // number of times to call the function
      const expectedRatio = 0.8; // expected ratio for campaignId - 31 (80%)
      const allowedError = 0.05; // allowed error range (5%)

      let winners = 0;
      for (let i = 0; i < iterations; i++) {
        var userID = 'user' + i;
        var variation = vwoClientInstance.activate(campaignKey, userID);
        winners = variation !== null ? winners + 1 : winners;
      }

      const actualRatio = winners / iterations;
      expect(actualRatio).toBeGreaterThan(expectedRatio - allowedError);
      expect(actualRatio).toBeLessThan(expectedRatio + allowedError);
    });

    it('same user should become part of campaign everytime when found through weightage ', () => {
      const campaignKey = settingsFileNewMeg.campaigns[1].key;
      let vwoClientInstance = new VWO({
        settingsFile: settingsFileNewMeg,
        logger,
        isDevelopmentMode: true
      });

      vwoClientInstance.SettingsFileManager.getSettingsFile().groups['3'].p = [];
      const iterations = 1000; // number of times to call the function
      const expectedRatio = 1; // everytime this particular user should be the part of campaign

      let winners = 0;
      for (let i = 0; i < iterations; i++) {
        var variation = vwoClientInstance.activate(campaignKey, 'George');
        winners = variation === 'Control' ? winners + 1 : winners;
      }

      const actualRatio = winners / iterations;
      expect(actualRatio).toBe(expectedRatio);
    });
  });
});
