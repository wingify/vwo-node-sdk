/**
 * Copyright 2019-2021 Wingify Software Pvt. Ltd.
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
const EventDispatcher = require('../utils/EventDispatcherUtil');

class EventQueue {
  constructor() {
    this.running = false;
    this.queue = [];
  }

  process(config, properties, vwoInstance) {
    if (config && config.isDevelopmentMode) {
      return;
    }

    this.enqueue(properties, vwoInstance);
  }

  enqueue(properties, vwoInstance) {
    this.queue.push({
      eventName: properties.eventName,
      properties: properties,
      callback: () => {
        EventDispatcher.dispatch(properties, () => {});
      }
    });

    vwoInstance.eventQueue.executeNext(properties);

    if (!this.running) {
      // if nothing is running, then start the engines!
      this.executeNext(properties);
    }

    return this;
  }

  executeNext(properties) {
    this.running = false;

    // get the first element off the queue
    if (this.queue && this.queue.length) {
      let event = this.queue.shift();

      if (event) {
        this.running = true;
        if (event.callback && DataTypeUtil.isFunction(event.callback)) {
          event.callback(properties);
        }
      }
    }
  }
}

module.exports = EventQueue;
