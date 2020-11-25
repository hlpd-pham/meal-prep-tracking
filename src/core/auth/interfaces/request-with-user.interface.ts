import { Request } from 'express';
import { User } from '../../../domains/user/user.model';

export interface RequestWithUser extends Request {
  user: User;
}
