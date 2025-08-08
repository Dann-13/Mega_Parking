export interface User {
  id: string;
  email: string;
  password: string;
  uuid: string;
}

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
}
