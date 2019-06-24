const Audience = {
  evaluate: conditions => {
    if (!conditions || conditions.length === 0) {
      return true;
    }
    return false;
  }
};

module.exports = Audience;
