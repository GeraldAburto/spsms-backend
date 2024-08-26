import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

import InvalidArgumentException from '@/core/shared/exceptions/invalid-argument.exception';
import UserAlreadyExistsException from '@/core/users/exceptions/user-already-exists.exception';
import UserEmailException from '@/core/users/exceptions/user-email.exception';
import UserFirstNamedException from '@/core/users/exceptions/user-first-name.exception';
import UserIdException from '@/core/users/exceptions/user-id.exception';
import UserLastNamedException from '@/core/users/exceptions/user-last-name.exception';
import UserPasswordException from '@/core/users/exceptions/user-password.exception';
import RegisterUserUseCase from '@/core/users/use-cases/register-user.use-case';

import { CreateUserDto } from './dto/create-user.dto';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.registerUserUseCase.execute({
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: createUserDto.password,
      });
    } catch (error) {
      if (
        error instanceof InvalidArgumentException ||
        error instanceof UserAlreadyExistsException ||
        error instanceof UserEmailException ||
        error instanceof UserFirstNamedException ||
        error instanceof UserIdException ||
        error instanceof UserLastNamedException ||
        error instanceof UserPasswordException
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
