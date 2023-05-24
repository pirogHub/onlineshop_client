import { IFilterCheckboxItem } from "./catalog"

export interface ICreateQuery {
    priceRange?: number[]
    isPriceRangeChanged: boolean
    boilerManufacturers?: IFilterCheckboxItem[]
    partsManufacturers?: IFilterCheckboxItem[]
    boilerManufacturersStringArr?: string[]
    partsManufacturersStringArr?: string[]
    currentPage: number
    limit: number
}

export interface IQueryObj {
    boiler?: string,
    parts?: string,
    priceFrom?: number,
    priceTo?: number,
    offset?: number,
    limit: number
}

export interface IQueryFull {
    query: string
    queryObj: IQueryObj
}
