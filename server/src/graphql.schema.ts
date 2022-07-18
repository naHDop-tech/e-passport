
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

export class CreatePassportInput {
    user: User;
    identifier: string;
    number: string;
}

export class UpdatePassportInput {
    fingerprint: Fingerprint;
}

export class UpdatePhoneInput {
    countryCode?: Nullable<number>;
    number?: Nullable<number>;
}

export class UpdateAddressInput {
    country?: Nullable<string>;
    city?: Nullable<string>;
    line1?: Nullable<string>;
    line2?: Nullable<string>;
    zip?: Nullable<number>;
}

export class CreateUserInput {
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
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    birthDate?: Nullable<string>;
    countryResident?: Nullable<string>;
    isVerified?: Nullable<boolean>;
    address?: Nullable<UpdateAddressInput>;
    phone?: Nullable<UpdatePhoneInput>;
}

export abstract class IQuery {
    abstract cats(): Nullable<Nullable<Cat>[]> | Promise<Nullable<Nullable<Cat>[]>>;

    abstract cat(id: string): Nullable<Cat> | Promise<Nullable<Cat>>;
}

export abstract class IMutation {
    abstract createCat(createCatInput?: Nullable<CreateCatInput>): Nullable<Cat> | Promise<Nullable<Cat>>;
}

export abstract class ISubscription {
    abstract catCreated(): Nullable<Cat> | Promise<Nullable<Cat>>;
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
    id?: Nullable<string>;
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
    id?: Nullable<string>;
    countryCode?: Nullable<number>;
    number?: Nullable<number>;
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
    id?: Nullable<string>;
    firstName: string;
    lastName: string;
    birthDate: string;
    countryResident: string;
    age?: Nullable<number>;
    isVerified?: Nullable<boolean>;
    passport?: Nullable<Passport>;
    address?: Nullable<Address>;
    phone?: Nullable<Phone>;
}

type Nullable<T> = T | null;
