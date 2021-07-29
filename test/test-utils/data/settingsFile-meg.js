module.exports = {
  groups: {
    1: {
      name: 'group1',
      campaigns: [160, 161]
    },
    2: {
      name: 'group2',
      campaigns: [162, 163]
    }
  },
  campaignGroups: {
    160: 1,
    161: 1,
    162: 2,
    163: 2
  },
  campaigns: [
    {
      id: 160,
      segments: {},
      status: 'RUNNING',
      percentTraffic: 100,
      goals: [
        {
          identifier: 'track',
          id: 284,
          type: 'CUSTOM_GOAL'
        },
        {
          identifier: 'track2',
          id: 285,
          type: 'CUSTOM_GOAL'
        },
        {
          identifier: 'track3',
          id: 286,
          type: 'REVENUE_TRACKING'
        }
      ],
      isForcedVariationEnabled: false,
      key: 'track1',
      name: 'track1',
      variations: [
        {
          id: 1,
          name: 'Control',
          changes: {},
          weight: 50,
          isFeatureEnabled: true,
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
              value: 789
            }
          ]
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 50,
          isFeatureEnabled: true,
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
              value: 987
            }
          ]
        }
      ],
      type: 'FEATURE_TEST'
    },
    {
      id: 161,
      segments: {},
      status: 'RUNNING',
      percentTraffic: 100,
      goals: [
        {
          identifier: 'track',
          id: 1,
          type: 'REVENUE_TRACKING'
        },
        {
          identifier: 'track3',
          id: 3,
          type: 'REVENUE_TRACKING'
        },
        {
          identifier: 'track2',
          id: 287,
          type: 'CUSTOM_GOAL'
        }
      ],
      isForcedVariationEnabled: false,
      key: 'track2',
      name: 'track2',
      variations: [
        {
          id: 1,
          name: 'Control',
          changes: {},
          weight: 50,
          isFeatureEnabled: true,
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
          ]
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 50,
          isFeatureEnabled: true,
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
              value: 321
            }
          ]
        }
      ],
      type: 'FEATURE_TEST'
    },
    {
      goals: [
        {
          identifier: 'CUSTOM',
          id: 213,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: 1,
          name: 'Control',
          changes: {},
          weight: 50,
          segments: {
            or: [
              {
                custom_variable: {
                  browser: 'wildcard(chrome*)'
                }
              }
            ]
          }
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 50,
          segments: {
            or: [
              {
                custom_variable: {
                  chrome: 'false'
                }
              }
            ]
          }
        }
      ],
      id: 162,
      percentTraffic: 100,
      name: 'DEV_TEST_162',
      key: 'DEV_TEST_162',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      isForcedVariationEnabled: true,
      segments: {}
    },
    {
      goals: [
        {
          identifier: 'CUSTOM',
          id: 213,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: 1,
          name: 'Control',
          changes: {},
          weight: 50
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 50
        }
      ],
      id: 163,
      percentTraffic: 100,
      name: 'DEV_TEST_163',
      key: 'DEV_TEST_163',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
    },
    {
      goals: [
        {
          identifier: 'CUSTOM',
          id: 213,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: 1,
          name: 'Control',
          changes: {},
          weight: 50
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 50
        }
      ],
      id: 164,
      percentTraffic: 10,
      name: 'DEV_TEST_164',
      key: 'DEV_TEST_164',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
    }
  ],
  accountId: 1,
  version: 1
};
