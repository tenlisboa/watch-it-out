const MissingConstructorParameter = require("../exceptions/missingConstructorParameter");

class GetAndCallHandler {
  #config;
  #logEmitter;

  static setup(config, logEmitter) {
    if (!config) throw new MissingConstructorParameter('config');
    if (!logEmitter) throw new MissingConstructorParameter('logEmitter');
    
    const instance = new this();

    instance.#config = config;
    instance.#logEmitter = logEmitter;

    return instance;
  }
  get handler() {
    return this.#handle.bind(this);
  }

  #handle(target, property, receiver) {
    if (typeof target[property] !== 'function') {
      this.#logEmitter.emit('get', {target, property, receiver});
      return target[property];
    }

    if (!this.#config.getEvents().includes('call')) return target[property];
    
    return this.#handleMethodCall(
      target,
      property,
      receiver
    );
  }

  #handleMethodCall(target, property, receiver) {
    return (...args) => {
      this.#logEmitter.emit('call', {target, property, argumentsList: args});	
      return target[property].apply(receiver, args);
    }
  }
}

module.exports = GetAndCallHandler;
