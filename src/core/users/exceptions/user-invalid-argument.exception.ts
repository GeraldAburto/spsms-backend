export default class UserInvalidArgumentException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
