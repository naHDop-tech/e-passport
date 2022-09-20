import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserResolver } from '~/user/user.resolver';
import { UserService } from '~/user/user.service';
import { UtilsModule } from '~/utils/utils.module';
import { ApplicantModule } from '~/applicant/applicant.module';
import { JwtService } from '~/jwt/jwt.service';
import { PROVIDE_JWT_KEY } from '~/jwt/dto/jwt-user.dto';
import { UserEntity } from '~/user/user.entity';
import { UserFactory } from '~/user/user.factory';
@Module({
  imports: [
    UtilsModule,
    TypeOrmModule.forFeature([UserEntity]),
    ApplicantModule,
  ],
  providers: [
    UserResolver,
    UserService,
    JwtService,
    {
      provide: PROVIDE_JWT_KEY,
      useFactory: () => process.env.JWT_SECRET_KEY,
    },
    UserFactory,
  ],
  exports: [UserService],
})
export class UserModule {}
