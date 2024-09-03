export default class StreamingPlatformCostException extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static mustBeGreaterThanZero() {
    return new this('Cost must be greater than 0.');
  }
}
