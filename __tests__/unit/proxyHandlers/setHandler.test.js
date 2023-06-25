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
import { SetSubscriber } from "../../../src/subscribers/setSuscriber.js";

describe("/proxyHandlers/setHandler.js", () => {
  const setSubscriber = new SetSubscriber();
  const transformer = jest.fn();
  setSubscriber.subscribe(transformer);
  let subjectSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    subjectSpy = jest.spyOn(setSubscriber, "notify");
  });

  test("pass the right values when target is an anonymous object", () => {
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

    const setHandler = new SetHandler({ subscriber: setSubscriber });
    setHandler.handle(data);

    expect(subjectSpy).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
  });

  test("pass the right values when target is a named class", () => {
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

    const setHandler = new SetHandler({ subscriber: setSubscriber });
    setHandler.handle(data);

    expect(subjectSpy).toHaveBeenCalledWith(expectedArgsPassingToTransformer);
  });
});
