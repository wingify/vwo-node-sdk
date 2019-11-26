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

const SettingsFileUtil = require('../../lib/utils/SettingsFileUtil');

let accountId;
let environmentToken;
beforeEach(() => {
  accountId = 12345;
  environmentToken = 'aa11110pp22222aa333ff4c5b66r77ee';
});

describe('SettingsFileUtil', () => {
  describe('method: get', () => {
    it('should return undefined if no paramter is passed', () => {
      expect(SettingsFileUtil.get()).toBeUndefined();
    });

    it('should return undefined if no environmentToken is passed', () => {
      expect(SettingsFileUtil.get(accountId)).toBeUndefined();
    });

    it('should return undefined if no accountId is passed', () => {
      expect(SettingsFileUtil.get(undefined, environmentToken)).toBeUndefined();
    });

    xit('should return a promise if parameters passed are correct', () => {
      const settingsFilePromise = SettingsFileUtil.get(accountId, environmentToken);

      expect(typeof settingsFilePromise).toBe('object');
    });
  });
});
