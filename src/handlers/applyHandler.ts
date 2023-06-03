import ConfigBuilder from "../builders/configBuilder";
import LogEmitter from "../emitters/logEmitter";
import MissingConstructorParameter from "../exceptions/missingConstructorParameter";

class ApplyHandler {
  private constructor(
    private config: ConfigBuilder,
    private logEmitter: LogEmitter
  ) {}

  static setup(config: ConfigBuilder, logEmitter: LogEmitter) {
    if (!config) throw new MissingConstructorParameter("config");
    if (!logEmitter) throw new MissingConstructorParameter("logEmitter");

    const instance = new ApplyHandler(config, logEmitter);

    return instance;
  }

  get handler() {
    return this.handle.bind(this);
  }

  private handle(target: any, thisArg: any, argumentsList: any[]) {
    this.logEmitter.emit("apply", { target, thisArg, argumentsList });
    return target.apply(thisArg, argumentsList);
  }
}

export default ApplyHandler;
