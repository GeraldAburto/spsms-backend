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
  private _name: StreamingPlatformName;
  private _category: StreamingPlatformCategory;
  private _cost: StreamingPlatformCost;
  private _billing: StreamingPlatformBilling;
  private _date: StreamingPlatformDate;

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

  public updateName(newName: StreamingPlatformName): void {
    this._name = newName;
  }

  public updateCategory(newCategory: StreamingPlatformCategory): void {
    this._category = newCategory;
  }

  public updateCost(newCost: StreamingPlatformCost): void {
    if (newCost.value < 0) {
      throw new Error('Cost cannot be negative');
    }
    this._cost = newCost;
  }

  public updateBilling(newBilling: StreamingPlatformBilling): void {
    this._billing = newBilling;
  }

  public updateDate(newDate: StreamingPlatformDate): void {
    if (newDate.value < this._date.value) {
      throw new Error('New date cannot be earlier than the current date');
    }
    this._date = newDate;
  }
}
