const { describe, before, afterEach, after } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const WatchItOut = require('../src');
const defaultConfigs = require('../src/defaultConfigs');

describe("WatchIt", () => {
    const logSpy = sinon.createSandbox()
        .spy(console, 'log');
    const defaultSpy = sinon.createSandbox()
        .spy(defaultConfigs, 'loggerFn');

    afterEach(() => {
        logSpy.resetHistory();
        defaultSpy.resetHistory();
    })

    after(() => {
        logSpy.restore();
        defaultSpy.restore();
      })

    it('should log when the config is empty', () => {
        let target = {
            emptyConfig: 123
        };

        WatchItOut.setup();

        let proxy = WatchItOut.init(target);
        
        proxy.emptyConfig;

        const partialExpectedLoggin = {kind: "get", name: "emptyConfig"};

        expect(defaultSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
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
            onlyGet: 123,
            foo() {
                console.log('Foo Calling');
            }
        };

        WatchItOut.setup({events: ['get']});

        const proxy = WatchItOut.init(target);
        proxy.onlyGet;
        proxy.onlyGet = 456;
        proxy.foo();

        const partialExpectedLoggin = {kind: 'get', name: 'onlyGet'};
        const partialExpectedLogginTwo = {kind: "get", name: "foo"};
        const partialUnexpectedLogginSet = {kind: "set", name: "onlyGet", from: 123, to: 456};
        const partialUnexpectedLogginFunc = {kind: "function", name: "foo", args: []};

        expect(defaultSpy.calledWithMatch(partialExpectedLoggin)).to.be.true;
        expect(defaultSpy.calledWithMatch(partialExpectedLogginTwo)).to.not.be.true;
        expect(defaultSpy.calledWithMatch(partialUnexpectedLogginSet)).to.not.be.true;
        expect(defaultSpy.calledWithMatch(partialUnexpectedLogginFunc)).to.not.be.true;
    })
})
