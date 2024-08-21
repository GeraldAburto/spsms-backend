import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import RegisterUserUseCase from '@/core/users/use-cases/register-user.use-case';

import { UserModel } from './models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [
    UsersService,
    {
      inject: [UsersService],
      provide: RegisterUserUseCase,
      useFactory: (userService: UsersService) => {
        return new RegisterUserUseCase(userService);
      },
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
