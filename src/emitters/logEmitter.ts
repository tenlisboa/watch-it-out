import EventEmitter from "events";
import MissingConstructorParameter from "../exceptions/missingConstructorParameter";
import PrintableBuilder from "../builders/printableBuilder";
import ConfigBuilder from "../builders/configBuilder";

class LogEmitter {
  loggerFn: Function;
  emitter: EventEmitter;
  config: ConfigBuilder;
  printableBuilder: PrintableBuilder;

  constructor(config: ConfigBuilder) {
    if (!config) throw new MissingConstructorParameter("config");

    this.emitter = new EventEmitter();
    this.config = config;
    this.printableBuilder = PrintableBuilder.workflow(config);

    this.loggerFn = this.config.getLogger().log;

    this.setupLoggingListeners();
  }

  private on(event: string, callback: (...args: any[]) => void) {
    this.emitter.on(event, callback);
  }

  emit(event: string, ...args: any[]) {
    this.emitter.emit(event, ...args);
  }

  private setupLoggingListeners() {
    this.on("get", ({ target, property, receiver }) => {
      const data = this.printableBuilder.setData({
        action: "accessing property",
        property,
        on: target,
      });

      this.loggerFn(data.build());
    });
    this.on("set", ({ target, property, newValue }) => {
      const data = this.printableBuilder.setData({
        action: "changing property value",
        property,
        on: target,
        from: target[property],
        to: newValue,
      });

      this.loggerFn(data.build());
    });
    this.on("call", ({ target, property, argumentsList }) => {
      const data = this.printableBuilder.setData({
        action: "calling a method",
        method: property,
        on: target,
        with: argumentsList,
      });

      this.loggerFn(data.build());
    });
    this.on("apply", ({ target, thisArg, argumentsList }) => {
      const data = this.printableBuilder.setData({
        action: "calling a function",
        name: target.name,
        with: argumentsList,
      });

      this.loggerFn(data.build());
    });
  }
}

export default LogEmitter;
