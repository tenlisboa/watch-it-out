import { expect } from "chai";
import { describe } from "mocha";
import MissingConstructorParameter from "../../../src/exceptions/missingConstructorParameter";

describe("MissingConstructorParameter", () => {
  it("should not throw an error when a parameter is missing", () => {
    expect(() => {
      new MissingConstructorParameter();
    }).to.not.throw();
  });

  it("should throw with the correct message event when a parameter is missing", () => {
    expect(() => {
      throw new MissingConstructorParameter();
    }).to.throw('Missing constructor parameter: ');
  });

  it("should throw with the correct message", () => {
    expect(() => {
      throw new MissingConstructorParameter('parameter');
    }).to.throw('Missing constructor parameter: parameter');
  });
});
