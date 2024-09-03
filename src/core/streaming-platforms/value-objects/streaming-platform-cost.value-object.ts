import ValueObject from '../../shared/value-objects/value-object.abstract';
import StreamingPlatformCostException from '../exceptions/streaming-platform-cost.exception';

export default class StreamingPlatformCost extends ValueObject<number> {
  private constructor(readonly value: number) {
    super(value, 'Cost');

    if (value <= 0) {
      throw StreamingPlatformCostException.mustBeGreaterThanZero();
    }
  }

  public static fromNumber(cost: number) {
    return new this(cost);
  }
}
