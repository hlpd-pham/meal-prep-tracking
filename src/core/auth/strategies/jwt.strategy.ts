import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import authConfig from '../auth.config';
import { UserService } from '../../../domains/user/user.service';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    @Inject(authConfig.KEY)
    private authConfiguration: ConfigType<typeof authConfig>,
  ) {
    // call super class to create jwt strategy
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: authConfiguration.JWT_SECRETKEY,
    });
  }

  async validate(payload: TokenPayload) {
    return await this.userService.findById(payload.userId);
  }
}
