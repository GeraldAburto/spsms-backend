export default class UserPasswordException extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static mustBeAtLeastEightCharactersLong() {
    return new this('Password must be at least 8 characters long.');
  }

  public static mustContainUppercaseLetter() {
    return new this('Password must contain at least one uppercase letter.');
  }

  public static mustContainDigit() {
    return new this('Password must contain at least one digit.');
  }

  public static mustContainSpecialCharacter() {
    return new this('Password must contain at least one special character.');
  }

  public static mustNotBeEmpty() {
    return new this('Password must not be empty.');
  }
}
