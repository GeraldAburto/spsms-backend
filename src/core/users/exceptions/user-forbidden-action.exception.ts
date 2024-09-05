export default class UserForbiddenActionException extends Error {
  constructor() {
    super("You're not allowed to execute this action.");
  }
}
