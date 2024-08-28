import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import InvalidArgumentException from '@/core/shared/exceptions/invalid-argument.exception';
import UserPasswordException from '@/core/users/exceptions/user-password.exception';
import SignInUserUseCase from '@/core/users/use-cases/sign-in-user.use-case';

import UserNotFoundException from '@/core/users/exceptions/user-not-found.exception';
import UserWrongCredentialsException from '@/core/users/exceptions/user-wrong-credentials.exception';
import { SignInUserDto } from './dto/sign-in-user.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly signInUserUseCase: SignInUserUseCase) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiBadRequestResponse({
    description: 'There is an error in the request payload',
  })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  @Post('/sign-in')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    try {
      return await this.signInUserUseCase.execute({
        email: signInUserDto.email,
        password: signInUserDto.password,
      });
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof UserWrongCredentialsException) {
        throw new UnauthorizedException(error.message);
      }

      if (
        error instanceof InvalidArgumentException ||
        error instanceof UserPasswordException
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
