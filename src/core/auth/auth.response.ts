import { UserDto } from 'src/domains/user/user.dto';

export interface AuthResponse {
  user: JSON;
  token: string;
}
