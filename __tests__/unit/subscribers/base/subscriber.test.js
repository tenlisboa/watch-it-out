import { expect, describe, test } from "@jest/globals";
import { Subscriber } from "../../../../src/subscribers/base/subscriber";

describe("/subscribers/base/subscriber.js", () => {
  test("implement all methods and props correctly", () => {
    const subscriber = new Subscriber();

    expect(subscriber).toHaveProperty("subscribers");
    expect(subscriber).toHaveProperty("subscribe");
    expect(subscriber).toHaveProperty("unsubscribe");
    expect(subscriber).toHaveProperty("notify");
  });
});
