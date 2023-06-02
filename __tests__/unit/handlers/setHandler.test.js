const { describe } = require('mocha');
const { expect } = require('chai');
const ConfigBuilder = require('../../../src/builders/configBuilder');
const SetHandler = require('../../../src/handlers/setHandler');

describe("SetHandler class test", () => {
  const config =  ConfigBuilder.config();
  const logEmitter = {
    emit(...args) {}
  };

  it('should throw an error if the config is not provided to SetHandler setup method', () => {
    expect(() => SetHandler.setup())
      .to.throw('Missing constructor parameter: config');
  });

  it('should throw an error if the logEmitter is not provided to ApplyHandler setup method', () => {
    expect(() => SetHandler.setup(config))
      .to.throw('Missing constructor parameter: logEmitter');
  });

  it('should return the handler function from the handler getter', () => {
    const handler = SetHandler.setup(config, logEmitter).handler;
    expect(handler).to.be.a('function');
  });

  it('should return true if the property is set', () => {
    const target = {
      a: 123
    };

    const handler = SetHandler.setup(config, logEmitter).handler;
    const result = handler(target, 'a', 456);
    expect(result).to.be.equal(true);
  });

  it('should be able to set the property value', () => {
    const target = {
      a: 123
    };

    const handler = SetHandler.setup(config, logEmitter).handler;
    handler(target, 'a', 456);
    expect(target.a).to.be.equal(456);
  });
});
