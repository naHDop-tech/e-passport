import { IsString, IsNotEmpty } from 'class-validator';
import { FileInput } from '../../graphql.schema';

export class UploadUserPhotoDto extends FileInput {
  @IsNotEmpty()
  @IsString()
  mimetype: string;

  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  @IsString()
  encoding: string;
}
