import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/domains/user/user.dto';
import { UserService } from 'src/domains/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: UserDto) {
    const user = await this.userService.create(userDto);

    const token = this.jwtService.sign(
      { username: user.username },
      { expiresIn: '10h' },
    );
    return { user: user.toJSON(), token };
  }

  async login(userDto: UserDto) {
    const user = await this.userService.findOne(userDto);
    try {
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
