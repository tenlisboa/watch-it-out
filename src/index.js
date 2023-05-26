const Util = require("./util");

class WatchIt {
  static #loggerFn;

  static init(target, { loggerFn = console.log } = {}) {
    this.#loggerFn = loggerFn;

    return new Proxy(target, {
      get: (target, property, receiver) => {

        if (typeof target[property] === 'function') {
          return (...args) => {
            this.#loggerFn({
              kind: "function",
              name: property,
              args,
              when: Util.now()
            });

            return target[property].apply(receiver, args);
          };
        }

        this.#loggerFn({
          kind: "get",
          name: property,
          when: Util.now()
        });

        return target[property];
      },

      set: (target, property, newValue) => {

        this.#loggerFn({
          kind: "set",
          name: property,
          from: target[property],
          to: newValue,
          when: Util.now()
        });

        target[property] = newValue;

        return true;
      },

      apply: (target, thisArg, argumentsList) => {
        this.#loggerFn({
          kind: "function",
          name: target.name,
          args: argumentsList,
          when: Util.now()
        });

        return target.apply(thisArg, argumentsList);
      }
    });
  }
}

module.exports = WatchIt;
