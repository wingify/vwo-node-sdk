const FEATURE_TEST_TRAFFIC_0 = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [
        {
          identifier: 'FEATURE_TEST_GOAL',
          id: 203,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 10,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Control string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 123
            }
          ],
          isFeatureEnabled: false
        },
        {
          id: '2',
          name: 'Variation-1',
          weight: 20,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-1 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 456
            }
          ],
          isFeatureEnabled: true
        },
        {
          id: '3',
          name: 'Variation-2',
          weight: 30,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-2 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 789
            }
          ],
          isFeatureEnabled: true
        },
        {
          id: '4',
          name: 'Variation-3',
          weight: 40,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-3 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 100
            }
          ],
          isFeatureEnabled: true
        }
      ],
      id: 22,
      percentTraffic: 0,
      key: 'FEATURE_ROLLOUT_TEST_TRAFFIC_0_WEIGHT_10_20_30_40',
      status: 'RUNNING',
      type: 'FEATURE_TEST'
    }
  ],
  accountId: 123456,
  version: 2
};

const FEATURE_TEST_TRAFFIC_25 = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [
        {
          identifier: 'FEATURE_TEST_GOAL',
          id: 203,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 10,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Control string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 123
            }
          ],
          isFeatureEnabled: false
        },
        {
          id: '2',
          name: 'Variation-1',
          weight: 20,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-1 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 456
            }
          ],
          isFeatureEnabled: true
        },
        {
          id: '3',
          name: 'Variation-2',
          weight: 30,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-2 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 789
            }
          ],
          isFeatureEnabled: true
        },
        {
          id: '4',
          name: 'Variation-3',
          weight: 40,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-3 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 100
            }
          ],
          isFeatureEnabled: true
        }
      ],
      id: 22,
      percentTraffic: 25,
      key: 'FEATURE_ROLLOUT_TEST_TRAFFIC_25_WEIGHT_10_20_30_40',
      status: 'RUNNING',
      type: 'FEATURE_TEST'
    }
  ],
  accountId: 123456,
  version: 2
};

const FEATURE_TEST_TRAFFIC_50 = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [
        {
          identifier: 'FEATURE_TEST_GOAL',
          id: 203,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 10,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Control string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 123
            }
          ],
          isFeatureEnabled: false
        },
        {
          id: '2',
          name: 'Variation-1',
          weight: 20,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-1 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 456
            }
          ],
          isFeatureEnabled: true
        },
        {
          id: '3',
          name: 'Variation-2',
          weight: 30,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-2 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 789
            }
          ],
          isFeatureEnabled: true
        },
        {
          id: '4',
          name: 'Variation-3',
          weight: 40,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-3 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 100
            }
          ],
          isFeatureEnabled: true
        }
      ],
      id: 22,
      percentTraffic: 50,
      key: 'FEATURE_ROLLOUT_TEST_TRAFFIC_50_WEIGHT_10_20_30_40',
      status: 'RUNNING',
      type: 'FEATURE_TEST'
    }
  ],
  accountId: 123456,
  version: 2
};

const FEATURE_TEST_TRAFFIC_75 = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [
        {
          identifier: 'FEATURE_TEST_GOAL',
          id: 203,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 10,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Control string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 123
            }
          ],
          isFeatureEnabled: false
        },
        {
          id: '2',
          name: 'Variation-1',
          weight: 20,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-1 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 456
            }
          ],
          isFeatureEnabled: true
        },
        {
          id: '3',
          name: 'Variation-2',
          weight: 30,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-2 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 789
            }
          ],
          isFeatureEnabled: true
        },
        {
          id: '4',
          name: 'Variation-3',
          weight: 40,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-3 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 100
            }
          ],
          isFeatureEnabled: true
        }
      ],
      id: 22,
      percentTraffic: 75,
      key: 'FEATURE_ROLLOUT_TEST_TRAFFIC_75_WEIGHT_10_20_30_40',
      status: 'RUNNING',
      type: 'FEATURE_TEST'
    }
  ],
  accountId: 123456,
  version: 2
};

const FEATURE_TEST_TRAFFIC_100 = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [
        {
          identifier: 'FEATURE_TEST_GOAL',
          id: 203,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 10,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Control string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 123
            }
          ],
          isFeatureEnabled: false
        },
        {
          id: '2',
          name: 'Variation-1',
          weight: 20,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-1 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 456
            }
          ],
          isFeatureEnabled: true
        },
        {
          id: '3',
          name: 'Variation-2',
          weight: 30,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-2 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 789
            }
          ],
          isFeatureEnabled: true
        },
        {
          id: '4',
          name: 'Variation-3',
          weight: 40,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-3 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 100
            }
          ],
          isFeatureEnabled: true
        }
      ],
      id: 22,
      percentTraffic: 100,
      key: 'FEATURE_ROLLOUT_TEST_TRAFFIC_100_WEIGHT_10_20_30_40',
      status: 'RUNNING',
      type: 'FEATURE_TEST'
    }
  ],
  accountId: 123456,
  version: 2
};

const FEATURE_TEST_TRAFFIC_100_DISABLED = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [
        {
          identifier: 'FEATURE_TEST_GOAL',
          id: 203,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 10,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Control string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 123
            }
          ],
          isFeatureEnabled: false
        },
        {
          id: '2',
          name: 'Variation-1',
          weight: 20,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-1 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 456
            }
          ],
          isFeatureEnabled: false
        },
        {
          id: '3',
          name: 'Variation-2',
          weight: 30,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-2 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 789
            }
          ],
          isFeatureEnabled: false
        },
        {
          id: '4',
          name: 'Variation-3',
          weight: 40,
          variables: [
            {
              id: 1,
              key: 'STRING_VARIABLE',
              type: 'string',
              value: 'Variation-3 string'
            },
            {
              id: 2,
              key: 'INTEGER_VARIABLE',
              type: 'integer',
              value: 100
            }
          ],
          isFeatureEnabled: false
        }
      ],
      id: 22,
      percentTraffic: 100,
      key: 'FEATURE_ROLLOUT_TEST_TRAFFIC_100_WEIGHT_10_20_30_40_DISABLED',
      status: 'RUNNING',
      type: 'FEATURE_TEST'
    }
  ],
  accountId: 123456,
  version: 2
};

module.exports = {
  FEATURE_TEST_TRAFFIC_0,
  FEATURE_TEST_TRAFFIC_25,
  FEATURE_TEST_TRAFFIC_50,
  FEATURE_TEST_TRAFFIC_75,
  FEATURE_TEST_TRAFFIC_100,
  FEATURE_TEST_TRAFFIC_100_DISABLED
};
