import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '~/user/user.service';
import { AddressEntity } from '~/user-address/user-address.entity';
import { UserEntity } from '~/user/user.entity';
import { UpdateUserAddressDto } from '~/user-address/dto/update-user-address.dto';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly userAddressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
  ) {}

  async save(address: AddressEntity): Promise<AddressEntity> {
    return await this.userAddressRepository.save(address);
  }

  async changeUserAddress(
    payload: UpdateUserAddressDto,
    userId: string,
  ): Promise<AddressEntity> {
    const applicantUser = await this.userService.findById(userId);

    if (!applicantUser) {
      throw new NotFoundException('User not found');
    }

    if (!applicantUser?.address?.id) {
      return this.createAddress(payload, applicantUser);
    } else {
      return this.updateAddress(payload, userId);
    }
  }

  private async updateAddress(
    payload: UpdateUserAddressDto,
    userId: string,
  ): Promise<AddressEntity> {
    const userAddress = await this.userAddressRepository.findOne({
      where: { user: { id: userId } },
    });
    userAddress.country = payload.country;
    userAddress.city = payload.city;
    userAddress.line1 = payload.line1;
    userAddress.line2 = payload.line2;
    userAddress.zip = payload.zip;

    return await this.userAddressRepository.save(userAddress);
  }

  private async createAddress(
    payload: UpdateUserAddressDto,
    user: UserEntity,
  ): Promise<AddressEntity> {
    const newUserAddress = this.userAddressRepository.create(payload);
    user.address = newUserAddress;

    await this.userService.save(user);

    return user.address;
  }
}
