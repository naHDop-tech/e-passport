export interface ICountry {
    name: string
    code: string
}

export interface INationality {
    code: number,
    alpha_2: string
    alpha_3: string
    nationality: string
}

export interface IUserProfileStore {
    first_name: string,
    last_name: string,
    birth_date: string,
    nationality: number,
    sex: string
}

export interface IUserPhoneStore {
    country_code: string
    number: string
}

export interface ICommonResponseStore {
    serverError: string
    status: string
}

export interface IUserPhotoStore {
    file?: File
}

export interface INationalitiesStore {
    nationalities: INationality[]
    serverError?: string
}

export interface ICountriesStore {
    countries: ICountry[]
    serverError?: string
}

export interface IPhoneInfo {
    phone_id: string
    country_code: string
    number: string
}

export interface IPhotoInfo {
    photo_id: string
    external_id: string
    secure_url: string
    url: string
}

export interface IAddressInfo {
    address_id: string
    country: string
    city: string
    line_1: string
    line_2: string
    zip: string
}

export interface IRoleInfo {
    role_id: string
    role_name: string
    role_class: string
}

export interface IPassportInfo {
    passport_id: string
    passport_country_code: string
    issuing_organization: string
    mrz_l1: string
    mrz_l2: string
    u_number: string
    p_number: string
    passport_issue_date: string
    passport_expiration_date: string
    place_of_birth: string
    passport_type: string
}

export interface IFullUserInfo {
    id?: string
    first_name?: string
    last_name?: string
    email?: string
    birth_date?: string
    sex?: string
    nationality?: INationality
    role?: IRoleInfo
    passport?: IPassportInfo
    phone?: IPhoneInfo
    photo?: IPhotoInfo
    address?: IAddressInfo
}
