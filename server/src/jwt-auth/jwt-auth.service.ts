import { Injectable, NotFoundException } from '@nestjs/common';

import { JwtUserDto } from '~/jwt/dto/jwt-user.dto';
import { UserService } from '~/user/user.service';
import { ApplicantService } from '~/applicant/applicant.service';
import { JwtService } from '~/jwt/jwt.service';
import { CryptoService } from '~/utils/crypto.service';
import { SignInInput, JwtToken } from '~/graphql.schema';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly applicantService: ApplicantService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async signIn(payload: SignInInput): Promise<JwtToken> {
    const applicant = await this.userService.findByEmail(payload.email);

    const existsApplicant = await this.applicantService.findByEmail(
      payload.email,
    );

    const userEmail = applicant?.email || existsApplicant?.email;

    if (userEmail !== payload.email) {
      throw new NotFoundException('User don not exist');
    }

    const userPassword = applicant?.password || existsApplicant?.password;
    const isPasswordCompared = await this.cryptoService.comparePasswords(
      payload.password,
      userPassword,
    );

    if (!isPasswordCompared) {
      throw new NotFoundException('Bad password');
    }

    let tokenData: JwtUserDto;

    if (applicant) {
      tokenData = {
        id: applicant.id,
        email: applicant.email,
        isDraft: false,
      };
    } else {
      tokenData = {
        id: existsApplicant.id,
        email: existsApplicant.email,
        isDraft: true,
      };
    }
    const token = await this.jwtService.generateToken(tokenData);

    return {
      token,
      userId: tokenData.id,
    };
  }
}
