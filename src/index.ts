"use strict";

import LogEmitter from "./emitters/logEmitter";
import ProxyHandlerFacade from "./facades/proxyHandlerFacade";
import ConfigBuilder from "./builders/configBuilder";

class WatchItOut {
  private static configBuilder: ConfigBuilder;

  static get config() {
    if (!this.configBuilder) {
      this.configBuilder = ConfigBuilder.config();
    }

    return this.configBuilder;
  }

  static new<T extends object = any>(target: T) {
    const logEmitter = new LogEmitter(this.config);
    const proxyHandlerFacade = new ProxyHandlerFacade(this.config, logEmitter);
    const proxyHandler = proxyHandlerFacade.getProxyHandler();

    return new Proxy<T>(target, proxyHandler);
  }
}

export default WatchItOut;
