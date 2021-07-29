module.exports = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [
        {
          identifier: 'CUSTOM',
          id: 216,
          type: 'CUSTOM_GOAL'
        }
      ],
      variations: [
        {
          id: 1,
          name: 'Control',
          changes: {},
          weight: 10
        },
        {
          id: 2,
          name: 'Variation-1',
          changes: {},
          weight: 90
        }
      ],
      id: 233,
      percentTraffic: 20,
      key: 'DEV_TEST_4',
      name: 'DEV_TEST_4',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
    }
  ],
  accountId: 888888,
  groups: {},
  campaignGroups: {},
  version: 1
};
