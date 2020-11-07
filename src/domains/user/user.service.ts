import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(User)
    private readonly userModel: typeof User,
  ) {}

  async findOne(userDto: UserDto): Promise<User> {
    const existingUser = await this.userModel
      .query()
      .findOne({ username: userDto.username })
      .orWhere({ email: userDto.email });

    if (!existingUser) {
      throw new NotFoundException('User information is invalid');
    }
    return existingUser;
  }

  async create(userDto: UserDto): Promise<User> {
    try {
      return await this.userModel.query().insert(userDto);
    } catch (e) {
      // postgres error code for duplicate unique entry
      if (e.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
