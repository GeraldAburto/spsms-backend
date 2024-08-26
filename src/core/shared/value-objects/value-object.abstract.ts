import InvalidArgumentException from '../exceptions/invalid-argument.exception';

type Primitives = string | number | boolean | Date;

export default abstract class ValueObject<T extends Primitives> {
  readonly value: T;
  private readonly name: string;

  public constructor(value: T, name: string) {
    this.name = name;
    this.mustBeDefined(value);
    this.value = value;
  }

  private mustBeDefined(value: T | undefined | null) {
    if (value === null || value === undefined) {
      throw InvalidArgumentException.mustBeDefined(this.name);
    }
  }
}
