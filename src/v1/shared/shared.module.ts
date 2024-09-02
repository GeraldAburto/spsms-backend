import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { BcryptPasswordHasherService } from './bcrypt-password-hasher.service';
import jwtConfig from './config/jwt.config';
import { validate } from './config/jwt.validation';
import { CustomJwtService } from './custom-jwt.service';
import { UUIDGeneratorService } from './uuid-generator.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
      validate,
    }),
    JwtModule.register(jwtConfig()),
  ],
  providers: [
    BcryptPasswordHasherService,
    UUIDGeneratorService,
    CustomJwtService,
    JwtService,
    ConfigService,
  ],
  exports: [
    BcryptPasswordHasherService,
    UUIDGeneratorService,
    CustomJwtService,
    JwtService,
    ConfigService,
  ],
})
export class SharedModule {}
