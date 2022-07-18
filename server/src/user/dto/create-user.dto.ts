import { MinLength, IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { CreateUserInput } from '../../graphql.schema';

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
  countryResident: string;
}
