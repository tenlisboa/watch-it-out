import { HandlerBase } from "./base/handlerBase";

export class GetHandler extends HandlerBase {
  constructor({ subscriber }) {
    super({ subscriber });
  }

  handle({ target, property }) {
    this._subscriber.notify({
      action: "acessing property",
      property,
      value: target[property],
      on: this._getTargetName(target),
    });

    return target[property];
  }
}
