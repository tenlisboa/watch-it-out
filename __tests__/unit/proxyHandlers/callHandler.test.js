import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import { CallHandler } from "../../../src/proxyHandlers/callHandler.js";

describe("/proxyHandlers/callHandler.js", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("pass the right values when target is an anonymous object", () => {
    const transformer = jest.fn();
    const target = { test: () => {} };
    const data = {
      target,
      property: "test",
      args: ["Some Name", "Another Name"],
      receiver: { ...target },
    };
    const expectedArgsPassingToTransformer = {
      action: "calling method",
      property: "test",
      args: ["Some Name", "Another Name"],
      returningValue: undefined,
      on: "anonymous",
    };

    const callHandler = new CallHandler({ transformers: [transformer] });
    callHandler.handle(data);

    expect(transformer).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
  });

  test("pass the right values when target is a named class", () => {
    const transformer = jest.fn();
    class Target {
      test() {}
    }
    const target = new Target();

    const data = {
      target,
      property: "test",
      args: ["Some Name", "Another Name"],
      receiver: { ...target },
    };
    const expectedArgsPassingToTransformer = {
      action: "calling method",
      property: "test",
      args: ["Some Name", "Another Name"],
      returningValue: undefined,
      on: "Target",
    };

    const callHandler = new CallHandler({ transformers: [transformer] });
    callHandler.handle(data);

    expect(transformer).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
  });
});
