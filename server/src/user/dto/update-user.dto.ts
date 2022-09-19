import {
  MinLength,
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { UpdateUserInput } from '../../graphql.schema';

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
  countryResident: string;

  @IsOptional()
  @IsBoolean()
  isVerified: boolean;
}
