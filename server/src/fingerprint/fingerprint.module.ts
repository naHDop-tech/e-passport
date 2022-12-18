import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FingerprintResolver } from '~/fingerprint/fingerprint.resolver';
import { FingerprintService } from '~/fingerprint/fingerprint.service';
import { FingerprintEntity } from '~/fingerprint/fingerprint.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FingerprintEntity])],
    providers: [FingerprintResolver, FingerprintService],
    exports: [FingerprintService],
})
export class FingerprintModule {}
