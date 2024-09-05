import UserNotFoundException from '../../users/exceptions/user-not-found.exception';
import { IUserRepository } from '../../users/user.repository';
import UserId from '../../users/value-objects/user-id.value-object';

import { StreamingPlatformBilling as StreamingPlatformBillingEnum } from '../enums/streaming-platform-billing.enum';
import { StreamingPlatformCategory as StreamingPlatformCategoryEnum } from '../enums/streaming-platform-category.enum';
import StreamingPlatformDateException from '../exceptions/streaming-platform-date.exception';
import { IStreamingPlatformRepository } from '../streaming-platform.repository';
import StreamingPlatformBilling from '../value-objects/streaming-platform-billing.value-object';
import StreamingPlatformCategory from '../value-objects/streaming-platform-category.value-object';
import StreamingPlatformCost from '../value-objects/streaming-platform-cost.value-object';
import StreamingPlatformDate from '../value-objects/streaming-platform-date.value-object';
import StreamingPlatformId from '../value-objects/streaming-platform-id.value-object';
import StreamingPlatformName from '../value-objects/streaming-platform-name.value-object';

export default class UpdateStreamingPlatformUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly streamingPlatformRepository: IStreamingPlatformRepository,
  ) {}

  public async execute(
    userId: UserId,
    {
      id,
      name,
      category,
      cost,
      billing,
      date,
    }: {
      id: StreamingPlatformId;
      name?: string;
      category?: StreamingPlatformCategoryEnum;
      cost?: number;
      billing?: StreamingPlatformBillingEnum;
      date?: Date;
    },
  ) {
    // Check if the user exits
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    // Find the streaming platform by id.
    const streamingPlatform =
      await this.streamingPlatformRepository.findById(id);

    if (!streamingPlatform) {
      throw StreamingPlatformDateException.mustNotBeEarlierThanCurrentDate();
    }

    if (name) {
      const newName = StreamingPlatformName.fromString(name);
      streamingPlatform.updateName(newName);
    }

    if (category) {
      const newCategory = StreamingPlatformCategory.fromString(
        StreamingPlatformCategoryEnum[category],
      );
      streamingPlatform.updateCategory(newCategory);
    }

    if (cost) {
      const costInCents = cost * 100;
      const newCost = StreamingPlatformCost.fromNumber(costInCents);
      streamingPlatform.updateCost(newCost);
    }

    if (billing) {
      const newBilling = StreamingPlatformBilling.fromString(
        StreamingPlatformBillingEnum[billing],
      );
      streamingPlatform.updateBilling(newBilling);
    }

    if (date) {
      const newDate = StreamingPlatformDate.fromDate(date);
      streamingPlatform.updateDate(newDate);
    }

    // Persist the streaming changes.
    this.streamingPlatformRepository.save(streamingPlatform);
  }
}
