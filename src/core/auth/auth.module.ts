import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from './../../domains/user/user.service';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { User } from './../../domains/user/user.model';
import { ConfigModule, ConfigType } from '@nestjs/config';
import authConfig from './auth.config';
import { UserModule } from 'src/domains/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    UserModule,
    ObjectionModule.forFeature([User]),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      // register configs for token signing, see https://github.com/nestjs/jwt#async-options
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
      defaultStrategy: 'local',
      session: true,
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    LocalStrategy,
    SessionSerializer,
  ],
  exports: [PassportModule, JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
