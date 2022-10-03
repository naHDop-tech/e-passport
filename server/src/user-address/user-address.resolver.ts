import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Address } from '~/graphql.schema';
import { AddressGuard } from '~/user-address/user-address.guard';
import { UserAddressService } from '~/user-address/user-address.service';
import { UpdateUserAddressDto } from '~/user-address/dto/update-user-address.dto';
import { UserId } from '~/decorators/user-id.decorator';

@Resolver(() => Address)
export class UserAddressResolver {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Mutation('updateUserAddress')
  @UseGuards(AddressGuard)
  async uploadUserImage(
    @Args('updateAddressInput') payload: UpdateUserAddressDto,
    @UserId() userId: string,
  ): Promise<Address> {
    return await this.userAddressService.changeUserAddress(payload, userId);
  }
}
