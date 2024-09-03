import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/config/env.validation';
import { DatabaseModule } from '@/database/database.module';
import { AuthModule } from '@/v1/auth/auth.module';
import { StreamingPlatformsModule } from '@/v1/streaming-platforms/streaming-platforms.module';
import { UsersModule } from '@/v1/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    StreamingPlatformsModule,
  ],
})
export class AppModule {}
