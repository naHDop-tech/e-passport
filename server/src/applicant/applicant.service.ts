import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ApplicantEntity } from '~/applicant/applicant.entity';
import { CreateApplicantDto } from '~/applicant/dto/create-applicant.dto';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(ApplicantEntity)
    private readonly applicantRepository: Repository<ApplicantEntity>,
  ) {}

  async isApplicantExists(email: string): Promise<boolean> {
    const applicant = await this.applicantRepository.findOne({
      where: { email },
    });

    if (applicant?.email === email) {
      return true;
    }
    return false;
  }

  async create(applicant: CreateApplicantDto): Promise<ApplicantEntity> {
    const existsApplicant = await this.isApplicantExists(applicant.email);

    if (existsApplicant) {
      throw new ConflictException('Applicant already using');
    }

    const newApplicant = this.applicantRepository.create(applicant);

    return this.applicantRepository.save(newApplicant);
  }

  async findById(id: string): Promise<ApplicantEntity> {
    if (!id) {
      throw new NotFoundException('Applicant not found');
    }

    return await this.applicantRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<ApplicantEntity> {
    if (!email) {
      throw new NotFoundException('Applicant not found');
    }

    return await this.applicantRepository.findOne({ where: { email } });
  }
}
