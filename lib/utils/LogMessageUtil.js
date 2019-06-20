const DataTypeUtil = require('./DataTypeUtil');

const nargs = /\{([0-9a-zA-Z_]+)\}/g;

let LogMessageUtil = {
  // Forked version of https://github.com/Matt-Esch/string-template by Matt-Esch (c) MIT
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
