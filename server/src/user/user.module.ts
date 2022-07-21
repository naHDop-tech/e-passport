import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserResolver } from '~/user/user.resolver';
import { UserService } from '~/user/user.service';
import { UtilsModule } from '~/utils/utils.module';
import { UserEntity } from '~/user/user.entity';
import { UserFactory } from '~/user/user.factory';
@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserResolver, UserService, UserFactory],
  exports: [UserService],
})
export class UserModule {}
