class ProxyHandlerBuilder {
  proxyHandler: { [key: string]: Function };

  constructor() {
    this.proxyHandler = {};
  }

  static workflow() {
    return new ProxyHandlerBuilder();
  }

  private includeProperty(propertyName: string, propertyFunction: Function) {
    this.proxyHandler[propertyName] = propertyFunction;
  }

  setGetAndCallHandler(getHandler: Function) {
    this.includeProperty("get", getHandler);

    return this;
  }

  setSetHandler(setHandler: Function) {
    this.includeProperty("set", setHandler);

    return this;
  }

  setApplyHandler(applyHandler: Function) {
    this.includeProperty("apply", applyHandler);

    return this;
  }

  build() {
    return this.proxyHandler;
  }
}

export default ProxyHandlerBuilder;
