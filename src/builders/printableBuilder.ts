import MissingConstructorParameter from "../exceptions/missingConstructorParameter";
import ConfigBuilder from "./configBuilder";

class PrintableBuilder {
  private context: any;
  private data: object = {};
  private printable = {};

  private constructor(private readonly config: ConfigBuilder) {
    if (!config) throw new MissingConstructorParameter("config");

    this.config = config;

    this.context = config.getContext();
  }

  static workflow(config: ConfigBuilder) {
    const instance = new PrintableBuilder(config);

    instance.context = config.getContext();
    instance.setPrintableContext(config.getPrintable());

    return instance;
  }

  setData(data: object) {
    if (typeof data !== "object")
      throw new Error(`Invalid data type. Expected object, got ${typeof data}`);
    this.data = data;

    return this;
  }

  private setPrintableContext(contextKeys: string[]) {
    this.validateContextkeys(contextKeys);

    this.printable = this.getPrintableFromContext(contextKeys);

    return this;
  }

  private validateContextkeys(contextKeys: string[]) {
    const validate = (key: string, ctx: any) => {
      if (!ctx.hasOwnProperty(key)) {
        throw new Error("contextKeys must be one of the keys in the context");
      }
    };

    let context = this.context;

    for (const key of contextKeys) {
      const keys = key.split(".");

      let currentContext = context;
      for (const lookupKey of keys) {
        validate(lookupKey, currentContext);
        currentContext = currentContext[lookupKey];
      }
    }

    return true;
  }

  private getPrintableFromContext(contextKeys: string[]) {
    const context = this.context;
    const printable = contextKeys.reduce((acc: object, key) => {
      return { ...acc, [key]: this.extractContextKey(key, context) };
    }, {} as typeof context);

    return printable;
  }

  private extractContextKey(key: string, context: any): any {
    if (!key.includes(".")) return context[key];

    const keys = key.split(".");
    const nestedKey = keys.pop()!;
    const nestedContext = keys.reduce((acc, key) => {
      return acc[key];
    }, context);

    return nestedContext[nestedKey];
  }

  build() {
    return {
      ...this.data,
      ...this.printable,
    };
  }
}

export default PrintableBuilder;
