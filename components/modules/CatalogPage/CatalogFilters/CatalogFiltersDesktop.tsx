import cn from 'classnames'
import styles from '@/components/templates/CatalogPage/CatalogPage.module.scss'
import { useTheme } from '@/hooks/useTheme'
import { useStore } from 'effector-react'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import ManufacturerAccordion from './ManufacturerAccordion'
import PriceRange from '../PriceRange'
import Accordion from '@/components/elements/Accordion/Accordion'
import { ICatalogFilterDesktopProps } from '@/types/catalog'
import Spinner from '@/components/elements/Spinner/Spinner'

const CatalogFiltersDesktop = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  applyFilters,
  spinner,
}: ICatalogFilterDesktopProps) => {
  const partsManufacturers = useStore($partsManufacturers)
  const boilerManufacturers = useStore($boilerManufacturers)
  const darkModeClass = useTheme(styles)
  return (
    <div className={cn(styles.catalog__bottom__filters)}>
      <h3 className={cn(styles.catalog__bottom__filters__title, darkModeClass)}>
        Фильтры
      </h3>
      <div className={cn(styles.filters__boiler_manufacturers)}>
        <ManufacturerAccordion
          manufacturersList={boilerManufacturers}
          title="Производитель котлов"
          updateManufacturer={updateBoilerManufacturer}
          setManufacturer={setBoilerManufacturers}
        />
      </div>
      <div className={cn(styles.filters__price)}>
        <Accordion
          titleClass={cn(styles.filters__manufacturer__btn, darkModeClass)}
          arrowOpenClass={styles.open}
          title="Цена"
        >
          <div
            className={cn(styles.filters__manufacturer__inner, darkModeClass)}
          >
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
            />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>
      <div className={cn(styles.filters__boiler_manufacturers)}>
        <ManufacturerAccordion
          manufacturersList={partsManufacturers}
          title="Производитель запчастей"
          updateManufacturer={updatePartsManufacturer}
          setManufacturer={setPartsManufacturers}
          isExpandedDefault
        />
      </div>
      <div className={cn(styles.filters__actions)}>
        <button
          onClick={applyFilters}
          className={cn(styles.filters__actions__show)}
          disabled={resetFilterBtnDisabled || spinner}
        >
          {spinner ? <Spinner style={{ top: 6, left: '46%' }} /> : 'Показать'}
        </button>
        <button
          onClick={resetFilters}
          className={cn(styles.filters__actions__reset)}
          disabled={resetFilterBtnDisabled}
        >
          Сбросить
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
