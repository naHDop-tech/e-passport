import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FingerprintResolver } from '~/fingerprint/fingerprint.resolver';
import { FingerprintService } from '~/fingerprint/fingerprint.service';
import { FingerprintEntity } from '~/fingerprint/fingerprint.entity';
import { JwtService } from "~/jwt/jwt.service";
import { PROVIDE_JWT_KEY } from "~/jwt/dto/jwt-user.dto";

@Module({
    imports: [TypeOrmModule.forFeature([FingerprintEntity])],
    providers: [
        FingerprintResolver,
        FingerprintService,
        JwtService,
        {
            provide: PROVIDE_JWT_KEY,
            useFactory: () => process.env.JWT_SECRET_KEY,
        },
    ],
    exports: [FingerprintService],
})
export class FingerprintModule {}
