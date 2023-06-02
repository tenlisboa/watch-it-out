class MissingConstructorParameter extends Error {
  constructor(parameterName) {
    super(`Missing constructor parameter: ${parameterName}`);
    this.name = 'MissingConstructorParameter';
  }
}

module.exports = MissingConstructorParameter;
