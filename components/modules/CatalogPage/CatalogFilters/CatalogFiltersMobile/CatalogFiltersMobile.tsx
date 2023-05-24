import { useTheme } from '@/hooks/useTheme'
import { ICatalogFilterMobileProps } from '@/types/catalog'
import styles from '@/components/templates/CatalogPage/CatalogPage.module.scss'
import cn from 'classnames'
import Spinner from '@/components/elements/Spinner/Spinner'
import FiltersTopPopup from './FiltersTopPopup'
import FiltersPopup from './FiltersPopup'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import { useStore } from 'effector-react'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from '../../PriceRange'

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  priceRange,
  setIsPriceRangeChanged,
  setPriceRange,
}: ICatalogFilterMobileProps) => {
  const darkModeClass = useTheme(styles)
  const partsManufacturers = useStore($partsManufacturers)
  const boilerManufacturers = useStore($boilerManufacturers)

  const [openBoilers, setOpenBoilers] = useState(false)
  const [openParts, setOpenParts] = useState(false)
  const handleOpenBoilers = () => setOpenBoilers(true)
  const handleCloseBoilers = () => setOpenBoilers(false)
  const handleOpenParts = () => setOpenParts(true)
  const handleCloseParts = () => setOpenParts(false)
  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )
  const isMobile = useMediaQuery(820)

  const resetAllBoilerManufacturers = () =>
    setBoilerManufacturers(
      boilerManufacturers.map((item) => ({ ...item, checked: false }))
    )

  const resetAllPartsManufacturers = () =>
    setPartsManufacturers(
      partsManufacturers.map((item) => ({ ...item, checked: false }))
    )

  const applyFiltersAndClosePopup = () => {
    applyFilters()
    closePopup()
  }

  return (
    <div
      className={cn(styles.catalog__bottom__filters, darkModeClass, {
        [styles.open]: filtersMobileOpen,
      })}
    >
      <div
        className={cn(styles.catalog__bottom__filters__inner, darkModeClass)}
      >
        <FiltersTopPopup
          resetBtnText="Сбросить всё"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />

        <div
          className={cn(styles.filters__boiler_manufacturers, darkModeClass)}
        >
          <button
            onClick={handleOpenBoilers}
            className={cn(styles.filters__manufacturer__btn, darkModeClass)}
          >
            Производитель котлов
          </button>
          <FiltersPopup
            title="Производитель котлов"
            resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
            setManufacturer={setBoilerManufacturers}
            updateManufacturer={updateBoilerManufacturer}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={boilerManufacturers}
            resetAllManufacturers={resetAllBoilerManufacturers}
            handleClosePopup={handleCloseBoilers}
            openPopup={openBoilers}
          />
        </div>
        <div
          className={cn(styles.filters__boiler_manufacturers, darkModeClass)}
        >
          <button
            onClick={handleOpenParts}
            className={cn(styles.filters__manufacturer__btn, darkModeClass)}
          >
            Производитель запчастей
          </button>
          <FiltersPopup
            title="Производитель запчастей"
            resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
            setManufacturer={setPartsManufacturers}
            updateManufacturer={updatePartsManufacturer}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={partsManufacturers}
            resetAllManufacturers={resetAllPartsManufacturers}
            handleClosePopup={handleCloseParts}
            openPopup={openParts}
          />
        </div>
        <div className={cn(styles.filters__price)}>
          <Accordion
            titleClass={cn(styles.filters__manufacturer__btn, darkModeClass)}
            hideArrowClass={styles.hide_arrow}
            title="Цена"
            isMobileForFilters={isMobile}
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
      </div>

      <div className={cn(styles.filters__actions, darkModeClass)}>
        <button
          disabled={resetFilterBtnDisabled}
          onClick={applyFiltersAndClosePopup}
          className={cn(styles.filters__actions__show, darkModeClass)}
        >
          {spinner ? <Spinner style={{ top: 6, left: '47%' }} /> : 'Показать'}
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersMobile
