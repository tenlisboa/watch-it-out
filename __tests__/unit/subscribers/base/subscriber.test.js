import { expect, describe, test } from "@jest/globals";
import { Subscriber } from "../../../../src/subscribers/base/subscriber.js";

describe("/subscribers/base/subscriber.js", () => {
  test("implement all methods and props correctly", () => {
    const subscriber = new Subscriber();

    expect(subscriber).toHaveProperty("subscribers");
    expect(subscriber).toHaveProperty("subscribe");
    expect(subscriber).toHaveProperty("notify");
  });
});
