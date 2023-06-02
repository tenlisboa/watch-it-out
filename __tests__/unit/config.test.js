const { describe } = require('mocha');
const { expect } = require('chai');
const Config = require('../../src/watchItOut/config');
const defautlConfig = require('../../src/watchItOut/config/.default.config');

describe("Config class test", () => {
    it('should be possible to create a config object', () => {
        const config = Config.config();

        expect(config).to.be.an('object');
        expect(config).to.have.instanceOf(Config);
    });

    it('should load the default config', () => {
        const configContent = Config.config().build();

        expect(configContent).to.be.deep.equal(defautlConfig);
    });

    it('should be possible to set the events', () => {
        const configContent = Config.config()
            .setEvents(['get'])
            .build();

        expect(configContent.events).to.be.deep.equal(['get']);
    });

    it('should be possible to get the events', () => {
        const config = Config.config()
            .setEvents(['get']);

        expect(config.getEvents()).to.be.deep.equal(['get']);
    });

    it('should be possible to set the context', () => {
        const configContent = Config.config()
            .setContext({someKey: 'someValue'})
            .build();

        expect(configContent.context).to.be.deep.equal({someKey: 'someValue'});
    });

    it('should be possible to get the context', () => {
        const config = Config.config()
            .setContext({someKey: 'someValue'});

        expect(config.getContext()).to.be.deep.equal({someKey: 'someValue'});
    });

    it('should be possible to set the logger', () => {
        const customLogger = {
            log() {}
        }

        const configContent = Config.config()
            .setLogger(customLogger)
            .build();

        expect(configContent.logger).to.be.a('object');
        expect(configContent.logger).to.be.equal(customLogger);
    });

    it('should be possible to get the logger', () => {
        const customLogger = {
            log() {}
        }

        const config = Config.config()
            .setLogger(customLogger);

        expect(config.getLogger()).to.be.deep.equal(customLogger);
    });

    it('should be possible to set the printable', () => {
        const configContent = Config.config()
            .setPrintable(['someKey'])
            .build();

        expect(configContent.printable).to.be.deep.equal(['someKey']);
    });

    it('should be possible to get the printable', () => {
        const config = Config.config()
            .setPrintable(['someKey']);

        expect(config.getPrintable()).to.be.deep.equal(['someKey']);
    });
})
