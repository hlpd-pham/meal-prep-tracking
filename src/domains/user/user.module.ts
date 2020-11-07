import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [ObjectionModule.forFeature([User])],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
