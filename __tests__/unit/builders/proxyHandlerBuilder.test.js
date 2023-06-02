const { describe } = require('mocha');
const { expect } = require('chai');
const ProxyHandlerBuilder = require('../../../src/builders/proxyHandlerBuilder');

describe("ProxyHandlerBuilder class test", () => {
    it('should be possible to create a ProxyHandlerBuilder object', () => {
        const config = ProxyHandlerBuilder.workflow();

        expect(config).to.be.an('object');
        expect(config).to.have.instanceOf(ProxyHandlerBuilder);
    });

    it('should be possible to set the get handler', () => {
      const getHandler = () => {};
      const proxyHandler = ProxyHandlerBuilder.workflow()
          .setGetAndCallHandler(getHandler)
          .build();

      expect(proxyHandler.get).to.be.deep.equal(getHandler);
    });

    it('should be possible to set the set handler', () => {
      const setHandler = () => {};
      const proxyHandler = ProxyHandlerBuilder.workflow()
          .setSetHandler(setHandler)
          .build();

      expect(proxyHandler.set).to.be.deep.equal(setHandler);
    });

    it('should be possible to set the apply handler', () => {
      const applyHandler = () => {};
      const proxyHandler = ProxyHandlerBuilder.workflow()
          .setApplyHandler(applyHandler)
          .build();

      expect(proxyHandler.apply).to.be.deep.equal(applyHandler);
    });
})
