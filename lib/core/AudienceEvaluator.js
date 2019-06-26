const Audience = {
  evaluate: conditions => {
    // Since pre-segment is not yet provided, getting no conditions or zero-length conditions means became part of audience
    if (!conditions || conditions.length === 0) {
      return true;
    }

    return false;
  }
};

module.exports = Audience;
