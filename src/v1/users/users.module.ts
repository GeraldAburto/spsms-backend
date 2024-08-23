import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import RegisterUserUseCase from '@/core/users/use-cases/register-user.use-case';

import { BcryptPasswordHasherService } from '../shared/bcrypt-password-hasher.service';
import { UserModel } from './models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [
    UsersService,
    BcryptPasswordHasherService,
    {
      inject: [UsersService, BcryptPasswordHasherService],
      provide: RegisterUserUseCase,
      useFactory: (
        userService: UsersService,
        passwordHasherService: BcryptPasswordHasherService,
      ) => {
        return new RegisterUserUseCase(userService, passwordHasherService);
      },
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
