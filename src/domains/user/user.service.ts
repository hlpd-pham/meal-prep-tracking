import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(User)
    private readonly userModel: typeof User,
  ) {}

  async findOne(userDto: UserDto): Promise<User> {
    let existingUser: User;

    if (userDto.email) {
      existingUser = await this.userModel
        .query()
        .findOne({ email: userDto.email });
    }

    if (userDto.username) {
      existingUser = await this.userModel
        .query()
        .findOne({ username: userDto.username });
    }

    if (!existingUser) {
      throw new NotFoundException('User information is invalid');
    }
    return existingUser;
  }

  async create(userDto: UserDto): Promise<User> {
    return await this.userModel.query().insert(userDto);
  }
}
