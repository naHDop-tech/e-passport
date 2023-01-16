import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { UpdatePassportInput } from '~/graphql.schema';

export class UpdatePassportDto extends UpdatePassportInput {
    @IsString()
    @IsOptional()
    placeOfBirth?: string;
    
    @IsString()
    @IsOptional()
    publicKey?: string
}
