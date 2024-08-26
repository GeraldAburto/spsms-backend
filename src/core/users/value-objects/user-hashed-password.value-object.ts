import { IPasswordHasher } from '../../shared/password-hasher.service';
import ValueObject from '../../shared/value-objects/value-object.abstract';
import UserPasswordException from '../exceptions/user-password.exception';
import UserPlainPassword from './user-plain-password.value-object';

export default class UserHashedPassword extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value, 'Password Hash');

    if (value.length === 0) {
      throw UserPasswordException.mustNotBeEmpty();
    }
  }

  public static fromString(hashedPassword: string) {
    return new this(hashedPassword);
  }

  compare(plainPassword: UserPlainPassword, hasher: IPasswordHasher): boolean {
    return hasher.compare(plainPassword.value, this.value);
  }
}
