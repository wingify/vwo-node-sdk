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
  isObject: function(val) {
    return DataTypeUtil._toStringValue(val) === '[object Object]';
  },
  isFunction: function(val) {
    return DataTypeUtil._toStringValue(val) === '[object Function]';
  },
  isBoolean: function(val) {
    return DataTypeUtil._toStringValue(val) === '[object Boolean]';
  },
  isUndefined: function(val) {
    return DataTypeUtil._toStringValue(val) === '[object Undefined]';
  },
  isNull: function(val) {
    return DataTypeUtil._toStringValue(val) === '[object Null]';
  },
  isArray: function(val) {
    return DataTypeUtil._toStringValue(val) === '[object Array]';
  }
};

module.exports = DataTypeUtil;
