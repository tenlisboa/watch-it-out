"use strict";

const EventEmitter = require('events');
const MissingConstructorParameter = require('../exceptions/missingConstructorParameter');

const kEmitter = Symbol('emitter');
const kConfig = Symbol('config');

class LogEmitter {
  loggerFn;
  
  constructor(config) {
    if (!config) throw new MissingConstructorParameter('config');

    this[kEmitter] = new EventEmitter();
    this[kConfig] = config;

    this.loggerFn = this[kConfig].getLogger().log.bind(this[kConfig].getLogger());

    this.#setupLoggingListeners();
  }

  #on(event, callback) {
    this[kEmitter].on(event, callback);
  }

  emit(event, ...args) {
    this[kEmitter].emit(event, ...args);
  }

  #setupLoggingListeners() {
    this.#on('get', ({target, property, receiver}) => {
      this.loggerFn({
        action: "accessing property",
        property,
        on: target,
      });
    });
    this.#on('set', ({target, property, newValue}) => {
      this.loggerFn({
        action: "changing property value",
        property,
        on: target,
        from: target[property],
        to: newValue,
      });
    });
    this.#on('call', ({target, property, argumentsList}) => {
      this.loggerFn({
        action: "calling a method",
        method: property,
        on: target,
        with: argumentsList,
      });
    });
    this.#on('apply', ({target, thisArg, argumentsList}) => {
      this.loggerFn({
        action: "calling a function",
        name: target.name,
        with: argumentsList,
      });
    });
  }
}

module.exports = LogEmitter;
