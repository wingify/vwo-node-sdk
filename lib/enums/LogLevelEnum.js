/**
 * Copyright 2019-2022 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
