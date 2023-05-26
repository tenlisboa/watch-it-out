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

        const partialExpectedLoggin = {kind: "get", name: "a"};

        expect(logSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
    })

    it('should log when a property is set', () => {
        let target = {
            a: 123
        };

        let proxy = WatchIt.init(target, { loggerFn: console.log});
        
        proxy.a = 456;

        const partialExpectedLoggin = {kind: "set", name: "a", from: 123, to: 456};

        expect(logSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
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

        const partialExpectedLoggin = {kind: "function", name: "do", args: ["something"]};

        expect(logSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
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

        const partialExpectedLoggin = {kind: "function", name: "doIt", args: ["something"]};

        expect(logSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
        expect(logSpy.calledWith("do something")).to.be.true;
    })

    it('should log when calling a function directly', () => {
        function t() {
            console.log('do something');
        }

        let proxy = WatchIt.init(t);
        
        proxy('something');

        const partialExpectedLoggin = {kind: "function", name: "t", args: ["something"]};

        expect(logSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
        expect(logSpy.calledWith("do something")).to.be.true;
    })
})
