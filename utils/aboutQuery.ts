import { IFilterCheckboxItem } from "@/types/catalog"
import { ICreateQuery, IQueryFull, IQueryObj, IQueryObjForRouter } from "@/types/query"
import { NextRouter } from "next/router"


export const createQuery = ({
    priceRange, isPriceRangeChanged, boilerManufacturers, partsManufacturers, currentPage, limit,
    boilerManufacturersTitlesArr, partsManufacturersTitlesArr
}: ICreateQuery): IQueryFull => {

    let query: string = `limit=${limit}`
    const queryObj: IQueryObj = {} as IQueryObj
    const queryObjForRouter: IQueryObjForRouter = {} as IQueryObjForRouter

    if (isPriceRangeChanged && priceRange && priceRange[0] && priceRange[1]) {
        const priceFrom = Math.ceil(priceRange[0])
        const priceTo = Math.ceil(priceRange[1])
        if (typeof priceFrom === "number" && typeof priceTo === "number") {
            query += `&priceFrom=${priceFrom}&priceTo=${priceTo}`
            queryObj.priceFrom = priceFrom
            queryObj.priceTo = priceTo
            queryObjForRouter.priceFrom = priceFrom
            queryObjForRouter.priceTo = priceTo

        }
    }
    let boilers
    let parts
    if (boilerManufacturers) {
        boilers = boilerManufacturers
            .filter((item) => item.checked === true)
            .map((item) => item.title)
    } else if (boilerManufacturersTitlesArr) {
        try {
            boilers = boilerManufacturersTitlesArr
        } catch (error) {

        }
    }
    if (partsManufacturers) {
        parts = partsManufacturers
            .filter((item) => item.checked === true)
            .map((item) => item.title)
    } else if (partsManufacturersTitlesArr) {
        try {

            parts = partsManufacturersTitlesArr
        } catch (error) {
            // parts
        }
    }

    if (boilers && boilers.length) {
        const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers))
        const boilerQuery = `&boiler=${encodedBoilerQuery}`
        query += boilerQuery
        queryObj.boiler = boilers
        queryObjForRouter.boiler = encodedBoilerQuery

    }
    if (parts && parts.length) {
        const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
        const partsQuery = `&parts=${encodedPartsQuery}`
        query += partsQuery
        queryObj.parts = parts

        queryObjForRouter.parts = encodedPartsQuery

    }

    const initialPage = currentPage > 0 ? currentPage : 0

    query += `&offset=${initialPage}`
    queryObj.offset = initialPage + 1
    queryObjForRouter.offset = initialPage + 1


    return { query, queryObj, queryObjForRouter }
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
    const priceFromQueryValue = (getQueryParamOnFirstRender(
        'priceFrom',
        router
    ) as string)
    const priceToQueryValue = (getQueryParamOnFirstRender(
        'priceTo',
        router
    ) as string)

    let boilerQueryValue
    let partsQueryValue
    try {
        boilerQueryValue = JSON.parse(
            decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string)
        )


    } catch (error) {

    }
    try {


        partsQueryValue = JSON.parse(
            decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
        )
    } catch (error) {

    }


    const isValidBoilerQuery =
        Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
    const isValidPartsQuery =
        Array.isArray(partsQueryValue) && !!partsQueryValue?.length
    const isValidPriceQuery = priceFromQueryValue !== null &&
        checkPriceFromQuery(+priceFromQueryValue) && priceToQueryValue !== null
    checkPriceFromQuery(+priceToQueryValue)

    const preQueryObj = {
        ...(isValidPriceQuery ? { priceRange: [+priceFromQueryValue, +priceToQueryValue] } : {}),
        ...(isValidBoilerQuery ? { boiler: boilerQueryValue } : {}),
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
