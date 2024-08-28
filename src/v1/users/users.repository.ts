import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import User from '@/core/users/user.entity';
import { IUserRepository } from '@/core/users/user.repository';
import UserEmail from '@/core/users/value-objects/user-email.value-object';
import UserFirstName from '@/core/users/value-objects/user-first-name.value-object';
import UserHashedPassword from '@/core/users/value-objects/user-hashed-password.value-object';
import UserId from '@/core/users/value-objects/user-id.value-object';
import UserLastName from '@/core/users/value-objects/user-last-name.value-object';

import { UserModel } from './models/user.model';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return new User(
      UserId.fromString(user.id),
      UserFirstName.fromString(user.firstName),
      UserLastName.fromString(user.lastName),
      UserEmail.fromString(user.email),
      UserHashedPassword.fromString(user.passwordHash),
    );
  }

  async save(user: User): Promise<void> {
    await this.userModel.create({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      passwordHash: user.password.value,
    });
  }
}
