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

const {
  getLogger,
  setLogColorMode,
  getLogColorMode,
  setLogLevel,
  getLogLevel,
  globalLogHandler
} = require('../../../lib/services/logging');
const AnsiColorEnum = require('../../../lib/enums/AnsiColorEnum');
let { LogLevelEnum } = require('../../../lib/enums');

LogLevelEnum = LogLevelEnum.LogLevelEnum;

const spyOnGlobalHandlerLog = jest.spyOn(globalLogHandler, 'log');

describe('LoggingManager', () => {
  describe('method: setLogColorMode and getLogColorMode', () => {
    test('should set colored log value', () => {
      setLogColorMode(AnsiColorEnum.CYAN);
      expect(getLogColorMode()).toBe(AnsiColorEnum.CYAN);
    });
  });

  describe('method: setLogLevel', () => {
    test('should set logLevel as error if no level is passed', () => {
      setLogLevel();
      expect(getLogLevel()).toBe(LogLevelEnum.ERROR);
    });
    test('should set logLevel as the level passed', () => {
      setLogLevel(LogLevelEnum.DEBUG);
      expect(getLogLevel()).toBe(LogLevelEnum.DEBUG);
    });
  });

  describe('method: info', () => {
    const logger = getLogger('logger');
    setLogLevel(LogLevelEnum.INFO);
    test('logger should be called', () => {
      logger.info('1');
      expect(spyOnGlobalHandlerLog).toHaveBeenCalledWith(LogLevelEnum.INFO, '1');
    });
  });

  describe('method: debug', () => {
    const logger = getLogger('logger');
    setLogLevel(LogLevelEnum.DEBUG);
    test('logger should be called', () => {
      logger.debug('1');
      expect(spyOnGlobalHandlerLog).toHaveBeenCalledWith(LogLevelEnum.DEBUG, '1');
    });
  });

  describe('method: warn', () => {
    const logger = getLogger('logger');
    setLogLevel(LogLevelEnum.WARN);
    test('logger should be called', () => {
      logger.warn('1');
      expect(spyOnGlobalHandlerLog).toHaveBeenCalledWith(LogLevelEnum.WARN, '1');
    });
  });

  describe('method: error', () => {
    const logger = getLogger('logger');
    setLogLevel(LogLevelEnum.ERROR);
    test('logger should be called', () => {
      logger.error('1');
      expect(spyOnGlobalHandlerLog).toHaveBeenCalledWith(LogLevelEnum.ERROR, '1');
    });
  });
});
