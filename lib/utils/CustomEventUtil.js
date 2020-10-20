const EventEmitter = require('events');

let customEventEmitter;

const CustomEventUtil = {
  createNewInstance: () => {
    customEventEmitter = new EventEmitter();

    return customEventEmitter;
  },
  getInstance: () => {
    return customEventEmitter || CustomEventUtil.createNewInstance();
  }
};

module.exports = CustomEventUtil;
