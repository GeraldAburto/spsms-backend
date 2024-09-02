import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import sequelizeConfig from '@/config/sequelize.config';
import { AuthModule } from '@/v1/auth/auth.module';
import { BcryptPasswordHasherService } from '@/v1/shared/bcrypt-password-hasher.service';
import { UUIDGeneratorService } from '@/v1/shared/uuid-generator.service';
import { UsersModule } from '@/v1/users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig()),
    UsersModule,
    AuthModule,
  ],
  providers: [BcryptPasswordHasherService, UUIDGeneratorService],
})
export class AppModule {}
