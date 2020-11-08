import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from 'src/domains/user/user.service';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { User } from 'src/domains/user/user.model';

@Module({
  imports: [
    ObjectionModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
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
export class AuthModule {}
