export default class InvalidArgumentException extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static mustBeDefined(name: string) {
    return new this(`${name} must be defined.`);
  }
}
