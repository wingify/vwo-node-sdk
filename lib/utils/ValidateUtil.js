const DataTypeUtil = require('./DataTypeUtil');
const Constants = require('../constants/Constants');

const APIMEthodArgumentsValidationEnum = {
  [Constants.API_METHODS.ACTIVATE]: function(expId, userId) {
    return [
      {
        key: 'expId',
        value: expId,
        type: Constants.DATA_TYPE.NUMBER
      },
      {
        key: 'userId',
        value: userId,
        type: Constants.DATA_TYPE.STRING
      }
    ];
  },
  [Constants.API_METHODS.TRACK]: function(expId, userId, goalId) {
    return [
      {
        key: 'expId',
        value: expId,
        type: Constants.DATA_TYPE.NUMBER
      },
      {
        key: 'userId',
        value: userId,
        type: Constants.DATA_TYPE.STRING
      },
      {
        key: 'goalId',
        value: goalId,
        type: Constants.DATA_TYPE.NUMBER
      }
    ];
  }
};
// both have same
APIMEthodArgumentsValidationEnum[Constants.API_METHODS.GET_VARIATION] =
  APIMEthodArgumentsValidationEnum[Constants.API_METHODS.ACTIVATE];

const ValidateUtil = {
  isValidValue: function(value) {
    return value !== undefined && value;
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
    return value !== undefined;
  },
  areValidParamsForAPIMethod: (method, expId, userId, goalId) => {
    let isValid = false;
    let args = APIMEthodArgumentsValidationEnum[method](expId, userId, goalId);

    let validators = [];

    for (let i = 0; i < args.length; i++) {
      let argConfig = args[i];
      let argValue = argConfig.value;
      let dataType = argConfig.type;

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
        case Constants.DATA_TYPE.Function:
          validators.push(ValidateUtil.isValidFunction(argValue));
          break;
      }
    }

    isValid = validators.every(val => val);

    return isValid;
  }
};

module.exports = ValidateUtil;
