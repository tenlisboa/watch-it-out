import { join } from "path";

import { HANDLER_KEY_MAPPER } from "../handlers/config/consts";
import MissingConstructorParameter from "../exceptions/missingConstructorParameter";
import ProxyHandlerBuilder from "../builders/proxyHandlerBuilder";
import ConfigBuilder from "../builders/configBuilder";
import LogEmitter from "../emitters/logEmitter";
import { handlersMap } from "../handlers";

class ProxyHandlerFacade {
  private proxyHandlerBuilder;
  private config;
  private logEmitter;

  constructor(config: ConfigBuilder, logEmitter: LogEmitter) {
    if (!config) throw new MissingConstructorParameter("config");
    if (!logEmitter) throw new MissingConstructorParameter("logEmitter");

    this.proxyHandlerBuilder = ProxyHandlerBuilder.workflow();
    this.config = config;
    this.logEmitter = logEmitter;
  }

  getProxyHandler() {
    const events = this.config.getEvents();

    for (const event of events) {
      const eventKey = HANDLER_KEY_MAPPER[event];

      const builderByEvent: { [k: string]: any } = {
        getAndCall: this.proxyHandlerBuilder.setGetAndCallHandler.bind(
          this.proxyHandlerBuilder
        ),
        set: this.proxyHandlerBuilder.setSetHandler.bind(
          this.proxyHandlerBuilder
        ),
        apply: this.proxyHandlerBuilder.setApplyHandler.bind(
          this.proxyHandlerBuilder
        ),
      };

      const builderMethod = builderByEvent[eventKey];
      const handler = this.getHandlerByEvent(eventKey);

      builderMethod(handler);
    }

    return this.proxyHandlerBuilder.build();
  }

  private getHandlerByEvent(event: string) {
    const handler = handlersMap[event].setup(
      this.config,
      this.logEmitter
    ).handler;

    return handler;
  }
}

export default ProxyHandlerFacade;
