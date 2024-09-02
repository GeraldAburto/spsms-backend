import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import sequelizeConfig from './config/sequelize.config';
import { validate } from './config/sequelize.validation';
import { UserModel } from './models/user.model';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [sequelizeConfig],
      validate,
    }),
    SequelizeModule.forRoot(sequelizeConfig()),
    SequelizeModule.forFeature([UserModel]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
