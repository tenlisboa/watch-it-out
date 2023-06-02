"use strict";

const EventEmitter = require('events');
const MissingConstructorParameter = require('../exceptions/missingConstructorParameter');
const PrintableBuilder = require('../builders/printableBuilder');

const kEmitter = Symbol('emitter');
const kConfig = Symbol('config');
const kPrintableBuilder = Symbol('printableBuilder');

class LogEmitter {
  loggerFn;
  
  constructor(config) {
    if (!config) throw new MissingConstructorParameter('config');

    this[kEmitter] = new EventEmitter();
    this[kConfig] = config;
    this[kPrintableBuilder] = PrintableBuilder.workflow(config);

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
      const data = this[kPrintableBuilder]
        .setData({
          action: "accessing property",
          property,
          on: target,
        });

      this.loggerFn(data.build());
    });
    this.#on('set', ({target, property, newValue}) => {
      const data = this[kPrintableBuilder]
        .setData({
          action: "changing property value",
          property,
          on: target,
          from: target[property],
          to: newValue,
        });

      this.loggerFn(data.build());
    });
    this.#on('call', ({target, property, argumentsList}) => {
      const data = this[kPrintableBuilder]
        .setData({
          action: "calling a method",
          method: property,
          on: target,
          with: argumentsList,
        });
        
      this.loggerFn(data.build());
    });
    this.#on('apply', ({target, thisArg, argumentsList}) => {
      const data = this[kPrintableBuilder]
        .setData({
          action: "calling a function",
          name: target.name,
          with: argumentsList,
        });
        
      this.loggerFn(data.build());
    });
  }
}

module.exports = LogEmitter;
