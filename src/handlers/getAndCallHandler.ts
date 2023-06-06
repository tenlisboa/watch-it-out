import ConfigBuilder from "../builders/configBuilder";
import LogEmitter from "../emitters/logEmitter";
import MissingConstructorParameter from "../exceptions/missingConstructorParameter";

class GetAndCallHandler {
  private constructor(
    private config: ConfigBuilder,
    private logEmitter: LogEmitter
  ) {}

  static setup(config: ConfigBuilder, logEmitter: LogEmitter) {
    if (!config) throw new MissingConstructorParameter("config");
    if (!logEmitter) throw new MissingConstructorParameter("logEmitter");

    const instance = new GetAndCallHandler(config, logEmitter);

    return instance;
  }
  get handler() {
    return this.handle.bind(this);
  }

  private handle(target: any, property: string, receiver: any) {
    if (typeof target[property] !== "function") {
      this.logEmitter.emit("get", { target, property, receiver });
      return target[property];
    }

    if (!this.config.getEvents().includes("call")) return target[property];

    return this.handleMethodCall(target, property, receiver);
  }

  private handleMethodCall(target: any, property: string, receiver: any) {
    return (...args: any[]) => {
      const returningValue = target[property].apply(receiver, args);

      this.logEmitter.emit("call", {
        target,
        property,
        argumentsList: args,
        returningValue,
      });

      return returningValue;
    };
  }
}

export default GetAndCallHandler;
