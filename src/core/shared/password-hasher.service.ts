export interface IPasswordHasher {
  hash(password: string): string;
  compare(plainPassword: string, hashedPassword: string): boolean;
}
