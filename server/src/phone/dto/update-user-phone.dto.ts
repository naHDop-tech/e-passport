import { IsInt, IsNotEmpty } from 'class-validator';
import { PhoneInput } from '../../graphql.schema';

export class UpdateUserPhoneDto extends PhoneInput {
  @IsNotEmpty()
  @IsInt()
  countryCode: number;

  @IsNotEmpty()
  @IsInt()
  number: number;
}
