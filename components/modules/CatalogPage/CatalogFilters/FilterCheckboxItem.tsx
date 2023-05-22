import { useTheme } from '@/hooks/useTheme'
import { IFilterCheckboxItem } from '@/types/catalog'
import styles from '@/components/templates/CatalogPage/CatalogPage.module.scss'

import cn from 'classnames'

const FilterCheckboxItem = ({
  title,
  checked,
  id,
  event,
}: IFilterCheckboxItem) => {
  const darkModeClass = useTheme(styles)

  const handleFilterChange = () =>
    event({ checked: !checked, id } as IFilterCheckboxItem)

  return (
    <li className={cn(styles.filters__manufacturer__list__item, darkModeClass)}>
      <label>
        <input
          onChange={handleFilterChange}
          type="checkbox"
          checked={checked}
        />
        <span>{title}</span>
      </label>
    </li>
  )
}

export default FilterCheckboxItem
