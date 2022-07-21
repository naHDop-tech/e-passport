import { Module } from '@nestjs/common';
import { UserResolver } from '~/user/user.resolver';
import { UserService } from '~/user/user.service';
import { UtilsModule } from '~/utils/utils.module';
@Module({
  imports: [UtilsModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
