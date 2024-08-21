import { Module } from '@nestjs/common';

import RegisterUserUseCase from '@/core/users/use-cases/register-user.use-case';
import { InMemoryUsersService } from './in-memory-users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [
    InMemoryUsersService,
    {
      inject: [InMemoryUsersService],
      provide: RegisterUserUseCase,
      useFactory: (userService: InMemoryUsersService) => {
        return new RegisterUserUseCase(userService);
      },
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
