import { Module } from '@nestjs/common';

import SignInUserUseCase from '@/core/users/use-cases/sign-in-user.use-case';
import { DatabaseModule } from '@/database/database.module';
import { UserRepository } from '@/database/user.repository';

import { BcryptPasswordHasherService } from '../shared/bcrypt-password-hasher.service';
import { CustomJwtService } from '../shared/custom-jwt.service';
import { SharedModule } from '../shared/shared.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [
    {
      inject: [UserRepository, BcryptPasswordHasherService, CustomJwtService],
      provide: SignInUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        passwordHasherService: BcryptPasswordHasherService,
        jwtService: CustomJwtService,
      ) => {
        return new SignInUserUseCase(
          userRepository,
          passwordHasherService,
          jwtService,
        );
      },
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
