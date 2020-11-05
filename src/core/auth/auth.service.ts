import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/domains/user/user.dto';
import { User } from 'src/domains/user/user.model';
import { AuthResponse } from './auth.response';

@Injectable()
export class AuthService {
  constructor(
    @Inject(User)
    private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(userDto: UserDto) {
    try {
      const user = await this.userModel.query().insert(userDto);

      const token = this.jwtService.sign(
        { username: user.username },
        { expiresIn: '10h' },
      );
      return { user: user.toJSON(), token };
    } catch (e) {
      // postgres error code for duplicate unique entry
      if (e.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(userDto: UserDto) {
    try {
      const user = await this.userModel
        .query()
        .findOne({ email: userDto.email, username: userDto.username });

      if (!user) {
        throw new NotFoundException(`User information is invalid`);
      }

      const isValid = await user.comparePassword(userDto.password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.jwtService.sign(user.username);
      return { user: user.toJSON(), token };
    } catch (e) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
