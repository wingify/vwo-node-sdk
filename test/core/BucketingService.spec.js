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

const BucketingService = require('../../lib/core/BucketingService');
const CampaignUtil = require('../../lib/utils/CampaignUtil');
const VWOFeatureFlags = require('../../lib/utils/VWOFeatureFlags');
const { bucketValues, seedBucketValue } = require('../test-utils/data/bucketValues');
const testUtil = require('../test-utils/TestUtil');
const users = testUtil.getUsers();
const settings = require('../test-utils/data/settingsFileAndUsersExpectation');

const {
  settingsWithoutSeedAndWithoutisOB,
  settingsWithSeedAndWithoutisOB,
  settingsWithisNBAndWithisOB,
  settingsWithisNBAndWithoutisOB,
  settingsWithisNBAndWithoutisOBAndWithoutSeedFlag,
  settingsWithisNBAndisNBv2
} = require('../test-utils/data/settingsFiles');

let userId;
let dummyCampaign;

beforeEach(() => {
  userId = Math.random().toString();
  dummyCampaign = Object.assign(
    {},
    {
      goals: [
        {
          identifier: 'GOAL_NEW',
          id: 203,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 40,
          value: 20
        },
        {
          id: '2',
          name: 'Variation-1',
          weight: 60,
          value: 40
        }
      ],
      id: 22,
      percentTraffic: 50,
      key: 'UNIQUE_KEY',
      status: 'RUNNING',
      type: 'VISUAL_AB'
    }
  );

  // Assign variation-level bucketing first
  CampaignUtil.setVariationAllocation(dummyCampaign);

  VWOFeatureFlags.init({
    isNB: false
  });
});

