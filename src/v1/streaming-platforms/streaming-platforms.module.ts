import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import CreateStreamingPlatformUseCase from '@/core/streaming-platforms/use-cases/create-streaming-platform.use-case';
import { StreamingPlatformRepository } from '@/database/streaming-platform.repository';
import { UserRepository } from '@/database/user.repository';
import { SharedModule } from '../shared/shared.module';
import { UUIDGeneratorService } from '../shared/uuid-generator.service';
import { StreamingPlatformsController } from './streaming-platforms.controller';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [
    {
      inject: [
        UserRepository,
        UUIDGeneratorService,
        StreamingPlatformRepository,
      ],
      provide: CreateStreamingPlatformUseCase,
      useFactory: (
        userRepository: UserRepository,
        uuidGeneratorService: UUIDGeneratorService,
        streamingPlatformRepository: StreamingPlatformRepository,
      ) => {
        return new CreateStreamingPlatformUseCase(
          userRepository,
          uuidGeneratorService,
          streamingPlatformRepository,
        );
      },
    },
  ],
  controllers: [StreamingPlatformsController],
})
export class StreamingPlatformsModule {}
