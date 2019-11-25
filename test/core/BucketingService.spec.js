/**
 * Copyright 2019 Wingify Software Pvt. Ltd.
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
          weight: 40
        },
        {
          id: '2',
          name: 'Variation-1',
          weight: 60
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
});

describe('BucketingService', () => {
  describe('method: isUserPartOfCampaign', () => {
    test('should return false if no campaign is passed', () => {
      const result = BucketingService.isUserPartOfCampaign(userId, null);

      expect(result).toBe(false);
    });

    test('should return false if no userId is passed', () => {
      const result = BucketingService.isUserPartOfCampaign(null, dummyCampaign);

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
  });
});
