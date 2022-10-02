import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Phone } from '~/graphql.schema';
import { PhoneGuard } from '~/phone/phone.guard';
import { UserPhoneService } from '~/phone/phone.service';
import { UpdateUserPhoneDto } from '~/phone/dto/update-user-phone.dto';
import { UserId } from '~/decorators/user-id.decorator';

@Resolver(() => Phone)
export class UserPhoneResolver {
  constructor(private readonly userPhoneService: UserPhoneService) {}

  @Mutation('updateUserPhone')
  @UseGuards(PhoneGuard)
  async uploadUserImage(
    @Args('createPhotoInput') payload: UpdateUserPhoneDto,
    @UserId() userId: string,
  ): Promise<Phone> {
    return await this.userPhoneService.updateUserPhone(payload, userId);
  }
}
