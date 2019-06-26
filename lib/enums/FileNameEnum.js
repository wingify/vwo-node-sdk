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
  ValidateUtil: `${UTIL_PATH}/ValidateUtil`
};
