import defaultConfig from "../config/.default.config";

class ConfigBuilder {
  private content: typeof defaultConfig;

  private constructor(configObject?: typeof defaultConfig) {
    this.content = {
      ...defaultConfig,
      ...configObject,
    };
  }

  static config(configObject?: typeof defaultConfig) {
    const config = new ConfigBuilder(configObject);

    return config;
  }

  getEvents() {
    return this.content.events;
  }

  setEvents(events: string[]) {
    this.content.events = events;
    return this;
  }

  getContext() {
    return this.content.context;
  }

  setContext(context: object) {
    this.content.context = context;
    return this;
  }

  getLogger() {
    return this.content.logger;
  }

  setLogger(logger: object) {
    this.content.logger = logger;
    return this;
  }

  getPrintable() {
    return this.content.printable;
  }

  setPrintable(printable: string[]) {
    this.content.printable = printable;
    return this;
  }

  reset() {
    this.content = { ...defaultConfig };
    return this;
  }

  build() {
    return this.content;
  }
}

export default ConfigBuilder;
