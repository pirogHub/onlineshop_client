import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { IFiltersPopupProps } from '@/types/catalog'
import FiltersTopPopup from './FiltersTopPopup'
import ManufacturerAccordion from '../ManufacturerAccordion'
import styles from '@/components/templates/CatalogPage/CatalogPage.module.scss'
import { useTheme } from '@/hooks/useTheme'

const FiltersPopup = ({
  resetFilterBtnDisabled,
  resetAllManufacturers,
  handleClosePopup,
  updateManufacturer,
  setManufacturer,
  applyFilters,
  openPopup,
  title,
  manufacturersList,
}: IFiltersPopupProps) => {
  const darkModeClass = useTheme(styles)

  return (
    <div
      className={`${styles.filters__popup} ${darkModeClass} ${
        openPopup ? styles.open : ''
      }`}
    >
      <div className={styles.filters__popup__inner}>
        <FiltersTopPopup
          resetBtnText="Сбросить"
          title={title as string}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetAllManufacturers}
          closePopup={handleClosePopup}
        />
        <ManufacturerAccordion
          manufacturersList={manufacturersList}
          title={false}
          updateManufacturer={updateManufacturer}
          setManufacturer={setManufacturer}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={resetFilterBtnDisabled}
          onClick={applyFilters}
          style={{ marginBottom: 12 }}
        >
          Показать
        </button>
        <button
          className={styles.filters__actions__reset}
          onClick={handleClosePopup}
        >
          Назад
        </button>
      </div>
    </div>
  )
}

export default FiltersPopup
