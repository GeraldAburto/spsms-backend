export default class UserNotFoundException extends Error {
  constructor() {
    super('User does not exists.');
  }
}
