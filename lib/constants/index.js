const path = require('path');

module.exports = {
  API_VERSION: 2,
  PLATFORM: 'server-app',
  SEED_VALUE: 1,
  MAX_TRAFFIC_PERC: 100,
  MAX_TRAFFIC_VALUE: 10000,
  STATUS_RUNNING: 'RUNNING',
  LIBRARY_PATH: path.resolve(__dirname, '..'),
  ENDPOINTS: {
    // BASE_URL: 'https://dacdn.vwo.com',
    BASE_URL: 'https://dev.visualwebsiteoptimizer.com',
    TRACK_USER: '/track-user',
    TRACK_GOAL: '/track-goal'
  },
  EVENTS: {
    TRACK_USER: 'track-user',
    TRACK_GOAL: 'track-goal'
  },
  DATA_TYPE: {
    NUMBER: 'number',
    STRING: 'string',
    FUNCTION: 'function',
    BOOLEAN: 'boolean'
  },
  API_METHODS: {
    CREATE_INSTANCE: 'CREATE_INSTANCE',
    ACTIVATE: 'ACTIVATE',
    GET_VARIATION: 'GET_VARIATION',
    TRACK: 'TRACK'
  }
};
