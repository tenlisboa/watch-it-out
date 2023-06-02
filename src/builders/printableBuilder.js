const MissingConstructorParameter = require("../exceptions/missingConstructorParameter");

class PrintableBuilder {
  #context;
  #data;
  #config;
  #printable = {};

  constructor(config) {
    if (!config) throw new MissingConstructorParameter('config');

    this.#config = config;
  }

  static workflow(config) {
    const instance = new PrintableBuilder(config);

    instance.#context = config.getContext();
    instance.#setPrintableContext(config.getPrintable());

    return instance;
  }

  setData(data) {
    if (typeof data !== 'object') throw new Error(`Invalid data type. Expected object, got ${typeof data}`);
    this.#data = data;

    return this;
  }

  #setPrintableContext(contextKeys) {
    if (!Array.isArray(contextKeys)) throw new Error('contextKeys must be an array');
    this.#validateContextkeys(contextKeys);

    this.#printable = this.#getPrintableFromContext(contextKeys);

    return this;
  }

  #validateContextkeys(contextKeys) {
    const validate = (key, ctx) => {
      if (!ctx.hasOwnProperty(key)) {
        throw new Error('contextKeys must be one of the keys in the context');
      }
    };
  
    let context = this.#context;
  
    for (const key of contextKeys) {
      const keys = key.split('.');
  
      let currentContext = context;
      for (const lookupKey of keys) {
        validate(lookupKey, currentContext);
        currentContext = currentContext[lookupKey];
      }
    }
  
    return true;
  }

  #getPrintableFromContext(contextKeys) {
    const context = this.#context;
    const printable = contextKeys.reduce((acc, key) => {
      acc[key] = this.#extractContextKey(key, context);
      return acc;
    }, {});

    return printable;
  }

  #extractContextKey(key, context) {
    if (!key.includes('.')) return context[key];

    const keys = key.split('.');
    const nestedKey = keys.pop();
    const nestedContext = keys.reduce((acc, key) => {
      return acc[key];
    }
    , context);

    return nestedContext[nestedKey];
  }

  build() {
    return {
      ...this.#data,
      ...this.#printable
    };
  }
}

module.exports = PrintableBuilder;
