import { Module } from '@nestjs/common';

import { JwtAuthResolver } from '~/jwt-auth/jwt.auth.resolver';
import { JwtAuthService } from '~/jwt-auth/jwt-auth.service';
import { CryptoService } from '~/utils/crypto.service';
import { ApplicantModule } from '~/applicant/applicant.module';
import { UserModule } from '~/user/user.module';
import { JwtModule } from '~/jwt/jwt.module';

@Module({
  imports: [UserModule, JwtModule, ApplicantModule],
  providers: [JwtAuthResolver, JwtAuthService, CryptoService],
})
export class JwtAuthModule {}
