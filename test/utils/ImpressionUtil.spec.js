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

const impressionUtil = require('../../lib/utils/ImpressionUtil');
const GoalTypeEnum = require('../../lib/enums/GoalTypeEnum');
const EventEnum = require('../../lib/enums/EventEnum');

const baseProperties = ['account_id', 'random', 'sId', 'u', 'sdk', 'sdk-v', 'ap', 'url'];
const eventArchQeuryParams = ['a', 'en', 'eTime', 'random', 'env'];

function checkBaseProperties(properties, baseProperties) {
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
      const areAllPropertiesPresent = checkBaseProperties(properties, baseProperties) && properties.tags;
      expect(Boolean(areAllPropertiesPresent)).toBe(true);
    });
  });

  describe('method: buildEventForTrackingUser', () => {
    test('should have all 12 properties', () => {
      const properties = impressionUtil.buildEventForTrackingUser({ accountId: 1 }, '1', '1', '1');
      const areAllPropertiesPresent =
        checkBaseProperties(properties, baseProperties) &&
        properties.experiment_id &&
        properties.combination &&
        properties.ed;
      expect(Boolean(areAllPropertiesPresent)).toBe(true);
    });
  });

  describe('method: buildEventForTrackingGoal', () => {
    test('should have all 12 properties for non revenue goal', () => {
      const properties = impressionUtil.buildEventForTrackingGoal({ accountId: 1 }, '1', '1', '1', { id: 1 });
      const areAllPropertiesPresent =
        checkBaseProperties(properties, baseProperties) &&
        properties.experiment_id &&
        properties.combination &&
        properties.goal_id;
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
        checkBaseProperties(properties, baseProperties) &&
        properties.experiment_id &&
        properties.combination &&
        properties.goal_id &&
        properties.r;
      expect(Boolean(areAllPropertiesPresent)).toBe(true);
    });
  });

  describe('method: buildEventArchPayloadForVisitor', () => {
    test('should have all the properties', () => {
      let config = { accountId: 1, sdkKey: '12345' };
      const queryParams = impressionUtil.getEventsBaseProperties(config, EventEnum.VWO_VARIATION_SHOWN, {
        _l: 1,
        cl: 1,
        ll: 1
      });
      const properties = impressionUtil.getTrackUserPayloadData(config, 'Ashley', EventEnum.VWO_VARIATION_SHOWN, 20, 3);

      let expectedProperties = {
        d: {
          msgId: expect.any(String),
          visId: expect.any(String),
          sessionId: expect.any(Number),
          event: {
            props: {
              sdkName: expect.any(String),
              sdkVersion: expect.any(String),
              id: expect.any(Number),
              isFirst: expect.any(Number),
              variation: expect.any(Number),
              $visitor: {
                props: {
                  vwo_fs_environment: expect.any(String)
                }
              }
            },
            name: expect.any(String),
            time: expect.any(Number)
          },
          visitor: {
            props: {
              vwo_fs_environment: expect.any(String)
            }
          }
        }
      };
      const areAllPropertiesPresent = checkBaseProperties(queryParams, eventArchQeuryParams);
      expect(Boolean(areAllPropertiesPresent)).toBe(true);
      expect(properties).toEqual(expect.objectContaining(expectedProperties));
    });
  });

  describe('method: buildEventArchPayloadForGoal', () => {
    test('should have all the properties', () => {
      let config = { accountId: 1, sdkKey: '12345' };
      let goalIdentifier = 'goalIdentifier';
      let metricMap = {
        1: {
          goal: {
            id: 10
          }
        },
        2: {
          goal: {
            id: 20
          }
        },
        5: {
          goal: {
            id: 30
          }
        }
      };
      const queryParams = impressionUtil.getEventsBaseProperties(config, goalIdentifier);
      const properties = impressionUtil.getTrackGoalPayloadData(
        config,
        'Ashley',
        goalIdentifier,
        metricMap,
        20,
        new Set().add('revenue')
      );

      let expectedProperties = {
        d: {
          msgId: expect.any(String),
          visId: expect.any(String),
          sessionId: expect.any(Number),

          event: {
            props: {
              sdkName: expect.any(String),
              sdkVersion: expect.any(String),
              vwoMeta: {
                metric: expect.any(Object),
                revenue: expect.any(Number)
              },
              isCustomEvent: expect.any(Boolean),
              $visitor: {
                props: {
                  vwo_fs_environment: expect.any(String)
                }
              }
            },
            name: expect.any(String),
            time: expect.any(Number)
          },
          visitor: {
            props: {
              vwo_fs_environment: expect.any(String)
            }
          }
        }
      };
      const areAllPropertiesPresent = checkBaseProperties(queryParams, eventArchQeuryParams);
      expect(Boolean(areAllPropertiesPresent)).toBe(true);
      expect(properties).toEqual(expect.objectContaining(expectedProperties));
    });
  });

  describe('method: buildEventArchPayloadForPush', () => {
    test('should have all the properties', () => {
      let config = { accountId: 1, sdkKey: '12345' };
      // CD with tagKey and tagValue
      const queryParams = impressionUtil.getEventsBaseProperties(config, EventEnum.VWO_SYNC_VISITOR_PROP);
      let properties = impressionUtil.getPushPayloadData(config, 'Ashley', EventEnum.VWO_SYNC_VISITOR_PROP, {
        tagKey: 'tagValue'
      });

      let expectedProperties = {
        d: {
          msgId: expect.any(String),
          visId: expect.any(String),
          sessionId: expect.any(Number),

          event: {
            props: {
              sdkName: expect.any(String),
              sdkVersion: expect.any(String),
              isCustomEvent: expect.any(Boolean),
              $visitor: {
                props: {
                  vwo_fs_environment: expect.any(String),
                  tagKey: 'tagValue'
                }
              }
            },
            name: expect.any(String),
            time: expect.any(Number)
          },
          visitor: {
            props: {
              vwo_fs_environment: expect.any(String),
              tagKey: 'tagValue'
            }
          }
        }
      };
      const areAllPropertiesPresent = checkBaseProperties(queryParams, eventArchQeuryParams);
      expect(Boolean(areAllPropertiesPresent)).toBe(true);
      expect(properties).toEqual(expect.objectContaining(expectedProperties));

      // CD with multiple custom Dimensions
      properties = impressionUtil.getPushPayloadData(config, 'Ashley', EventEnum.VWO_SYNC_VISITOR_PROP, {
        key: 'value',
        int: 123,
        bool: true,
        double: 1223.98
      });

      expectedProperties = {
        d: {
          msgId: expect.any(String),
          visId: expect.any(String),
          sessionId: expect.any(Number),

          event: {
            props: {
              sdkName: expect.any(String),
              sdkVersion: expect.any(String),
              isCustomEvent: expect.any(Boolean),
              $visitor: {
                props: {
                  vwo_fs_environment: expect.any(String),
                  key: 'value',
                  int: '123',
                  bool: 'true',
                  double: '1223.98'
                }
              }
            },
            name: expect.any(String),
            time: expect.any(Number)
          },
          visitor: {
            props: {
              vwo_fs_environment: expect.any(String),
              key: 'value',
              int: '123',
              bool: 'true',
              double: '1223.98'
            }
          }
        }
      };

      expect(properties).toEqual(expect.objectContaining(expectedProperties));
    });
  });
});
