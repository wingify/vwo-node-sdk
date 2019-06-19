const LogLevelEnum = {
  NOTSET: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4
};

const RESET = '\x1b[0m';
const WHITE = '\x1b[30m';
const CYAN = '\x1b[36m';
const LIGHTGREEN = '\x1b[92m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';

const LogLevelInfoEnum = {
  [LogLevelEnum.NOTSET]: `${WHITE}[NOTSET]:${RESET}`,
  [LogLevelEnum.DEBUG]: `${LIGHTGREEN}[DEBUG]: ${RESET}`,
  [LogLevelEnum.INFO]: `${CYAN}[INFO]:  ${RESET}`,
  [LogLevelEnum.WARN]: `${YELLOW}[WARN]:  ${RESET}`,
  [LogLevelEnum.ERROR]: `${RED}[ERROR]: ${RESET}`
};

module.exports = {
  LogLevelEnum,
  LogLevelInfoEnum
};
