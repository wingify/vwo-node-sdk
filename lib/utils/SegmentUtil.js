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

const DataTypeUtil = require('../utils/DataTypeUtil');
const { matchWithRegex } = require('../utils/FunctionUtil');
const { getKeyValue } = require('../utils/ObjectUtil');
const SegmentEnum = require('../enums/segment');

const {
  LOWER_MATCH,
  WILDCARD_MATCH,
  REGEX_MATCH,
  STARTING_STAR,
  ENDING_STAR
} = SegmentEnum.SegmentOperandValueTypeRegexes;

const {
  LOWER_VALUE,
  STARTING_ENDING_STAR_VALUE,
  STARTING_STAR_VALUE,
  ENDING_STAR_VALUE,
  REGEX_VALUE,
  EQUAL_VALUE
} = SegmentEnum.SegmentOperandValues;

function extractOperandValue(operand, regex) {
  return matchWithRegex(operand, regex) && matchWithRegex(operand, regex)[1];
}

function processValues(operandValue, tagValue) {
  // this is atomic, either both will be processed or none
  let processedOperandValue = parseFloat(operandValue, 10);
  let processedTagValue = parseFloat(tagValue, 10);
  if (!processedOperandValue || !processedTagValue) {
    return {
      operandValue: operandValue,
      tagValue: tagValue
    };
  }
  // now we have surity that both are numbers
  // now we can convert them independently to int type if they
  // are int rather than floats
  if (processedOperandValue === Math.floor(processedOperandValue)) {
    processedOperandValue = parseInt(processedOperandValue, 10);
  }
  if (processedTagValue === Math.floor(processedTagValue)) {
    processedTagValue = parseInt(processedTagValue, 10);
  }
  // convert it back to string and return
  return {
    operandValue: processedOperandValue.toString(),
    tagValue: processedTagValue.toString()
  };
}

function preProcessTagValue(tagValue) {
  if (tagValue === undefined) {
    tagValue = '';
  }
  if (DataTypeUtil.isBoolean(tagValue)) {
    if (tagValue) {
      tagValue = true;
    } else {
      tagValue = false;
    }
  }
  if (tagValue !== null) {
    tagValue = tagValue.toString();
  }
  return tagValue;
}

function preProcessOperandValue(operand) {
  let operandType;
  let operandValue;
  let startingStar;
  let endingStar;
  // Pre process operand value
  if (matchWithRegex(operand, LOWER_MATCH)) {
    operandType = LOWER_VALUE;
    operandValue = extractOperandValue(operand, LOWER_MATCH);
  } else if (matchWithRegex(operand, WILDCARD_MATCH)) {
    operandValue = extractOperandValue(operand, WILDCARD_MATCH);
    startingStar = matchWithRegex(operandValue, STARTING_STAR);
    endingStar = matchWithRegex(operandValue, ENDING_STAR);
    // In case of wildcard, the operand type is further divided into contains, startswith and endswith
    if (startingStar && endingStar) {
      operandType = STARTING_ENDING_STAR_VALUE;
    } else if (startingStar) {
      operandType = STARTING_STAR_VALUE;
    } else if (endingStar) {
      operandType = ENDING_STAR_VALUE;
    }
    operandValue = operandValue.replace(STARTING_STAR, '').replace(ENDING_STAR, '');
  } else if (matchWithRegex(operand, REGEX_MATCH)) {
    operandType = REGEX_VALUE;
    operandValue = extractOperandValue(operand, REGEX_MATCH);
  } else {
    operandType = EQUAL_VALUE;
    operandValue = operand;
  }
  return {
    operandType,
    operandValue
  };
}

function operandCustomVariablesParser(operand, customVariables) {
  // Extract custom_variable_key and custom_variable_value from operand
  let { key, value } = getKeyValue(operand);
  let operandKey = key;
  operand = value;
  if (!customVariables.hasOwnProperty(key)) {
    // For handling ".*" regex case when key is not present in customVariables and matches regex is used.
    return false;
  }
  let tagValue = customVariables[operandKey];
  // Pre process tag value
  tagValue = preProcessTagValue(tagValue);
  let { operandType, operandValue } = preProcessOperandValue(operand);
  // Process both operand and tag values
  let processedValues = processValues(operandValue, tagValue);
  tagValue = processedValues.tagValue;
  return extractResult(operandType, processedValues.operandValue, tagValue);
}

function operandUserParser(operand, customVariables) {
  const users = operand.split(',');
  for (let i = 0; i < users.length; i++) {
    if (users[i].trim() === customVariables._vwoUserId) {
      return true;
    }
  }
  return false;
}

function extractResult(operandType, operandValue, tagValue) {
  let result;

  switch (operandType) {
    case LOWER_VALUE:
      if (tagValue !== null) {
        result = operandValue.toLowerCase() === tagValue.toLowerCase();
      }
      break;
    case STARTING_ENDING_STAR_VALUE:
      if (tagValue !== null) {
        result = tagValue.indexOf(operandValue) > -1;
      }
      break;
    case STARTING_STAR_VALUE:
      if (tagValue !== null) {
        result = tagValue.endsWith(operandValue);
      }
      break;
    case ENDING_STAR_VALUE:
      if (tagValue !== null) {
        result = tagValue.startsWith(operandValue);
      }
      break;
    case REGEX_VALUE:
      try {
        let pattern = new RegExp(operandValue, 'g');
        result = !!pattern.test(tagValue);
      } catch (err) {
        result = false;
      }
      break;
    default:
      result = tagValue === operandValue;
  }

  return result;
}

module.exports = {
  extractOperandValue,
  processValues,
  preProcessTagValue,
  preProcessOperandValue,
  operandCustomVariablesParser,
  operandUserParser
};
