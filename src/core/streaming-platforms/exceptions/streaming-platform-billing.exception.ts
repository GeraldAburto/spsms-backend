import { StreamingPlatformBilling } from '../enums/streaming-platform-billing.enum';

export default class StreamingPlatformBillingException extends Error {
  private constructor(message: string) {
    super(message);
  }

  public static mustNotBeEmpty() {
    return new this('Billing must not be empty.');
  }

  public static mustBeValid() {
    return new this(
      `Billing must be one of: ${Object.keys(StreamingPlatformBilling).join(', ')}`,
    );
  }
}
