import { IPasswordHasher } from '../../shared/password-hasher.service';
import { IUUIDGenerator } from '../../shared/uuid-generator.service';
import UserAlreadyExistsException from '../exceptions/user-already-exists.exception';

import User from '../user.entity';
import { IUserRepository } from '../user.repository';
import UserEmail from '../value-objects/user-email.value-object';
import UserFirstName from '../value-objects/user-first-name.value-object';
import UserId from '../value-objects/user-id.value-object';
import UserLastName from '../value-objects/user-last-name.value-object';
import UserPlainPassword from '../value-objects/user-plain-password.value-object';

export default class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly uuidGenerator: IUUIDGenerator,
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
      throw new UserAlreadyExistsException();
    }

    // Hash the user's password.
    const userPassword = UserPlainPassword.fromString(password);
    const hashedPassword = userPassword.hash(this.passwordHasher);

    // Generate a valid id.
    const userId = UserId.fromString(this.uuidGenerator.generate());

    // Create a new User instance.
    const user = new User(
      userId,
      UserFirstName.fromString(firstName),
      UserLastName.fromString(lastName),
      UserEmail.fromString(email),
      hashedPassword,
    );

    // Persist the user.
    this.userRepository.save(user);
  }
}
