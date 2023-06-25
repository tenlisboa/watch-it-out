import { HandlerBase } from "./base/handlerBase";

export class GetHandler extends HandlerBase {
  constructor({ transformers }) {
    super({ transformers });
  }

  handle({ target, property }) {
    this._sendToTransformers({
      action: "acessing property",
      property,
      value: target[property],
      on: this._getTargetName(target),
    });
  }
}
