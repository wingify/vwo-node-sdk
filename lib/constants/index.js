const path = require('path');

module.exports = {
  API_VERSION: 2,
  PLATFORM: 'server',
  SEED_VALUE: 1,
  MAX_TRAFFIC_PERC: 100,
  MAX_TRAFFIC_VALUE: 10000,
  STATUS_RUNNING: 'RUNNING',
  LIBRARY_PATH: path.resolve(__dirname, '..'),
  HTTP_PROTOCOL: 'http://',
  HTTPS_PROTOCOL: 'https://',
  ENDPOINTS: {
    BASE_URL: 'dev.visualwebsiteoptimizer.com',
    ACCOUNT_SETTINGS: '/server-side/settings',
    TRACK_USER: '/server-side/track-user',
    TRACK_GOAL: '/server-side/track-goal'
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
