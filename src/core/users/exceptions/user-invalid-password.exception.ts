export default class UserInvalidPasswordException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
