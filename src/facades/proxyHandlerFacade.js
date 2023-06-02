const { join } = require("path");

const { HANDLER_KEY_MAPPER } = require("../handlers/config/consts");
const MissingConstructorParameter = require("../exceptions/missingConstructorParameter");
const ProxyHandlerBuilder = require("../builders/proxyHandlerBuilder");

class ProxyHandlerFacade {
  #proxyHandlerBuilder;
  #config;
  #logEmitter;

  constructor(config, logEmitter) {
    if (!config) throw new MissingConstructorParameter('config');
    if (!logEmitter) throw new MissingConstructorParameter('logEmitter');

    this.#proxyHandlerBuilder = ProxyHandlerBuilder.workflow();
    this.#config = config;
    this.#logEmitter = logEmitter;
  }

  getProxyHandler() {
    const events = this.#config.getEvents();

    for (const event of events) {
      const eventKey = HANDLER_KEY_MAPPER[event];
      const builderMethod = `set${eventKey.charAt(0).toUpperCase() + eventKey.slice(1)}Handler`;

      const handler = this.#getHandlerByEvent(eventKey);
      this.#proxyHandlerBuilder[builderMethod](handler);
    }

    return this.#proxyHandlerBuilder.build();
  }

  #getHandlerByEvent(event) {
    const handlersPath = join(__dirname, '..', 'handlers');
    const handlerMap = require(handlersPath);

    const handler = handlerMap[event].setup(
      this.#config,
      this.#logEmitter
    ).handler;

    return handler;
  }
}

module.exports = ProxyHandlerFacade;
