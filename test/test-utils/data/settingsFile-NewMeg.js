module.exports = {
  sdkKey: 'abc',
  version: 1,
  campaigns: [
    {
      type: 'VISUAL_AB',
      isForcedVariationEnabled: false,
      goals: [
        {
          type: 'CUSTOM_GOAL',
          id: 271,
          identifier: 'CUSTOM'
        }
      ],
      percentTraffic: 100,
      segments: {},
      id: 30,
      key: 'test1',
      status: 'RUNNING',
      variations: [
        {
          changes: {},
          weight: 50,
          id: 1,
          name: 'Control'
        },
        {
          changes: {},
          weight: 50,
          id: 2,
          name: 'Variation-1'
        }
      ]
    },
    {
      type: 'VISUAL_AB',
      isForcedVariationEnabled: false,
      goals: [
        {
          type: 'CUSTOM_GOAL',
          id: 271,
          identifier: 'CUSTOM'
        }
      ],
      percentTraffic: 100,
      segments: {},
      id: 31,
      key: 'test2',
      status: 'RUNNING',
      variations: [
        {
          changes: {},
          weight: 50,
          id: 1,
          name: 'Control'
        },
        {
          changes: {},
          weight: 50,
          id: 2,
          name: 'Variation-1'
        }
      ]
    },
    {
      type: 'VISUAL_AB',
      isForcedVariationEnabled: false,
      goals: [
        {
          type: 'CUSTOM_GOAL',
          id: 271,
          identifier: 'CUSTOM'
        }
      ],
      percentTraffic: 100,
      segments: {},
      id: 32,
      key: 'test3',
      status: 'RUNNING',
      variations: [
        {
          changes: {},
          weight: 50,
          id: 1,
          name: 'Control'
        },
        {
          changes: {},
          weight: 50,
          id: 2,
          name: 'Variation-1'
        }
      ]
    },
    {
      type: 'VISUAL_AB',
      isForcedVariationEnabled: false,
      goals: [
        {
          type: 'CUSTOM_GOAL',
          id: 271,
          identifier: 'CUSTOM'
        }
      ],
      percentTraffic: 100,
      segments: {},
      id: 33,
      key: 'test4',
      status: 'RUNNING',
      variations: [
        {
          changes: {},
          weight: 50,
          id: 1,
          name: 'Control'
        },
        {
          changes: {},
          weight: 50,
          id: 2,
          name: 'Variation-1'
        }
      ]
    },
    {
      type: 'VISUAL_AB',
      isForcedVariationEnabled: false,
      goals: [
        {
          type: 'CUSTOM_GOAL',
          id: 271,
          identifier: 'CUSTOM'
        }
      ],
      percentTraffic: 100,
      segments: {},
      id: 34,
      key: 'test5',
      status: 'RUNNING',
      variations: [
        {
          changes: {},
          weight: 50,
          id: 1,
          name: 'Control'
        },
        {
          changes: {},
          weight: 50,
          id: 2,
          name: 'Variation-1'
        }
      ]
    }
  ],
  accountId: 1,
  groups: {
    3: {
      et: 2,
      campaigns: [30, 31, 32, 33, 34],
      p: [34, 32, 30],
      wt: { 31: 80, 33: 20 },
      name: 'Group 3'
    }
  },
  campaignGroups: {
    30: 3,
    31: 3,
    32: 3,
    33: 3,
    34: 3
  }
};
