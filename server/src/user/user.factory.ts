import { UserEntity } from '~/user/user.entity';
import { UpdateUserInput } from '~/graphql.schema';

export class UserFactory {
  update(user: UserEntity, updateOptions: UpdateUserInput) {
    user.email = updateOptions.email ? updateOptions.email : user.email;
    user.firstName = updateOptions.firstName
      ? updateOptions.firstName
      : user.firstName;
    user.lastName = updateOptions.lastName
      ? updateOptions.lastName
      : user.lastName;
    user.nationality = updateOptions.nationality
      ? updateOptions.nationality
      : user.nationality;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user.sex = updateOptions.sex ? updateOptions.sex : user.sex;

    return user;
  }
}
