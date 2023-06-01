const Logger = require("./logger");

class EventHandlers {
  #logger;
  #config;

  static keyMapper = {
    get: 'get',
    set: 'set',
    call: 'apply',
  };

  constructor(config) {
    this.#logger = new Logger(config.loggerFn);
    this.#config = config;
  }

  getPrintable() {
    const printableKeyNames = this.#config.printable;
    const context = new Map(Object.entries(this.#config.context));
    const contextPrintable = {};

    for (const [key, value] of context.entries()) {
      if (!printableKeyNames.includes(key)) continue;

      contextPrintable[key] = value;
    }
    
    return contextPrintable;
  }

  get(target, property, receiver) {
    if (typeof target[property] === 'function') {

      if (!this.#config.events.includes('call')) return target[property];

      return (...args) => {
        this.#logger.logCall({
          name: property,
          args,
          ...this.getPrintable(),
        });

        return target[property].apply(receiver, args);
      };
    }

    this.#logger.logGet({
      name: property,
      ...this.getPrintable(),
    });

    return target[property];
  }

  set(target, property, newValue) {

    this.#logger.logSet({
      name: property,
      from: target[property],
      to: newValue,
      ...this.getPrintable(),
    });

    target[property] = newValue;

    return true;
  }

  apply(target, thisArg, argumentsList) {
    this.#logger.logCall({
      name: target.name,
      args: argumentsList,
      ...this.getPrintable(),
    });

    return target.apply(thisArg, argumentsList);
  }
}

module.exports = EventHandlers;
