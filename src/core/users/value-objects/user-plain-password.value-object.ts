import { IPasswordHasher } from '../../shared/password-hasher.service';
import UserInvalidArgumentException from '../exceptions/user-invalid-argument.exception';
import UserHashedPassword from './user-hashed-password.value-object';

export default class UserPlainPassword {
  private readonly _value: string;

  constructor(password: string) {
    if (password.length < 8) {
      throw new UserInvalidArgumentException(
        'Password must be at least 8 characters long.',
      );
    }

    if (!/[A-Z]/.test(password)) {
      throw new UserInvalidArgumentException(
        'Password must contain at least one uppercase letter.',
      );
    }

    if (!/\d/.test(password)) {
      throw new UserInvalidArgumentException(
        'Password must contain at least one digit.',
      );
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password)) {
      throw new UserInvalidArgumentException(
        'Password must contain at least one special character.',
      );
    }

    this._value = password;
  }

  get value() {
    return this._value;
  }

  hash(hasher: IPasswordHasher): UserHashedPassword {
    const hashedValue = hasher.hash(this._value);
    return new UserHashedPassword(hashedValue);
  }
}
