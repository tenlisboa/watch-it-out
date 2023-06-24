import {
  expect,
  describe,
  test,
  jest,
  beforeAll,
  afterEach,
  afterAll,
} from "@jest/globals";
import { logToConsole } from "../../../src/transformers/stdin";

describe("/transformers/stdin.js", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest
      .spyOn(Date.prototype, "toISOString")
      .mockReturnValue("2023-06-24T15:38:27.145Z");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should throw if no message is passed", () => {
    const expectedErrorMessage = "No message passed to logToConsole";

    expect(() => logToConsole()).toThrow(expectedErrorMessage);
  });

  test("should log to console with the current date at the beggining", () => {
    const expected = `[2023-06-24T15:38:27.145Z]\nHello World!`;

    logToConsole("Hello World!");

    expect(console.log).toHaveBeenCalledWith(expected);
  });

  test("should log a stringified message if it is an object", () => {
    const message = {
      message: "Hello World!",
    };

    const expectedMessage = "[2023-06-24T15:38:27.145Z]\nmessage: Hello World!";

    logToConsole(message);

    expect(console.log).toHaveBeenCalledWith(expectedMessage);
  });

  test("should log in the pattern [key]:[value] separated by a comma", () => {
    const message = {
      message: "Hello World!",
      another: "Foos Rho Dah!",
    };

    const expectedMessage =
      "[2023-06-24T15:38:27.145Z]\nmessage: Hello World!, another: Foos Rho Dah!";

    logToConsole(message);

    expect(console.log).toHaveBeenCalledWith(expectedMessage);
  });
});
