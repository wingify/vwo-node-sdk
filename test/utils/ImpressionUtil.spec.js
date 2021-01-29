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

const impressionUtil = require('../../lib/utils/ImpressionUtil');
const GoalTypeEnum = require('../../lib/enums/GoalTypeEnum');

const baseProperties = ['account_id', 'uId', 'random', 'sId', 'u', 'sdk', 'sdk-v', 'ap', 'url'];

function checkBaseProperties(properties) {
  for (let i = 0; i < baseProperties.length; i++) {
    if (!properties[baseProperties[i]]) {
      return false;
    }
  }
  return true;
}

describe('ImpressionUtil', () => {
  describe('method: buildEventForPushing', () => {
    test('should have all 10 properties', () => {
      const properties = impressionUtil.buildEventForPushing({ accountId: 1 }, 'tagKey', 'tagValue', 'userId');
      const areAllPropertiesPresent = checkBaseProperties(properties) && properties.tags;
      expect(Boolean(areAllPropertiesPresent)).toBe(true);
    });
  });

  describe('method: buildEventForTrackingUser', () => {
    test('should have all 12 properties', () => {
      const properties = impressionUtil.buildEventForTrackingUser({ accountId: 1 }, '1', '1', '1');
      const areAllPropertiesPresent =
        checkBaseProperties(properties) && properties.experiment_id && properties.combination && properties.ed;
      expect(Boolean(areAllPropertiesPresent)).toBe(true);
    });
  });

  describe('method: buildEventForTrackingGoal', () => {
    test('should have all 12 properties for non revenue goal', () => {
      const properties = impressionUtil.buildEventForTrackingGoal({ accountId: 1 }, '1', '1', '1', { id: 1 });
      const areAllPropertiesPresent =
        checkBaseProperties(properties) && properties.experiment_id && properties.combination && properties.goal_id;
      expect(Boolean(areAllPropertiesPresent)).toBe(true);
    });

    test('should have all 13 properties for non revenue goal', () => {
      const properties = impressionUtil.buildEventForTrackingGoal(
        { accountId: 1 },
        '1',
        '1',
        '1',
        { type: GoalTypeEnum.REVENUE, id: 1 },
        1
      );
      const areAllPropertiesPresent =
        checkBaseProperties(properties) &&
        properties.experiment_id &&
        properties.combination &&
        properties.goal_id &&
        properties.r;
      expect(Boolean(areAllPropertiesPresent)).toBe(true);
    });
  });
});
