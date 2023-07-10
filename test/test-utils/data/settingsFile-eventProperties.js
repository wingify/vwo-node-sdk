module.exports = {
  groups: {},
  campaignGroups: {},
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
          type: 'REVENUE_TRACKING',
          revenueProp: 'abcd'
        },
        {
          identifier: 'track4',
          id: 287,
          type: 'REVENUE_TRACKING',
          mca: -1
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
          weight: 50
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 50
        }
      ],
      type: 'FEATURE_TEST'
    }
  ],
  accountId: 1,
  isEventArchEnabled: true,
  version: 1
};
