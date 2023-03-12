export interface IUserProfile {
    firstName: string,
    lastName: string,
    birthDate: string,
    nationality: string,
    sex: string
}

export interface ICountry {
    name: string
    code: string
}

export interface INationality {
    code: string,
    alpha_2: string
    alpha_3: string
    nationalities: string
}

export interface INationalitiesStore {
    nationalities: INationality[]
    serverError?: string
}

export interface ICountriesStore {
    countries: ICountry[]
    serverError?: string
}