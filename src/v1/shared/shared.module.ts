import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { BcryptPasswordHasherService } from './bcrypt-password-hasher.service';
import jwtConfig from './config/jwt.config';
import { validate } from './config/jwt.validation';
import { CustomJwtService } from './custom-jwt.service';
import { UUIDGeneratorService } from './uuid-generator.service';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    JwtModule.register(jwtConfig()),
  ],
  providers: [
    BcryptPasswordHasherService,
    UUIDGeneratorService,
    CustomJwtService,
  ],
  exports: [
    BcryptPasswordHasherService,
    UUIDGeneratorService,
    CustomJwtService,
  ],
})
export class SharedModule {}
