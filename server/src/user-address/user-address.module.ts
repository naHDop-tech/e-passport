import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '~/user/user.module';
import { UserAddressResolver } from '~/user-address/user-address.resolver';
import { UserAddressService } from '~/user-address/user-address.service';
import { AddressEntity } from '~/user-address/user-address.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([AddressEntity])],
  providers: [UserAddressResolver, UserAddressService],
  exports: [UserAddressService],
})
export class AddressModule {}
