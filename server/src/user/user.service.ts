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
import { ApplicantService } from '~/applicant/applicant.service';
import { CryptoService } from '~/utils/crypto.service';
import { UpdateUserInput } from '~/graphql.schema';
import { UserFactory } from '~/user/user.factory';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dateCalculatorService: DateCalculatorService,
    private readonly cryptoService: CryptoService,
    private readonly applicantService: ApplicantService,
    private readonly userFactory: UserFactory,
  ) {}

  async isUserExists(email: string): Promise<boolean> {
    const applicant = await this.userRepository.findOne({
      where: { email },
    });

    if (applicant?.email === email) {
      return true;
    }
    return false;
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const applicant = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (applicant?.email === user.email) {
      throw new ConflictException('Email already using');
    }

    const existsApplicant = await this.applicantService.findByEmail(user.email);

    if (!existsApplicant) {
      throw new ConflictException('Draft user not exists');
    }

    user.age = this.dateCalculatorService.getAgeFromBirthDate(user.birthDate);
    const passwordHash = await this.cryptoService.generateHash(user.password);
    user.password = passwordHash;
    const newUser = this.userRepository.create(user);
    newUser.applicant = existsApplicant;

    return this.userRepository.save(newUser);
  }

  async findById(id: string): Promise<UserEntity> {
    if (!id) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    if (!email) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.findOne({ where: { email } });
  }

  async removeById(id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.remove(user);
  }

  async updateById(id: string, payload: UpdateUserInput): Promise<UserEntity> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = this.userFactory.update(user, payload);

    return this.userRepository.save(updatedUser);
  }

  async setVerify(id: string, state: boolean): Promise<UserEntity> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isVerified = state;
    return this.userRepository.save(user);
  }
}
