'use strict';

const LogEmitter = require("./emitters/logEmitter");
const ProxyHandlerFacade = require("./facades/proxyHandlerFacade");
const ConfigBuilder = require("./builders/configBuilder");

class WatchItOut {
  static #config;

  static get config() {
    if (!this.#config) {
      this.#config = ConfigBuilder.config();
    }
    
    return this.#config;
  };

  static new(target) {
    const logEmitter = new LogEmitter(this.config);
    const proxyHandlerFacade = new ProxyHandlerFacade(
      this.config,
      logEmitter
    );
    const proxyHandler = proxyHandlerFacade.getProxyHandler();
    
    return new Proxy(target, proxyHandler);
  }
}

module.exports = WatchItOut;
