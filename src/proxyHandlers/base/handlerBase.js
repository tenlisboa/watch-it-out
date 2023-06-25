export class HandlerBase {
  constructor({ subscriber }) {
    this._subscriber = subscriber;
  }

  _getTargetName(target) {
    const anonymousNames = ["Object", "Function", "Array"];

    if (target.name) return target.name;

    if (anonymousNames.includes(target.constructor.name)) return "anonymous";

    return target.constructor.name;
  }
}
