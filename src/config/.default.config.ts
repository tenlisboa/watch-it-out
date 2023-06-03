type DefaultConfig = {
  logger: { [key: string | symbol]: any };
  events: string[];
  context: object;
  printable: string[];
};

const defaultConfig: DefaultConfig = {
  logger: console,
  events: ["get", "set", "call", "apply"],
  context: {},
  printable: [],
};

export default defaultConfig;
