
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateApplicantInput {
    email: string;
    password: string;
}

export class FingerprintInput {
    id: string;
    publicKey: string;
    privateKey: string;
}

export class SignInInput {
    email: string;
    password: string;
}

export class UserInput {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    birthDate: string;
    countryResident: string;
    age: number;
    isVerified: boolean;
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
    countryCode: string;
    number: string;
}

export class FileInput {
    filename: string;
    mimetype: string;
    encoding: string;
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
    zip: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    countryResident: string;
}

export class DeleteUserInput {
    id: string;
}

export class UpdateUserInput {
    email?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    birthDate?: Nullable<string>;
    countryResident?: Nullable<string>;
    isVerified?: Nullable<boolean>;
}

export abstract class IQuery {
    abstract user(): Nullable<User> | Promise<Nullable<User>>;

    abstract applicant(): Nullable<Applicant> | Promise<Nullable<Applicant>>;

    abstract isUserExists(email?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract isApplicantExists(email?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract createApplicant(createApplicantInput?: Nullable<CreateApplicantInput>): Nullable<Applicant> | Promise<Nullable<Applicant>>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(deleteUserId: string): Nullable<User> | Promise<Nullable<User>>;

    abstract uploadUserImage(createPhotoInput?: Nullable<FileInput>): Nullable<Photo> | Promise<Nullable<Photo>>;

    abstract updateUserPhone(updateUserPhoneInput?: Nullable<PhoneInput>): Nullable<Phone> | Promise<Nullable<Phone>>;

    abstract signIn(signInInput?: Nullable<SignInInput>): Nullable<JwtToken> | Promise<Nullable<JwtToken>>;
}

export abstract class ISubscription {
    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userUpdated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userPhoneUpdated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userAddressUpdated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userPersonalDataUpdated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userDeleted(): Nullable<User> | Promise<Nullable<User>>;
}

export class Applicant {
    id: string;
    email: string;
    password: string;
}

export class Fingerprint {
    id: string;
    publicKey: string;
    privateKey: string;
}

export class JwtToken {
    token: string;
    userId: string;
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
    countryCode: string;
    number: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class Photo {
    id: string;
    filename: string;
    mimetype: string;
    encoding: string;
    createdAt: string;
    updatedAt?: Nullable<string>;
    isDeleted?: Nullable<boolean>;
}

export class Address {
    id?: Nullable<string>;
    country?: Nullable<string>;
    city?: Nullable<string>;
    line1?: Nullable<string>;
    line2?: Nullable<string>;
    zip?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    createdAt: string;
    updatedAt?: Nullable<string>;
    countryResident: string;
    age: number;
    isVerified: boolean;
    passport?: Nullable<Passport>;
    address?: Nullable<Address>;
    phone?: Nullable<Phone>;
    photo?: Nullable<Photo>;
    token?: Nullable<string>;
}

type Nullable<T> = T | null;
