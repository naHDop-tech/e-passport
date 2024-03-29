
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
    publicKey: string;
}

export class SignInInput {
    email: string;
    password: string;
}

export class UpdatePassportInput {
    placeOfBirth?: Nullable<string>;
    publicKey?: Nullable<string>;
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
    country: string;
    city: string;
    line1: string;
    line2: string;
    zip: string;
}

export class CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    nationality: string;
    sex: string;
}

export class DeleteUserInput {
    id: string;
}

export class UpdateUserInput {
    email?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    birthDate?: Nullable<string>;
    nationality?: Nullable<string>;
    sex?: Nullable<string>;
}

export abstract class IQuery {
    abstract user(): Nullable<User> | Promise<Nullable<User>>;

    abstract applicant(): Nullable<Applicant> | Promise<Nullable<Applicant>>;

    abstract isUserExists(email?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract isApplicantExists(email?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract nationalities(): Nullable<Nullable<Nationality>[]> | Promise<Nullable<Nullable<Nationality>[]>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract createApplicant(createApplicantInput?: Nullable<CreateApplicantInput>): Nullable<Applicant> | Promise<Nullable<Applicant>>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(deleteUserId: string): Nullable<User> | Promise<Nullable<User>>;

    abstract uploadUserImage(createPhotoInput?: Nullable<FileInput>): Nullable<Photo> | Promise<Nullable<Photo>>;

    abstract updateUserPhone(updateUserPhoneInput?: Nullable<PhoneInput>): Nullable<Phone> | Promise<Nullable<Phone>>;

    abstract updateUserAddress(updateAddressInput?: Nullable<AddressInput>): Nullable<Address> | Promise<Nullable<Address>>;

    abstract updateUserPassport(updatePassportInput?: Nullable<UpdatePassportInput>): Nullable<Passport> | Promise<Nullable<Passport>>;

    abstract updateFingerprint(updateFingerprintInput?: Nullable<FingerprintInput>): Nullable<Fingerprint> | Promise<Nullable<Fingerprint>>;

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
}

export class JwtToken {
    token: string;
    userId: string;
}

export class Passport {
    id: string;
    mrzL1: string;
    mrzL2: string;
    uNumber: string;
    pNumber: string;
    issuingOrganization: string;
    countryCode: string;
    issueDate: string;
    expirationDate: string;
    type: string;
    placeOfBirth: string;
    fingerprint: Fingerprint;
    user?: Nullable<User>;
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
    id: string;
    country: string;
    city: string;
    line1: string;
    line2: string;
    zip: string;
    createdAt: string;
    updatedAt: string;
    user?: Nullable<User>;
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
    nationality: string;
    sex: string;
    isVerified: boolean;
    address?: Nullable<Address>;
    phone?: Nullable<Phone>;
    photo?: Nullable<Photo>;
    token?: Nullable<string>;
    passport?: Nullable<Passport>;
}

export class Nationality {
    num_code: number;
    alpha_2_code: string;
    alpha_3_code: string;
    en_short_name: string;
    nationality: string;
}

type Nullable<T> = T | null;
