import { IBoilerPart, IBoilerParts } from "@/types/boilerparts";
import { createDomain } from "effector";


const boilerParts = createDomain()

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()

export const setBoilerParts_cheapFirst = boilerParts.createEvent()
export const setBoilerParts_expensiveFirst = boilerParts.createEvent()
export const setBoilerParts_byPopularity = boilerParts.createEvent()

export const $boilerParts = boilerParts.createStore<IBoilerParts>({} as IBoilerParts)
    .on(setBoilerParts, (_, parts) => parts)
    .on(setBoilerParts_cheapFirst, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => a.price - b.price),
    }))
    .on(setBoilerParts_expensiveFirst, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => b.price - a.price),
    }))
    .on(setBoilerParts_byPopularity, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => b.popularity - a.popularity),
    }))