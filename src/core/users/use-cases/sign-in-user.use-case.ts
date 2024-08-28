import { IJWTSigner } from '../../shared/jwt-signer.service';
import { IPasswordHasher } from '../../shared/password-hasher.service';

import UserNotFoundException from '../exceptions/user-not-found.exception';
import UserWrongCredentialsException from '../exceptions/user-wrong-credentials.exception';
import { IUserRepository } from '../user.repository';
import UserPlainPassword from '../value-objects/user-plain-password.value-object';

export default class SignInUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly jwtSigner: IJWTSigner,
  ) {}

  public async execute({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }

    if (
      !user.password.compare(
        UserPlainPassword.fromString(password),
        this.passwordHasher,
      )
    ) {
      throw new UserWrongCredentialsException();
    }

    return {
      access_token: await this.jwtSigner.sign({
        sub: user.id,
        username: user.email,
      }),
    };
  }
}
