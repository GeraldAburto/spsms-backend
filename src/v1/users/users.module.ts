import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import RegisterUserUseCase from '@/core/users/use-cases/register-user.use-case';

import { BcryptPasswordHasherService } from '../shared/bcrypt-password-hasher.service';
import { UUIDGeneratorService } from '../shared/uuid-generator.service';
import { UserModel } from './models/user.model';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [
    UsersRepository,
    BcryptPasswordHasherService,
    UUIDGeneratorService,
    {
      inject: [
        UsersRepository,
        BcryptPasswordHasherService,
        UUIDGeneratorService,
      ],
      provide: RegisterUserUseCase,
      useFactory: (
        userRepository: UsersRepository,
        passwordHasherService: BcryptPasswordHasherService,
        uuidGeneratorService: UUIDGeneratorService,
      ) => {
        return new RegisterUserUseCase(
          userRepository,
          passwordHasherService,
          uuidGeneratorService,
        );
      },
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
