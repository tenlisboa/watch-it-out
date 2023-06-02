class ProxyHandlerBuilder {
  #proxyHandler;

  constructor() {
    this.#proxyHandler = {};
  }

  static workflow() {
    return new ProxyHandlerBuilder();
  }

  #includeProperty(propertyName, propertyFunction) {
    this.#proxyHandler[propertyName] = propertyFunction;
  }

  setGetAndCallHandler(getHandler) {
    this.#includeProperty('get', getHandler);

    return this;
  }

  setSetHandler(setHandler) {
    this.#includeProperty('set', setHandler);

    return this;
  }

  setApplyHandler(applyHandler) {
    this.#includeProperty('apply', applyHandler);

    return this;
  }

  build() {
    return this.#proxyHandler;
  }
}

module.exports = ProxyHandlerBuilder;
