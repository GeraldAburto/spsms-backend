import InvalidArgumentException from '@/core/shared/exceptions/invalid-argument.exception';

import { StreamingPlatformBilling as StreamingPlatformBillingEnum } from '../enums/streaming-platform-billing.enum';
import StreamingPlatformBillingException from '../exceptions/streaming-platform-billing.exception';

export default class StreamingPlatformBilling {
  readonly value: StreamingPlatformBillingEnum;

  private constructor(value: StreamingPlatformBillingEnum) {
    this.mustBeDefined(value);
    this.value = value;
  }

  private mustBeDefined(
    value: StreamingPlatformBillingEnum | undefined | null,
  ) {
    if (value === null || value === undefined) {
      throw InvalidArgumentException.mustBeDefined('Category');
    }
  }

  static fromString(category: string) {
    if (category === '') {
      throw StreamingPlatformBillingException.mustNotBeEmpty();
    }

    const newCategory =
      StreamingPlatformBillingEnum[
        category as keyof typeof StreamingPlatformBillingEnum
      ];

    if (newCategory === undefined) {
      throw StreamingPlatformBillingException.mustBeValid();
    }

    return new this(newCategory);
  }
}
