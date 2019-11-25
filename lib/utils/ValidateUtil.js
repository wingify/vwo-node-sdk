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
const Constants = require('../constants');

const APIMethodArgumentsValidationEnum = {
  [Constants.API_METHODS.ACTIVATE]: function(campaignTestKey, userId) {
    return [
      {
        key: 'campaignTestKey',
        value: campaignTestKey,
        type: Constants.DATA_TYPE.NUMBER_STRING
      },
      {
        key: 'userId',
        value: userId,
        type: Constants.DATA_TYPE.STRING
      }
    ];
  },
  [Constants.API_METHODS.TRACK]: function(campaignTestKey, userId, goalIdentifier) {
    return [
      {
        key: 'campaignTestKey',
        value: campaignTestKey,
        type: Constants.DATA_TYPE.NUMBER_STRING
      },
      {
        key: 'userId',
        value: userId,
        type: Constants.DATA_TYPE.STRING
      },
      {
        key: 'goalIdentifier',
        value: goalIdentifier,
        type: Constants.DATA_TYPE.STRING
      }
    ];
  }
};
// both have same
APIMethodArgumentsValidationEnum[Constants.API_METHODS.GET_VARIATION] =
  APIMethodArgumentsValidationEnum[Constants.API_METHODS.ACTIVATE];

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
  areValidParamsForAPIMethod: (method, campaignTestKey, userId, goalIdentifier) => {
    let isValid = false;
    let args = APIMethodArgumentsValidationEnum[method](campaignTestKey, userId, goalIdentifier);

    let validators = [];

    for (let i = 0; i < args.length; i++) {
      let argConfig = args[i];
      let argValue = argConfig.value;
      let dataType = argConfig.type;
      let value;

      switch (dataType) {
        case Constants.DATA_TYPE.NUMBER:
          validators.push(ValidateUtil.isValidNumber(argValue));
          break;
        case Constants.DATA_TYPE.STRING:
          validators.push(ValidateUtil.isValidString(argValue));
          break;
        case Constants.DATA_TYPE.BOOLEAN:
          validators.push(ValidateUtil.isValidBoolean(argValue));
          break;
        case Constants.DATA_TYPE.FUNCTION:
          validators.push(ValidateUtil.isValidFunction(argValue));
          break;
        case Constants.DATA_TYPE.NUMBER_STRING:
          value = ValidateUtil.isValidNumber(argValue) || ValidateUtil.isValidString(argValue);
          validators.push(value);
          break;
      }
    }

    isValid = validators.every(val => val);

    return isValid;
  }
};

module.exports = ValidateUtil;
