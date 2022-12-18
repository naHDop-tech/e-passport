import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  readonly salt: number;
  constructor() {
    this.salt = 10;
  }

  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt);
  }

  async comparePasswords(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
