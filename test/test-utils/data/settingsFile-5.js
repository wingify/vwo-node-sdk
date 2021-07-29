module.exports = {
  sdkKey: 'someuniquestuff1234567',
  groups: {},
  campaignGroups: {},
  campaigns: [
    {
      goals: [
        {
          identifier: 'CUSTOM',
          id: 217,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: 1,
          name: 'Control',
          changes: {},
          weight: 0
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 100
        }
      ],
      id: 234,
      percentTraffic: 100,
      key: 'DEV_TEST_5',
      name: 'DEV_TEST_5',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
    }
  ],
  accountId: 888888,
  version: 1
};
