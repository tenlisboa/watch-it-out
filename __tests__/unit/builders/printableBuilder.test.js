const { describe } = require('mocha');
const { expect } = require('chai');
const PrintableBuilder = require('../../../src/builders/printableBuilder');
const ConfigBuilder = require('../../../src/builders/configBuilder');

describe("PrintableBuilder class test", () => {
  const config = ConfigBuilder.config();

  it ('should throw an error if the config is not provided to PrintableBuilder constructor', () => {
    expect(() => new PrintableBuilder())
      .to.throw('Missing constructor parameter: config');
  });

  it ('should be able to pass data to the setData method', () => {
    const data = {
      a: 1
    };
    const printableBuilder = PrintableBuilder.workflow(config);

    printableBuilder.setData(data);

    const result = printableBuilder.build();

    expect(result).to.be.deep.equal({a:1});
  });

  it ('should throw an error if the data is not an object', () => {
    const data = 'some string';

    const printableBuilder = PrintableBuilder.workflow(config);

    expect(() => printableBuilder.setData(data))
      .to.throw('Invalid data type. Expected object, got string');
  });

  it ('should throw an error if the printable context is not in the context', () => {
    const data = {
      a: 1
    };
    config
      .setContext({b:2})
      .setPrintable(['c']);

    expect(() => PrintableBuilder.workflow(config))
      .to.throw('contextKeys must be one of the keys in the context');
  });

  it ('should throw an error if the printable context is not in the context even if it is nested', () => {
    const data = {
      a: 1
    };

    config
      .setContext({b:2, d: { c: 3 }})
      .setPrintable(['d.a']);

    expect(() => PrintableBuilder.workflow(config))
      .to.throw('contextKeys must be one of the keys in the context');
  });

  it ('should print the data and the context if the context key has been set', () => {
    const data = {
      a: 1
    };
    config.setContext({b:2}).setPrintable(['b']);
    const printableBuilder = PrintableBuilder.workflow(config);

    printableBuilder
      .setData(data);

    const result = printableBuilder.build();

    expect(result).to.be.deep.equal({a:1, b:2});
  });

  it ('should be possible to reference a nested key in the context passing the patters "key1.key2"', () => {
    const data = {
      a: 1
    };
    config.setContext({b:{ c:2 }}).setPrintable(['b.c']);
    const printableBuilder = PrintableBuilder.workflow(config);

    printableBuilder
      .setData(data);

    const result = printableBuilder.build();

    expect(result).to.be.deep.equal({a:1, 'b.c': 2});
  });

  it ('should be possible to reference a event nested key in the context passing the patters "key1.key2..."', () => {
    const data = {
      a: 1
    };
    config
      .setContext({b:{ c:2, d: { e: 3 } }})
      .setPrintable(['b.d.e']);
    const printableBuilder = PrintableBuilder.workflow(config);

    printableBuilder
      .setData(data);

    const result = printableBuilder.build();

    expect(result).to.be.deep.equal({a:1, 'b.d.e': 3});
  });
})
