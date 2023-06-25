const defaultConfig = {
  events: ["get", "set", "methodCall", "functionCall"],
  printable: [],
  context: {},
};

export class Config {
  static #instance;
  _config;

  constructor(config) {
    this._config = config;
  }

  static init(config = defaultConfig) {
    this.#instance = new Config(config);
  }

  static get instance() {
    return this.#instance;
  }

  get events() {
    return this._config.events;
  }

  get printable() {
    return this._config.printable;
  }

  get context() {
    return this._config.context;
  }
}
