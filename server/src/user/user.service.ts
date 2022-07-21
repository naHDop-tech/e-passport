import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '~/user/user.entity';
import { CreateUserDto } from '~/user/dto/create-user.dto';
import { DateCalculatorService } from '~/utils/date-calculator.service';
import { CryptoService } from '~/utils/crypto.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dateCalculatorService: DateCalculatorService,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    const applicant = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (applicant.email === user.email) {
      throw new ConflictException('Email already using');
    }

    user.age = this.dateCalculatorService.getAgeFromBirthDate(user.birthDate);
    const passwordHash = await this.cryptoService.generateHash(user.password);
    user.password = passwordHash;
    const newUser = this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }

  async findById(id: string): Promise<UserEntity> {
    if (!id) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.findOne({ where: { id } });
  }

  async removeById(id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.remove(user);
  }
}
