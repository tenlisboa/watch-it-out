const logger = console;

export function logToConsole(inputMessage) {
  if (!inputMessage) {
    throw new Error("No message passed to logToConsole");
  }

  if (typeof inputMessage !== "object") {
    log(inputMessage);
    return;
  }

  const message = stringifyInputMessage(inputMessage);

  log(message);
}

function log(messageString) {
  const prePendDate = new Date().toISOString();
  const message = `[${prePendDate}]\n${messageString}`;

  logger.log(message);
}

function stringifyInputMessage(messageInput) {
  const keys = Reflect.ownKeys(messageInput);
  const keyValueStrings = [];
  keys.forEach(key => {
    const value = messageInput[key];
    keyValueStrings.push(`${String(key)}: ${value}`);
  });

  const message = keyValueStrings.join(", ");
  return message;
}
