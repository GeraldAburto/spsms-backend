import ValueObject from '../../shared/value-objects/value-object.abstract';
import StreamingPlatformDateException from '../exceptions/streaming-platform-date.exception';

export default class StreamingPlatformDate extends ValueObject<Date> {
  private constructor(readonly value: Date) {
    super(value, 'Date');

    if (value.getTime() < new Date().getTime()) {
      throw StreamingPlatformDateException.mustBeIncomingDate();
    }
  }

  public static fromDate(date: Date) {
    return new this(date);
  }
}
