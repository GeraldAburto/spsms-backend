import ValueObject from '../../shared/value-objects/value-object.abstract';
import UserEmailException from '../exceptions/user-email.exception';

const VALID_EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

export default class UserEmail extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value, 'Email');

    if (value.length === 0) {
      throw UserEmailException.mustNotBeEmpty();
    }

    if (!VALID_EMAIL_REGEX.test(value)) {
      throw UserEmailException.mustBeAValidEmail();
    }
  }

  public static fromString(email: string) {
    return new this(email);
  }
}
