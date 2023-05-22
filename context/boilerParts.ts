import { IBoilerPart, IBoilerParts } from "@/types/boilerparts";
import { IFilterCheckboxItem } from "@/types/catalog";
import { boilerManufacturers, partsManufacturers } from "@/utils/catalog";
import { createDomain } from "effector";

const boilerParts = createDomain()

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()
export const setBoilerParts_cheapFirst = boilerParts.createEvent()
export const setBoilerParts_expensiveFirst = boilerParts.createEvent()
export const setBoilerParts_byPopularity = boilerParts.createEvent()

export const setBoilerManufacturers =
    boilerParts.createEvent<IFilterCheckboxItem[]>()
export const updateBoilerManufacturer =
    boilerParts.createEvent<IFilterCheckboxItem>()
export const setPartsManufacturers =
    boilerParts.createEvent<IFilterCheckboxItem[]>()
export const updatePartsManufacturer =
    boilerParts.createEvent<IFilterCheckboxItem>()

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


const updateManufacturer = (manufacturers: IFilterCheckboxItem[], id: string, payload: Partial<IFilterCheckboxItem>) =>
    manufacturers.map(item => {
        if (item.id === id) {
            return {
                ...item,
                ...payload
            }
        }

        return item
    })





export const $boilerManufacturers = boilerParts.createStore<IFilterCheckboxItem[]>(boilerManufacturers as IFilterCheckboxItem[])
    .on(setBoilerManufacturers, (_, parts) => parts)
    .on(updateBoilerManufacturer, (state, payload) => [
        ...updateManufacturer(state, payload.id as string, { checked: payload.checked })
    ])

export const $partsManufacturers = boilerParts.createStore<IFilterCheckboxItem[]>(partsManufacturers as IFilterCheckboxItem[])
    .on(updatePartsManufacturer, (state, payload) => [
        ...updateManufacturer(state, payload.id as string, { checked: payload.checked })
    ])


