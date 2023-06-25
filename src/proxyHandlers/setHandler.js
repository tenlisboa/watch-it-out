import { HandlerBase } from "./base/handlerBase";

export class SetHandler extends HandlerBase {
  constructor({ transformers }) {
    super({ transformers });
  }

  handle({ target, property, value }) {
    this._sendToTransformers({
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
