const defaultConfigs = require("./defaultConfigs");
const EventHandlers = require("./eventHandlers");

const kConfig = Symbol("config");

class WatchItOut {
  static setup(configs = {}) {
    this[kConfig] = {...defaultConfigs, ...configs};
  }

  static init(target) {
    console.log({kConfig: this[kConfig]})
    const proxyHandlers = {};
    const eventHandlers = new EventHandlers(this[kConfig]);
    
    for (const event of this[kConfig].events) {
      const eventKey = EventHandlers.keyMapper[event];
      proxyHandlers[eventKey] = eventHandlers[eventKey].bind(eventHandlers);
    }

    return new Proxy(target, proxyHandlers);
  }
}

module.exports = WatchItOut;
