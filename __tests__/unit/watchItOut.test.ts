import { describe, afterEach, beforeEach } from "mocha";
import { expect } from "chai";
import WatchItOut from "../../src";
import defautlConfig from "../../src/config/.default.config";

describe("WatchItOut class", () => {
  const customLogger = {
    log(...args) {},
  };

  beforeEach(() => {
    WatchItOut.config.setLogger(customLogger);
  });

  afterEach(() => {
    WatchItOut.config.reset();
  });

  it("should be possible to create a proxy of an object", () => {
    const obj = {
      someKey: "someValue",
    };

    const objProxy = WatchItOut.new(obj);

    expect(objProxy).to.be.an("object");
    expect(objProxy).to.have.property("someKey");
    expect(objProxy.someKey).to.equal("someValue");
    // @ts-ignore
    expect(objProxy.__proto__).to.be.deep.equal(obj.__proto__);
  });

  it("should be possible to create a proxy of a class", () => {
    class TestClass {
      someClassKey = "someClassValue";
    }

    const classProxy = WatchItOut.new(new TestClass());

    expect(classProxy).to.be.an("object");
    expect(classProxy).to.have.property("someClassKey");
    expect(classProxy.someClassKey).to.equal("someClassValue");
    // @ts-ignore
    expect(classProxy.__proto__).to.be.deep.equal(TestClass.prototype);
  });

  it("should be possible to create a proxy of a function", () => {
    function testFunction() {
      return "testFunction";
    }

    const funcProxy = WatchItOut.new(testFunction);

    expect(funcProxy).to.be.an("function");
    expect(funcProxy()).to.equal("testFunction");
    expect(funcProxy.name).to.be.deep.equal(testFunction.name);
  });

  // should be possible to configure with a config object
  it("should be possible to configure the events using the config property", () => {
    WatchItOut.config.setEvents(["get"]);

    expect(WatchItOut.config.getEvents()).to.be.deep.equal(["get"]);
  });

  it("should be possible to configure the context using the config property", () => {
    WatchItOut.config.setContext({ ctx: "ctx" });

    expect(WatchItOut.config.getContext()).to.be.deep.equal({ ctx: "ctx" });
  });

  it("should be possible to configure the printable using the config property", () => {
    WatchItOut.config.setPrintable(["someKey"]);

    expect(WatchItOut.config.getPrintable()).to.be.deep.equal(["someKey"]);
  });

  it("should be possible to configure the logger using the config property", () => {
    const customLogger = {
      log() {},
    };

    WatchItOut.config.setLogger(customLogger);

    expect(WatchItOut.config.getLogger()).to.be.deep.equal(customLogger);
  });

  it("should be initialized with a default config if neither a config object nor a config file is provided", () => {
    const configContent = WatchItOut.config.build();

    expect(configContent).to.be.deep.equal({
      ...defautlConfig,
      logger: customLogger,
    });
  });
});
