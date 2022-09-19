import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '~/user/user.entity';
import { CreateUserDto } from '~/user/dto/create-user.dto';
import { DateCalculatorService } from '~/utils/date-calculator.service';
import { ApplicantService } from '~/applicant/applicant.service';
import { UpdateUserInput } from '~/graphql.schema';
import { UserFactory } from '~/user/user.factory';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dateCalculatorService: DateCalculatorService,
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

    const existsApplicant = await this.applicantService.findByEmail(user.email);

    if (applicant?.email === user.email) {
      throw new ConflictException('Email already using');
    }

    if (!existsApplicant) {
      throw new ConflictException('Draft user not exists');
    }

    user.age = this.dateCalculatorService.getAgeFromBirthDate(user.birthDate);

    if (user.age < 18) {
      throw new ForbiddenException('Your age should be more then 18 years');
    }

    user.password = existsApplicant.password;
    const newUser = this.userRepository.create(user);

    newUser.applicant = existsApplicant;
    newUser.isVerified = false;
    existsApplicant.user = newUser;

    const savedUser = await this.userRepository.save(newUser);
    await this.applicantService.save(existsApplicant);

    return savedUser;
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

  async updateByEmail(
    email: string,
    payload: UpdateUserInput,
  ): Promise<UserEntity> {
    const user = await this.findByEmail(email);

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
