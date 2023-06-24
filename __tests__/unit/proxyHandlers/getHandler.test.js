import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import { GetHandler } from "../../../src/proxyHandlers/getHandler";

describe("/proxyHandlers/getHandler.js", () => {
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
      receiver: { ...target },
    };
    const expectedArgsPassingToTransformer = {
      action: "acessing property",
      property: "test",
      value: "Some Name",
      on: "anonymous",
    };

    const getHandler = new GetHandler({ transformers: [transformer] });
    getHandler.handle(data);

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
      receiver: { ...target },
    };
    const expectedArgsPassingToTransformer = {
      action: "acessing property",
      property: "test",
      value: "Some Name",
      on: "Target",
    };

    const getHandler = new GetHandler({ transformers: [transformer] });
    getHandler.handle(data);

    expect(transformer).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
  });
});
