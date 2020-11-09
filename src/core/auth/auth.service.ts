import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UniqueViolationError } from 'objection';
import { UserDto } from 'src/domains/user/user.dto';
import { UserService } from 'src/domains/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: UserDto) {
    try {
      const user = await this.userService.create(userDto);
      const token = this.jwtService.sign({ user: user.username });
      return { user: user.username, token };
    } catch (e) {
      if (e instanceof UniqueViolationError) {
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
      } else {
        throw e;
      }
    }
  }

  async login(userDto: UserDto) {
    const user = await this.userService.findOne(userDto);
    try {
      const isValid = await user.comparePassword(userDto.password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.jwtService.sign({ user: user.username });
      return { user: user.username, token };
    } catch (e) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
