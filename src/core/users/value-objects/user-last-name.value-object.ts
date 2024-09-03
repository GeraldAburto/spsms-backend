import ValueObject from '../../shared/value-objects/value-object.abstract';
import UserLastNamedException from '../exceptions/user-last-name.exception';

export default class UserLastName extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value, 'Last Name');

    if (value.length === 0) {
      throw UserLastNamedException.mustNotBeEmpty();
    }

    if (value.length > 50) {
      throw UserLastNamedException.mustBeLessThanFiftyCharactersLong();
    }
  }

  public static fromString(lastName: string) {
    return new this(lastName);
  }
}
