import { createApi, createEvent, createStore } from "effector";
import { IThemeStore } from "@components/HOC/WithTheme/store/interface";

const isDarkModeInStorage = localStorage.getItem('is_dark_mode')

const changeModeEvent = createEvent()
const themeStoreDefault: IThemeStore = {
    isDarkMode: isDarkModeInStorage !== 'false'
}
const $themeStore = createStore<IThemeStore>(themeStoreDefault)
const themeStoreApi = createApi($themeStore, {
    changeMode: (cs) => {
        localStorage.setItem('is_dark_mode', String(!cs.isDarkMode))
        return { isDarkMode: !cs.isDarkMode}
    }
})

$themeStore.on(changeModeEvent, (cs) => ({ isDarkMode: !cs.isDarkMode}))

export const themeDomain = {
    api: {
        themeStoreApi
    },
    event: {
        changeModeEvent
    },
    store: {
        $themeStore
    }
}