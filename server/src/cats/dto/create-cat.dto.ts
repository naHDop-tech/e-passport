import { Min, IsString } from 'class-validator';
import { CreateCatInput } from '../../graphql.schema';

export class CreateCatDto extends CreateCatInput {
  @IsString()
  name: string;

  @Min(1)
  age: number;
}
