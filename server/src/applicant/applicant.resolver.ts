import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Applicant } from '~/graphql.schema';
import { ApplicantGuard } from '~/applicant/applicant.guard';
import { ApplicantService } from '~/applicant/applicant.service';
import { CreateApplicantDto } from '~/applicant/dto/create-applicant.dto';
import { UserEmail } from '~/decorators/user-email.decorator';

@Resolver((of) => Applicant)
export class ApplicantResolver {
  constructor(private readonly applicantService: ApplicantService) {}

  @Query('isApplicantExists')
  async isUserExists(@Args('email') email: string): Promise<boolean> {
    return this.applicantService.isApplicantExists(email);
  }

  @Query('applicant')
  @UseGuards(ApplicantGuard)
  async findOneById(@UserEmail() userEmail: string): Promise<Applicant> {
    return this.applicantService.findByEmail(userEmail);
  }

  @Mutation('createApplicant')
  async create(
    @Args('createApplicantInput') payload: CreateApplicantDto,
  ): Promise<Applicant> {
    const createdApplicant = await this.applicantService.create(payload);
    return createdApplicant;
  }
}
