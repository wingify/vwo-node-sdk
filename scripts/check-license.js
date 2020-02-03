/**
 * Copyright 2019-2020 Wingify Software Pvt. Ltd.
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

const checkLicenseUtil = require('./utils/CheckLicenseUtil');

console.time('Execution time for License and Copyright');
const isSuccess = checkLicenseUtil.checkLicenseAndCopyright({
  year: '2019-2020',
  author: 'Wingify Software Pvt. Ltd.',
  paths: 'lib,test,scripts',
  stoppingCriteria: '\\*\\/',
  excludes: ['test/test-utils'],
  extension: 'js'
});
console.timeEnd('Execution time for License and Copyright');

if (!isSuccess) {
  process.exit(1);
}
