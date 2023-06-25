import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import { SetHandler } from "../../../src/proxyHandlers/setHandler.js";

describe("/proxyHandlers/setHandler.js", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("pass the right values when target is an anonymous object", () => {
    const transformer = jest.fn();
    const target = { test: "Some Name" };
    const data = {
      target,
      property: "test",
      value: "Another Name",
      receiver: { ...target },
    };
    const expectedArgsPassingToTransformer = {
      action: "change property",
      property: "test",
      from: "Some Name",
      to: "Another Name",
      on: "anonymous",
    };

    const setHandler = new SetHandler({ transformers: [transformer] });
    setHandler.handle(data);

    expect(transformer).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
  });

  test("pass the right values when target is a named class", () => {
    const transformer = jest.fn();
    class Target {
      test = "Some Name";
    }
    const target = new Target();

    const data = {
      target,
      property: "test",
      value: "Another Name",
      receiver: { ...target },
    };
    const expectedArgsPassingToTransformer = {
      action: "change property",
      property: "test",
      from: "Some Name",
      to: "Another Name",
      on: "Target",
    };

    const setHandler = new SetHandler({ transformers: [transformer] });
    setHandler.handle(data);

    expect(transformer).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
  });
});
