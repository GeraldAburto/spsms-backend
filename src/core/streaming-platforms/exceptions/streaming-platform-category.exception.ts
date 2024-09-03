import { StreamingPlatformCategory } from '../enums/streaming-platform-category.enum';

export default class StreamingPlatformCategoryException extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static mustNotBeEmpty() {
    return new this('Category must not be empty.');
  }

  public static mustBeValid() {
    return new this(
      `Category must be one of: ${Object.keys(StreamingPlatformCategory).join(', ')}`,
    );
  }
}
