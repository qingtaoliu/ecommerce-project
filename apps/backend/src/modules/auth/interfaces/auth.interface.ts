import { User } from '../../users/entities/user.entity';

export interface LoginResponse {
  access_token: string;
  user: Omit<User, 'password'>;
}

export interface JwtPayload {
  sub: string; // 用户ID
  email: string;
  role: string;
}
