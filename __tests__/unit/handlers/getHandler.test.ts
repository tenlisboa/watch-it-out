import { describe, beforeEach } from 'mocha';
import { expect } from 'chai';
import ConfigBuilder from '../../../src/builders/configBuilder';
import GetAndCallHandler from '../../../src/handlers/getAndCallHandler';

describe("GetAndCallHandler class test", () => {
  const config =  ConfigBuilder.config();
  const logEmitter = {
    emit(...args) {}
  };

  it('should throw an error if the config is not provided to GetAndCallHandler setup method', () => {
    expect(() => GetAndCallHandler.setup())
      .to.throw('Missing constructor parameter: config');
  });

  it('should throw an error if the logEmitter is not provided to ApplyHandler setup method', () => {
    expect(() => GetAndCallHandler.setup(config))
      .to.throw('Missing constructor parameter: logEmitter');
  });

  it('should return the handler function from the handler getter', () => {
    const handler = GetAndCallHandler.setup(config, logEmitter).handler;
    expect(handler).to.be.a('function');
  });
  
  it('should return the target property if it is not a function', () => {
    const target = {
      a: 123
    };

    const handler = GetAndCallHandler.setup(config, logEmitter).handler;
    const result = handler(target, 'a', target);
    expect(result).to.be.equal(123);
  });

  it('should return the target property [The function itself] if the config does not have the call event', () => {
    const target = {
      a: () => 123
    };
    config.setEvents(['get']);

    const handler = GetAndCallHandler.setup(config, logEmitter).handler;
    const functionToCall = handler(target, 'a', target);
    const result = functionToCall();
    expect(result).to.be.equal(123);
  });

  it('should return the result of the method execution if the config has the call event', () => {
    const target = {
      a: () => 123
    };
    config.setEvents(['call']);

    const handler = GetAndCallHandler.setup(config, logEmitter).handler;
    const functionToCall = handler(target, 'a', target);
    const result = functionToCall();
    expect(result).to.be.equal(123);
  });

  it('should be able to call the method with the receiver', () => {
    const target = {
      a: function() { return this; }
    };
    config.setEvents(['call']);

    const handler = GetAndCallHandler.setup(config, logEmitter).handler;
    const functionToCall = handler(target, 'a', target);
    const result = functionToCall();
    expect(result).to.be.equal(target);
  });

  it('should be able to call the method with the arguments', () => {
    const target = {
      a: function(...args) { return args; }
    };
    config.setEvents(['call']);

    const handler = GetAndCallHandler.setup(config, logEmitter).handler;
    const functionToCall = handler(target, 'a', target);
    const result = functionToCall(1, 2, 3);
    expect(result).to.be.deep.equal([1, 2, 3]);
  });

  it('should be able to call the method with the receiver and the arguments', () => {
    const target = {
      a: function(...args) { return args; }
    };
    config.setEvents(['call']);

    const handler = GetAndCallHandler.setup(config, logEmitter).handler;
    const functionToCall = handler(target, 'a', target);
    const result = functionToCall.call({a: 1}, 1, 2, 3);
    expect(result).to.be.deep.equal([1, 2, 3]);
  });
})
