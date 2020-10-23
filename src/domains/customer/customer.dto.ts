import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString } from 'class-validator';
import { CustomerType } from '../customer/customer.model';

export class CustomerDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly email?: string;

  @IsString()
  readonly address: string;

  @IsEnum(CustomerType)
  readonly type: CustomerType;
}

export class UpdateCustomerDto extends PartialType(CustomerDto) {}