describe('BucketingService', () => {
  describe('method: isUserPartOfCampaign', () => {
    test('should return false if no campaign is passed', () => {
      const result = BucketingService.isUserPartOfCampaign(userId, null);

      expect(result).toBe(false);
    });

    test('should return true if user becomes a part of campaign after validating traffic allocation', () => {
      userId = 'Bob';
      // Bob, with above campaign settings, will get hashValue:2033809345 and bucketValue:48
      // So, MUST be a part of campaign as per campaign percentTraffic
      const result = BucketingService.isUserPartOfCampaign(userId, dummyCampaign);

      expect(result).toBe(true);
    });

    test('should return false if user becomes a part of campaign after validating traffic allocation', () => {
      userId = 'Lucian';
      // Bob, with above campaign settings, will get hashValue:2251780191 and bucketValue:53
      // So, must NOT be a part of campaign as per campaign percentTraffic
      const result = BucketingService.isUserPartOfCampaign(userId, dummyCampaign);

      expect(result).toBe(false);
    });
  });

  describe('method: bucketUserToVariation', () => {
    test('should return null if no campaign is passed', () => {
      const result = BucketingService.bucketUserToVariation(userId, null);

      expect(result).toBe(null);
    });

    test('should return null if no userId is passed', () => {
      const result = BucketingService.bucketUserToVariation(null, dummyCampaign);

      expect(result).toBe(null);
    });

    test('should return variation depending on in which bucket user falls', () => {
      userId = 'Sarah';
      // Bob, with above campaign settings, will get hashValue:69650962 and bucketValue:326
      // So, MUST be a part of Control, as per campaign settings

      const result = BucketingService.bucketUserToVariation(userId, dummyCampaign);

      expect(result.name).toBe('Control');
    });

    test('should return variation depending on in which bucket user falls', () => {
      userId = 'Varun';
      // Bob, with above campaign settings, will get hashValue:2025462540 and bucketValue:9433
      // So, MUST be a part of Variation, as per campaign settings

      const result = BucketingService.bucketUserToVariation(userId, dummyCampaign);

      expect(result.name).toBe('Variation-1');
    });

    test('should return variation with old bucketing logic and seed not enabled', () => {
      const campaign = settingsWithoutSeedAndWithoutisOB.campaigns[0];
      CampaignUtil.setVariationAllocation(campaign);

      for (let i = 0; i < users.length; i++) {
        const userId = users[i];

        const result = BucketingService.bucketUserToVariation(userId, campaign);
        expect(result.name).toBe(settings['BUCKET_ALGO_WITHOUT_SEED'][i].variation);
      }
    });

    test('should return variation with old bucketing logic and seed enabled', () => {
      const campaign = settingsWithSeedAndWithoutisOB.campaigns[0];
      CampaignUtil.setVariationAllocation(campaign);

      for (let i = 0; i < users.length; i++) {
        const userId = users[i];

        const result = BucketingService.bucketUserToVariation(userId, campaign);
        expect(result.name).toBe(settings['BUCKET_ALGO_WITH_SEED'][i].variation);
      }
    });

    test('should return variation having seed enabled, isNB true, and isOB true with old bucketing logic', () => {
      const campaign = settingsWithisNBAndWithisOB.campaigns[0];
      CampaignUtil.setVariationAllocation(campaign);

      for (let i = 0; i < users.length; i++) {
        const userId = users[i];

        const result = BucketingService.bucketUserToVariation(userId, campaign);
        expect(result.name).toBe(settings['BUCKET_ALGO_WITH_SEED_WITH_isNB_WITH_isOB'][i].variation);
      }
    });

    test('should return variation having isNB true, isOB no present, seed enabled with new variation bucketing logic', () => {
      const campaign = settingsWithisNBAndWithoutisOB.campaigns[0];
      CampaignUtil.setVariationAllocation(campaign);

      VWOFeatureFlags.init({
        isNB: true
      });

      for (let i = 0; i < users.length; i++) {
        const userId = users[i];

        const result = BucketingService.bucketUserToVariation(userId, campaign);
        expect(result.name).toBe(settings['BUCKET_ALGO_WITH_SEED_WITH_isNB_WITHOUT_isOB'][i].variation);
      }
    });

    test('should return variation having isNB true, isOB no present, without seed flag with new variation bucketing logic', () => {
      const campaign = settingsWithisNBAndWithoutisOBAndWithoutSeedFlag.campaigns[0];
      CampaignUtil.setVariationAllocation(campaign);

      VWOFeatureFlags.init({
        isNB: true
      });

      for (let i = 0; i < users.length; i++) {
        const userId = users[i];

        const result = BucketingService.bucketUserToVariation(userId, campaign);
        expect(result.name).toBe(settings['BUCKET_ALGO_WITHOUT_SEED_FLAG_WITH_isNB_WITHOUT_isOB'][i].variation);
      }
    });

    test('should return same variation to a user for multiple campaigns having isNB true', () => {
      const campaignList = [
        settingsWithisNBAndWithoutisOB.campaigns[0],
        settingsWithisNBAndWithoutisOB.campaigns[1],
        settingsWithisNBAndWithoutisOB.campaigns[2]
      ];

      VWOFeatureFlags.init({
        isNB: true
      });

      for (let i = 0; i < 3; i++) {
        CampaignUtil.setVariationAllocation(settingsWithisNBAndWithoutisOB.campaigns[i]);
        const result = BucketingService.bucketUserToVariation('Ashley', campaignList[i]);
        expect(result.name).toBe('Control');
      }
    });

    test('should return different variation to a user for multiple campaigns having isNBv2 true', () => {
      VWOFeatureFlags.init({
        isNB: true,
        isNBv2: true
      });

      for (let i = 0; i < 3; i++) {
        CampaignUtil.setVariationAllocation(settingsWithisNBAndisNBv2.campaigns[i]);
        const result = BucketingService.bucketUserToVariation(
          settings['SETTINGS_WITH_ISNB_WITH_ISNBv2'][i].user,
          settingsWithisNBAndisNBv2.campaigns[i],
          settingsWithisNBAndisNBv2.accountId
        );
        expect(result.name).toBe(settings['SETTINGS_WITH_ISNB_WITH_ISNBv2'][i].variation);
      }
    });
  });

  describe('method: calculateBucketValue', () => {
    test('should generate correct bucket values', () => {
      bucketValues.forEach(value => {
        expect(BucketingService.calculateBucketValue(value.user)).toBe(value.bucketValue);
      });
    });

    test('should generate bucket value for user_64', () => {
      let campaign = { id: 1, isBucketingSeedEnabled: true };
      expect(BucketingService._getBucketValueForUser(CampaignUtil.getBucketingSeed('someone@mail.com', campaign))).toBe(
        25
      );
      campaign['isBucketingSeedEnabled'] = false;
      expect(BucketingService._getBucketValueForUser(CampaignUtil.getBucketingSeed('someone@mail.com', campaign))).toBe(
        64
      );
    });

    test('should generate bucket value for user_50', () => {
      let campaign = { id: 1, isBucketingSeedEnabled: true };
      expect(BucketingService._getBucketValueForUser(CampaignUtil.getBucketingSeed('1111111111111111', campaign))).toBe(
        82
      );
      campaign['isBucketingSeedEnabled'] = false;
      expect(BucketingService._getBucketValueForUser(CampaignUtil.getBucketingSeed('1111111111111111', campaign))).toBe(
        50
      );
    });

    test('should generate correct bucket values with seed enabled/disabled', () => {
      seedBucketValue.forEach(value => {
        expect(BucketingService.calculateBucketValue(CampaignUtil.getBucketingSeed(value.user, value.campaign))).toBe(
          value.bucketValue
        );
      });
    });
  });
});
