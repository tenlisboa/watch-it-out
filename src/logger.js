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

  logGet({ name, ...printable }) {
    this.#log({
      kind: "get",
      name,
      ...printable
    });
  }

  logCall({ name, args,...printable }) {
    this.#log({
      kind: "function",
      name,
      args,
      ...printable
    });
  }

  logSet({ name, from, to, ...printable }) {
    this.#log({
      kind: "set",
      name,
      from,
      to,
      ...printable
    });
  }
}

module.exports = Logger;
