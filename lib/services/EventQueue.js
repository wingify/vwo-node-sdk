const DataTypeUtil = require('../utils/DataTypeUtil');
const EventDispatcher = require('../utils/EventDispatcherUtil');

class EventQueue {
  constructor() {
    this.running = false;
    this.queue = [];
  }

  process(properties, vwoInstance) {
    this.enqueue(properties, vwoInstance);
  }

  enqueue(properties, vwoInstance) {
    this.queue.push({
      eventName: properties.eventName,
      properties: properties,
      callback: () => {
        EventDispatcher.dispatch(properties, () => {
          vwoInstance.eventQueue.executeNext(properties);
        });
      }
    });

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
