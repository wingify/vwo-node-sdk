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

const VariationDecider = require('../../lib/core/VariationDecider');
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

describe('VariationDecider', () => {
  describe('method: getVariationAllotted', () => {
    test('should return false if no userId is passed', () => {
      const result = VariationDecider.getVariationAllotted(null, dummyCampaign);

      expect(result.variationId).toBe(null);
      expect(result.variationName).toBe(null);
    });

    test('should return true if user becomes a part of campaign after validating traffic allocation', () => {
      userId = 'Allie';
      // Allie, with above campaign settings, will get hashValue:362121553 and bucketValue:1688
      // So, MUST be a part of campaign as per campaign percentTraffic
      const result = VariationDecider.getVariationAllotted(userId, dummyCampaign);

      expect(result.variationId).toBe('1');
      expect(result.variationName).toBe('Control');
    });

    test('should return false if user becomes a part of campaign after validating traffic allocation', () => {
      userId = 'Lucian';
      // Bob, with above campaign settings, will get hashValue:2251780191 and bucketValue:53
      // So, must NOT be a part of campaign as per campaign percentTraffic
      const result = VariationDecider.getVariationAllotted(userId, dummyCampaign);

      expect(result.variationId).toBe(null);
      expect(result.variationName).toBe(null);
    });
  });

  describe('method: getVariationOfCampaignForUser', () => {
    test('should return null if no campaign is passed', () => {
      const result = VariationDecider.getVariationOfCampaignForUser(userId, null);

      expect(result).toBe(null);
    });

    test('should return null if no userId is passed', () => {
      const result = VariationDecider.getVariationOfCampaignForUser(null, dummyCampaign);

      expect(result).toBe(null);
    });

    test('should return variation depending on in which bucket user falls', () => {
      userId = 'Sarah';
      // Bob, with above campaign settings, will get hashValue:69650962 and bucketValue:326
      // So, MUST be a part of Control, as per campaign settings

      const result = VariationDecider.getVariationOfCampaignForUser(userId, dummyCampaign);

      expect(result.name).toBe('Control');
    });

    test('should return variation depending on in which bucket user falls', () => {
      userId = 'Varun';
      // Bob, with above campaign settings, will get hashValue:2025462540 and bucketValue:9433
      // So, MUST be a part of Variation, as per campaign settings

      const result = VariationDecider.getVariationOfCampaignForUser(userId, dummyCampaign);

      expect(result.name).toBe('Variation-1');
    });
  });
});
