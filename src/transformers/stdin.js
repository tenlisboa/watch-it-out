import { Config } from "../config";

const logger = console;

export function logToConsole(inputMessage) {
  const config = Config.instance;

  if (!inputMessage) {
    throw new Error("No message passed to logToConsole");
  }

  if (typeof inputMessage !== "object") {
    log(inputMessage);
    return;
  }

  let message = inputMessage;
  if (config.stringify) {
    message = stringifyInputMessage(inputMessage);
  }

  log(message);
}

function log(message) {
  const prePendDate = new Date().toISOString();

  if (typeof message !== "string") {
    message.when = prePendDate;
  } else {
    message = `[${prePendDate}]\n${message}`;
  }

  logger.log(message);
}

function stringifyInputMessage(messageInput) {
  const keys = Reflect.ownKeys(messageInput);
  const keyValueStrings = [];
  keys.forEach(key => {
    const value = stringifyValue(messageInput[key]);

    keyValueStrings.push(`${String(key)}: ${value}`);
  });

  const message = keyValueStrings.join(", ");
  return message;
}

function stringifyValue(value) {
  if (value instanceof Object) {
    return JSON.stringify(value);
  }

  return String(value);
}
