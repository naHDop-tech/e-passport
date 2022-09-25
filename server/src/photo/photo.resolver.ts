import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Photo } from '~/graphql.schema';
import { PhotoGuard } from '~/photo/photo.guard';
import { UserPhotoService } from '~/photo/photo.service';
import { UploadUserPhotoDto } from '~/photo/dto/upload-user-photo.dto';
import { UserId } from '~/decorators/user-id.decorator';

@Resolver(() => Photo)
export class UserPhotoResolver {
  constructor(private readonly userPhotoService: UserPhotoService) {}

  @Mutation('uploadUserImage')
  @UseGuards(PhotoGuard)
  async uploadUserImage(
    @Args('createPhotoInput') payload: UploadUserPhotoDto,
    @UserId() userId: string,
  ): Promise<Photo> {
    return await this.userPhotoService.updateUserPhoto(payload, userId);
  }
}
