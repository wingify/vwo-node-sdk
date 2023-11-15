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
          identifier: 'track1',
          id: 284,
          type: 'CUSTOM_GOAL',
          hasProps: true
        },
        {
          identifier: 'track2',
          id: 286,
          type: 'REVENUE_TRACKING'
        },
        {
          identifier: 'track3',
          id: 287,
          type: 'REVENUE_TRACKING',
          mca: -1
        }
      ],
      isForcedVariationEnabled: false,
      key: 'track',
      name: 'track',
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
  isEventArchEnabled: true,
  version: 1
};
