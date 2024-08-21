import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import sequelizeConfig from '@/config/sequelize.config';
import { UserModel } from '@/v1/users/models/user.model';
import { UsersModule } from '@/v1/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({ ...sequelizeConfig(), models: [UserModel] }),
    UsersModule,
  ],
})
export class AppModule {}
