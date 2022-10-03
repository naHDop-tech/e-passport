import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '~/user/user.module';
import { UserPhoneResolver } from '~/phone/phone.resolver';
import { UserPhoneService } from '~/phone/phone.service';
import { PhoneEntity } from '~/phone/phone.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([PhoneEntity])],
  providers: [UserPhoneResolver, UserPhoneService],
  exports: [UserPhoneService],
})
export class PhoneModule {}
