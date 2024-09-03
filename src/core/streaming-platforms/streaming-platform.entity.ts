import UserId from '../users/value-objects/user-id.value-object';

import { StreamingPlatformBilling as StreamingPlatformBillingEnum } from './enums/streaming-platform-billing.enum';
import { StreamingPlatformCategory as StreamingPlatformCategoryEnum } from './enums/streaming-platform-category.enum';
import StreamingPlatformBilling from './value-objects/streaming-platform-billing.value-object';
import StreamingPlatformCategory from './value-objects/streaming-platform-category.value-object';
import StreamingPlatformCost from './value-objects/streaming-platform-cost.value-object';
import StreamingPlatformDate from './value-objects/streaming-platform-date.value-object';
import StreamingPlatformId from './value-objects/streaming-platform-id.value-object';
import StreamingPlatformName from './value-objects/streaming-platform-name.value-object';

export default class StreamingPlatform {
  private readonly _id: StreamingPlatformId;
  private readonly _userId: UserId;
  private readonly _name: StreamingPlatformName;
  private readonly _category: StreamingPlatformCategory;
  private readonly _cost: StreamingPlatformCost;
  private readonly _billing: StreamingPlatformBilling;
  private readonly _date: StreamingPlatformDate;

  constructor(
    id: StreamingPlatformId,
    userId: UserId,
    name: StreamingPlatformName,
    category: StreamingPlatformCategory,
    cost: StreamingPlatformCost,
    billing: StreamingPlatformBilling,
    date: StreamingPlatformDate,
  ) {
    this._id = id;
    this._userId = userId;
    this._name = name;
    this._category = category;
    this._cost = cost;
    this._billing = billing;
    this._date = date;
  }

  public get id(): string {
    return this._id.value;
  }

  public get userId(): string {
    return this._userId.value;
  }

  public get name(): string {
    return this._name.value;
  }

  public get category(): StreamingPlatformCategoryEnum {
    return this._category.value;
  }

  public get cost(): number {
    return this._cost.value;
  }

  public get billing(): StreamingPlatformBillingEnum {
    return this._billing.value;
  }

  public get date(): Date {
    return this._date.value;
  }
}
