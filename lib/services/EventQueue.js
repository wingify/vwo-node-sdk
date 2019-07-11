const DataTypeUtil = require('../utils/DataTypeUtil');
const FunctionUtil = require('../utils/FunctionUtil');

const EventDispatcher = require('../utils/EventDispatcherUtil');

class EventQueue {
  constructor() {
    this.running = false;
    this.queue = [];
    this.retryTimeout = 5000;
  }

  process(config, properties, vwoInstance) {
    if (config && DataTypeUtil.isObject(config) && config.isDevelopmentMode) {
      return;
    }

    config.retryTimeout = config.failedImpressionRetryTimeout || this.retryTimeout;
    this.enqueue(config, properties, vwoInstance);
  }

  enqueue(config = {}, properties, vwoInstance) {
    const self = this;
    const successCallback = function() {};
    const failureCallback = function(retryTimeout) {
      // Try after some time
      setTimeout(() => {
        // deep-clone
        config = FunctionUtil.cloneObject(config);

        // If it is attempted before, keep on increasing the delay to avoid failure congestions
        if (retryTimeout) {
          config.retryTimeout *= 2;
        }

        self.enqueue(config, properties, vwoInstance);
      }, retryTimeout || self.retryTimeout);
    };

    this.queue.push({
      eventName: properties.eventName,
      properties: properties,
      callback: () => {
        EventDispatcher.dispatch(config, properties, successCallback, failureCallback);
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
