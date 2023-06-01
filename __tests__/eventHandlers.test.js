const { describe, before, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const EventHandlers = require('../src/eventHandlers');

describe("EventHandlers", () => {
    let logSpy;
    before(() => {
      logSpy = sinon.spy(console, 'log');
    })

    afterEach(() => {
      logSpy.resetHistory();
    })

  it('should return the printable context', () => {
      const configs = {
          printable: ['a', 'b'],
          context: {
              a: 123,
              b: 456,
              c: 789,
          },
      };

      const eventHandlers = new EventHandlers(configs);

      const expectedPrintable = {
          a: 123,
          b: 456,
      };

      expect(eventHandlers.getPrintable()).to.deep.equal(expectedPrintable);
  });

  it('should return an empty object if no printable context is provided', () => {
      const configs = {
          printable: [],
          context: {
              a: 123,
              b: 456,
              c: 789,
          },
      };

      const eventHandlers = new EventHandlers(configs);

      const expectedPrintable = {};

      expect(eventHandlers.getPrintable()).to.deep.equal(expectedPrintable);
  });

  it('should return an empty object if no context is provided', () => {
      const configs = {
          printable: ['a', 'b'],
          context: {},
      };

      const eventHandlers = new EventHandlers(configs);

      const expectedPrintable = {};

      expect(eventHandlers.getPrintable()).to.deep.equal(expectedPrintable);

  });

  it('should print a nested object', () => {
      const configs = {
          loggerFn: console.log,
          events: ['get'],
          printable: ['a'],
          context: {
              a: {
                b: 456,
              }
          },
      };

      const eventHandlers = new EventHandlers(configs);

      eventHandlers.get({some: "thing"}, 'some');

      expect(logSpy.calledOnce).to.be.true;
      expect(logSpy.calledWithMatch({
          kind: 'get',
          name: 'some',
          a: {
            b: 456,
          },
      })).to.be.true;
  });

  it('should print only the printable context for get method', () => {
      const configs = {
          loggerFn: console.log,
          events: ['get'],
          printable: ['a', 'b'],
          context: {
              a: 123,
              b: 456,
              c: 789,
          },
      };

      const eventHandlers = new EventHandlers(configs);

      eventHandlers.get({some: 'something'}, 'some');

      expect(logSpy.calledOnce).to.be.true;
      expect(logSpy.calledWithMatch({
          kind: 'get',
          name: 'some',
          a: 123,
          b: 456,
      })).to.be.true;
  });

  it('should print only the printable context for set method', () => {
      const configs = {
          loggerFn: console.log,
          events: ['set'],
          printable: ['a', 'b'],
          context: {
              a: 123,
              b: 456,
              c: 789,
          },
      };

      const eventHandlers = new EventHandlers(configs);

      eventHandlers.set({some: 'something'}, 'some', 'anotherthing');

      expect(logSpy.calledOnce).to.be.true;
      expect(logSpy.calledWithMatch({
          kind: 'set',
          name: 'some',
          from: 'something',
          to: 'anotherthing',
          a: 123,
          b: 456,
      })).to.be.true;
  });

  it('should print only the printable context for call method', () => {
    const configs = {
        loggerFn: console.log,
        events: ['call'],
        printable: ['a', 'b'],
        context: {
            a: 123,
            b: 456,
            c: 789,
        },
    };

    const eventHandlers = new EventHandlers(configs);

    class TestClass {
        func() {}
    }
    const testClass = new TestClass();

    eventHandlers.apply(testClass.func, {}, []);

    expect(logSpy.calledOnce).to.be.true;
    expect(logSpy.calledWithMatch({
        kind: 'function',
        name: 'func',
        args: [],
        a: 123,
        b: 456,
    })).to.be.true;
  });
})
