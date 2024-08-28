export default class UserWrongCredentialsException extends Error {
  constructor() {
    super('Email or Password does not match.');
  }
}
