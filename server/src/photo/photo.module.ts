import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '~/user/user.module';
import { UserPhotoResolver } from '~/photo/photo.resolver';
import { UserPhotoService } from '~/photo/photo.service';
import { PhotoEntity } from '~/photo/photo.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([PhotoEntity])],
  providers: [UserPhotoResolver, UserPhotoService],
  exports: [UserPhotoService],
})
export class PhotoModule {}
