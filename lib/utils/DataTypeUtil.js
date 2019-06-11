const DataTypeUtil = {
  _toStringValue: function(val) {
    return Object.prototype.toString.call(val);
  },
  isNumber: function(val) {
    return DataTypeUtil._toStringValue(val) === '[object Number]';
  },
  isString: function(val) {
    return DataTypeUtil._toStringValue(val) === '[object String]';
  },
  isFunction: function(val) {
    return DataTypeUtil._toStringValue(val) === '[object Function]';
  }
};

module.exports = DataTypeUtil;
