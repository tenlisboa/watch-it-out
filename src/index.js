import { makeHandlersFactory } from "./factories/handlersFactory.js";

export default class Watch {
  #handlers;

  constructor() {
    this.#handlers = makeHandlersFactory();
  }

  static new(target, options) {
    const instance = new Watch();

    return new Proxy(target, {
      get: (target, property) => {
        if (typeof target[property] !== "function") {
          return instance.#handlers.get.handle({ target, property });
        }

        return (...args) =>
          instance.#handlers.call.handle({
            target,
            property,
            thisArg: target,
            args,
          });
      },
      set(target, property, value) {
        return instance.#handlers.set.handle({ target, property, value });
      },
      apply(target, thisArg, argumentsList) {
        return instance.#handlers.call.handle({
          target,
          property: null,
          thisArg,
          args: argumentsList,
        });
      },
    });
  }
}
