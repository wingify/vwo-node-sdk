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

const variableObjectSchema = {
  type: 'object',
  properties: {
    id: { type: ['number', 'string'] },
    type: { type: ['string'] },
    key: { type: 'string' },
    value: { type: ['number', 'string', 'boolean'] }
  }
};

const campaignVariationSchema = {
  type: 'object',
  properties: {
    id: { type: ['number', 'string'] },
    type: { type: 'string' },
    name: { type: 'string' },
    weight: { type: ['number', 'string'] },
    variables: {
      if: { type: 'array' },
      then: { items: variableObjectSchema },
      else: { properties: {} }
    }
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
      if: { type: 'array' },
      then: { items: campaignGoalSchema },
      else: { properties: {} }
    },
    variations: {
      if: { type: 'array' },
      then: { items: campaignVariationSchema },
      else: { properties: {} }
    },
    variables: {
      if: { type: 'array' },
      then: { items: variableObjectSchema },
      else: { properties: {} }
    },
    segments: {
      type: 'object'
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
