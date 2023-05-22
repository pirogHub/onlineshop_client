import { useTheme } from '@/hooks/useTheme'
import cn from 'classnames'
import { motion } from 'framer-motion'
import styles from '../../templates/CatalogPage/CatalogPage.module.scss'
import { IManufacturersBlockProps } from '@/types/catalog'
const ManufacturersBlock = ({ title }: IManufacturersBlockProps) => {
  const darkModeClass = useTheme(styles)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(styles.dashboard__alert, darkModeClass)}
    >
      <h3 className={cn(styles.manufactires__title, darkModeClass)}>{title}</h3>
      <ul className={cn(styles.manufactires__list, darkModeClass)}>
        {[].map((item) => (
          <li key={item} />
        ))}
      </ul>
    </motion.div>
  )
}

export default ManufacturersBlock
