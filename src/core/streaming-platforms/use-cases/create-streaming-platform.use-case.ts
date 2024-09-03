import { IUUIDGenerator } from '../../shared/uuid-generator.service';
import UserNotFoundException from '../../users/exceptions/user-not-found.exception';
import { IUserRepository } from '../../users/user.repository';
import UserId from '../../users/value-objects/user-id.value-object';

import { StreamingPlatformBilling as StreamingPlatformBillingEnum } from '../enums/streaming-platform-billing.enum';
import { StreamingPlatformCategory as StreamingPlatformCategoryEnum } from '../enums/streaming-platform-category.enum';
import StreamingPlatform from '../streaming-platform.entity';
import { IStreamingPlatformRepository } from '../streaming-platform.repository';
import StreamingPlatformBilling from '../value-objects/streaming-platform-billing.value-object';
import StreamingPlatformCategory from '../value-objects/streaming-platform-category.value-object';
import StreamingPlatformCost from '../value-objects/streaming-platform-cost.value-object';
import StreamingPlatformDate from '../value-objects/streaming-platform-date.value-object';
import StreamingPlatformId from '../value-objects/streaming-platform-id.value-object';
import StreamingPlatformName from '../value-objects/streaming-platform-name.value-object';

export default class CreateStreamingPlatformUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly streamingPlatformRepository: IStreamingPlatformRepository,
  ) {}

  public async execute(
    userId: UserId,
    {
      name,
      category,
      cost,
      billing,
      date,
    }: {
      name: string;
      category: StreamingPlatformCategoryEnum;
      cost: number;
      billing: StreamingPlatformBillingEnum;
      date: Date;
    },
  ) {
    // Check if the user exits
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    // Generate a valid id.
    const streamingPlatformId = StreamingPlatformId.fromString(
      this.uuidGenerator.generate(),
    );

    // Convert cost to cents.
    const costInCents = cost * 100;

    // Create a new Streaming Platform instance.
    const streamingPlatform = new StreamingPlatform(
      streamingPlatformId,
      userId,
      StreamingPlatformName.fromString(name),
      StreamingPlatformCategory.fromString(
        StreamingPlatformCategoryEnum[category],
      ),
      StreamingPlatformCost.fromNumber(costInCents),
      StreamingPlatformBilling.fromString(
        StreamingPlatformBillingEnum[billing],
      ),
      StreamingPlatformDate.fromDate(date),
    );

    // Persist the streaming platform.
    this.streamingPlatformRepository.save(streamingPlatform);
  }
}
