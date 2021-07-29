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
          weight: 50
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 50
        }
      ],
      type: 'VISUAL_AB'
    }
  ],
  accountId: 1,
  version: 1
};
