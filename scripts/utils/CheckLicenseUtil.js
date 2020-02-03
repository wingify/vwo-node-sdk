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

/**
 * This file's code is ported to NodeJs (and is modified by Wingify) from:
 *
 * URL - https://github.com/facultyai/apache-license-check/blob/master/apache_license_check.py
 * Description - Check Python source files for Apache License headers
 * Author - Andrew Crozier https://github.com/acroz
 * License - Apache 2.0
 * Copyright 2019 Faculty Science Limited
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

const fs = require('fs');
const AnsiColorEnum = require('../../lib/enums/AnsiColorEnum');

const defaultStoppingCriteria = `SOME_GARBAGE_TEXT_which_NEVER_MATCHES_THIS`;
const successMessage = `LICENSE/COPYRIGHT header present in all files with correct format`;
const failureMessage = `LICENSE/COPYRIGHT header is missing. Please check above errors.`;
const notPresentMessage = `NOT PRESENT / WRONG FORMAT`;
const missingParamsMessage = `Options: paths, author, year and extension are mandatory`;

let licenseHeader = `
Copyright {year} {author}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`;
let fsUtil = {
  getAllDirectories: function(path) {
    if (!path) {
      return [];
    }

    return fs.readdirSync(path).filter(out => out);
  },

  getAllFiles: function({ path, excludes, extension, allFiles }) {
    if (excludes.includes(path)) {
      return;
    } else if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
      let dirs = fsUtil.getAllDirectories(path);

      for (let i = 0; i < dirs.length; i++) {
        fsUtil.getAllFiles({
          path: path + '/' + dirs[i],
          excludes,
          extension,
          allFiles
        });
      }
    }

    if (fs.lstatSync(path).isFile() && path.endsWith(`.${extension}`)) {
      allFiles.push(path);
    }
  }
};

let checkLicenseUtil = {
  readHeaderLines: function(path, stoppingCriteria) {
    let headerLines = [];

    try {
      let data = fs.readFileSync(path);
      let dataAsString = data.toString();
      let dataAsLines = dataAsString.split('\n');

      for (let i = 0; i < dataAsLines.length; i++) {
        let line = dataAsLines[i];
        let trimmedLine = line.trim();

        if (!trimmedLine) {
          continue;
        }

        let pattern = new RegExp(`(.*|\\n)${stoppingCriteria}`, 'ig');
        if (pattern.test(trimmedLine)) {
          break;
        }

        headerLines.push(trimmedLine);
      }
    } catch (err) {
      console.error(err);
    }

    return headerLines;
  },

  checkLicense: function(lines, licenseHeaderLines) {
    let list = [];

    for (let i = 0; i < licenseHeaderLines.length - 1; i++) {
      if (!lines[i + 1]) {
        list.push(false);
        break;
      }
      let isContainedInLicenseHEader = lines[i + 1].indexOf(licenseHeaderLines[i]) > -1;

      list.push(isContainedInLicenseHEader);
    }

    return list.every(val => val);
  },

  checkCopyright: function(lines, copyright) {
    let isCopyrightFound = false;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/^[\s#*]+Copyright(.*)/gi)) {
        if (lines[i].indexOf(copyright) > -1) {
          isCopyrightFound = true;
          break;
        }
      }
    }

    return isCopyrightFound;
  },

  checkLicenseAndCopyright: function({
    author,
    year,
    paths,
    excludes,
    extension,
    stoppingCriteria = defaultStoppingCriteria
  }) {
    if (!paths || !year || !author || !extension) {
      console.error(`${AnsiColorEnum.RED}${missingParamsMessage}${AnsiColorEnum.RESET}`);
      process.exit(1);
    }

    let copyright = `Copyright ${year} ${author}`;

    licenseHeader = licenseHeader.replace(/{year}/gi, year);
    licenseHeader = licenseHeader.replace(/{author}/gi, author);

    let licenseHeaderLines = licenseHeader.trim().split('\n');

    paths = paths.split(',');

    let isLicenseAndCopyrightPresentInAllFiles = true;

    for (let i = 0; i < paths.length; i++) {
      let list = [];

      fsUtil.getAllFiles({
        path: paths[i],
        excludes,
        extension,
        allFiles: list
      });

      for (let j = 0; j < list.length; j++) {
        let headerLines = checkLicenseUtil.readHeaderLines(list[j], stoppingCriteria);
        let hasCopyright;
        let hasLicense;
        let copyrightMessage = '';
        let licenseMessage = '';

        hasCopyright = checkLicenseUtil.checkCopyright(headerLines, copyright);
        if (!hasCopyright) {
          copyrightMessage = ` Copyright:${AnsiColorEnum.RESET} ${AnsiColorEnum.YELLOW}${notPresentMessage}${
            AnsiColorEnum.RESET
          }`;
        }

        hasLicense = checkLicenseUtil.checkLicense(headerLines, licenseHeaderLines);
        if (!hasLicense) {
          licenseMessage = ` License:${AnsiColorEnum.RESET} ${AnsiColorEnum.YELLOW}${notPresentMessage}${
            AnsiColorEnum.RESET
          }`;
        }

        isLicenseAndCopyrightPresentInAllFiles = isLicenseAndCopyrightPresentInAllFiles && hasCopyright && hasLicense;

        if (!hasLicense || !hasCopyright) {
          let output = `${AnsiColorEnum.BOLD}${AnsiColorEnum.CYAN}${list[j]}${
            AnsiColorEnum.RESET
          }${copyrightMessage} ${licenseMessage}`;

          console.log(output);
        }
      }
    }

    if (isLicenseAndCopyrightPresentInAllFiles) {
      console.info(`${AnsiColorEnum.GREEN}\n\n${successMessage}.${AnsiColorEnum.RESET}\n\n`);

      return true;
    } else {
      console.error(`${AnsiColorEnum.RED}\n\n${failureMessage}${AnsiColorEnum.RESET}\n\n`);

      return false;
    }
  }
};

module.exports = checkLicenseUtil;
