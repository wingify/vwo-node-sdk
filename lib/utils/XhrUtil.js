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

const XhrUtil = {
  send: function({ method, url } = {}) {
    if (!url || !method) {
      return;
    }

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.send();

      xhr.onload = function() {
        try {
          resolve(JSON.parse(xhr.response));
        } catch (err) {
          console.error(err);
        }
      };

      xhr.onerror = function() {
        let error = `Request failed for fetching account settings. Got Status Code: ${xhr.status}`;

        console.error(error);
        reject(error);
      };
    });
  }
};

module.exports = XhrUtil;
