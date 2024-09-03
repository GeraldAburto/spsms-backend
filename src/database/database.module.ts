import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import sequelizeConfig from './config/sequelize.config';
import { validate } from './config/sequelize.validation';
import { StreamingPlatformModel } from './models/streaming-platform.model';
import { UserModel } from './models/user.model';
import { StreamingPlatformRepository } from './streaming-platform.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [sequelizeConfig],
      validate,
    }),
    SequelizeModule.forRoot(sequelizeConfig()),
    SequelizeModule.forFeature([UserModel, StreamingPlatformModel]),
  ],
  providers: [UserRepository, StreamingPlatformRepository],
  exports: [UserRepository, StreamingPlatformRepository],
})
export class DatabaseModule {}
