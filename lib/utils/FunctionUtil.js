const cloneDeep = require('lodash.clonedeep');

const FunctionUtil = {
  cloneObject: obj => {
    if (!obj) {
      return obj;
    }

    let clonedObj = cloneDeep(obj);

    return clonedObj;
  },
  getRandomNumber: () => {
    return Math.random();
  },
  getCurrentUnixTimestamp: () => {
    return Math.ceil(+new Date() / 1000);
  }
};

module.exports = FunctionUtil;
