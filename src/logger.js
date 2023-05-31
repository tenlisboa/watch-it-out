const Util = require("./util");

class Logger {
  #logger;

  constructor(logger) {
    this.#logger = logger;
  }

  #log(data) {
    const keys = Object.keys(data);
    const dataToLog = {};
    keys.forEach(key => {
      dataToLog[key] = data[key];
    });

    this.#logger({
      ...dataToLog,
      when: Util.now()
    });
  }

  logGet({ name }) {
    this.#log({
      kind: "get",
      name
    });
  }

  logCall({ name, args }) {
    this.#log({
      kind: "function",
      name,
      args
    });
  }

  logSet({ name, from, to }) {
    this.#log({
      kind: "set",
      name,
      from,
      to
    });
  }
}

module.exports = Logger;
