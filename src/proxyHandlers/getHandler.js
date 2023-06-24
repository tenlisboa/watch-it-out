export class GetHandler {
  constructor({ transformers }) {
    this.transformers = transformers;
  }

  handle({ target, property }) {
    this.#sendToTransformers({
      action: "acessing property",
      property,
      value: target[property],
      on: this.#getTargetName(target),
    });
  }

  #sendToTransformers(data) {
    this.transformers.forEach(transformer => {
      transformer(data);
    });
  }

  #getTargetName(target) {
    const anonymousNames = ["Object", "Function", "Array"];

    if (anonymousNames.includes(target.constructor.name)) return "anonymous";

    return target.constructor.name;
  }
}
