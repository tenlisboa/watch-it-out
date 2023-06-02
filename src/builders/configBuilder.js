'use strict';

const defaultConfig = require("../config/.default.config");

class ConfigBuilder {
  #content = {};

  static config(configObject = defaultConfig) {
    const config = new ConfigBuilder();

    config.#content = configObject;

    return config;
  }

  getEvents() {
    return this.#content.events;
  }

  setEvents(events) {
    this.#content.events = events;
    return this;
  }

  getContext() {
    return this.#content.context;
  }

  setContext(context) {
    this.#content.context = context;
    return this;
  }

  getLogger() {
    return this.#content.logger;
  }

  setLogger(logger) {
    this.#content.logger = logger;
    return this;
  }

  getPrintable() {
    return this.#content.printable;
  }
  
  setPrintable(printable) {
    this.#content.printable = printable;
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = ConfigBuilder;
