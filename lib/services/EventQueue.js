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
const EventDispatcher = require('../utils/EventDispatcherUtil');

const logging = require('./logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const file = FileNameEnum.EventQueue;

class EventQueue {
  constructor() {
    this.running = false;
    this.queue = [];
  }

  process(config, properties, vwoInstance, { payload, responseCallback } = {}) {
    if (config && config.isDevelopmentMode) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CONFIG_DEVELOPMENT_MODE_STATUS, {
          file
        })
      );
      return;
    }

    this.enqueue(properties, vwoInstance, { payload, responseCallback });
  }

  enqueue(properties, vwoInstance, { payload, responseCallback }) {
    this.queue.push({
      eventName: properties.eventName,
      properties: properties,
      callback: () => {
        if (payload) {
          EventDispatcher.dispatchPostCall(properties, payload, { responseCallback });
        } else {
          EventDispatcher.dispatchGetCall(properties, { responseCallback });
        }
      }
    });

    logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.EVENT_QUEUE, {
        file,
        queueType: 'normal',
        event: 'VWO_MASKED_PAYLOAD'
      })
    );

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
