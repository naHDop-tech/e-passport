import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Passport } from '~/graphql.schema';
import { PassportGuard } from '~/passport/passport.guard';
import { UserPassportService } from '~/passport/passport.service';
import { UpdatePassportDto } from '~/passport/dto/update-passport.dto';
import { UserId } from '~/decorators/user-id.decorator';

@Resolver(() => Passport)
export class UserPassportResolver {
    constructor(private readonly userPassportService: UserPassportService) {}

    @Mutation('updateUserPassport')
    @UseGuards(PassportGuard)
    async uploadUserImage(
        @Args('updateUserPassportInput') payload: UpdatePassportDto,
        @UserId() userId: string,
    ): Promise<Passport> {
        return await this.userPassportService.changeUserPassport(payload, userId);
    }
}
