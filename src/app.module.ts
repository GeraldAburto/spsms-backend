import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import sequelizeConfig from '@/config/sequelize.config';
import { validate } from '@/env.validation';
import { BcryptPasswordHasherService } from '@/v1/shared/bcrypt-password-hasher.service';
import { UUIDGeneratorService } from '@/v1/shared/uuid-generator.service';
import { UsersModule } from '@/v1/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    SequelizeModule.forRoot(sequelizeConfig()),
    UsersModule,
  ],
  providers: [BcryptPasswordHasherService, UUIDGeneratorService],
})
export class AppModule {}
