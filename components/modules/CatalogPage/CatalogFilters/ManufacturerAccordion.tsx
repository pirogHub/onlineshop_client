import cn from 'classnames'
import styles from '@/components/templates/CatalogPage/CatalogPage.module.scss'
import { useTheme } from '@/hooks/useTheme'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IFilterManufacturerAccordionProps } from '@/types/catalog'
import Accordion from '@/components/elements/Accordion/Accordion'
import FilterCheckboxItem from './FilterCheckboxItem'

const ManufacturerAccordion = ({
  manufacturersList,
  setManufacturer,
  title,
  updateManufacturer,
  isExpandedDefault,
}: IFilterManufacturerAccordionProps) => {
  const isMobile = useMediaQuery(820)
  const darkModeClass = useTheme(styles)

  const chooseAllManufacturers = () =>
    setManufacturer(
      manufacturersList.map((item) => ({ ...item, checked: true }))
    )
  return (
    <Accordion
      title={title}
      titleClass={cn(styles.filters__manufacturer__btn, darkModeClass)}
      arrowOpenClass={styles.open}
      isMobileForFilters={isMobile}
      hideArrowClass={isMobile ? styles.hide_arrow : ''}
      isExpandedDefault={isExpandedDefault}
    >
      <div className={cn(styles.filters__manufacturer__inner, darkModeClass)}>
        <button
          onClick={chooseAllManufacturers}
          className={cn(
            styles.filters__manufacturer__select_all,
            darkModeClass
          )}
        >
          Выбрать все
        </button>
        <ul className={cn(styles.filters__manufacturer__list, darkModeClass)}>
          {manufacturersList.map((item) => (
            <FilterCheckboxItem
              title={item.title}
              id={item.id}
              key={item.id}
              checked={item.checked}
              event={updateManufacturer}
            />
          ))}
        </ul>
        <div style={{ height: 24 }}></div>
      </div>
    </Accordion>
  )
}

export default ManufacturerAccordion
