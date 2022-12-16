import {
  MinLength,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { CreateUserInput } from '../../graphql.schema';
import { Sex } from '../user.interfaces';

export class CreateUserDto extends CreateUserInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  password: string;

  @IsString()
  @IsNotEmpty()
  sex: Sex;
}
