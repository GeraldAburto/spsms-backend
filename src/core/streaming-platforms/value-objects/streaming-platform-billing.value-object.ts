import InvalidArgumentException from '@/core/shared/exceptions/invalid-argument.exception';
import { StreamingPlatformBilling as StreamingPlatformBillingEnum } from '../enums/streaming-platform-billing.enum';
import StreamingPlatformBillingException from '../exceptions/streaming-platform-billing.exception';

export default class StreamingPlatformBilling {
  readonly value: StreamingPlatformBillingEnum;

  private constructor(value: StreamingPlatformBillingEnum) {
    this.mustBeDefined(value);
    this.mustBeValidEnumValue(value);
    this.value = value;
  }

  private static billingMap: Record<string, StreamingPlatformBillingEnum> = {
    Weekly: StreamingPlatformBillingEnum.Weekly,
    Monthly: StreamingPlatformBillingEnum.Monthly,
    Quarterly: StreamingPlatformBillingEnum.Quarterly,
    Yearly: StreamingPlatformBillingEnum.Yearly,
  };

  private mustBeDefined(
    value: StreamingPlatformBillingEnum | undefined | null,
  ) {
    if (value === null || value === undefined) {
      throw InvalidArgumentException.mustBeDefined('Category');
    }
  }

  private mustBeValidEnumValue(value: StreamingPlatformBillingEnum) {
    if (!Object.values(StreamingPlatformBillingEnum).includes(value)) {
      throw StreamingPlatformBillingException.mustBeValid();
    }
  }

  static fromString(billingType: string) {
    if (!billingType) {
      throw StreamingPlatformBillingException.mustNotBeEmpty();
    }

    const newBillingType = this.billingMap[billingType];

    if (!newBillingType) {
      throw StreamingPlatformBillingException.mustBeValid();
    }

    return new this(newBillingType);
  }

  static fromEnum(billingType: StreamingPlatformBillingEnum) {
    return new this(billingType);
  }
}
