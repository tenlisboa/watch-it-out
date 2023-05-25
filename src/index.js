class WatchIt {
  static #loggerFn = console.log

  static init(target, { loggerFn }) {
    this.#loggerFn = loggerFn;

    return new Proxy(target, {
      get: (target, property, receiver) => {

        if (typeof target[property] === 'function') {
          return (...args) => {
            this.#loggerFn(`Calling ${String(property)} with ${args}`);

            return target[property].apply(receiver, args);
          };
        }

        this.#loggerFn(`Getting property ${String(property)}`);

        return target[property];
      },

      set: (target, property, newValue) => {
        this.#loggerFn(`Setting property ${String(property)} to ${newValue}`);
        target[property] = newValue;

        return true;
      },

      apply: (target, thisArg, argumentsList) => {
        this.#loggerFn(`Calling ${target.name} with ${argumentsList}`);

        return target.apply(thisArg, argumentsList);
      }
    });
  }
}

module.exports = WatchIt;
