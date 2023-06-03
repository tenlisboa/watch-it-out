import { expect } from "chai";
import { describe, beforeEach, before } from "mocha";
import sinon from "sinon";
import MissingConstructorParameter from "../../../src/exceptions/missingConstructorParameter";
import LogEmitter from "../../../src/emitters/logEmitter";
import ConfigBuilder from "../../../src/builders/configBuilder";
import DefaultConfig from "../../../src/config/.default.config";

describe("LogEmitter", () => {
  let config;
  const customLogger = {
    log(...args) {}
  }

  beforeEach(() => {
    config = ConfigBuilder.config({
      ...DefaultConfig,
      // @ts-ignore
      logger: customLogger,
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should throw an MissingConstructorParameter if no config is passed to the constructor", () => {
    expect(() => {
      new LogEmitter();
    }).to.throw(MissingConstructorParameter, 'Missing constructor parameter: config');
  });

  it("should not throw an error if a config is passed to the constructor", () => {
    expect(() => {
      new LogEmitter(config);
    }).to.not.throw();
  });

  it("should have an emit method", () => {
    const logEmitter = new LogEmitter(config);

    expect(logEmitter.emit).to.be.a('function');
  });

  it("should log a get event when a get event is emitted", () => {
    const logEmitter = new LogEmitter(config);
    const loggerSpy = sinon.spy(logEmitter, "loggerFn");

    logEmitter.emit('get', {
      target: { name: 'target' },
      property: 'name',
      receiver: { name: 'target' },
    });

    expect(loggerSpy.calledOnce).to.be.true;
    expect(loggerSpy.calledWithMatch({
      action: 'accessing property',
      property: 'name',
      on: { name: 'target' }
    })).to.be.true;
  });

  it("should log a set event when a set event is emitted", () => {
    const logEmitter = new LogEmitter(config);
    const loggerSpy = sinon.spy(logEmitter, "loggerFn");

    logEmitter.emit('set', {
      target: { name: 'target' },
      property: 'name',
      newValue: 'newValue',
    });

    expect(loggerSpy.calledOnce).to.be.true;
    expect(loggerSpy.calledWithMatch({
      action: 'changing property value',
      property: 'name',
      on: { name: 'target' },
      from: 'target',
      to: 'newValue'
    })).to.be.true;
  });

  it("should log a call event when a call event is emitted", () => {
    const logEmitter = new LogEmitter(config);
    const loggerSpy = sinon.spy(logEmitter, "loggerFn");
    const emitterParams = {
      target: { foo(...args) {} },
      property: 'foo',
      argumentsList: ['arg1', 'arg2'],
    }

    logEmitter.emit('call', emitterParams);

    expect(loggerSpy.calledOnce).to.be.true;
    expect(loggerSpy.calledWithMatch({
      action: "calling a method",
      method: 'foo',
      on: emitterParams.target,
      with: ['arg1', 'arg2']
    })).to.be.true;
  });

  it("should log a apply event when a apply event is emitted", () => {
    const logEmitter = new LogEmitter(config);
    const loggerSpy = sinon.spy(logEmitter, "loggerFn");
    function foo(...args) {}
    const emitterParams = {
      target: foo,
      thisArg: {},
      argumentsList: ['arg1', 'arg2'],
    }

    logEmitter.emit('apply', emitterParams);

    expect(loggerSpy.calledOnce).to.be.true;
    expect(loggerSpy.calledWithMatch({
      action: "calling a function",
      name: 'foo',
      with: ['arg1', 'arg2']
    })).to.be.true;
  });
});
