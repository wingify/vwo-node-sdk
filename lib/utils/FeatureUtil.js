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

const CampaignUtil = require('./CampaignUtil');
const DataTypeUtil = require('./DataTypeUtil');
const FeatureVariableTypeEnum = require('../enums/FeatureVariableTypeEnum');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const file = FileNameEnum.FeatureUtil;

let FeatureUtil = {
  getVariableForFeature: (campaign, variableKey) => {
    let variableData = {};

    if (CampaignUtil.isFeatureRolloutCampaign(campaign)) {
      let variables = campaign.variables || [];

      for (let i = 0; i < variables.length; i++) {
        if (variables[i].key === variableKey) {
          variableData = variables[i];

          break;
        }
      }

      return variableData;
    }

    return variableData;
  },
  getVariableValueForVariation: (campaign, variation, variableKey) => {
    let variationVariable = {};

    if (CampaignUtil.isFeatureTestCampaign(campaign)) {
      if (!variation || !variation || !variation.variables) {
        return variationVariable;
      }

      if (!variation.isFeatureEnabled) {
        variation = CampaignUtil.getControlForCampaign(campaign);
      }

      for (let i = 0; i < variation.variables.length; i++) {
        let variable = variation.variables[i];

        if (variableKey === variable.key) {
          variationVariable = variable;
          break;
        }
      }
    }

    return variationVariable;
  },
  getTypeCastVariableValue: (variableValue, variableType) => {
    let typeCastedValue;

    switch (variableType) {
      case FeatureVariableTypeEnum.INTEGER:
        typeCastedValue = parseInt(variableValue, 10);
        if (!DataTypeUtil.isNumber(typeCastedValue) || isNaN(typeCastedValue)) {
          logger.log(
            LogLevelEnum.ERROR,
            LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, {
              file,
              variableValue,
              variableType
            })
          );
          typeCastedValue = null;
        }
        break;

      case FeatureVariableTypeEnum.DOUBLE:
        typeCastedValue = parseFloat(variableValue);
        if (!DataTypeUtil.isNumber(typeCastedValue) || isNaN(typeCastedValue)) {
          logger.log(
            LogLevelEnum.ERROR,
            LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, {
              file,
              variableValue,
              variableType
            })
          );
          typeCastedValue = null;
        }
        break;

      case FeatureVariableTypeEnum.BOOLEAN:
        if (!DataTypeUtil.isBoolean(variableValue)) {
          logger.log(
            LogLevelEnum.ERROR,
            LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, {
              file,
              variableValue,
              variableType
            })
          );
          typeCastedValue = null;
        } else {
          typeCastedValue = variableValue;
        }
        break;

      case FeatureVariableTypeEnum.JSON:
        if (!DataTypeUtil.isObject(variableValue)) {
          logger.log(
            LogLevelEnum.ERROR,
            LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.UNABLE_TO_CAST_VALUE, {
              file,
              variableValue,
              variableType
            })
          );
          typeCastedValue = null;
        } else {
          typeCastedValue = variableValue;
        }
        break;

      default:
        typeCastedValue = variableValue;
        break;
    }

    return typeCastedValue;
  }
};

module.exports = FeatureUtil;
