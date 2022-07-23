import { Module } from '@nestjs/common';

import { JwtAuthResolver } from '~/jwt-auth/jwt.auth.resolver';
import { JwtAuthService } from '~/jwt-auth/jwt-auth.service';
import { UserModule } from '~/user/user.module';
import { JwtModule } from '~/jwt/jwt.module';

@Module({
  imports: [UserModule, JwtModule],
  providers: [JwtAuthResolver, JwtAuthService],
})
export class JwtAuthModule {}
