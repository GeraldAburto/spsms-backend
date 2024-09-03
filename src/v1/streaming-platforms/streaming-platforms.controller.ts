import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import InvalidArgumentException from '@/core/shared/exceptions/invalid-argument.exception';
import StreamingPlatformBillingException from '@/core/streaming-platforms/exceptions/streaming-platform-billing.exception';
import StreamingPlatformCategoryException from '@/core/streaming-platforms/exceptions/streaming-platform-category.exception';
import StreamingPlatformCostException from '@/core/streaming-platforms/exceptions/streaming-platform-cost.exception';
import StreamingPlatformDateException from '@/core/streaming-platforms/exceptions/streaming-platform-date.exception';
import StreamingPlatformIdException from '@/core/streaming-platforms/exceptions/streaming-platform-id.exception';
import StreamingPlatformNameException from '@/core/streaming-platforms/exceptions/streaming-platform-name.exception';
import CreateStreamingPlatformUseCase from '@/core/streaming-platforms/use-cases/create-streaming-platform.use-case';
import UserIdException from '@/core/users/exceptions/user-id.exception';
import UserId from '@/core/users/value-objects/user-id.value-object';
import { User } from '@/decorators/user.decorator';
import { DomainStreamingPlatformBillingMapper } from '@/enums/streaming-platform/streaming-platform-billing.mapper';
import { DomainStreamingPlatformCategoryMapper } from '@/enums/streaming-platform/streaming-platform-category.mapper';

import { AuthGuard } from '../auth/auth.guard';
import { CreateStreamingPlatformDto } from './dto/create-streaming-platform.dto';

@ApiTags('Streaming Platforms')
@Controller({
  path: 'streaming-platforms',
  version: '1',
})
export class StreamingPlatformsController {
  constructor(
    private readonly createStreamingPlatformUseCase: CreateStreamingPlatformUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new streaming platform' })
  @ApiCreatedResponse({
    description: 'Streaming platform created successfully',
  })
  @ApiBadRequestResponse({
    description: 'There is an error in the request payload',
  })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Post()
  async create(
    @User('id') userId: string,
    @Body() createStreamingPlatformDto: CreateStreamingPlatformDto,
  ) {
    try {
      await this.createStreamingPlatformUseCase.execute(
        UserId.fromString(userId),
        {
          name: createStreamingPlatformDto.name,
          billing:
            DomainStreamingPlatformBillingMapper[
              createStreamingPlatformDto.billing
            ],
          category:
            DomainStreamingPlatformCategoryMapper[
              createStreamingPlatformDto.category
            ],
          cost: createStreamingPlatformDto.cost,
          date: createStreamingPlatformDto.date,
        },
      );
    } catch (error) {
      if (
        error instanceof InvalidArgumentException ||
        error instanceof StreamingPlatformBillingException ||
        error instanceof StreamingPlatformCategoryException ||
        error instanceof StreamingPlatformCostException ||
        error instanceof StreamingPlatformDateException ||
        error instanceof StreamingPlatformIdException ||
        error instanceof StreamingPlatformNameException ||
        error instanceof UserIdException
      ) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
