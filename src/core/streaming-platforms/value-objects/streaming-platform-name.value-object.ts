import ValueObject from '../../shared/value-objects/value-object.abstract';
import StreamingPlatformNameException from '../exceptions/streaming-platform-name.exception';

export default class StreamingPlatformName extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value, 'Name');

    if (value.length === 0) {
      throw StreamingPlatformNameException.mustNotBeEmpty();
    }

    if (value.length > 50) {
      throw StreamingPlatformNameException.mustBeLessThanFiftyCharactersLong();
    }
  }

  public static fromString(name: string) {
    return new this(name);
  }
}
