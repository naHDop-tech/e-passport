import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '~/user/user.service';
import { PhoneEntity } from '~/phone/phone.entity';
import { UpdateUserPhoneDto } from '~/phone/dto/update-user-phone.dto';

@Injectable()
export class UserPhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private readonly userPhoneRepository: Repository<PhoneEntity>,
    private readonly userService: UserService,
  ) {}

  async updateUserPhone(
    payload: UpdateUserPhoneDto,
    userId: string,
  ): Promise<PhoneEntity> {
    const applicantUser = await this.userService.findById(userId);

    if (!applicantUser) {
      throw new NotFoundException('User not found');
    }

    if (!applicantUser?.phone?.id) {
      const newUserPhone = this.userPhoneRepository.create(payload);
      applicantUser.phone = newUserPhone;

      const userPhone = await this.userPhoneRepository.save(newUserPhone);

      await this.userService.save(applicantUser);

      return userPhone;
    } else {
      const userPhone = await this.userPhoneRepository.findOne({
        where: { user: { id: applicantUser.id } },
      });
      userPhone.countryCode = payload.countryCode;
      userPhone.number = payload.number;

      return await this.userPhoneRepository.save(userPhone);
    }
  }

  async findByUserId(userId: string): Promise<PhoneEntity> {
    if (!userId) {
      throw new NotFoundException('User photo not found');
    }

    return await this.userPhoneRepository.findOne({
      where: { user: { id: userId } },
    });
  }
}
