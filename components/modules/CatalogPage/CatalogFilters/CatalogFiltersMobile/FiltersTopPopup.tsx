import { useTheme } from '@/hooks/useTheme'
import { ICatalogFilterMobileProps, IFiltersPopupTop } from '@/types/catalog'
import styles from '@/components/templates/CatalogPage/CatalogPage.module.scss'
import cn from 'classnames'

const FiltersTopPopup = ({
  closePopup,
  resetBtnText,
  resetFilterBtnDisabled,
  resetFilters,
  title,
}: IFiltersPopupTop) => {
  const darkModeClass = useTheme(styles)

  return (
    <div className={cn(styles.catalog__bottom__filters__top, darkModeClass)}>
      <button
        className={cn(styles.catalog__bottom__filters__title, darkModeClass)}
        onClick={closePopup}
      >
        {title}
      </button>
      <button
        className={cn(styles.catalog__bottom__filters__reset, darkModeClass)}
        onClick={resetFilters}
        disabled={resetFilterBtnDisabled}
      >
        {resetBtnText}
      </button>
    </div>
  )
}

export default FiltersTopPopup
