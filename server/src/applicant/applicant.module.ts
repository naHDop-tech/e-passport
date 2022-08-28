import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicantResolver } from '~/applicant/applicant.resolver';
import { UtilsModule } from '~/utils/utils.module';
import { ApplicantService } from '~/applicant/applicant.service';
import { ApplicantEntity } from '~/applicant/applicant.entity';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([ApplicantEntity])],
  providers: [ApplicantResolver, ApplicantService],
  exports: [ApplicantService],
})
export class ApplicantModule {}
