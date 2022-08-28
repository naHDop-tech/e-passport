import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserResolver } from '~/user/user.resolver';
import { UserService } from '~/user/user.service';
import { UtilsModule } from '~/utils/utils.module';
import { ApplicantService } from '~/applicant/applicant.service';
import { ApplicantEntity } from '~/applicant/applicant.entity';
import { ApplicantModule } from '~/applicant/applicant.module';
import { UserEntity } from '~/user/user.entity';
import { UserFactory } from '~/user/user.factory';
@Module({
  imports: [
    UtilsModule,
    TypeOrmModule.forFeature([UserEntity]),
    ApplicantModule,
  ],
  providers: [UserResolver, UserService, UserFactory],
  exports: [UserService],
})
export class UserModule {}
