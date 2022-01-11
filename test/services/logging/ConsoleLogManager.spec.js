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

const ConsoleLogManager = require('../../../lib/services/logging/ConsoleLogManager');
const { LogLevelEnum } = require('../../../lib/enums/LogLevelEnum');

describe('ConsoleLogManager', () => {
  describe('method: setLogLevel', () => {
    const logger = new ConsoleLogManager();
    test('should set logLevel as error if no level is passed', () => {
      logger.setLogLevel();
      expect(logger.logLevel).toBe(LogLevelEnum.ERROR);
    });
    test('should set logLevel as the level passed', () => {
      logger.setLogLevel(LogLevelEnum.DEBUG);
      expect(logger.logLevel).toBe(LogLevelEnum.DEBUG);
    });
  });

  describe('method: shouldLog', () => {});
});
