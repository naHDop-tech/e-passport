import {createEvent, createStore, createEffect} from "effector";

import {ICountriesStore, INationalitiesStore} from "@components/UserProfile/store/interface";
import {nationalitiesApi} from "@components/UserProfile/store/api/nationalities";
import {countriesApi} from "@components/UserProfile/store/api/countries";

export function createDomain() {
    const getNationalitiesEvent = createEvent()
    const getCountriesEvent = createEvent()
    
    const nationalitiesStoreDefault: INationalitiesStore = {
        nationalities: []
    }
    const countriesStoreDefault: ICountriesStore = {
        countries: []
    }
    
    const getNationalitiesFx = createEffect(nationalitiesApi)
    const getCountriesFx = createEffect(countriesApi)
    
    const $nationalitiesStore = createStore<INationalitiesStore>(nationalitiesStoreDefault)
    const $countriesStore = createStore<ICountriesStore>(countriesStoreDefault)
    
    return {
        event: {
            getCountriesEvent,
            getNationalitiesEvent,
        },
        effect: {
            getCountriesFx,
            getNationalitiesFx,
        },
        store: {
            $nationalitiesStore,
            $countriesStore,
        }
    }
}
