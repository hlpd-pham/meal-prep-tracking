import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class DeliverPersonDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsNumber()
  readonly orderId?: number;
}

export class UpdateDeliverPersonDto extends PartialType(DeliverPersonDto) {}
