const defaultConfigs = require("./defaultConfigs");
const EventHandlers = require("./eventHandlers");

const kConfig = Symbol("config");

class WatchItOut {
  static [kConfig] = defaultConfigs;

  static setup(configs = {}) {
    this[kConfig] = { ...this[kConfig], ...configs};
  }

  static init(target) {
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
