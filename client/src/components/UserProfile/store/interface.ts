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
    code: number,
    alfa_2: string
    alfa_3: string
    nationalities: string
}