import { Module } from '@nestjs/common';

import { JwtService } from '~/jwt/jwt.service';
import { PROVIDE_JWT_KEY } from '~/jwt/dto/jwt-user.dto';

@Module({
  providers: [
    JwtService,
    {
      provide: PROVIDE_JWT_KEY,
      useFactory: () => process.env.JWT_SECRET_KEY,
    },
  ],
  exports: [JwtService],
})
export class JwtModule {}
