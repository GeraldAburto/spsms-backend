import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { IPasswordHasher } from '@/core/shared/password-hasher.service';

@Injectable()
export class BcryptPasswordHasherService implements IPasswordHasher {
  private readonly saltRounds = 16;

  hash(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  compare(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}
