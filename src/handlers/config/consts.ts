type HandlerKeyMapper = {
  [key: string]: string;
};

export const HANDLER_KEY_MAPPER: HandlerKeyMapper = {
  get: "getAndCall",
  set: "set",
  call: "getAndCall",
  apply: "apply",
};
