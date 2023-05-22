import { useTheme } from '@/hooks/useTheme'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import styles from '../../templates/CatalogPage/CatalogPage.module.scss'
import { IManufacturersBlockProps } from '@/types/catalog'
import ManufacturersBlockItem from './ManufacturersBlockItem'
import { updateBoilerManufacturer } from '@/context/boilerParts'
const ManufacturersBlock = ({
  title,
  event,
  manufacturersList,
}: IManufacturersBlockProps) => {
  const darkModeClass = useTheme(styles)
  const checkedItems =
    manufacturersList && manufacturersList.length
      ? manufacturersList.filter((item) => item.checked === true)
      : []
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(styles.manufacturers, darkModeClass)}
    >
      <h3 className={cn(styles.manufacturers__title, darkModeClass)}>
        {title}
      </h3>
      <AnimatePresence>
        <ul className={cn(styles.manufacturers__list, darkModeClass)}>
          {checkedItems.map((item) => (
            <ManufacturersBlockItem key={item.id} item={item} event={event} />
          ))}
        </ul>
      </AnimatePresence>
    </motion.div>
  )
}

export default ManufacturersBlock
