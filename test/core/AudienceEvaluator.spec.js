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

const AudienceEvaluator = require('../../lib/core/AudienceEvaluator');

describe('AudienceEvaluator', () => {
  describe('method: evaluate', () => {
    test('should return true if no conditions are passed', () => {
      // Initially, we are not giving pre-segmentation support
      const conditions = [];

      const result = AudienceEvaluator.evaluate(conditions);
      expect(result).toBe(true);
    });

    test('should return false if conditions are passed', () => {
      // Initially, we are not giving pre-segmentation support
      const conditions = [{ device: 'iPhone' }];

      const result = AudienceEvaluator.evaluate(conditions);
      expect(result).toBe(false);
    });
  });
});
