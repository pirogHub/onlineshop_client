import cn from 'classnames'
import styles from './Skeleton.module.scss'
import { useTheme } from '@/hooks/useTheme'

const Skeleton = ({ style }: { style: any }) => {
  const darkModeClass = useTheme(styles)
  return (
    <div style={style} className={cn(styles.skeleton__item, darkModeClass)}>
      <div className={styles.skeleton__item__light}></div>
    </div>
  )
}

export default Skeleton
