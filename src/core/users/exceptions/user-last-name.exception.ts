export default class UserLastNamedException extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static mustBeLessThanFiftyCharactersLong() {
    return new this('Last Name must be less than 50 characters long.');
  }

  public static mustNotBeEmpty() {
    return new this('Last Name must not be empty.');
  }
}
