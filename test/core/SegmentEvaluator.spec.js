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

const SegmentEvaluator = require('../../lib/core/SegmentEvaluator');
const SegmentEvaluatorData = require('../test-utils/data/SegmentEvaluatorData');

const testCasesKeys = Object.keys(SegmentEvaluatorData);

describe('SegmentorService', () => {
  testCasesKeys.forEach(key => {
    describe(key, () => {
      Object.keys(SegmentEvaluatorData[key]).forEach(testName => {
        const testObj = SegmentEvaluatorData[key][testName];
        test(testName, () => {
          expect(SegmentEvaluator(testObj.dsl, testObj.customVariables)).toBe(testObj.expectation);
        });
      });
    });
  });
});
