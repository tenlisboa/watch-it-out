import { HandlerBase } from "./base/handlerBase.js";

export class CallHandler extends HandlerBase {
  constructor({ subscriber }) {
    super({ subscriber });
  }

  handle({ target, property, thisArg, args }) {
    const returningValue = this.#getReturningValueBasedOnTargetType({
      target,
      property,
      thisArg,
      args,
    });

    this._subscriber.notify({
      action: "calling method",
      property,
      args,
      returningValue,
      on: this._getTargetName(target),
    });

    return returningValue;
  }

  #getReturningValueBasedOnTargetType({ target, property, thisArg, args }) {
    if (property && typeof target[property] === "function") {
      return target[property].apply(thisArg, args);
    }

    return target.apply(thisArg, args);
  }
}
