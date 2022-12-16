import {
  MinLength,
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { UpdateUserInput } from '~/graphql.schema';
import { Sex } from '../user.interfaces';

export class UpdateUserDto extends UpdateUserInput {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  lastName: string;

  @IsOptional()
  @IsString()
  birthDate: string;

  @IsOptional()
  @IsString()
  nationality: string;

  @IsOptional()
  @IsBoolean()
  isVerified: boolean;

  @IsOptional()
  @IsString()
  sex: Sex;
}
