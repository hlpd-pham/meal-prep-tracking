import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDto } from './../../domains/user/user.dto';

import { UserService } from 'src/domains/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: UserDto) {
    try {
      const user = await this.userService.findOne(payload);
      return user;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized credentials');
    }
  }
}
