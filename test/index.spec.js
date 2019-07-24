const indexFile = require('../lib/');
const logging = require('../lib/logging');

describe('index file', () => {
  test('should export required modules and APIs', () => {
    expect(indexFile.logging).toBeDefined();
    expect(indexFile.setLogger).toBeDefined();
    expect(indexFile.setLogLevel).toBeDefined();
    expect(indexFile.getSettingsFile).toBeDefined();
    expect(indexFile.createInstance).toBeDefined();
  });

  describe('method: createInstance', () => {
    test('set log color mode if development mode is passed', () => {
      const spyOnLoggingSetColor = jest.spyOn(logging, 'setLogColorMode');

      indexFile.createInstance({
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

      indexFile.createInstance({
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

      indexFile.createInstance({
        logging: loggingConfig
      });

      expect(spyOnLoggingSetLevel).toHaveBeenCalledWith(loggingConfig.level);
    });

    test('should return a new Object of VWO SDK', () => {
      const vwoClientinstance = indexFile.createInstance({});

      expect(vwoClientinstance).toBeDefined();
      expect(vwoClientinstance.activate).toBeDefined();
      expect(vwoClientinstance.getVariation).toBeDefined();
      expect(vwoClientinstance.track).toBeDefined();
    });
  });
});
