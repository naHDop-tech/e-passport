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
    user.isVerified = updateOptions.isVerified
      ? updateOptions.isVerified
      : user.isVerified;
    user.countryResident = updateOptions.countryResident
      ? updateOptions.countryResident
      : user.countryResident;

    return user;
  }
}
