const Logger = require("./logger");

class EventHandlers {
  #logger;
  #config;

  constructor(config) {
    this.#logger = new Logger(config.loggerFn);
    this.#config = config;
  }

  get(target, property, receiver) {
    if (typeof target[property] === 'function') {

      if (!this.#config.events.includes('apply')) return target[property];

      return (...args) => {
        this.#logger.logCall({
          name: property,
          args,
        });

        return target[property].apply(receiver, args);
      };
    }

    this.#logger.logGet({
      name: property,
    });

    return target[property];
  }

  set(target, property, newValue) {

    this.#logger.logSet({
      name: property,
      from: target[property],
      to: newValue,
    });

    target[property] = newValue;

    return true;
  }

  apply(target, thisArg, argumentsList) {
    this.#logger.logCall({
      name: target.name,
      args: argumentsList,
    });

    return target.apply(thisArg, argumentsList);
  }
}

module.exports = EventHandlers;
