import UserAlreadyExistsException from '../exceptions/user-already-exists.exception';
import User from '../user.entity';
import { IUserRepository } from '../user.repository';

export default class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute({
    email,
    firstName,
    lastName,
    password,
  }: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
    // Check if the email already exists.
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistsException(
        'User with this email already exists.',
      );
    }

    // TODO: hash the user's password.

    // Create the new User instance.
    const user = new User(email, firstName, '', lastName, password);

    // Persist the user.
    this.userRepository.save(user);
  }
}
