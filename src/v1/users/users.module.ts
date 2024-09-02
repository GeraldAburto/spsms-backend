import { Module } from '@nestjs/common';

import RegisterUserUseCase from '@/core/users/use-cases/register-user.use-case';
import { DatabaseModule } from '@/database/database.module';
import { UserRepository } from '@/database/user.repository';

import { BcryptPasswordHasherService } from '../shared/bcrypt-password-hasher.service';
import { SharedModule } from '../shared/shared.module';
import { UUIDGeneratorService } from '../shared/uuid-generator.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [
    {
      inject: [
        UserRepository,
        BcryptPasswordHasherService,
        UUIDGeneratorService,
      ],
      provide: RegisterUserUseCase,
      useFactory: (
        userRepository: UserRepository,
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
