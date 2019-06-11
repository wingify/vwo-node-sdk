const Audience = {
  evaluate: condition => {
    if (!condition || condition.length === 0) {
      return true;
    }
  }
};

module.exports = Audience;
