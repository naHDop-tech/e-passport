import {createDomain} from "@components/UserProfile/store/init";

export const countriesAndNationalitiesDomain = createDomain()

countriesAndNationalitiesDomain.store.$nationalitiesStore.on(
    countriesAndNationalitiesDomain.effect.getNationalitiesFx.failData, (cs, error: any) => ({ ...cs, serverError: error.data.error.message })
)
countriesAndNationalitiesDomain.store.$countriesStore.on(
    countriesAndNationalitiesDomain.effect.getCountriesFx.failData, (cs, error: any) => ({ ...cs, serverError: error.data.error.message })
)

countriesAndNationalitiesDomain.store.$nationalitiesStore.on(
    countriesAndNationalitiesDomain.effect.getNationalitiesFx.doneData, (cs, data) => {
        if (data.data) {
            return ({...cs, nationalities: data.data});
        }
        return cs
    }
)
countriesAndNationalitiesDomain.store.$countriesStore.on(
    countriesAndNationalitiesDomain.effect.getCountriesFx.doneData, (cs, data) => {
        if (data.data) {
            return ({...cs, countries: data.data});
        }
        return cs
    }
)