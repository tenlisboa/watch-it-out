const MissingConstructorParameter = require("../exceptions/missingConstructorParameter");

class ApplyHandler {
  #config;
  #logEmitter;

  static setup(config, logEmitter) {
    if (!config) throw new MissingConstructorParameter('config');
    if (!logEmitter) throw new MissingConstructorParameter('logEmitter');

    const instance = new ApplyHandler();

    instance.#config = config;
    instance.#logEmitter = logEmitter;

    return instance;
  }

  get handler() {
    return this.#handle.bind(this);
  }

  #handle(target, thisArg, argumentsList) {
    this.#logEmitter.emit('apply', {target, thisArg, argumentsList});
    return target.apply(thisArg, argumentsList);
  }
}

module.exports = ApplyHandler;
