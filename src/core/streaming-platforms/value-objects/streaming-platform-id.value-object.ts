import ValueObject from '../../shared/value-objects/value-object.abstract';
import StreamingPlatformIdException from '../exceptions/streaming-platform-id.exception';

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default class StreamingPlatformId extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value, 'Id');

    if (value.length === 0) {
      throw StreamingPlatformIdException.mustNotBeEmpty();
    }

    if (!UUID_V4_REGEX.test(value)) {
      throw StreamingPlatformIdException.mustBeValidUUID();
    }
  }

  public static fromString(id: string) {
    return new this(id);
  }
}
