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

const DataTypeUtil = require('./DataTypeUtil');

const nargs = /\{([0-9a-zA-Z_]+)\}/g;

let LogMessageUtil = {
  /**
   * Took reference from: string-template
   *
   * Name: string-template
   * Published Name: string-template
   * URL: https://github.com/Matt-Esch/string-template
   * Description: A lightweight string replace engine for text-based templates
   * Author: Matt-Esch (https://github.com/Matt-Esch)
   * License: MIT License
   * Local Modifications: This library is not used as a dependency.
   *       Source code was referenced and is modified as per requirements.
   */
  build: (template, data) => {
    try {
      return template.replace(nargs, (match, key, index) => {
        let result;
        let isKey;

        if (template[index - 1] === '{' && template[index + match.length] === '}') {
          return key;
        } else {
          isKey = data.hasOwnProperty(key);

          if (isKey) {
            let value = data[key];

            if (DataTypeUtil.isFunction(value)) {
              value = data[key]();
            }
            result = value;
          } else {
            result = null;
          }
          if (result === null || result === undefined) {
            return '';
          }

          return result;
        }
      });
    } catch (err) {
      return template;
    }
  }
};

module.exports = LogMessageUtil;
