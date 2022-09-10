import { Inject, Injectable, ConflictException } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

import { PROVIDE_JWT_KEY } from '~/jwt/dto/jwt-user.dto';
import { JwtUserDto } from '~/jwt/dto/jwt-user.dto';
import { JwtToken } from '~/graphql.schema';

@Injectable()
export class JwtService {
  constructor(
    @Inject(PROVIDE_JWT_KEY)
    private readonly jwtSecret: string,
  ) {}

  generateToken(user: JwtUserDto): JwtToken {
    if (!user) {
      throw new ConflictException('No user data');
    }

    const data = {
      dateTime: Date(),
      id: user.id,
      email: user.email,
      idDraft: user.isDraft,
    };

    const token = jwt.sign(data, this.jwtSecret, { expiresIn: '4d' }) as string;

    return { token, userId: user.id };
  }

  validateToken(token: string): boolean {
    if (!token) {
      throw new ConflictException('Token not provided');
    }

    const verified = jwt.verify(token, this.jwtSecret) as Record<
      string,
      string
    >;

    if (verified) {
      return true;
    }

    return false;
  }
}
