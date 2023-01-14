import { IsString, IsNotEmpty } from 'class-validator';
import { UpdatePassportInput } from '~/graphql.schema';

export class UpdatePassportDto extends UpdatePassportInput {
    @IsString()
    @IsNotEmpty()
    nationalityCode: string;
    
    @IsString()
    @IsNotEmpty()
    placeOfBirth: string;
    
    @IsString()
    @IsNotEmpty()
    publicKey: string
}