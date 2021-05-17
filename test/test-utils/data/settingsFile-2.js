module.exports = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [
        {
          identifier: 'abcd',
          id: 1,
          type: 'REVENUE_TRACKING'
        },
        {
          identifier: 'CUSTOM',
          id: 214,
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
      id: 231,
      percentTraffic: 100,
      key: 'DEV_TEST_2',
      name: 'DEV_TEST_2',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
    }
  ],
  accountId: 888888,
  version: 1
};
