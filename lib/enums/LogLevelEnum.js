const AnsiColorEnum = require('./AnsiColorEnum');

const LogNumberLevel = {
  _0: 'NOTSET',
  _1: 'DEBUG',
  _2: 'INFO',
  _3: 'WARN',
  _4: 'ERROR'
};

const LogLevelEnum = {
  NOTSET: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4
};

const LogLevelColorInfoEnum = {
  [LogLevelEnum.NOTSET]: `${AnsiColorEnum.BOLD}${AnsiColorEnum.WHITE}[NOTSET]:${AnsiColorEnum.RESET}`,
  [LogLevelEnum.DEBUG]: `${AnsiColorEnum.BOLD}${AnsiColorEnum.LIGHTBLUE}[DEBUG]: ${AnsiColorEnum.RESET}`,
  [LogLevelEnum.INFO]: `${AnsiColorEnum.BOLD}${AnsiColorEnum.CYAN}[INFO]:  ${AnsiColorEnum.RESET}`,
  [LogLevelEnum.WARN]: `${AnsiColorEnum.BOLD}${AnsiColorEnum.YELLOW}[WARN]:  ${AnsiColorEnum.RESET}`,
  [LogLevelEnum.ERROR]: `${AnsiColorEnum.BOLD}${AnsiColorEnum.RED}[ERROR]: ${AnsiColorEnum.RESET}`
};

const LogLevelInfoEnum = {
  [LogLevelEnum.NOTSET]: `[NOTSET]:`,
  [LogLevelEnum.DEBUG]: `[DEBUG]: `,
  [LogLevelEnum.INFO]: `[INFO]:  `,
  [LogLevelEnum.WARN]: `[WARN]:  `,
  [LogLevelEnum.ERROR]: `[ERROR]: `
};

module.exports = {
  LogLevelEnum,
  LogNumberLevel,
  LogLevelInfoEnum,
  LogLevelColorInfoEnum
};
