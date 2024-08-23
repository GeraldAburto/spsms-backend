import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import User from '@/core/users/user.entity';
import { IUserRepository } from '@/core/users/user.repository';
import UserHashedPassword from '@/core/users/value-objects/user-hashed-password.value-object';

import { UserModel } from './models/user.model';

@Injectable()
export class UsersService implements IUserRepository {
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
      user.email,
      user.firstName,
      user.id,
      user.lastName,
      new UserHashedPassword(user.passwordHash),
    );
  }

  async save(user: User): Promise<void> {
    await this.userModel.create({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      passwordHash: user.password,
    });
  }
}
