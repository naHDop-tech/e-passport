import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class JwtUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
