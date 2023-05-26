const BaseWatcher = require("./baseWatcher");

class WatchItOut extends BaseWatcher {
  constructor(loggerFn) {
    super(loggerFn);
  }

  static init(target, { loggerFn = console.log } = {}) {
    const instance = new WatchItOut(loggerFn);

    return new Proxy(target, {
      get: (target, property, receiver) => {

        if (typeof target[property] === 'function') {
          return (...args) => {
            instance.logCall({
              name: property,
              args,
            });

            return target[property].apply(receiver, args);
          };
        }

        instance.logGet({
          name: property,
        });

        return target[property];
      },

      set: (target, property, newValue) => {

        instance.logSet({
          name: property,
          from: target[property],
          to: newValue,
        });

        target[property] = newValue;

        return true;
      },

      apply: (target, thisArg, argumentsList) => {
        instance.logCall({
          name: target.name,
          args: argumentsList,
        });

        return target.apply(thisArg, argumentsList);
      }
    });
  }
}

module.exports = WatchItOut;
