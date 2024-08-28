export default class UserEmailException extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static mustNotBeEmpty() {
    return new this('Email must not be empty.');
  }
  public static mustBeAValidEmail() {
    return new this('Email must be valid.');
  }
}
