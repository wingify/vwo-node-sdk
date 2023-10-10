export const settingsWithoutSeedAndWithoutisOB = {
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
      id: 231,
      percentTraffic: 100,
      // isBucketingSeedEnabled: true,
      name: 'BUCKET_ALGO_WITHOUT_SEED',
      key: 'BUCKET_ALGO_WITHOUT_SEED',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
    }
  ],
  accountId: 888888,
  version: 1,
  isNB: true
};

export const settingsWithSeedAndWithoutisOB = {
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
      id: 231,
      percentTraffic: 100,
      isBucketingSeedEnabled: true,
      name: 'BUCKET_ALGO_WITH_SEED',
      key: 'BUCKET_ALGO_WITH_SEED',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
    }
  ],
  accountId: 888888,
  version: 1,
  isNB: true
};

export const settingsWithisNBAndWithisOB = {
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
      id: 231,
      percentTraffic: 100,
      isBucketingSeedEnabled: true,
      name: 'BUCKET_ALGO_WITH_SEED_WITH_isNB_WITH_isOB',
      key: 'BUCKET_ALGO_WITH_SEED_WITH_isNB_WITH_isOB',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {},
      isOB: true
    }
  ],
  accountId: 888888,
  version: 1,
  isNB: true
};

export const settingsWithisNBAndWithoutisOB = {
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
      id: 231,
      percentTraffic: 100,
      isBucketingSeedEnabled: true,
      name: 'BUCKET_ALGO_WITH_SEED_WITH_isNB_WITHOUT_isOB',
      key: 'BUCKET_ALGO_WITH_SEED_WITH_isNB_WITHOUT_isOB',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
      // isOB: true
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
      id: 232,
      percentTraffic: 100,
      isBucketingSeedEnabled: true,
      name: 'BUCKET_ALGO_WITH_SEED_WITH_isNB_WITHOUT_isOB_1',
      key: 'BUCKET_ALGO_WITH_SEED_WITH_isNB_WITHOUT_isOB_1',
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
      id: 233,
      percentTraffic: 100,
      isBucketingSeedEnabled: true,
      name: 'BUCKET_ALGO_WITH_SEED_WITH_isNB_WITHOUT_isOB_2',
      key: 'BUCKET_ALGO_WITH_SEED_WITH_isNB_WITHOUT_isOB_2',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
    }
  ],
  accountId: 888888,
  version: 1,
  isNB: true
};

export const settingsWithisNBAndWithoutisOBAndWithoutSeedFlag = {
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
      id: 231,
      percentTraffic: 100,
      // isBucketingSeedEnabled: true,
      name: 'BUCKET_ALGO_WITHOUT_SEED_FLAG_WITH_isNB_WITHOUT_isOB',
      key: 'BUCKET_ALGO_WITHOUT_SEED_FLAG_WITH_isNB_WITHOUT_isOB',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
      // isOB: true
    }
  ],
  accountId: 888888,
  version: 1,
  isNB: true
};

export const settingsWithisNBAndisNBv2 = {
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
      id: 231,
      percentTraffic: 100,
      name: 'BUCKET_ALGO_WITH_isNB_WITH_isNBv2',
      key: 'BUCKET_ALGO_WITH_isNB_WITH_isNBv2',
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
      id: 232,
      percentTraffic: 100,
      name: 'BUCKET_ALGO_WITH_isNB_WITH_isNBv2_1',
      key: 'BUCKET_ALGO_WITH_isNB_WITH_isNBv2_1',
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
      id: 233,
      percentTraffic: 100,
      name: 'BUCKET_ALGO_WITH_isNB_WITH_isNBv2_2',
      key: 'BUCKET_ALGO_WITH_isNB_WITH_isNBv2_2',
      status: 'RUNNING',
      type: 'VISUAL_AB',
      segments: {}
    }
  ],
  accountId: 888888,
  version: 1,
  isNB: true,
  isNBv2: true
};
