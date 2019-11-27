/**
 * Copyright 2019 Wingify Software Pvt. Ltd.
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

const indexFile = require('../lib/index');
const logging = require('../lib/services/logging');

describe('index file', () => {
  test('should export required modules and APIs', () => {
    expect(indexFile.logging).toBeDefined();
    expect(indexFile.setLogger).toBeDefined();
    expect(indexFile.setLogLevel).toBeDefined();
    expect(indexFile.getSettingsFile).toBeDefined();
    expect(indexFile.launch).toBeDefined();
  });

  describe('method: launch', () => {
    test('set log color mode if development mode is passed', () => {
      const spyOnLoggingSetColor = jest.spyOn(logging, 'setLogColorMode');

      indexFile.launch({
        isDevelopmentMode: true
      });
      expect(spyOnLoggingSetColor).toHaveBeenCalledWith(true);
    });

    test('set log handler and log level if passed by end-user are in desired format', () => {
      const spyOnLoggingSetHandler = jest.spyOn(logging, 'setLogHandler');
      const spyOnLoggingSetLevel = jest.spyOn(logging, 'setLogLevel');
      const loggingConfig = {
        logger: {
          log: jest.fn()
        },
        level: logging.LogLevelEnum.DEBUG
      };

      indexFile.launch({
        logging: loggingConfig
      });

      expect(spyOnLoggingSetHandler).toHaveBeenCalledWith(loggingConfig.logger);
      expect(spyOnLoggingSetLevel).toHaveBeenCalledWith(logging.LogLevelEnum.NOTSET);
    });

    test('set log level to user defined log-level', () => {
      const spyOnLoggingSetLevel = jest.spyOn(logging, 'setLogLevel');
      const loggingConfig = {
        level: logging.LogLevelEnum.DEBUG
      };

      indexFile.launch({
        logging: loggingConfig
      });

      expect(spyOnLoggingSetLevel).toHaveBeenCalledWith(loggingConfig.level);
    });

    test('should return a new Object of VWO SDK', () => {
      const vwoClientInstance = indexFile.launch({});

      expect(vwoClientInstance).toBeDefined();
      expect(vwoClientInstance.activate).toBeDefined();
      expect(vwoClientInstance.getVariation).toBeDefined();
      expect(vwoClientInstance.track).toBeDefined();
    });
  });
});
