import UserEmail from './value-objects/user-email.value-object';
import UserFirstName from './value-objects/user-first-name.value-object';
import UserHashedPassword from './value-objects/user-hashed-password.value-object';
import UserId from './value-objects/user-id.value-object';
import UserLastName from './value-objects/user-last-name.value-object';

export default class User {
  private readonly _id: UserId;
  private readonly _firstName: UserFirstName;
  private readonly _lastName: UserLastName;
  private readonly _email: UserEmail;
  private readonly _password: UserHashedPassword;

  constructor(
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    email: UserEmail,
    password: UserHashedPassword,
  ) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
  }

  public get id(): string {
    return this._id.value;
  }

  public get firstName(): string {
    return this._firstName.value;
  }

  public get lastName(): string {
    return this._lastName.value;
  }

  public get email(): string {
    return this._email.value;
  }

  public get password(): string {
    return this._password.value;
  }
}
