/**
 * Copyright 2019 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
const packageFile = require('../../package.json');

module.exports = {
  SDK_NAME: 'nodejs',
  SDK_VERSION: packageFile.version,
  PLATFORM: 'server',
  SEED_VALUE: 1,
  MAX_TRAFFIC_PERCENT: 100,
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
  },
  GOAL_TYPES: {
    REVENUE: 'REVENUE_TRACKING',
    CUSTOM: 'CUSTOM_GOAL'
  }
};
