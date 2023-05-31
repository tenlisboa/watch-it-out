const { describe, before, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const WatchItOut = require('../src');

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

        WatchItOut.setup({loggerFn: console.log});

        let proxy = WatchItOut.init(target);
        
        proxy.a;

        const partialExpectedLoggin = {kind: "get", name: "a"};

        expect(logSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
    })

    it('should log when a property is set', () => {
        let target = {
            a: 123
        };

        WatchItOut.setup({loggerFn: console.log});

        let proxy = WatchItOut.init(target);
        
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

        WatchItOut.setup({loggerFn: console.log});

        let proxy = WatchItOut.init(target);
        
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

        WatchItOut.setup({loggerFn: console.log});

        let proxy = WatchItOut.init(target);
        
        proxy.doIt('something');

        const partialExpectedLoggin = {kind: "function", name: "doIt", args: ["something"]};

        expect(logSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
        expect(logSpy.calledWith("do something")).to.be.true;
    })

    it('should log when calling a function directly', () => {
        function t() {
            console.log('do something');
        }

        WatchItOut.setup({loggerFn: console.log});

        let proxy = WatchItOut.init(t);
        
        proxy('something');

        const partialExpectedLoggin = {kind: "function", name: "t", args: ["something"]};

        expect(logSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
        expect(logSpy.calledWith("do something")).to.be.true;
    })

    it('should log with a custom logger', () => {
        let target = {
            a: 123
        };

        const customLogger =  {
            log: (data) => console.log('custom logger: ', data)
        }
        const customLogSpy = sinon.spy(customLogger, 'log');

        WatchItOut.setup({loggerFn: customLogSpy});

        let proxy = WatchItOut.init(target);
        
        proxy.a;

        const partialExpectedLoggin = {kind: "get", name: "a"};

        expect(customLogSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
    })

    it('should be able to setup the config through setup static function', () => {
        const watcherSpy = sinon.spy(WatchItOut, 'setup');
        
        WatchItOut.setup({loggerFn: console.log});

        expect(watcherSpy.calledWith({loggerFn: console.log})).to.be.true;
    })

    it('should be able to setup only one event to watch and ignore others', () => {
        const target = {
            a: 123,
            foo() {
                console.log('Foo Calling');
            }
        };
        WatchItOut.setup({events: ['get']});

        const proxy = WatchItOut.init(target);
        proxy.a;
        proxy.a = 456;
        proxy.foo();

        const partialExpectedLoggin = {kind: "get", name: "a"};
        const partialExpectedLogginTwo = {kind: "get", name: "foo"};
        const partialUnexpectedLogginSet = {kind: "set", name: "a", from: 123, to: 456};
        const partialUnexpectedLogginFunc = {kind: "function", name: "foo", args: []};

        expect(logSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
        expect(logSpy.calledWithMatch(partialExpectedLogginTwo)).to.not.be.true;
        expect(logSpy.calledWithMatch(partialUnexpectedLogginSet)).to.not.be.true;
        expect(logSpy.calledWithMatch(partialUnexpectedLogginFunc)).to.not.be.true;
    })
})
