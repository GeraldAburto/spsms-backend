import ValueObject from '../../shared/value-objects/value-object.abstract';
import UserIdException from '../exceptions/user-id.exception';

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default class UserId extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value, 'Id');

    if (value.length === 0) {
      throw UserIdException.mustNotBeEmpty();
    }

    if (!UUID_V4_REGEX.test(value)) {
      throw UserIdException.mustBeValidUUID();
    }
  }

  public static fromString(id: string) {
    return new this(id);
  }

  public equals(other: UserId): boolean {
    if (!(other instanceof UserId)) {
      return false;
    }
    return this.value === other.value;
  }
}
