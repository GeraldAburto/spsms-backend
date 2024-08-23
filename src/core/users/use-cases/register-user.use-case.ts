import { IPasswordHasher } from '../../shared/password-hasher.service';
import UserAlreadyExistsException from '../exceptions/user-already-exists.exception';
import User from '../user.entity';
import { IUserRepository } from '../user.repository';
import UserPlainPassword from '../value-objects/user-plain-password.value-object';

export default class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

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

    // Hash the user's password.
    const userPassword = new UserPlainPassword(password);
    const hashedPassword = userPassword.hash(this.passwordHasher);

    // Create the new User instance.
    const user = new User(email, firstName, '', lastName, hashedPassword);

    // Persist the user.
    this.userRepository.save(user);
  }
}
