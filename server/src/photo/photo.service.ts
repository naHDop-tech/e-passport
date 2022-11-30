import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '~/user/user.service';
import { PhotoEntity } from '~/photo/photo.entity';
import { UploadUserPhotoDto } from '~/photo/dto/upload-user-photo.dto';

@Injectable()
export class UserPhotoService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly userImageRepository: Repository<PhotoEntity>,
    private readonly userService: UserService,
  ) {}

  async updateUserPhoto(
    file: UploadUserPhotoDto,
    userId: string,
  ): Promise<PhotoEntity> {
    const applicantUser = await this.userService.findById(userId);

    if (!applicantUser) {
      throw new NotFoundException('User not found');
    }

    if (!applicantUser?.photo?.id) {
      const newUserPhoto = this.userImageRepository.create(file);
      applicantUser.photo = newUserPhoto;

      await this.userService.save(applicantUser);

      return applicantUser.photo;
    } else {
      const userPhoto = await this.userImageRepository.findOne({
        where: { user: { id: applicantUser.id } },
      });
      userPhoto.mimetype = file.mimetype;
      userPhoto.filename = file.filename;
      userPhoto.encoding = file.encoding;

      return await this.userImageRepository.save(userPhoto);
    }
  }

  async findByUserId(userId: string): Promise<PhotoEntity> {
    if (!userId) {
      throw new NotFoundException('User photo not found');
    }

    return await this.userImageRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async removeByUserId(userId: string) {
    const userPhoto = await this.userImageRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!userPhoto) {
      throw new NotFoundException('User photo not found');
    }

    userPhoto.isDeleted = true;

    return this.userImageRepository.save(userPhoto);
  }
}
