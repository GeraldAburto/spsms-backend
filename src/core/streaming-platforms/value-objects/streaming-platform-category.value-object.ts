import InvalidArgumentException from '@/core/shared/exceptions/invalid-argument.exception';

import { StreamingPlatformCategory as StreamingPlatformCategoryEnum } from '../enums/streaming-platform-category.enum';
import StreamingPlatformCategoryException from '../exceptions/streaming-platform-category.exception';

export default class StreamingPlatformCategory {
  readonly value: StreamingPlatformCategoryEnum;

  private constructor(value: StreamingPlatformCategoryEnum) {
    this.mustBeDefined(value);
    this.value = value;
  }

  private mustBeDefined(
    value: StreamingPlatformCategoryEnum | undefined | null,
  ) {
    if (value === null || value === undefined) {
      throw InvalidArgumentException.mustBeDefined('Category');
    }
  }

  static fromString(category: string) {
    if (category === '') {
      throw StreamingPlatformCategoryException.mustNotBeEmpty();
    }

    const newCategory =
      StreamingPlatformCategoryEnum[
        category as keyof typeof StreamingPlatformCategoryEnum
      ];

    if (newCategory === undefined) {
      throw StreamingPlatformCategoryException.mustBeValid();
    }

    return new this(newCategory);
  }
}
