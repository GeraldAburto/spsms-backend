import InvalidArgumentException from '@/core/shared/exceptions/invalid-argument.exception';
import { StreamingPlatformCategory as StreamingPlatformCategoryEnum } from '../enums/streaming-platform-category.enum';
import StreamingPlatformCategoryException from '../exceptions/streaming-platform-category.exception';

export default class StreamingPlatformCategory {
  readonly value: StreamingPlatformCategoryEnum;

  private constructor(value: StreamingPlatformCategoryEnum) {
    this.mustBeDefined(value);
    this.mustBeValidEnumValue(value);
    this.value = value;
  }

  private static categoryMap: Record<string, StreamingPlatformCategoryEnum> = {
    Business: StreamingPlatformCategoryEnum.Business,
    Entertainment: StreamingPlatformCategoryEnum.Entertainment,
    Personal: StreamingPlatformCategoryEnum.Personal,
    Education: StreamingPlatformCategoryEnum.Education,
    HealthAndFitness: StreamingPlatformCategoryEnum.HealthAndFitness,
    NoCategory: StreamingPlatformCategoryEnum.NoCategory,
  };

  private mustBeDefined(
    value: StreamingPlatformCategoryEnum | undefined | null,
  ) {
    if (value === null || value === undefined) {
      throw InvalidArgumentException.mustBeDefined('Category');
    }
  }

  private mustBeValidEnumValue(value: StreamingPlatformCategoryEnum) {
    if (!Object.values(StreamingPlatformCategoryEnum).includes(value)) {
      throw StreamingPlatformCategoryException.mustBeValid();
    }
  }

  static fromString(category: string) {
    if (!category) {
      throw StreamingPlatformCategoryException.mustNotBeEmpty();
    }

    const newCategory = this.categoryMap[category];

    if (!newCategory) {
      throw StreamingPlatformCategoryException.mustBeValid();
    }

    return new this(newCategory);
  }

  static fromEnum(category: StreamingPlatformCategoryEnum) {
    return new this(category);
  }
}
