import { Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from '~/user/user.service';
import { ApplicantService } from '~/applicant/applicant.service';
import { JwtService } from '~/jwt/jwt.service';
import { SignInInput, JwtToken } from '~/graphql.schema';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly applicantService: ApplicantService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(payload: SignInInput): Promise<JwtToken> {
    const applicant = await this.userService.findByEmail(payload.email);

    const existsApplicant = await this.applicantService.findByEmail(
      payload.email,
    );

    if (
      applicant?.email !== payload.email ||
      existsApplicant?.email !== payload.email
    ) {
      throw new NotFoundException('User don not exist');
    }

    const token = await this.jwtService.generateToken({
      id: applicant.id,
      email: applicant.email,
      applicantId: existsApplicant.id,
    });

    return { token };
  }
}
