import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  readonly salt: number;
  constructor() {
    this.salt = 1001;
  }

  async generateHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash;
  }

  async comparePasswords(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    const result: boolean = await bcrypt.compare(password, passwordHash);
    return result;
  }
}
