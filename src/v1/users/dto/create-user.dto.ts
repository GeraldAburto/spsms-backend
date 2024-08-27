import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'Jane',
    minLength: 1,
    maxLength: 50,
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
    minLength: 1,
    maxLength: 50,
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ type: String, example: 'janedoe@mail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: '$Abc1234#',
    minLength: 8,
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
