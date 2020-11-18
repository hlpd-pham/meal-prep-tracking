import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './../../domains/user/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() credentials: UserDto) {
    return await this.authService.register(credentials);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUser(@Request() req) {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req) {
    req.logout();
  }
}
