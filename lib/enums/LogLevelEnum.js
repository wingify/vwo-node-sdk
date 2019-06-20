const AnsiColorEnum = require('./AnsiColorEnum');

const LogLevelEnum = {
  NOTSET: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4
};

const LogLevelInfoEnum = {
  [LogLevelEnum.NOTSET]: `${AnsiColorEnum.BOLD}${AnsiColorEnum.WHITE}[NOTSET]:${AnsiColorEnum.RESET}`,
  [LogLevelEnum.DEBUG]: `${AnsiColorEnum.BOLD}${AnsiColorEnum.LIGHTBLUE}[DEBUG]: ${AnsiColorEnum.RESET}`,
  [LogLevelEnum.INFO]: `${AnsiColorEnum.BOLD}${AnsiColorEnum.CYAN}[INFO]:  ${AnsiColorEnum.RESET}`,
  [LogLevelEnum.WARN]: `${AnsiColorEnum.BOLD}${AnsiColorEnum.YELLOW}[WARN]:  ${AnsiColorEnum.RESET}`,
  [LogLevelEnum.ERROR]: `${AnsiColorEnum.BOLD}${AnsiColorEnum.RED}[ERROR]: ${AnsiColorEnum.RESET}`
};

module.exports = {
  LogLevelEnum,
  LogLevelInfoEnum
};
