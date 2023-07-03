const defaultConfig = {
  events: ["get", "set", "methodCall", "functionCall"],
  printable: [],
  context: {},
  stringify: true
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
    if (!this.#instance) {
      Config.init();
    }
    return this.#instance;
  }

  get stringify() {
    return this._config.stringify;
  }
}
