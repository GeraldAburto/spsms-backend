import { IPasswordHasher } from '@/core/shared/password-hasher.service';
import UserPlainPassword from './user-plain-password.value-object';

export default class UserHashedPassword {
  private readonly _value: string;

  constructor(hashedPassword: string) {
    this._value = hashedPassword;
  }

  get value(): string {
    return this._value;
  }

  compare(plainPassword: UserPlainPassword, hasher: IPasswordHasher): boolean {
    return hasher.compare(plainPassword.value, this._value);
  }
}
