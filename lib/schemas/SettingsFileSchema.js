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

const campaignGoalSchema = {
  type: 'object',
  properties: {
    id: { type: ['number', 'string'] },
    identifier: { type: 'string' },
    type: { type: 'string' }
  }
};

const campaignVariationSchema = {
  type: 'object',
  properties: {
    id: { type: ['number', 'string'] },
    name: { type: 'string' },
    weight: { type: ['number', 'string'] }
  }
};

const campaignObjectSchema = {
  type: 'object',
  properties: {
    id: { type: ['number', 'string'] },
    key: { type: 'string' },
    status: { type: 'string' },
    percentTraffic: { type: 'number' },
    goals: {
      type: 'array',
      items: campaignGoalSchema
    },
    variations: {
      type: 'array',
      items: campaignVariationSchema
    }
  }
};

const settingsFileSchema = {
  properties: {
    version: {
      type: ['number', 'string']
    },
    accountId: {
      type: ['number', 'string']
    },
    campaigns: {
      if: { type: 'array' },
      then: { items: campaignObjectSchema },
      else: { properties: {} }
    }
  }
};

module.exports = settingsFileSchema;
