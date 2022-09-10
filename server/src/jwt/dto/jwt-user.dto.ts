import {
  IsUUID,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export const PROVIDE_JWT_KEY = 'JWT_SECRET';

export class JwtUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsUUID()
  id?: string;

  @IsBoolean()
  isDraft: boolean;
}
