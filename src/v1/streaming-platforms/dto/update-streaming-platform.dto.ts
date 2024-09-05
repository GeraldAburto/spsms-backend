import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  MinDate,
} from 'class-validator';

import { StreamingPlatformBilling } from '@/enums/streaming-platform/streaming-platform-billing.enum';
import { StreamingPlatformCategory } from '@/enums/streaming-platform/streaming-platform-category.enum';

export class UpdateStreamingPlatformDto {
  @ApiProperty({
    type: String,
    example: 'Netflix',
    minLength: 1,
    maxLength: 50,
    required: false,
  })
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @ApiProperty({
    enum: StreamingPlatformCategory,
    example: StreamingPlatformCategory.Entertainment,
    required: false,
  })
  @IsEnum(StreamingPlatformCategory)
  @IsOptional()
  category?: StreamingPlatformCategory;

  @ApiProperty({
    type: Number,
    example: 9.99,
    required: false,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  cost?: number;

  @ApiProperty({
    enum: StreamingPlatformBilling,
    example: StreamingPlatformBilling.Monthly,
    required: false,
  })
  @IsEnum(StreamingPlatformBilling)
  @IsOptional()
  billing?: StreamingPlatformBilling;

  @ApiProperty({
    type: Date,
    example: '2024/05/04',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date())
  @IsOptional()
  date?: Date;
}
