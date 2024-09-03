export default class StreamingPlatformDateException extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static mustBeIncomingDate() {
    return new this('Date must be an incoming date.');
  }
}
