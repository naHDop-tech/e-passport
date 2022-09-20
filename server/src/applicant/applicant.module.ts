import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicantResolver } from '~/applicant/applicant.resolver';
import { UtilsModule } from '~/utils/utils.module';
import { JwtService } from '~/jwt/jwt.service';
import { PROVIDE_JWT_KEY } from '~/jwt/dto/jwt-user.dto';
import { ApplicantService } from '~/applicant/applicant.service';
import { ApplicantEntity } from '~/applicant/applicant.entity';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([ApplicantEntity])],
  providers: [
    ApplicantResolver,
    ApplicantService,
    JwtService,
    {
      provide: PROVIDE_JWT_KEY,
      useFactory: () => process.env.JWT_SECRET_KEY,
    },
  ],
  exports: [ApplicantService],
})
export class ApplicantModule {}
