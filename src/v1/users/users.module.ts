import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import RegisterUserUseCase from '@/core/users/use-cases/register-user.use-case';

import { BcryptPasswordHasherService } from '../shared/bcrypt-password-hasher.service';
import { UUIDGeneratorService } from '../shared/uuid-generator.service';
import { UserModel } from './models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [
    UsersService,
    BcryptPasswordHasherService,
    UUIDGeneratorService,
    {
      inject: [UsersService, BcryptPasswordHasherService, UUIDGeneratorService],
      provide: RegisterUserUseCase,
      useFactory: (
        userService: UsersService,
        passwordHasherService: BcryptPasswordHasherService,
        uuidGeneratorService: UUIDGeneratorService,
      ) => {
        return new RegisterUserUseCase(
          userService,
          passwordHasherService,
          uuidGeneratorService,
        );
      },
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
