import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  MinDate,
} from 'class-validator';

import { StreamingPlatformBilling } from '@/enums/streaming-platform/streaming-platform-billing.enum';
import { StreamingPlatformCategory } from '@/enums/streaming-platform/streaming-platform-category.enum';

export class CreateStreamingPlatformDto {
  @ApiProperty({
    type: String,
    example: 'Netflix',
    minLength: 1,
    maxLength: 50,
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    enum: StreamingPlatformCategory,
    example: StreamingPlatformCategory.Entertainment,
  })
  @IsEnum(StreamingPlatformCategory)
  category: StreamingPlatformCategory;

  @ApiProperty({
    type: Number,
    example: 9.99,
    required: true,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  cost: number;

  @ApiProperty({
    enum: StreamingPlatformBilling,
    example: StreamingPlatformBilling.Monthly,
  })
  @IsEnum(StreamingPlatformBilling)
  billing: StreamingPlatformBilling;

  @ApiProperty({
    type: Date,
    example: '2024/05/04',
    required: true,
  })
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date())
  date: Date;
}
