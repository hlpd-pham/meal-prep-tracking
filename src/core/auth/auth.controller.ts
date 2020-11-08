import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './../../domains/user/user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() credentials: UserDto) {
    return await this.authService.register(credentials);
  }

  @Post('/login')
  async login(@Body() credentials: UserDto) {
    return await this.authService.login(credentials);
  }
}
