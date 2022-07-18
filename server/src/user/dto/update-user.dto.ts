import {
  MinLength,
  IsString,
  IsOptional,
  IsUUID,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { UpdateUserInput } from '../../graphql.schema';

export class UpdateUserDto extends UpdateUserInput {
  @IsNotEmpty()
  @IsUUID()
  id: string;

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
