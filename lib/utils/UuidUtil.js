const uuidv5 = require('uuid/v5');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const VWO_NAMESPACE = uuidv5('https://vwo.com', uuidv5.URL);

const UuidUtil = {
  generateFor: (userId, accountId) => {
    const hash = `${accountId}`;
    const userIdNamespace = UuidUtil.generate(hash, VWO_NAMESPACE);
    const uuidForUserIdAccountId = UuidUtil.generate(userId, userIdNamespace);

    let desiredUuid = uuidForUserIdAccountId.replace(/-/gi, '').toUpperCase();

    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.UUID_FOR_USER, {
        file: FileNameEnum.UuidUtil,
        userId,
        accountId,
        desiredUuid
      })
    );

    return desiredUuid;
  },
  generate: (name, namespace) => {
    if (!name || !namespace) {
      return;
    }

    return uuidv5(name, namespace);
  }
};

module.exports = UuidUtil;
