import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
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
import UpdateStreamingPlatformUseCase from '@/core/streaming-platforms/use-cases/update-streaming-platform.use-case';
import UserIdException from '@/core/users/exceptions/user-id.exception';
import UserNotFoundException from '@/core/users/exceptions/user-not-found.exception';
import UserId from '@/core/users/value-objects/user-id.value-object';
import { User } from '@/decorators/user.decorator';
import { DomainStreamingPlatformBillingMapper } from '@/enums/streaming-platform/streaming-platform-billing.mapper';
import { DomainStreamingPlatformCategoryMapper } from '@/enums/streaming-platform/streaming-platform-category.mapper';

import StreamingPlatformId from '@/core/streaming-platforms/value-objects/streaming-platform-id.value-object';
import { AuthGuard } from '../auth/auth.guard';
import { CreateStreamingPlatformDto } from './dto/create-streaming-platform.dto';
import { UpdateStreamingPlatformDto } from './dto/update-streaming-platform.dto';

@ApiTags('Streaming Platforms')
@Controller({
  path: 'streaming-platforms',
  version: '1',
})
export class StreamingPlatformsController {
  constructor(
    private readonly createStreamingPlatformUseCase: CreateStreamingPlatformUseCase,
    private readonly updateStreamingPlatformUseCase: UpdateStreamingPlatformUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new streaming platform' })
  @ApiCreatedResponse({
    description: 'Streaming platform created successfully',
  })
  @ApiBadRequestResponse({
    description: 'There is an error in the request payload',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
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

      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update an existing streaming platform' })
  @ApiResponse({
    description: 'Streaming platform updated successfully',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiBadRequestResponse({
    description: 'There is an error in the request payload',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() updateStreamingPlatformDto: UpdateStreamingPlatformDto,
  ) {
    try {
      await this.updateStreamingPlatformUseCase.execute(
        UserId.fromString(userId),
        {
          id: StreamingPlatformId.fromString(id),
          name: updateStreamingPlatformDto.name,
          billing:
            DomainStreamingPlatformBillingMapper[
              updateStreamingPlatformDto.billing
            ],
          category:
            DomainStreamingPlatformCategoryMapper[
              updateStreamingPlatformDto.category
            ],
          cost: updateStreamingPlatformDto.cost,
          date: updateStreamingPlatformDto.date,
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

      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
