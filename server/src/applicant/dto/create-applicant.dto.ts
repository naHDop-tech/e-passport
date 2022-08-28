import {
  MinLength,
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
} from 'class-validator';
import { CreateApplicantInput } from '../../graphql.schema';

export class CreateApplicantDto extends CreateApplicantInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  password: string;
}
