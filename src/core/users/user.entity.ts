import UserHashedPassword from './value-objects/user-hashed-password.value-object';

export default class User {
  private readonly _email: string;
  private readonly _firstName: string;
  private readonly _id: string;
  private readonly _lastName: string;
  private readonly _password: UserHashedPassword;

  constructor(
    email: string,
    firstName: string,
    id: string,
    lastName: string,
    password: UserHashedPassword,
  ) {
    this._email = email;
    this._firstName = firstName;
    this._id = id;
    this._lastName = lastName;
    this._password = password;
  }

  public get email() {
    return this._email;
  }

  public get firstName() {
    return this._firstName;
  }

  public get lastName() {
    return this._lastName;
  }

  public get password() {
    return this._password.value;
  }

  public get id() {
    return this._id;
  }
}
