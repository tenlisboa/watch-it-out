const { describe, beforeEach } = require('mocha');
const { expect } = require('chai');
const ProxyHandlerFacade = require('../../../src/facades/proxyHandlerFacade');
const ConfigBuilder = require('../../../src/builders/configBuilder');

describe("ProxyHandlerFacade class test", () => {
  const config =  ConfigBuilder.config();
  const logEmitter = {
    emit(...args) {}
  };

  it('should throw an error if the config is not provided to ProxyHandlerFacade constructor', () => {
    expect(() => new ProxyHandlerFacade())
      .to.throw('Missing constructor parameter: config');
  });

  it('should throw an error if the logEmitter is not provided to ProxyHandlerFacade constructor', () => {
    expect(() => new ProxyHandlerFacade(config))
      .to.throw('Missing constructor parameter: logEmitter');
  });

  it('should be possible to get the proxy handler', () => {
    config.setEvents(['get']);

    const proxyHandlerFacade = new ProxyHandlerFacade(config, logEmitter);
    const proxyHandler = proxyHandlerFacade.getProxyHandler();

    expect(proxyHandler).to.be.an('object');
    expect(proxyHandler).to.have.property('get');  
  });

  it('should be possible to retrieve the get handler from the proxy handler', () => {
    config.setEvents(['get']);

    const proxyHandlerFacade = new ProxyHandlerFacade(config, logEmitter);
    const proxyHandler = proxyHandlerFacade.getProxyHandler();

    expect(proxyHandler.get).to.be.a('function');
  });

  it('should be possible to retrieve the get handler from the proxy handler when event is call', () => {
    config.setEvents(['call']);

    const proxyHandlerFacade = new ProxyHandlerFacade(config, logEmitter);
    const proxyHandler = proxyHandlerFacade.getProxyHandler();

    expect(proxyHandler.get).to.be.a('function');
  });

  it('should be possible to retrieve the set handler from the proxy handler', () => {
    config.setEvents(['set']);

    const proxyHandlerFacade = new ProxyHandlerFacade(config, logEmitter);
    const proxyHandler = proxyHandlerFacade.getProxyHandler();

    expect(proxyHandler.set).to.be.a('function');
  });

  it('should be possible to retrieve the apply handler from the proxy handler', () => {
    config.setEvents(['apply']);

    const proxyHandlerFacade = new ProxyHandlerFacade(config, logEmitter);
    const proxyHandler = proxyHandlerFacade.getProxyHandler();

    expect(proxyHandler.apply).to.be.a('function');
  });
})
