const FunctionUtil = {
  getRandomNumber: () => {
    return Math.random();
  },
  getCurrentUnixTimestamp: () => {
    return Math.ceil(+new Date() / 1000);
  }
};

module.exports = FunctionUtil;
