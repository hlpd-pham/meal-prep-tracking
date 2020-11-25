import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  HttpCode,
  Res,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserDto } from './../../domains/user/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() credentials: UserDto) {
    return await this.authService.register(credentials);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUser(@Req() req: RequestWithUser) {
    const user = req.user;
    user.password = undefined;
    return user;
  }

  @Get('/logout')
  logout(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getLogOutCookie());
    req.logout();
    return res.sendStatus(200);
  }
}
