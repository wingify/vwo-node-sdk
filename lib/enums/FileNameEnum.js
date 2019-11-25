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

const LIB_PATH = 'lib';
const CORE_PATH = 'lib/core';
const UTIL_PATH = 'lib/util';
const SERVICES_PATH = 'lib/services';

module.exports = {
  INDEX: `${LIB_PATH}/index`,

  VWO: `${LIB_PATH}/VWO`,

  AudienceEvaluator: `${CORE_PATH}/AudienceEvaluator`,
  BucketingService: `${CORE_PATH}/BucketingService`,
  VariationDecider: `${CORE_PATH}/VariationDecider`,

  ConsoleLogManager: `${SERVICES_PATH}/ConsoleLogManager`,
  EventQueue: `${SERVICES_PATH}/EventQueue`,
  LoggingManager: `${SERVICES_PATH}/LoggingManager`,
  ProjectConfigManager: `${SERVICES_PATH}/ProjectConfigManager`,

  CampaignUtil: `${UTIL_PATH}/CampaignUtil`,
  DataTypeUtil: `${UTIL_PATH}/DataTypeUtil`,
  EventDispatcher: `${UTIL_PATH}/EventDispatcher`,
  EventDispatcherUtil: `${UTIL_PATH}/EventDispatcherUtil`,
  Functionutil: `${UTIL_PATH}/Functionutil`,
  ImpressionUtil: `${UTIL_PATH}/ImpressionUtil`,
  UuidUtil: `${UTIL_PATH}/UuidUtil`,
  ValidateUtil: `${UTIL_PATH}/ValidateUtil`,
  VariationDecisionUtil: `${UTIL_PATH}/VariationDecisionUtils`
};
