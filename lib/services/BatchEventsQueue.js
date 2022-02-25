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
const customEventUtil = require('../utils/CustomEventUtil');
const logging = require('./logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { DEFAULT_EVENTS_PER_REQUEST, MAX_EVENTS_PER_REQUEST, DEFAULT_REQUEST_TIME_INTERVAL } = require('../constants');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const file = FileNameEnum.BatchEventsQueue;
const customEventEmitter = customEventUtil.getInstance();

class BatchEventsQueue {
  constructor(batchConfig) {
    this.queue = [];
    this.batchConfig = batchConfig;

    if (DataTypeUtil.isNumber(batchConfig.requestTimeInterval)) {
      this.requestTimeInterval = batchConfig.requestTimeInterval;
    } else {
      this.requestTimeInterval = DEFAULT_REQUEST_TIME_INTERVAL;

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.EVENT_BATCH_DEFAULTS, {
          file,
          parameter: 'requestTimeInterval',
          defaultValue: this.requestTimeInterval + ' ms'
        })
      );
    }

    if (DataTypeUtil.isNumber(batchConfig.eventsPerRequest)) {
      this.eventsPerRequest = Math.min(batchConfig.eventsPerRequest, MAX_EVENTS_PER_REQUEST);
    } else {
      this.eventsPerRequest = DEFAULT_EVENTS_PER_REQUEST;

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.EVENT_BATCH_DEFAULTS, {
          file,
          parameter: 'eventsPerRequest',
          defaultValue: this.eventsPerRequest
        })
      );
    }

    if (DataTypeUtil.isFunction(batchConfig.flushCallback)) {
      this.flushCallback = batchConfig.flushCallback;
    } else {
      this.flushCallback = () => {};

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.EVENT_BATCH_DEFAULTS, {
          file,
          parameter: 'flushCallback',
          defaultValue: 'no operation function'
        })
      );
    }

    this.dispatcher = batchConfig.dispatcher;
  }

  createNewBatchTimer() {
    this.timer = setTimeout(this.flush.bind(this), this.requestTimeInterval * 1000);
  }

  enqueue(event) {
    this.queue.push(event);

    logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.EVENT_QUEUE, {
        file,
        queueType: 'batch',
        event: JSON.stringify(event)
      })
    );

    if (DataTypeUtil.isNumber(this.requestTimeInterval)) {
      if (!this.timer) {
        this.createNewBatchTimer();
      }
    }

    if (this.eventsPerRequest === this.queue.length) {
      this.flush();
    }
  }

  flush(manual = false) {
    if (this.queue.length) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.EVENT_BATCH_BEFORE_FLUSHING, {
          file,
          manually: manual ? 'manually' : '',
          length: this.queue.length,
          accountId: this.batchConfig.accountId,
          timer: manual ? 'Timer will be cleared and registered again' : ''
        })
      );

      if (!this.batchConfig.isDevelopmentMode) {
        this.dispatcher(this.queue, this.flushCallback);
      } else {
        logger.log(
          LogLevelEnum.DEBUG,
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CONFIG_DEVELOPMENT_MODE_STATUS, {
            file
          })
        );
      }

      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.EVENT_BATCH_After_FLUSHING, {
          file,
          manually: manual ? 'manually' : '',
          length: this.queue.length
        })
      );
      this.queue = [];
    } else {
      customEventEmitter.emit('batchCallCompleteion', false, 'Batch queue is empty. Nothing to flush.');
    }

    if (DataTypeUtil.isNumber(this.requestTimeInterval)) {
      this.clearRequestTimer();
    }
  }

  clearRequestTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  flushAndClearTimer() {
    this.flush(true);
    if (DataTypeUtil.isNumber(this.requestTimeInterval)) {
      this.clearRequestTimer();
    }
  }
}

module.exports = BatchEventsQueue;
