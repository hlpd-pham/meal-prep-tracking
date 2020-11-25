import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UniqueViolationError } from 'objection';
import { UserDto } from '../../domains/user/user.dto';
import { User } from '../../domains/user/user.model';
import { UserService } from '../../domains/user/user.service';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(userDto: UserDto) {
    try {
      const user = await this.userService.create(userDto);
      return this.login(user);
    } catch (e) {
      if (e instanceof UniqueViolationError) {
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(user: Partial<User>) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne({
      username: username,
      password: password,
    });
    try {
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.jwtService.sign({ user: user.username });
      return { user: user.username, token };
    } catch (e) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRESIN',
    )}`;
  }

  public getLogOutCookie() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
