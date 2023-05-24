import { IFilterCheckboxItem } from "@/types/catalog"
import { ICreateQuery, IQueryFull, IQueryObj } from "@/types/query"
import { NextRouter } from "next/router"


export const createQuery = ({
    priceRange, isPriceRangeChanged, boilerManufacturers, partsManufacturers, currentPage, limit,
    boilerManufacturersStringArr, partsManufacturersStringArr
}: ICreateQuery): IQueryFull => {

    let query: string = `limit=${limit}`
    const queryObj: IQueryObj = {} as IQueryObj

    if (isPriceRangeChanged && priceRange) {
        const priceFrom = Math.ceil(priceRange[0])
        const priceTo = Math.ceil(priceRange[1])
        if (typeof priceFrom === "number" && typeof priceTo === "number") {
            query += `&priceFrom=${priceFrom}&priceTo=${priceTo}`
            queryObj.priceFrom = priceFrom
            queryObj.priceTo = priceTo

        }
    }
    let boilers
    let parts
    if (boilerManufacturers) {
        boilers = boilerManufacturers
            .filter((item) => item.checked === true)
            .map((item) => item.title)
    } else if (boilerManufacturersStringArr) {
        boilers = boilerManufacturersStringArr
    }
    if (partsManufacturers) {
        parts = partsManufacturers
            .filter((item) => item.checked === true)
            .map((item) => item.title)
    } else if (partsManufacturersStringArr) {
        parts = partsManufacturersStringArr
    }

    if (boilers && boilers.length) {
        const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers))
        const boilerQuery = `&boiler=${encodedBoilerQuery}`
        query += boilerQuery
        queryObj.boiler = encodedBoilerQuery

    }
    if (parts && parts.length) {
        const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
        const partsQuery = `&parts=${encodedPartsQuery}`
        query += partsQuery
        queryObj.parts = encodedPartsQuery

    }

    const initialPage = currentPage > 0 ? currentPage : 0

    query += `&offset=${initialPage}`
    queryObj.offset = initialPage + 1



    return { query, queryObj }
}

export const getQueryParamOnFirstRender = (
    queryName: string,
    router: NextRouter
) =>
    router.query[queryName] ||
    router.asPath.match(new RegExp(`[&?]${queryName}=(.*)(&|$)`))

const checkPriceFromQuery = (price: number) =>
    typeof price === "number" && !isNaN(price) && price >= 0 && price <= 10000


export const checkQueryParams = (router: NextRouter) => {
    const priceFromQueryValue = +(getQueryParamOnFirstRender(
        'priceFrom',
        router
    ) as string)
    const priceToQueryValue = +(getQueryParamOnFirstRender(
        'priceTo',
        router
    ) as string)

    const boilerQueryValue = JSON.parse(
        decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string)
    )
    const partsQueryValue = JSON.parse(
        decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
    )
    const isValidBoilerQuery =
        Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
    const isValidPartsQuery =
        Array.isArray(partsQueryValue) && !!partsQueryValue?.length
    const isValidPriceQuery =
        checkPriceFromQuery(+priceFromQueryValue) &&
        checkPriceFromQuery(+priceToQueryValue)

    const preQueryObj = {
        ...(isValidPriceQuery ? { priceRange: [+priceFromQueryValue, +priceToQueryValue] } : {}),
        ...(isValidBoilerQuery ? { boilers: boilerQueryValue } : {}),
        ...(isValidPartsQuery ? { parts: partsQueryValue } : {}),

    }

    return {
        isValidBoilerQuery,
        isValidPartsQuery,
        isValidPriceQuery,
        priceFromQueryValue,
        priceToQueryValue,
        boilerQueryValue,
        partsQueryValue,
        preQueryObj
    }
}
