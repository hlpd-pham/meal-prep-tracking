import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from './../../domains/user/user.service';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { User } from './../../domains/user/user.model';
import { ConfigModule, ConfigType } from '@nestjs/config';
import authConfig from './auth.config';

@Module({
  imports: [
    ObjectionModule.forFeature([User]),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      inject: [authConfig.KEY],
      useFactory: async (authConfiguration: ConfigType<typeof authConfig>) => ({
        secret: authConfiguration.JWT_SECRETKEY,
        signOptions: {
          expiresIn: authConfiguration.JWT_EXPIRESIN,
        },
      }),
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [PassportModule, JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  constructor() {}
}
