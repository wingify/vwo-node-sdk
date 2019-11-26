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

const DataTypeUtil = require('./DataTypeUtil');
const DataTypeEnum = require('../enums/DataTypeEnum');
const ApiEnum = require('../enums/ApiEnum');

const APIMethodArgumentsValidationEnum = {
  [ApiEnum.ACTIVATE]: function(campaignKey, userId) {
    return [
      {
        key: 'campaignKey',
        value: campaignKey,
        type: DataTypeEnum.STRING
      },
      {
        key: 'userId',
        value: userId,
        type: DataTypeEnum.STRING
      }
    ];
  },
  [ApiEnum.TRACK]: function(campaignKey, userId, goalIdentifier) {
    return [
      {
        key: 'campaignKey',
        value: campaignKey,
        type: DataTypeEnum.STRING
      },
      {
        key: 'userId',
        value: userId,
        type: DataTypeEnum.STRING
      },
      {
        key: 'goalIdentifier',
        value: goalIdentifier,
        type: DataTypeEnum.STRING
      }
    ];
  },
  [ApiEnum.IS_FEATURE_ENABLED]: function(featureKey, userId) {
    return [
      {
        key: 'featureKey',
        value: featureKey,
        type: DataTypeEnum.STRING
      },
      {
        key: 'userId',
        value: userId,
        type: DataTypeEnum.STRING
      }
    ];
  },
  [ApiEnum.GET_FEATURE_VARIABLE_TYPE]: function(featureKey, variableKey, userId) {
    return [
      {
        key: 'featureKey',
        value: featureKey,
        type: DataTypeEnum.STRING
      },
      {
        key: 'variableKey',
        value: variableKey,
        type: DataTypeEnum.STRING
      },
      {
        key: 'userId',
        value: userId,
        type: DataTypeEnum.STRING
      }
    ];
  }
};
// both have same
APIMethodArgumentsValidationEnum[ApiEnum.GET_VARIATION_NAME] = APIMethodArgumentsValidationEnum[ApiEnum.ACTIVATE];

const ValidateUtil = {
  isValidValue: function(value) {
    return !!(value !== undefined && value);
  },
  isValidString: function(value) {
    return ValidateUtil.isValidValue(value) && DataTypeUtil.isString(value);
  },
  isValidNumber: function(value) {
    return ValidateUtil.isValidValue(value) && DataTypeUtil.isNumber(value);
  },
  isValidFunction: function(value) {
    return ValidateUtil.isValidValue(value) && DataTypeUtil.isFunction(value);
  },
  isValidBoolean: function(value) {
    return value !== undefined && DataTypeUtil.isBoolean(value);
  },
  areValidParamsForAPIMethod: (method, campaignKey, userId, goalIdentifier) => {
    let isValid = false;
    let args = APIMethodArgumentsValidationEnum[method](campaignKey, userId, goalIdentifier);

    let validators = [];

    for (let i = 0; i < args.length; i++) {
      let argConfig = args[i];
      let argValue = argConfig.value;
      let dataType = argConfig.type;
      // let value;

      switch (dataType) {
        case DataTypeEnum.NUMBER:
          validators.push(ValidateUtil.isValidNumber(argValue));
          break;
        case DataTypeEnum.STRING:
          validators.push(ValidateUtil.isValidString(argValue));
          break;
        case DataTypeEnum.BOOLEAN:
          validators.push(ValidateUtil.isValidBoolean(argValue));
          break;
        case DataTypeEnum.FUNCTION:
          validators.push(ValidateUtil.isValidFunction(argValue));
          break;
        // case DataTypeEnum.NUMBER_STRING:
        //   value = ValidateUtil.isValidNumber(argValue) || ValidateUtil.isValidString(argValue);
        //   validators.push(value);
        //   break;
      }
    }

    isValid = validators.every(val => val);

    return isValid;
  }
};

module.exports = ValidateUtil;
