import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '~/user/user.module';
import { UtilsModule } from '~/utils/utils.module';
import { PassportUtilsService } from '~/utils/passport-utils.service';
import { FingerprintModule } from '~/fingerprint/fingerprint.module';
import { UserPassportResolver } from '~/passport/passport.resolver';
import { UserPassportService } from '~/passport/passport.service';
import { PassportEntity } from '~/passport/passport.entity';

@Module({
    imports: [
        UserModule,
        FingerprintModule,
        UtilsModule,
        PassportUtilsService,
        TypeOrmModule.forFeature([PassportEntity])
    ],
    providers: [UserPassportResolver, UserPassportService],
    exports: [UserPassportService],
})
export class PassportModule {}
