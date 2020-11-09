import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDto } from './../../domains/user/user.dto';

import { UserService } from './../../domains/user/user.service';
import authConfig from './auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    @Inject(authConfig.KEY)
    private authConfiguration: ConfigType<typeof authConfig>,
  ) {
    // call super class to create jwt strategy
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfiguration.JWT_SECRETKEY,
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
