const FunctionUtil = {
  cloneObject: obj => {
    if (!obj) {
      return obj;
    }

    let clonedObj;
    try {
      clonedObj = JSON.parse(JSON.stringify(obj));
    } catch (err) {
      clonedObj = obj;
    }

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
