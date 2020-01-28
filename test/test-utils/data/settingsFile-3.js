module.exports = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [
        {
          identifier: 'CUSTOM',
          id: 215,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: 1,
          name: 'Control',
          changes: {},
          weight: 20
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 80
        }
      ],
      id: 232,
      percentTraffic: 100,
      key: 'DEV_TEST_3',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
    }
  ],
  accountId: 888888,
  version: 1
};
