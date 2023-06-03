class MissingConstructorParameter extends Error {
  constructor(parameterName: string) {
    super(`Missing constructor parameter: ${parameterName}`);
    this.name = "MissingConstructorParameter";
  }
}

export default MissingConstructorParameter;
