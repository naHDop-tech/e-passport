import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '~/user/user.module';
import { UtilsModule } from '~/utils/utils.module';
import { UserPassportResolver } from '~/passport/passport.resolver';
import { UserPassportService } from '~/passport/passport.service';
import { PassportEntity } from '~/passport/passport.entity';

@Module({
    imports: [UserModule, UtilsModule, TypeOrmModule.forFeature([PassportEntity])],
    providers: [UserPassportResolver, UserPassportService],
    exports: [UserPassportService],
})
export class PassportModule {}
