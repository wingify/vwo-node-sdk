module.exports = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
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
      id: 230,
      percentTraffic: 50,
      name: 'DEV_TEST_1',
      key: 'DEV_TEST_1',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {},
      isMAB: true
    }
  ],
  groups: {},
  campaignGroups: {},
  accountId: 888888,
  version: 1
};
