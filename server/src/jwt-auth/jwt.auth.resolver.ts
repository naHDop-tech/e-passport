import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { JwtUserDto } from '~/jwt-auth/dto/jwt-auth.dto';
import { JwtAuthService } from '~/jwt-auth/jwt-auth.service';
import { JwtToken } from '~/graphql.schema';

@Resolver((of) => JwtToken)
export class JwtAuthResolver {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Mutation('signIn')
  async signIn(@Args('signInInput') payload: JwtUserDto): Promise<JwtToken> {
    const token = await this.jwtAuthService.signIn(payload);
    return token;
  }
}
