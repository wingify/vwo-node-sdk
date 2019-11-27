const FEATURE_ROLLOUT_TRAFFIC_0 = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 100
        }
      ],
      variables: [
        {
          id: 1,
          key: 'STRING_VARIABLE',
          type: 'string',
          value: 'this_is_a_string'
        },
        {
          id: 2,
          key: 'INTEGER_VARIABLE',
          type: 'integer',
          value: 123
        },
        {
          id: 1,
          key: 'FLOAT_VARIABLE',
          type: 'double',
          value: 123.456
        },
        {
          id: 2,
          key: 'BOOLEAN_VARIABLE',
          type: 'boolean',
          value: true
        }
      ],
      id: 29,
      percentTraffic: 0,
      key: 'FEATURE_ROLLOUT_TRAFFIC_0',
      status: 'RUNNING',
      type: 'FEATURE_ROLLOUT'
    }
  ],
  accountId: 123456,
  version: 2
};

const FEATURE_ROLLOUT_TRAFFIC_25 = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 100
        }
      ],
      variables: [
        {
          id: 1,
          key: 'STRING_VARIABLE',
          type: 'string',
          value: 'this_is_a_string'
        },
        {
          id: 2,
          key: 'INTEGER_VARIABLE',
          type: 'integer',
          value: 123
        },
        {
          id: 1,
          key: 'FLOAT_VARIABLE',
          type: 'double',
          value: 123.456
        },
        {
          id: 2,
          key: 'BOOLEAN_VARIABLE',
          type: 'boolean',
          value: true
        }
      ],
      id: 29,
      percentTraffic: 25,
      key: 'FEATURE_ROLLOUT_TRAFFIC_25',
      status: 'RUNNING',
      type: 'FEATURE_ROLLOUT'
    }
  ],
  accountId: 123456,
  version: 2
};

const FEATURE_ROLLOUT_TRAFFIC_50 = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 100
        }
      ],
      variables: [
        {
          id: 1,
          key: 'STRING_VARIABLE',
          type: 'string',
          value: 'this_is_a_string'
        },
        {
          id: 2,
          key: 'INTEGER_VARIABLE',
          type: 'integer',
          value: 123
        },
        {
          id: 1,
          key: 'FLOAT_VARIABLE',
          type: 'double',
          value: 123.456
        },
        {
          id: 2,
          key: 'BOOLEAN_VARIABLE',
          type: 'boolean',
          value: true
        }
      ],
      id: 29,
      percentTraffic: 50,
      key: 'FEATURE_ROLLOUT_TRAFFIC_50',
      status: 'RUNNING',
      type: 'FEATURE_ROLLOUT'
    }
  ],
  accountId: 123456,
  version: 2
};

const FEATURE_ROLLOUT_TRAFFIC_75 = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 100
        }
      ],
      variables: [
        {
          id: 1,
          key: 'STRING_VARIABLE',
          type: 'string',
          value: 'this_is_a_string'
        },
        {
          id: 2,
          key: 'INTEGER_VARIABLE',
          type: 'integer',
          value: 123
        },
        {
          id: 1,
          key: 'FLOAT_VARIABLE',
          type: 'double',
          value: 123.456
        },
        {
          id: 2,
          key: 'BOOLEAN_VARIABLE',
          type: 'boolean',
          value: true
        }
      ],
      id: 29,
      percentTraffic: 75,
      key: 'FEATURE_ROLLOUT_TRAFFIC_75',
      status: 'RUNNING',
      type: 'FEATURE_ROLLOUT'
    }
  ],
  accountId: 123456,
  version: 2
};

const FEATURE_ROLLOUT_TRAFFIC_100 = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 100
        }
      ],
      variables: [
        {
          id: 1,
          key: 'STRING_VARIABLE',
          type: 'string',
          value: 'this_is_a_string'
        },
        {
          id: 2,
          key: 'INTEGER_VARIABLE',
          type: 'integer',
          value: 123
        },
        {
          id: 1,
          key: 'FLOAT_VARIABLE',
          type: 'double',
          value: 123.456
        },
        {
          id: 2,
          key: 'BOOLEAN_VARIABLE',
          type: 'boolean',
          value: true
        }
      ],
      id: 29,
      percentTraffic: 100,
      key: 'FEATURE_ROLLOUT_TRAFFIC_100',
      status: 'RUNNING',
      type: 'FEATURE_ROLLOUT'
    }
  ],
  accountId: 123456,
  version: 2
};

const FEATURE_ROLLOUT_INCORRECT_VARIABLE_TYPE = {
  sdkKey: 'someuniquestuff1234567',
  campaigns: [
    {
      goals: [],
      variations: [
        {
          id: '1',
          name: 'Control',
          weight: 100
        }
      ],
      variables: [
        {
          id: 1,
          key: 'INVALID_STRING_VARIABLE',
          type: 'string',
          value: false
        },
        {
          id: 2,
          key: 'INVALID_INTEGER_VARIABLE',
          type: 'integer',
          value: 123.4
        },
        {
          id: 1,
          key: 'INVALID_FLOAT_VARIABLE',
          type: 'double',
          value: 121
        },
        {
          id: 2,
          key: 'INVALID_BOOLEAN_VARIABLE',
          type: 'boolean',
          value: 'asd'
        }
      ],
      id: 29,
      percentTraffic: 100,
      key: 'FEATURE_ROLLOUT_TRAFFIC_INCORRECT_DATATYPE',
      status: 'RUNNING',
      type: 'FEATURE_ROLLOUT'
    }
  ],
  accountId: 123456,
  version: 2
};

module.exports = {
  FEATURE_ROLLOUT_TRAFFIC_0,
  FEATURE_ROLLOUT_TRAFFIC_25,
  FEATURE_ROLLOUT_TRAFFIC_50,
  FEATURE_ROLLOUT_TRAFFIC_75,
  FEATURE_ROLLOUT_TRAFFIC_100,
  FEATURE_ROLLOUT_INCORRECT_VARIABLE_TYPE
};
