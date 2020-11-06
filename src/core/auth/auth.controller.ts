import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './../../domains/user/user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
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
