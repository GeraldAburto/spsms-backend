import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import sequelizeConfig from '@/config/sequelize.config';
import { validate } from '@/env.validation';
import { BcryptPasswordHasherService } from '@/v1/shared/bcrypt-password-hasher.service';
import { UserModel } from '@/v1/users/models/user.model';
import { UsersModule } from '@/v1/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    SequelizeModule.forRoot({ ...sequelizeConfig(), models: [UserModel] }),
    UsersModule,
  ],
  providers: [BcryptPasswordHasherService],
})
export class AppModule {}
