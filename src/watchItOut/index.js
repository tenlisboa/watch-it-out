'use strict';

const LogEmitter = require("../emitters/logEmitter");
const ProxyHandlerFacade = require("../proxyHandler/proxyHandlerFacade");
const Config = require("./config");

class WatchItOut {
  static #config;

  static get config() {
    if (!this.#config) {
      this.#config = Config.config();
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
