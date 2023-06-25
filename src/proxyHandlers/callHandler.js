import { HandlerBase } from "./base/handlerBase";

export class CallHandler extends HandlerBase {
  constructor({ transformers }) {
    super({ transformers });
  }

  handle({ target, property, args }) {
    const returningValue = target[property].apply(target, args);

    this._sendToTransformers({
      action: "calling method",
      property,
      args,
      returningValue,
      on: this._getTargetName(target),
    });

    return returningValue;
  }
}
