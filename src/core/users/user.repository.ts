import User from './user.entity';
import UserId from './value-objects/user-id.value-object';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
}
