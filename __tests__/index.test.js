const { describe, before, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const WatchIt = require('../src');

describe("WatchIt", () => {
    let logSpy;
    before(() => {
        logSpy = sinon.spy(console, 'log');
    })

    afterEach(() => {
        logSpy.resetHistory();
    })

    it('should log when a property is get', () => {
        let target = {
            a: 123
        };

        let proxy = WatchIt.init(target, { loggerFn: console.log});
        
        proxy.a;

        expect(logSpy.calledWith("Getting property a")).to.be.true;
    })

    it('should log when a property is set', () => {
        let target = {
            a: 123
        };

        let proxy = WatchIt.init(target, { loggerFn: console.log});
        
        proxy.a = 456;

        expect(logSpy.calledWith("Setting property a to 456")).to.be.true;
    })

    it('should log when calling a function', () => {
        let target = {
            a: 123,
            do(some) {
                console.log('do something');
            }
        };

        let proxy = WatchIt.init(target, { loggerFn: console.log});
        
        proxy.do('something');

        expect(logSpy.calledWith("Calling do with something")).to.be.true;
        expect(logSpy.calledWith("do something")).to.be.true;
    })

    it('should log when calling a method', () => {
        class T {
            doIt(some) {
                console.log('do something');
            }
        }
        let target = new T();

        let proxy = WatchIt.init(target, { loggerFn: console.log});
        
        proxy.doIt('something');

        expect(logSpy.calledWith("Calling doIt with something")).to.be.true;
        expect(logSpy.calledWith("do something")).to.be.true;
    })
})
