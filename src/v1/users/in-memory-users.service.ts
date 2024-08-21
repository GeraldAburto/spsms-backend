import { Injectable } from '@nestjs/common';

import User from '@/core/users/user.entity';
import { IUserRepository } from '@/core/users/user.repository';

@Injectable()
export class InMemoryUsersService implements IUserRepository {
  private readonly users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email);
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
