import { HandlerBase } from "./base/handlerBase.js";

export class SetHandler extends HandlerBase {
  constructor({ subscriber }) {
    super({ subscriber });
  }

  handle({ target, property, value }) {
    this._subscriber.notify({
      action: "change property",
      property,
      from: target[property],
      to: value,
      on: this._getTargetName(target),
    });

    target[property] = value;

    return true;
  }
}
