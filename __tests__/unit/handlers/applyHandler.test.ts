import { describe } from "mocha";
import { expect } from "chai";
import ConfigBuilder from "../../../src/builders/configBuilder";
import ApplyHandler from "../../../src/handlers/applyHandler";
import LogEmitter from "../../../src/emitters/logEmitter";

describe("ApplyHandler class test", () => {
  const config = ConfigBuilder.config();
  const logEmitter = {
    emit(...args) {},
  } as LogEmitter;

  it("should throw an error if the config is not provided to ApplyHandler setup method", () => {
    expect(() => ApplyHandler.setup()).to.throw(
      "Missing constructor parameter: config"
    );
  });

  it("should throw an error if the logEmitter is not provided to ApplyHandler setup method", () => {
    expect(() => ApplyHandler.setup(config)).to.throw(
      "Missing constructor parameter: logEmitter"
    );
  });

  it("should return the handler function from the handler getter", () => {
    const handler = ApplyHandler.setup(config, logEmitter).handler;
    expect(handler).to.be.a("function");
  });

  it("should return the result of the function execution", () => {
    function execute() {
      return 123;
    }

    const handler = ApplyHandler.setup(config, logEmitter).handler;
    const result = handler(execute, {}, []);
    expect(result).to.be.equal(123);
  });

  it("should return the result of the function execution with arguments", () => {
    function execute(a, b) {
      return a + b;
    }

    const handler = ApplyHandler.setup(config, logEmitter).handler;
    const result = handler(execute, {}, [1, 2]);
    expect(result).to.be.equal(3);
  });
});
