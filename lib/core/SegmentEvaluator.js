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

const SegmentEnum = require('../enums/segment');
const { getKeyValue } = require('../utils/ObjectUtil');
const { operandCustomVariablesParser, operandUserParser } = require('../utils/SegmentUtil');
const logging = require('../services/logging');
const DataTypeUtil = require('../utils/DataTypeUtil');
const FileNameEnum = require('../enums/FileNameEnum');

const { AND, OR, NOT } = SegmentEnum.SegmentOperatorTypes;
const { CUSTOM_VARIABLE, USER } = SegmentEnum.SegmentOperandTypes;
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const file = FileNameEnum.SegmentEvaluator;

const logger = logging.getLogger();

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
  } else if (operator === USER) {
    return operandUserParser(subDsl, customVariables);
  }
}

function SegmentEvaluator(dsl, customVariables = {}, campaignKey, userId, variation = '', disableLogs = false) {
  try {
    if (DataTypeUtil.isObject(dsl) && !Object.keys(dsl).length) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SEGMENTATION_SKIPPED, {
          campaignKey,
          userId,
          file
        }),
        disableLogs
      );
      return true;
    }
    if (DataTypeUtil.isObject(dsl) && Object.keys(dsl).length) {
      return evaluator(dsl, customVariables);
    }
    return true;
  } catch (err) {
    logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SEGMENTATION_ERROR, {
        campaignKey,
        userId,
        customVariables: JSON.stringify(customVariables),
        file,
        err,
        variation
      }),
      disableLogs
    );
    return false;
  }
}
