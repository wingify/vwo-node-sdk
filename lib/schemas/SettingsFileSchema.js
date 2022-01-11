/**
 * Copyright 2019-2022 Wingify Software Pvt. Ltd.
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

let { validate, number, string, boolean, array, object, optional, union, type, record } = require('superstruct');

const campaignGoalSchema = type({
  id: union([number(), string()]),
  identifier: string(),
  type: string(),
  revenueProp: optional(string())
});

const variableObjectSchema = type({
  id: union([number(), string()]),
  type: string(),
  key: string(),
  value: union([number(), string(), boolean()])
});

const campaignVariationSchema = type({
  id: union([number(), string()]),
  name: string(),
  weight: union([number(), string()]),
  changes: optional(object()),
  segments: optional(object()),
  variables: optional(union([object(), array(variableObjectSchema)])),
  isFeatureEnabled: optional(boolean()),
  startVariationAllocation: optional(number()),
  endVariationAllocation: optional(number())
});

const campaignObjectSchema = type({
  id: union([number(), string()]),
  type: string(),
  key: string(),
  status: string(),
  name: string(),
  isBucketingSeedEnabled: optional(boolean()),
  percentTraffic: number(),
  goals: union([object(), array(campaignGoalSchema)]),
  variations: union([object(), array(campaignVariationSchema)]),
  variables: optional(union([object(), array(variableObjectSchema)])),
  segments: object(),
  isForcedVariationEnabled: optional(boolean()),
  isUserListEnabled: optional(boolean())
});

const groupSchema = type({
  groupName: string(),
  campaigns: array(number())
});

const settingsFileSchema = type({
  sdkKey: optional(string()),
  version: union([number(), string()]),
  accountId: union([number(), string()]),
  campaigns: array(campaignObjectSchema),
  campaignGroups: optional(record(string(), number())),
  isEventArchEnabled: optional(boolean()),
  collectionPrefix: optional(string()),
  groups: optional(union([object(), record(string(), groupSchema)]))
});

const validateSettingsFile = function(settings) {
  const [error] = validate(settings, settingsFileSchema);
  return !error;
};

module.exports = validateSettingsFile;
