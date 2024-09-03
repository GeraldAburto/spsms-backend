import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import StreamingPlatform from '@/core/streaming-platforms/streaming-platform.entity';
import { IStreamingPlatformRepository } from '@/core/streaming-platforms/streaming-platform.repository';
import { StreamingPlatformBillingMapper } from '@/enums/streaming-platform/streaming-platform-billing.mapper';
import { StreamingPlatformCategoryMapper } from '@/enums/streaming-platform/streaming-platform-category.mapper';

import { StreamingPlatformModel } from './models/streaming-platform.model';

@Injectable()
export class StreamingPlatformRepository
  implements IStreamingPlatformRepository
{
  constructor(
    @InjectModel(StreamingPlatformModel)
    private readonly streamingPlatformModel: typeof StreamingPlatformModel,
  ) {}

  async save(streamingPlatform: StreamingPlatform): Promise<void> {
    await this.streamingPlatformModel.create({
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
