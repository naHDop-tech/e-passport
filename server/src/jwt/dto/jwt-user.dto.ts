import { IsUUID, IsNotEmpty, IsEmail } from 'class-validator';

export const PROVIDE_JWT_KEY = 'JWT_SECRET';

export class JwtUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsUUID()
  id: string;
}
