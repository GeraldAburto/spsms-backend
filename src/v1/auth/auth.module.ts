import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import SignInUserUseCase from '@/core/users/use-cases/sign-in-user.use-case';

import { BcryptPasswordHasherService } from '../shared/bcrypt-password-hasher.service';
import jwtConfig from '../shared/config/jwt.config';
import { validate } from '../shared/config/jwt.validation';
import { CustomJwtService } from '../shared/custom-jwt.service';
import { SharedModule } from '../shared/shared.module';
import { UserModel } from '../users/models/user.model';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/users.repository';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
      validate,
    }),
    JwtModule.register(jwtConfig()),
    SequelizeModule.forFeature([UserModel]),
    UsersModule,
    SharedModule,
  ],
  providers: [
    {
      inject: [UsersRepository, BcryptPasswordHasherService, CustomJwtService],
      provide: SignInUserUseCase,
      useFactory: (
        userRepository: UsersRepository,
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
