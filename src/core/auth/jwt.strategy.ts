import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDto } from './../../domains/user/user.dto';

import { User } from 'src/domains/user/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(User) private readonly userModel: typeof User) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: UserDto) {
    const user = await this.userModel
      .query()
      .findOne({ username: payload.username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
