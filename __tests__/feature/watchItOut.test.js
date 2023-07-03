import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  afterAll,
} from "@jest/globals";
import Watch from "../../src";

describe("#WatchItOut", () => {
  const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  jest
    .spyOn(Date.prototype, "toISOString")
    .mockReturnValue("2023-06-24T15:38:27.145Z");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should log only a get event when property is accessed", () => {
    const target = {
      foo: "bar",
    };

    const expectedLogParams =
      "[2023-06-24T15:38:27.145Z]\naction: acessing property, property: foo, value: bar, on: anonymous";

    const targetWatchable = Watch.new(target);

    targetWatchable.foo;

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expectedLogParams);
  });

  test("should log only a get event when a class property is accessed", () => {
    class Target {
      foo = "bar";
    }
    const target = new Target();

    const expectedLogParams =
      "[2023-06-24T15:38:27.145Z]\naction: acessing property, property: foo, value: bar, on: Target";

    const targetWatchable = Watch.new(target);

    targetWatchable.foo;

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expectedLogParams);
  });

  test("should log only a set event when property is set", () => {
    const target = {
      foo: "bar",
    };

    const expectedLogParams =
      "[2023-06-24T15:38:27.145Z]\naction: change property, property: foo, from: bar, to: baz, on: anonymous";

    const targetWatchable = Watch.new(target);

    targetWatchable.foo = "baz";

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expectedLogParams);
  });

  test("should log only a set event when a class property is set", () => {
    class Target {
      foo = "bar";
    }
    const target = new Target();

    const expectedLogParams =
      "[2023-06-24T15:38:27.145Z]\naction: change property, property: foo, from: bar, to: baz, on: Target";

    const targetWatchable = Watch.new(target);

    targetWatchable.foo = "baz";

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expectedLogParams);
  });

  test("should log only a call event when method is called", () => {
    const target = {
      foo: () => "bar",
    };

    const expectedLogParams =
      "[2023-06-24T15:38:27.145Z]\naction: calling method, property: foo, args: [], returningValue: bar, on: anonymous";

    const targetWatchable = Watch.new(target);

    targetWatchable.foo();

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expectedLogParams);
  });

  test("should log only a call event when function is called", () => {
    function target() {
      return "bar";
    }

    const expectedLogParams =
      "[2023-06-24T15:38:27.145Z]\naction: calling method, property: null, args: [], returningValue: bar, on: target";

    const targetWatchable = Watch.new(target);

    targetWatchable();

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expectedLogParams);
  });

  test("should log a not stringified message", () => {
    function target() {
      return "bar";
    }

    const expectedLogParams = {
      when: '2023-06-24T15:38:27.145Z',
      action: 'calling method',
      property: null,
      args: [],
      returningValue: 'bar',
      on: 'target'
    }

    const targetWatchable = Watch.new(target, {
      stringify: false
    });

    targetWatchable();

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expectedLogParams);
  });
});
