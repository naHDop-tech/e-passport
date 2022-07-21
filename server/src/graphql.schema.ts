
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateCatInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class FingerprintInput {
    id: string;
    publicKey: string;
    privateKey: string;
}

export class UserInput {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    countryResident: string;
    age: number;
    isVerified: boolean;
    address?: Nullable<AddressInput>;
    phone?: Nullable<PhoneInput>;
    photo?: Nullable<PhotoInput>;
}

export class CreatePassportInput {
    user: UserInput;
    identifier: string;
    number: string;
}

export class UpdatePassportInput {
    fingerprint: FingerprintInput;
}

export class PhoneInput {
    id: string;
    countryCode: number;
    number: number;
}

export class CreatePhoneInput {
    countryCode: number;
    number: number;
}

export class UpdatePhoneInput {
    countryCode?: Nullable<number>;
    number?: Nullable<number>;
}

export class PhotoInput {
    id: string;
    externalId: string;
    name: string;
    url: string;
    isDeleted: boolean;
}

export class CreatePhotoInput {
    externalId: string;
    name: string;
    url: string;
}

export class UpdatePhotoInput {
    externalId: string;
    name: string;
    url: string;
}

export class MarkAsDeletePhotoInput {
    id: string;
}

export class AddressInput {
    id: string;
    country: string;
    city: string;
    line1: string;
    line2: string;
    zip: number;
}

export class CreateAddressInput {
    country: string;
    city: string;
    line1: string;
    line2: string;
    zip: number;
}

export class UpdateAddressInput {
    country?: Nullable<string>;
    city?: Nullable<string>;
    line1?: Nullable<string>;
    line2?: Nullable<string>;
    zip?: Nullable<number>;
}

export class CreateUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    countryResident: string;
}

export class DeleteUserInput {
    id: string;
}

export class UpdateUserInput {
    id: string;
    email?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    birthDate?: Nullable<string>;
    countryResident?: Nullable<string>;
    isVerified?: Nullable<boolean>;
}

export abstract class IQuery {
    abstract cats(): Nullable<Nullable<Cat>[]> | Promise<Nullable<Nullable<Cat>[]>>;

    abstract cat(id: string): Nullable<Cat> | Promise<Nullable<Cat>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createCat(createCatInput?: Nullable<CreateCatInput>): Nullable<Cat> | Promise<Nullable<Cat>>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(deleteUserId: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract catCreated(): Nullable<Cat> | Promise<Nullable<Cat>>;

    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userPhoneUpdated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userAddressUpdated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userPersonalDataUpdated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userDeleted(): Nullable<User> | Promise<Nullable<User>>;
}

export class Owner {
    id: number;
    name: string;
    age?: Nullable<number>;
    cats?: Nullable<Cat[]>;
}

export class Cat {
    id?: Nullable<number>;
    name?: Nullable<string>;
    age?: Nullable<number>;
    owner?: Nullable<Owner>;
}

export class Fingerprint {
    id: string;
    publicKey: string;
    privateKey: string;
}

export class Passport {
    id: string;
    identifier: string;
    number: string;
    user: User;
    fingerprint: Fingerprint;
}

export class Phone {
    id: string;
    countryCode: number;
    number: number;
}

export class Photo {
    id: string;
    externalId: string;
    name: string;
    url: string;
    isDeleted: boolean;
}

export class Address {
    id?: Nullable<string>;
    country?: Nullable<string>;
    city?: Nullable<string>;
    line1?: Nullable<string>;
    line2?: Nullable<string>;
    zip?: Nullable<number>;
}

export class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    countryResident: string;
    age: number;
    isVerified: boolean;
    passport?: Nullable<Passport>;
    address?: Nullable<Address>;
    phone?: Nullable<Phone>;
    photo?: Nullable<Photo>;
}

type Nullable<T> = T | null;
