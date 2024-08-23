import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

import UserAlreadyExistsException from '@/core/users/exceptions/user-already-exists.exception';
import UserInvalidPasswordException from '@/core/users/exceptions/user-invalid-password.exception';
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
        error instanceof UserAlreadyExistsException ||
        error instanceof UserInvalidPasswordException
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
