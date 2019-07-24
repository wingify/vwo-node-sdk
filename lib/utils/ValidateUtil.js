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
