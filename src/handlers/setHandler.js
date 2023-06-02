const MissingConstructorParameter = require("../exceptions/missingConstructorParameter");

class SetHandler {
  #config;
  #logEmitter;
  
  static setup(config, logEmitter) {
    if (!config) throw new MissingConstructorParameter('config');
    if (!logEmitter) throw new MissingConstructorParameter('logEmitter');

    const instance = new SetHandler();

    instance.#config = config;
    instance.#logEmitter = logEmitter;

    return instance;
  }

  get handler() {
    return this.#handle.bind(this);
  }

  #handle(target, property, newValue) {
    this.#logEmitter.emit('set', {target, property, newValue});
    
    target[property] = newValue;

    return true;
  }
}

module.exports = SetHandler;
