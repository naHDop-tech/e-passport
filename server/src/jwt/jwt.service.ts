import { Inject, Injectable, ConflictException } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

import { PROVIDE_JWT_KEY } from '~/jwt/dto/jwt-user.dto';
import { JwtUserDto } from '~/jwt/dto/jwt-user.dto';

@Injectable()
export class JwtService {
  constructor(
    @Inject(PROVIDE_JWT_KEY)
    private readonly jwtSecret: string,
  ) {}

  generateToken(user: JwtUserDto): string {
    if (!user) {
      throw new ConflictException('No user data');
    }

    const data = {
      dateTime: Date(),
      id: user.id,
      email: user.email,
      idDraft: user.isDraft,
    };

    const token = jwt.sign(data, this.jwtSecret, {
      expiresIn: '4d',
    }) as string;

    return token;
  }

  validateToken(token: string): Record<string, string> {
    if (!token) {
      throw new ConflictException('Token not provided');
    }

    const verified = jwt.verify(token, this.jwtSecret, {}) as Record<
      string,
      string
    >;

    return verified;
  }

  isTokenValid(token: string): boolean {
    if (!token) {
      throw new ConflictException('Token not provided');
    }

    try {
      return !!jwt.verify(token, this.jwtSecret, { algorithms: ['RS256'] });
    } catch {
      return false;
    }
  }
}
