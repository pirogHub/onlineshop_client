import { FC, PropsWithChildren, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './CatalogPage.module.scss'
import { useTheme } from '@/hooks/useTheme'
import { AnimatePresence } from 'framer-motion'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock/ManufacturersBlock'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import { getBoilerPartsFx } from '@/app/api/boilerparts'
import {
  $boilerManufacturers,
  $boilerParts,
  $filteredBoilerParts,
  $partsManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
  setFilteredBoilerParts,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import Skeleton from '@/components/elements/Skeleton/Skeleton'
import CatalogItem from './CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IBoilerParts } from '@/types/boilerparts'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters/CatalogFilters'
import { IQueryFull } from '@/types/query'
import { checkQueryParams, createQuery } from '@/utils/aboutQuery'
import { usePopup } from '@/hooks/usePopups'
import SVG from '@/components/elements/ui/svg'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const router = useRouter()
  const darkModeClass = useTheme(styles)

  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 9000])
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)

  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )
  const boilerParts = useStore($boilerParts)
  const pagesCount = Math.ceil(boilerParts.count / 20)
  const partsManufacturers = useStore($partsManufacturers)
  const boilerManufacturers = useStore($boilerManufacturers)
  const filteredBoilerParts = useStore($filteredBoilerParts)
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )
  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  )

  const { toggleOpen, closePopup, open } = usePopup()

  const updateParamsAndFiltersFromQuery = async (
    callback: VoidFunction, // устанавливаем значения из query в фильтры
    path: string // делаем запрос по этому пути
  ) => {}

  useEffect(() => {
    getBoilerPartsByQuery()
  }, [])

  const loadBoilerParts = async (queryFull?: IQueryFull) => {
    try {
      setSpinner(true)
      let data: IBoilerParts = {} as IBoilerParts

      console.log('queryFull', queryFull)
      let newQuery = 'limit=20&offset=0'
      let newQueryObj = router.query as any
      if (queryFull) {
        newQuery = queryFull.query
        newQueryObj = queryFull.queryObj as any
        // data = await getBoilerPartsFx(`/boiler-parts?${queryFull.query}`)
        // router.push(
        //   {
        //     query: {
        //       // ...router.query,
        //       ...queryFull.queryObj,
        //       offset: data.offset,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // setFilteredBoilerParts(data as any)
      } else {
        //   data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
        //   router.push(
        //     {
        //       query: {
        //         ...router.query,
        //         offset: data.offset,
        //       },
        //     },
        //     undefined,
        //     { shallow: true }
        //   )
        // }
      }

      data = await getBoilerPartsFx(`/boiler-parts?${newQuery}`)
      router.push(
        { query: { ...newQueryObj, offset: data.offset } },
        undefined,
        { shallow: true }
      )
      resetPagination(data, data.offset)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 500)
    }
  }

  useEffect(() => {
    loadBoilerParts()
  }, [isFilterInQuery])

  const resetPagination = (data: IBoilerParts, currentPage = 0) => {
    setCurrentPage(currentPage)
    setBoilerParts(data)
  }

  const getBoilerPartsByQuery = (selected = 0) => {
    const { preQueryObj } = checkQueryParams(router)

    const queryFull = createQuery({
      priceRange: preQueryObj.priceRange,
      boilerManufacturersStringArr: preQueryObj.boilers,
      partsManufacturersStringArr: preQueryObj.parts,
      limit: 20,
      currentPage: selected,
      isPriceRangeChanged: true,
    })

    loadBoilerParts(queryFull)
  }
  const handlePageChange = async ({ selected }: { selected: number }) => {
    console.log('handlePageChange')
    let newOffset = selected

    if (selected > pagesCount) {
      newOffset = pagesCount
    }
    console.log('newOffset', newOffset)
    getBoilerPartsByQuery(newOffset)
  }

  const resetFilters = async () => {
    try {
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
      router.push({ query: { first: 'cheap' } }, undefined, { shallow: true })
      setBoilerManufacturers(
        boilerManufacturers.map((item) => ({ ...item, checked: false }))
      )
      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      )
      setBoilerParts(data)
      setPriceRange([1000, 9000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <section className={styles.catalog}>
      <div
        className={cn('container', styles.catalog__container, darkModeClass)}
      >
        <h2 className={cn(styles.catalog__title, darkModeClass)}>
          Каталог товаров
        </h2>
        <div className={cn(styles.catalog__top, darkModeClass)}>
          <AnimatePresence>
            {isAnyBoilerManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель котлов:"
                event={updateBoilerManufacturer}
                manufacturersList={boilerManufacturers}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyPartsManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель запчастей:"
                event={updatePartsManufacturer}
                manufacturersList={partsManufacturers}
              />
            )}
          </AnimatePresence>
          <div className={cn(styles.catalog__top__inner, darkModeClass)}>
            <button
              onClick={resetFilters}
              disabled={resetFilterBtnDisabled}
              className={cn(styles.catalog__top__reset, darkModeClass)}
            >
              Сбросить фильтры
            </button>
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <SVG.FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Фильтры
              </span>
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>
        <div className={cn(styles.catalog__bottom, darkModeClass)}>
          <div className={cn(styles.catalog__bottom__inner, darkModeClass)}>
            <CatalogFilters
              priceRange={priceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              setPriceRange={setPriceRange}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              applyFilters={loadBoilerParts}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              setIsFilterInQuery={setIsFilterInQuery}
              currentPage={currentPage}
              filtersMobileOpen={open}
              closePopup={closePopup}
              spinner={spinner}
            />
            {spinner ? (
              <Skeleton.SkeletonUl count={8} />
            ) : (
              <ul className={cn(styles.catalog__list, darkModeClass)}>
                {boilerParts.rows?.length ? (
                  boilerParts.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={cn(
              styles.catalog__bottom__list__break__link,
              darkModeClass
            )}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage