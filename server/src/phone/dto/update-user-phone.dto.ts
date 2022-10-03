import { IsString, IsNotEmpty } from 'class-validator';
import { PhoneInput } from '../../graphql.schema';

export class UpdateUserPhoneDto extends PhoneInput {
  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  number: string;
}
