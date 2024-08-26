export default class UserFirstNamedException extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static mustBeLessThanFiftyCharactersLong() {
    return new this('First Name must be less than 50 characters long.');
  }

  public static mustNotBeEmpty() {
    return new this('First Name must not be empty.');
  }
}
