import ConfigBuilder from "../builders/configBuilder";
import LogEmitter from "../emitters/logEmitter";
import MissingConstructorParameter from "../exceptions/missingConstructorParameter";

class SetHandler {
  private constructor(
    private config: ConfigBuilder,
    private logEmitter: LogEmitter
  ) {}

  static setup(config: ConfigBuilder, logEmitter: LogEmitter) {
    if (!config) throw new MissingConstructorParameter("config");
    if (!logEmitter) throw new MissingConstructorParameter("logEmitter");

    const instance = new SetHandler(config, logEmitter);

    return instance;
  }

  get handler() {
    return this.handle.bind(this);
  }

  private handle(target: any, property: string, newValue: any) {
    this.logEmitter.emit("set", { target, property, newValue });

    target[property] = newValue;

    return true;
  }
}

export default SetHandler;
