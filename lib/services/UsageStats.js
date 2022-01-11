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

const { LogManager } = require('./logging');

class UsageStats {
  constructor() {
    this.data = {};
  }

  /**
   * Collect the usage stats from the params passed at the time of instantiating VWO and send them to VWO Server
   * @param {Object} config    config passed at the time of instantiation.
   */
  collectUsageStats(config) {
    this.data['eb'] = Number(!!config.batchEvents);
    this.data['ig'] = Number(!!config.integrations);
    this.data['ss'] = Number(!!config.userStorageService);
    this.data['cl'] = Number(!(config.logger instanceof LogManager));
    this.data['ll'] = Number(config.logging && config.logging.level);
    this.data['tr'] = Number(config.shouldTrackReturningUser);
    this.data['gt'] = Number(!!config.goalTypeToTrack);
    this.data['pi'] = Number(!!config.pollingInterval);

    Object.keys(this.data).forEach(function(key) {
      if (!this.data[key]) {
        delete this.data[key];
      }
    }, this);
  }

  /**
   * Get the collected usage stats.
   * @returns     collected usage stats data
   */
  getUsageStats() {
    if (Object.keys(this.data).length > 0) {
      this.data['_l'] = 1;
    }
    return this.data;
  }
}

module.exports = UsageStats;
