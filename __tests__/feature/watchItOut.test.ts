import { expect } from "chai";
import { describe, it, afterEach, beforeEach } from "mocha";
import sinon from "sinon";
import WatchItOut from "../../src";

describe("Main purpose of WatchItOut", () => {
  class CustomClass {
    a: number;

    constructor() {
      this.a = 123;
    }

    foo() {}
  }
  const customLogger = {
    log(...args) {},
  };
  let logSpy;

  beforeEach(() => {
    logSpy = sinon.spy(customLogger, "log");
  });
  afterEach(() => {
    sinon.restore();
  });

  it("should log the get event when a property is accessed", () => {
    WatchItOut.config.setLogger(customLogger).setEvents(["get"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.a;

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        action: "accessing property",
        property: "a",
        on: { a: 123 },
      })
    ).to.be.true;
  });

  it("should log the set event when a property is set", () => {
    WatchItOut.config.setLogger(customLogger).setEvents(["set"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.a = 456;

    expect(logSpy.called).to.be.true;
    expect(
      logSpy.calledWithMatch({
        action: "changing property value",
        property: "a",
        on: { a: 456 },
        from: 123,
        to: 456,
      })
    ).to.be.true;
  });

  it("should log the call event when a method is called", () => {
    WatchItOut.config.setLogger(customLogger).setEvents(["call"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.foo();

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        action: "calling a method",
        method: "foo",
        with: [],
      })
    ).to.be.true;
  });

  it("should log the call event when a method is called with arguments", () => {
    WatchItOut.config.setLogger(customLogger).setEvents(["call"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.foo(123, 456);

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        action: "calling a method",
        method: "foo",
        with: [123, 456],
      })
    ).to.be.true;
  });

  it("should log the apply event when a function is called", () => {
    WatchItOut.config.setLogger(customLogger).setEvents(["apply"]);

    function test() {}

    const customFunc = WatchItOut.new(test);

    customFunc();

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        action: "calling a function",
        name: "test",
        with: [],
      })
    ).to.be.true;
  });

  // should log the get event with the printable context when a property is accessed
  it("should log the get event with the printable context when a property is accessed", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable(["user"])
      .setEvents(["get"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.a;

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        user: { name: "John Doe" },
      })
    ).to.be.true;
  });

  it("should log the get event with the printable context when printable is nested", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable(["user.name"])
      .setEvents(["get"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.a;

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        "user.name": "John Doe",
      })
    ).to.be.true;
  });

  it("should not log the get event with context not set in printable when a property is accessed", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable([])
      .setEvents(["get"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.a;

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        "user.name": "John Doe",
      })
    ).to.be.not.true;
    expect(
      logSpy.calledWithMatch({
        user: { name: "John Doe" },
      })
    ).to.be.not.true;
  });

  // SET

  it("should log the set event with the printable context when a property is accessed", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable(["user"])
      .setEvents(["set"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.a = 456;

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        user: { name: "John Doe" },
      })
    ).to.be.true;
  });

  it("should log the set event with the printable context when printable is nested", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable(["user.name"])
      .setEvents(["set"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.a = 456;

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        "user.name": "John Doe",
      })
    ).to.be.true;
  });

  it("should not log the set event with context not set in printable when a property is accessed", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable([])
      .setEvents(["set"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.a = 456;

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        "user.name": "John Doe",
      })
    ).to.be.not.true;
    expect(
      logSpy.calledWithMatch({
        user: { name: "John Doe" },
      })
    ).to.be.not.true;
  });

  // CALL

  it("should log the call event with the printable context when a property is accessed", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable(["user"])
      .setEvents(["call"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.foo();

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        user: { name: "John Doe" },
      })
    ).to.be.true;
  });

  it("should log the call event with the printable context when printable is nested", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable(["user.name"])
      .setEvents(["call"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.foo();

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        "user.name": "John Doe",
      })
    ).to.be.true;
  });

  it("should not log the call event with context not set in printable when a property is accessed", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable([])
      .setEvents(["call"]);

    const customClass = WatchItOut.new(new CustomClass());

    customClass.foo();

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        "user.name": "John Doe",
      })
    ).to.be.not.true;
    expect(
      logSpy.calledWithMatch({
        user: { name: "John Doe" },
      })
    ).to.be.not.true;
  });

  // APPLY

  it("should log the apply event with the printable context when a property is accessed", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable(["user"])
      .setEvents(["apply"]);

    function test() {}

    const customFunc = WatchItOut.new(test);

    customFunc();

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        user: { name: "John Doe" },
      })
    ).to.be.true;
  });

  it("should log the apply event with the printable context when printable is nested", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable(["user.name"])
      .setEvents(["apply"]);

    function test() {}

    const customFunc = WatchItOut.new(test);

    customFunc();

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        "user.name": "John Doe",
      })
    ).to.be.true;
  });

  it("should not log the apply event with context not set in printable when a property is accessed", () => {
    WatchItOut.config
      .setLogger(customLogger)
      .setContext({ user: { name: "John Doe" } })
      .setPrintable([])
      .setEvents(["apply"]);

    function test() {}

    const customFunc = WatchItOut.new(test);

    customFunc();

    expect(logSpy.calledOnce).to.be.true;
    expect(
      logSpy.calledWithMatch({
        "user.name": "John Doe",
      })
    ).to.be.not.true;
    expect(
      logSpy.calledWithMatch({
        user: { name: "John Doe" },
      })
    ).to.be.not.true;
  });
});
