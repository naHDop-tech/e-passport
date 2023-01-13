import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilsModule } from '~/utils/utils.module';
import { UserModule } from '~/user/user.module';
import { FingerprintResolver } from '~/fingerprint/fingerprint.resolver';
import { FingerprintService } from '~/fingerprint/fingerprint.service';
import { FingerprintEntity } from '~/fingerprint/fingerprint.entity';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([FingerprintEntity]), UtilsModule],
    providers: [FingerprintResolver, FingerprintService],
    exports: [FingerprintService],
})
export class FingerprintModule {}
