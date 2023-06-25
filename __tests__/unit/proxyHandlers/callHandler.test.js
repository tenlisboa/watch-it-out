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
import { CallSubscriber } from "../../../src/subscribers/callSuscriber.js";

describe("/proxyHandlers/callHandler.js", () => {
  const callSubscriber = new CallSubscriber();
  const transformer = jest.fn();
  callSubscriber.subscribe(transformer);
  let subjectSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    subjectSpy = jest.spyOn(callSubscriber, "notify");
  });

  test("pass the right values when target is an anonymous object", () => {
    const target = { test: () => {} };
    const data = {
      target,
      property: "test",
      args: ["Some Name", "Another Name"],
      thisArg: { ...target },
    };
    const expectedArgsPassingToTransformer = {
      action: "calling method",
      property: "test",
      args: ["Some Name", "Another Name"],
      returningValue: undefined,
      on: "anonymous",
    };

    const callHandler = new CallHandler({ subscriber: callSubscriber });
    callHandler.handle(data);

    expect(subjectSpy).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
  });

  test("pass the right values when target is a named class", () => {
    class Target {
      test() {}
    }
    const target = new Target();

    const data = {
      target,
      property: "test",
      args: ["Some Name", "Another Name"],
      thisArg: { ...target },
    };
    const expectedArgsPassingToTransformer = {
      action: "calling method",
      property: "test",
      args: ["Some Name", "Another Name"],
      returningValue: undefined,
      on: "Target",
    };

    const callHandler = new CallHandler({ subscriber: callSubscriber });
    callHandler.handle(data);

    expect(subjectSpy).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
  });
});
