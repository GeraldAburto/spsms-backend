import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInUserDto {
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
