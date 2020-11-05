import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { User } from './../../domains/user/user.model';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ObjectionModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
