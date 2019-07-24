const SettingsFileUtil = require('../../lib/utils/SettingsFileUtil');

let accountId;
let sdkKey;
beforeEach(() => {
  accountId = 12345;
  sdkKey = 'aa11110pp22222aa333ff4c5b66r77ee';
});

describe('SettingsFileUtil', () => {
  describe('method: get', () => {
    it('should return undefined if no paramter is passed', () => {
      expect(SettingsFileUtil.get()).toBeUndefined();
    });

    it('should return undefined if no sdkKey is passed', () => {
      expect(SettingsFileUtil.get(accountId)).toBeUndefined();
    });

    it('should return undefined if no accountId is passed', () => {
      expect(SettingsFileUtil.get(undefined, sdkKey)).toBeUndefined();
    });

    it('should return a promise if parameters passed are correct', () => {
      const settingsFilePromise = SettingsFileUtil.get(accountId, sdkKey);

      expect(typeof settingsFilePromise).toBe('object');
    });
  });
});
