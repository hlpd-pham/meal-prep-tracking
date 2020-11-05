import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './../../domains/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() credentials: UserDto) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(@Body() credentials: UserDto) {
    // TODO: get this endpoint to work
    return this.authService.login(credentials);
  }
}
