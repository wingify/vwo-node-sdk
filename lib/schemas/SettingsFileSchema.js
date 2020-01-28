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

let { superstruct, struct } = require('superstruct');

function objectOrArrayMatcher(value, schema) {
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return struct({}).test(value);
  } else if (Object.prototype.toString.call(value) === '[object Array]') {
    return schema.test(value);
  }
  return false;
}

struct = superstruct({
  types: {
    variationsType: value => objectOrArrayMatcher(value, campaignVariationSchema),
    goalsType: value => objectOrArrayMatcher(value, campaignGoalSchema),
    variablesType: value => objectOrArrayMatcher(value, variableObjectSchema),
    campaignsType: value => objectOrArrayMatcher(value, campaignObjectSchema)
  }
});

const campaignGoalSchema = struct([
  {
    id: 'number|string',
    identifier: 'string',
    type: 'string'
  }
]);

const variableObjectSchema = struct([
  {
    id: 'number|string',
    type: 'string',
    key: 'string',
    value: 'number|string|boolean'
  }
]);

const campaignVariationSchema = struct([
  {
    id: 'number|string',
    name: 'string',
    weight: 'number|string',
    changes: 'object?',
    segments: 'object?',
    variables: 'variablesType?',
    isFeatureEnabled: 'boolean?',
    startVariationAllocation: 'number?',
    endVariationAllocation: 'number?'
  }
]);

const campaignObjectSchema = struct([
  {
    id: 'number|string',
    type: 'string',
    key: 'string',
    status: 'string',
    percentTraffic: 'number',
    goals: 'goalsType',
    variations: 'variationsType',
    variables: 'variablesType?',
    segments: 'object',
    isForcedVariationEnabled: 'boolean?'
  }
]);

const settingsFileSchema = struct({
  sdkKey: 'string',
  version: 'number|string',
  accountId: 'number|string',
  campaigns: 'campaignsType'
});

module.exports = settingsFileSchema;
