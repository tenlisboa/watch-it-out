import { after, describe, it } from "mocha";
import { expect } from "chai";
import ConfigBuilder from "../../../src/builders/configBuilder";
import defautlConfig from "../../../src/config/.default.config";

describe("ConfigBuilder class test", () => {
  after(() => {
    ConfigBuilder.config().reset();
  });

  it("should be possible to create a config object", () => {
    const config = ConfigBuilder.config();

    expect(config).to.be.an("object");
    expect(config).to.have.instanceOf(ConfigBuilder);
  });

  it("should load the default config", () => {
    const configContent = ConfigBuilder.config().build();

    expect(configContent).to.be.deep.equal(defautlConfig);
  });

  it("should be possible to set the events", () => {
    const configContent = ConfigBuilder.config().setEvents(["get"]).build();

    expect(configContent.events).to.be.deep.equal(["get"]);
  });

  it("should be possible to get the events", () => {
    const config = ConfigBuilder.config().setEvents(["get"]);

    expect(config.getEvents()).to.be.deep.equal(["get"]);
  });

  it("should be possible to set the context", () => {
    const configContent = ConfigBuilder.config()
      .setContext({ someKey: "someValue" })
      .build();

    expect(configContent.context).to.be.deep.equal({ someKey: "someValue" });
  });

  it("should be possible to get the context", () => {
    const config = ConfigBuilder.config().setContext({ someKey: "someValue" });

    expect(config.getContext()).to.be.deep.equal({ someKey: "someValue" });
  });

  it("should be possible to set the logger", () => {
    const customLogger = {
      log() {},
    };

    const configContent = ConfigBuilder.config()
      .setLogger(customLogger)
      .build();

    expect(configContent.logger).to.be.a("object");
    expect(configContent.logger).to.be.equal(customLogger);
  });

  it("should be possible to get the logger", () => {
    const customLogger = {
      log() {},
    };

    const config = ConfigBuilder.config().setLogger(customLogger);

    expect(config.getLogger()).to.be.deep.equal(customLogger);
  });

  it("should be possible to set the printable", () => {
    const configContent = ConfigBuilder.config()
      .setPrintable(["someKey"])
      .build();

    expect(configContent.printable).to.be.deep.equal(["someKey"]);
  });

  it("should be possible to get the printable", () => {
    const config = ConfigBuilder.config().setPrintable(["someKey"]);

    expect(config.getPrintable()).to.be.deep.equal(["someKey"]);
  });
});
