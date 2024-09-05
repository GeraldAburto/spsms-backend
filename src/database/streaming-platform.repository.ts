import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import StreamingPlatform from '@/core/streaming-platforms/streaming-platform.entity';
import { IStreamingPlatformRepository } from '@/core/streaming-platforms/streaming-platform.repository';
import StreamingPlatformCategory from '@/core/streaming-platforms/value-objects/streaming-platform-category.value-object';
import StreamingPlatformId from '@/core/streaming-platforms/value-objects/streaming-platform-id.value-object';
import StreamingPlatformName from '@/core/streaming-platforms/value-objects/streaming-platform-name.value-object';
import UserId from '@/core/users/value-objects/user-id.value-object';
import {
  DomainStreamingPlatformBillingMapper,
  StreamingPlatformBillingMapper,
} from '@/enums/streaming-platform/streaming-platform-billing.mapper';
import {
  DomainStreamingPlatformCategoryMapper,
  StreamingPlatformCategoryMapper,
} from '@/enums/streaming-platform/streaming-platform-category.mapper';

import StreamingPlatformBilling from '@/core/streaming-platforms/value-objects/streaming-platform-billing.value-object';
import StreamingPlatformCost from '@/core/streaming-platforms/value-objects/streaming-platform-cost.value-object';
import StreamingPlatformDate from '@/core/streaming-platforms/value-objects/streaming-platform-date.value-object';
import { StreamingPlatformModel } from './models/streaming-platform.model';

@Injectable()
export class StreamingPlatformRepository
  implements IStreamingPlatformRepository
{
  constructor(
    @InjectModel(StreamingPlatformModel)
    private readonly streamingPlatformModel: typeof StreamingPlatformModel,
  ) {}

  async findById(id: StreamingPlatformId): Promise<StreamingPlatform | null> {
    const streamingPlatform = await this.streamingPlatformModel.findOne({
      where: {
        id: id.value,
      },
    });

    if (!streamingPlatform) return null;

    return new StreamingPlatform(
      StreamingPlatformId.fromString(streamingPlatform.id),
      UserId.fromString(streamingPlatform.userId),
      StreamingPlatformName.fromString(streamingPlatform.name),
      StreamingPlatformCategory.fromEnum(
        DomainStreamingPlatformCategoryMapper[streamingPlatform.category],
      ),
      StreamingPlatformCost.fromNumber(streamingPlatform.cost / 100),
      StreamingPlatformBilling.fromEnum(
        DomainStreamingPlatformBillingMapper[streamingPlatform.billing],
      ),
      StreamingPlatformDate.fromDate(new Date(streamingPlatform.date)),
    );
  }

  async save(streamingPlatform: StreamingPlatform): Promise<void> {
    await this.streamingPlatformModel.upsert({
      id: streamingPlatform.id,
      userId: streamingPlatform.userId,
      billing: StreamingPlatformBillingMapper[streamingPlatform.billing],
      category: StreamingPlatformCategoryMapper[streamingPlatform.category],
      cost: streamingPlatform.cost,
      date: streamingPlatform.date,
      name: streamingPlatform.name,
    });
  }
}
