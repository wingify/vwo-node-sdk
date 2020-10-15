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

const DataTypeUtil = require('../utils/DataTypeUtil');
const logging = require('./logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { MAX_EVENTS_PER_REQUEST } = require('../constants');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();
const file = FileNameEnum.BatchEventsQueue;

class BatchEventsQueue {
  constructor(batchConfig) {
    this.queue = [];
    if (DataTypeUtil.isNumber(batchConfig.requestTimeInterval)) {
      this.requestTimeInterval = batchConfig.requestTimeInterval;
      this.createNewBatchInterval();
    }
    if (DataTypeUtil.isNumber(batchConfig.eventsPerRequest)) {
      this.eventsPerRequest = Math.min(batchConfig.eventsPerRequest, MAX_EVENTS_PER_REQUEST);
    }
    if (DataTypeUtil.isFunction(batchConfig.flushCallback)) {
      this.flushCallback = batchConfig.flushCallback;
    } else {
      this.flushCallback = () => {};
    }
    this.dispatcher = batchConfig.dispatcher;
  }

  createNewBatchInterval() {
    this.interval = setInterval(this.flush.bind(this), this.requestTimeInterval);
  }

  enqueue(event) {
    this.queue.push(event);
    if (this.eventsPerRequest === this.queue.length) {
      this.flush();
      if (DataTypeUtil.isNumber(this.requestTimeInterval)) {
        clearInterval(this.interval);
        this.createNewBatchInterval();
      }
    }
  }

  flush(manual = false) {
    if (this.queue.length) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.BEFORE_FLUSHING, {
          file,
          manually: manual ? 'manually' : '',
          length: this.queue.length,
          timer: manual ? 'Timer will be cleared and registered again' : ''
        })
      );
      this.dispatcher(this.queue, this.flushCallback);
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.AFTER_FLUSHING, {
          file,
          manually: manual ? 'manually' : '',
          length: this.queue.length
        })
      );
      this.queue = [];
    }
  }

  flushAndClearInterval() {
    this.flush(true);
    if (DataTypeUtil.isNumber(this.requestTimeInterval)) {
      clearInterval(this.interval);
      this.createNewBatchInterval();
    }
  }
}

module.exports = BatchEventsQueue;
