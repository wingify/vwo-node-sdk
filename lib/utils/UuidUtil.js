const uuidv5 = require('uuid/v5');

const VWO_NAMESPACE = uuidv5('https://vwo.com', uuidv5.URL);

const UuidUtil = {
  generateFor: (userId, accountId) => {
    const hash = `${accountId}`;
    const userIdNamespace = UuidUtil.generate(hash, VWO_NAMESPACE);
    const uuidForUserIdAccountId = UuidUtil.generate(userId, userIdNamespace);

    return uuidForUserIdAccountId.replace(/-/gi, '').toUpperCase();
  },
  generate: (name, namespace) => {
    if (!name || !namespace) {
      return;
    }

    return uuidv5(name, namespace);
  }
};

module.exports = UuidUtil;
