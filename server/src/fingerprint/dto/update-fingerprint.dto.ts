import { IsString, IsNotEmpty } from 'class-validator';
import { FingerprintInput } from '~/graphql.schema';

export class UpdateFingerprintDto extends FingerprintInput{
    @IsString()
    @IsNotEmpty()
    publicKey: string;
}
