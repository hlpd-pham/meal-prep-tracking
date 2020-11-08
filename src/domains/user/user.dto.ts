import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsNumber()
  id?: number;

  @IsString()
  username?: string;

  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  password: string;
}
