import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Fingerprint } from '~/graphql.schema';
import { FingerprintGuard } from '~/fingerprint/fingerpring.guard';
import { FingerprintService } from '~/fingerprint/fingerprint.service';
import { UpdateFingerprintDto } from '~/fingerprint/dto/update-fingerprint.dto';
import { UserId } from '~/decorators/user-id.decorator';

@Resolver(() => Fingerprint)
export class FingerprintResolver {
    constructor(private readonly fingerprintService: FingerprintService) {}

    @Mutation('updateFingerprint')
    @UseGuards(FingerprintGuard)
    async updateFingerprint(
        @Args('updateFingerprintInput') payload: UpdateFingerprintDto,
        @UserId() userId: string,
    ): Promise<Fingerprint> {
        return await this.fingerprintService.updateFingerPrint(payload, userId);
    }
}
