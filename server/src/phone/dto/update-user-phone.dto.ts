import { IsNumber, IsNotEmpty } from 'class-validator';
import { PhoneInput } from '../../graphql.schema';

export class UpdateUserPhoneDto extends PhoneInput {
  @IsNotEmpty()
  @IsNumber()
  countryCode: number;

  @IsNotEmpty()
  @IsNumber()
  number: number;
}
