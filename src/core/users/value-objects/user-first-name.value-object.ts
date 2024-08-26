import ValueObject from '../../shared/value-objects/value-object.abstract';
import UserFirstNamedException from '../exceptions/user-first-name.exception';

export default class UserFirstName extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value, 'First Name');

    if (value.length === 0) {
      throw UserFirstNamedException.mustNotBeEmpty();
    }

    if (value.length > 50) {
      throw UserFirstNamedException.mustBeLessThanFiftyCharactersLong();
    }
  }

  public static fromString(id: string) {
    return new this(id);
  }
}
