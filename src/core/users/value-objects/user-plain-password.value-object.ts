import { IPasswordHasher } from '../../shared/password-hasher.service';
import ValueObject from '../../shared/value-objects/value-object.abstract';
import UserPasswordException from '../exceptions/user-password.exception';
import UserHashedPassword from './user-hashed-password.value-object';

export default class UserPlainPassword extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value, 'Password');

    if (value.length < 8) {
      throw UserPasswordException.mustBeAtLeastEightCharactersLong();
    }

    if (!/[A-Z]/.test(value)) {
      throw UserPasswordException.mustContainUppercaseLetter();
    }

    if (!/\d/.test(value)) {
      throw UserPasswordException.mustContainDigit();
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(value)) {
      throw UserPasswordException.mustContainSpecialCharacter();
    }
  }

  public static fromString(password: string) {
    return new this(password);
  }

  hash(hasher: IPasswordHasher): UserHashedPassword {
    const hashedValue = hasher.hash(this.value);
    return UserHashedPassword.fromString(hashedValue);
  }
}
