export class HandlerBase {
  constructor({ transformers }) {
    this.transformers = transformers;
  }

  _sendToTransformers(data) {
    this.transformers.forEach(transformer => {
      transformer(data);
    });
  }

  _getTargetName(target) {
    const anonymousNames = ["Object", "Function", "Array"];

    if (anonymousNames.includes(target.constructor.name)) return "anonymous";

    return target.constructor.name;
  }
}
