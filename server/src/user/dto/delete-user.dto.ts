import { IsNotEmpty, IsUUID } from 'class-validator';
import { DeleteUserInput } from '../../graphql.schema';

export class DeleteUserDto extends DeleteUserInput {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
