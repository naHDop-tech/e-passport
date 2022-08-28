import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Applicant } from '~/graphql.schema';
import { ApplicantGuard } from '~/applicant/applicant.guard';
import { ApplicantService } from '~/applicant/applicant.service';
import { CreateApplicantDto } from '~/applicant/dto/create-applicant.dto';

@Resolver((of) => Applicant)
export class ApplicantResolver {
  constructor(private readonly applicantService: ApplicantService) {}

  @Query('isApplicantExists')
  async isUserExists(@Args('email') email: string): Promise<boolean> {
    return this.applicantService.isApplicantExists(email);
  }

  @Query('user')
  @UseGuards(ApplicantGuard)
  async findOneById(@Args('id') id: string): Promise<Applicant> {
    return this.applicantService.findById(id);
  }

  @Mutation('createApplicant')
  async create(
    @Args('createApplicantInput') payload: CreateApplicantDto,
  ): Promise<Applicant> {
    const createdApplicant = await this.applicantService.create(payload);
    return createdApplicant;
  }
}
