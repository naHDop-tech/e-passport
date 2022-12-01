import { AddressEntity } from '~/user-address/user-address.entity';
import { AddressInput } from '~/graphql.schema';

export class UserAddressFactory {
  update(address: AddressEntity, updateOptions: AddressInput) {
    address.country = updateOptions.country
      ? updateOptions.country
      : address.country;
    address.city = updateOptions.city ? updateOptions.city : address.city;
    address.line1 = updateOptions.line1 ? updateOptions.line1 : address.line1;
    address.line2 = updateOptions.line2 ? updateOptions.line2 : address.line2;
    address.zip = updateOptions.zip ? updateOptions.zip : address.zip;

    return address;
  }
}
