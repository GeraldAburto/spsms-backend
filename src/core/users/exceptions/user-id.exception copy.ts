export default class UserIdException extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static mustNotBeEmpty() {
    return new this('Id must not be empty.');
  }

  public static mustBeValidUUID() {
    return new this('Id must not be a valid UUID.');
  }
}
