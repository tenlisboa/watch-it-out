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
import { GetSubscriber } from "../../../src/subscribers/getSuscriber";

describe("/proxyHandlers/getHandler.js", () => {
  const getSubscriber = new GetSubscriber();
  const transformer = jest.fn();
  getSubscriber.subscribe(transformer);
  let subjectSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    subjectSpy = jest.spyOn(getSubscriber, "notify");
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

    const getHandler = new GetHandler({ subscriber: getSubscriber });
    getHandler.handle(data);

    expect(subjectSpy).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
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

    const getHandler = new GetHandler({ subscriber: getSubscriber });
    getHandler.handle(data);

    expect(subjectSpy).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
  });
});
