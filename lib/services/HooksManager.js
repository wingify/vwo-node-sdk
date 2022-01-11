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

const DataTypeUtil = require('../utils/DataTypeUtil');

/**
 * Hooks Manager is responsible for triggering callbacks useful to the end-user based on certain lifecycle events.
 * Possible use with integrations when the user intends to send an event when a visitor is part of the experiment.
 */
const HooksManager = {
  /**
   * Initializes with configuration from VWO Object.
   * @param {Object} config
   */
  init(config = {}) {
    this.callback = config.integrations && config.integrations.callback;
  },
  /**
   * Executes the callback
   * @param {Object} properties Properties from the callback
   */
  execute(properties) {
    if (DataTypeUtil.isFunction(this.callback)) {
      this.callback(properties);
    }
  }
};

module.exports = HooksManager;
