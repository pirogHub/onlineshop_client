import { motion } from 'framer-motion'
import cn from 'classnames'
import { useTheme } from '@/hooks/useTheme'
import styles from '../../templates/CatalogPage/CatalogPage.module.scss'
import {
  IFilterCheckboxItem,
  IManufacturersBlockItemProps,
} from '@/types/catalog'
import DeleteSvg from '@/components/elements/DeleteSvg'
const ManufacturersBlockItem = ({
  event,
  item,
}: IManufacturersBlockItemProps) => {
  const darkModeClass = useTheme(styles)

  const removeFilter = () =>
    event({ checked: !item.checked, id: item.id } as IFilterCheckboxItem)
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(styles.manufacturers__list__item, darkModeClass)}
    >
      <span className={cn(styles.manufacturers__list__text, darkModeClass)}>
        {item.title}
      </span>
      <button
        onClick={removeFilter}
        className={cn(styles.manufacturers__list__item__btn, darkModeClass)}
      >
        <span>
          <DeleteSvg />
        </span>
      </button>
    </motion.li>
  )
}

export default ManufacturersBlockItem
