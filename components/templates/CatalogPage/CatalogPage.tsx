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
  $partsManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
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

  const isAnyBoilerManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartsManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  )

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        })
        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )
        }
        resetPagination(data)
        return
      }

      const offset = +query.offset - 1
      const result = await getBoilerPartsFx(
        `/boiler-parts?limit=20&offset=${offset}`
      )

      setCurrentPage(offset)

      setBoilerParts(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  useEffect(() => {
    loadBoilerParts()
  }, [])

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      if (selected > pagesCount) {
        // resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        resetPagination(data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        // resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        resetPagination(data)
        return
      }

      // const { isValidBoilerQuery, isValidPartsQuery, isValidPriceQuery } =
      // checkQueryParams(router)

      // const result = await getBoilerPartsFx(
      //   `/boiler-parts?limit=20&offset=${selected}${
      //     isFilterInQuery && isValidBoilerQuery
      //       ? `&boiler=${router.query.boiler}`
      //       : ''
      //   }${
      //     isFilterInQuery && isValidPartsQuery
      //       ? `&parts=${router.query.parts}`
      //       : ''
      //   }${
      //     isFilterInQuery && isValidPriceQuery
      //       ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
      //       : ''
      //   }`
      // )
      const result = await getBoilerPartsFx(
        `/boiler-parts?limit=20&offset=${selected}`
      )
      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setBoilerParts(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    try {
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
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
              Сбросить фильтр
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={cn(styles.catalog__bottom, darkModeClass)}>
          <div className={cn(styles.catalog__bottom__inner, darkModeClass)}>
            <CatalogFilters
              priceRange={priceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              setPriceRange={setPriceRange}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              applyFilters={() => {}}
              resetFilters={resetFilters}
              spinner={spinner}
              isPriceRangeChanged={isPriceRangeChanged}
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
