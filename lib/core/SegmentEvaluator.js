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

const SegmentEnum = require('../enums/segment');
const { getKeyValue } = require('../utils/FunctionUtil');
const { operandCustomVariablesParser } = require('../utils/SegmentUtil');
const logging = require('../services/logging');
const DataTypeUtil = require('../utils/DataTypeUtil');
const FileNameEnum = require('../enums/FileNameEnum');

const { AND, OR, NOT } = SegmentEnum.SegmentOperatorTypes;
const { CUSTOM_VARIABLE } = SegmentEnum.SegmentOperandTypes;
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const file = FileNameEnum.SegmentEvaluator;

module.exports = SegmentEvaluator;
/**
 * This method: A parser which recursively evaluates the expression tree represented by dsl
 *
 * @param {Object} dsl                     The segments defined in the campaing
 * @param {Object} customVariables         Key/value pair of custom_attributs properties
 *
 * @return {Boolean}                       true if user is to be made part of campaign, else false
 */
function evaluator(dsl, customVariables) {
  let { key, value } = getKeyValue(dsl);
  let operator = key;
  let subDsl = value;
  if (operator === NOT) {
    return !evaluator(subDsl, customVariables);
  } else if (operator === AND) {
    let list = [];
    for (let i = 0; i < subDsl.length; i++) {
      list.push(evaluator(subDsl[i], customVariables));
    }

    return list.every(val => val);
  } else if (operator === OR) {
    let list = [];
    for (let i = 0; i < subDsl.length; i++) {
      list.push(evaluator(subDsl[i], customVariables));
    }

    return list.some(val => val);
  } else if (operator === CUSTOM_VARIABLE) {
    return operandCustomVariablesParser(subDsl, customVariables);
  }
}

function SegmentEvaluator(vwoInstance, dsl, customVariables, campaignKey, userId, api) {
  try {
    if (!customVariables && DataTypeUtil.isObject(dsl) && Object.keys(dsl).length) {
      vwoInstance.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.MISSING_customVariables, {
          campaignKey,
          userId,
          file,
          api
        })
      );
      customVariables = {};
    } else if (customVariables && DataTypeUtil.isObject(dsl) && !Object.keys(dsl).length) {
      vwoInstance.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.EMPTY_SEGMENTS_OBJECT, {
          campaignKey,
          userId,
          file,
          api
        })
      );
      return true;
    }
    if (customVariables && Object.keys(dsl).length) {
      const result = evaluator(dsl, customVariables);

      if (result) {
        vwoInstance.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_PASSED_PRE_SEGMENTATION, {
            campaignKey,
            userId,
            customVariables: JSON.stringify(customVariables),
            file,
            api
          })
        );
      } else {
        vwoInstance.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_FAILED_PRE_SEGMENTATION, {
            campaignKey,
            userId,
            customVariables: JSON.stringify(customVariables),
            file,
            api
          })
        );
      }
      return result;
    }
    return true;
  } catch (e) {
    vwoInstance.logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.PRE_SEGMENTATION_ERROR, {
        campaignKey,
        userId,
        customVariables: JSON.stringify(customVariables),
        file,
        e,
        api
      })
    );
    return false;
  }
}
