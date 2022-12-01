import { MinLength, IsString, IsOptional } from 'class-validator';
import { AddressInput } from '../../graphql.schema';

export class UpdateUserAddressDto extends AddressInput {
  @IsOptional()
  @IsString()
  @MinLength(3)
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  city: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  line1: string;

  @IsOptional()
  @IsString()
  line2: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  zip: string;
}
