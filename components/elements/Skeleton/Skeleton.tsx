import cn from 'classnames'
import styles from './Skeleton.module.scss'
import { useTheme } from '@/hooks/useTheme'

const SkeletonDiv = ({ style }: { style: any }) => {
  const darkModeClass = useTheme(styles)
  return (
    <div style={style} className={cn(styles.skeleton__item, darkModeClass)}>
      <div className={styles.skeleton__item__light}></div>
    </div>
  )
}

const SkeletonUl = ({ style, count }: { style?: any; count: number }) => {
  const darkModeClass = useTheme(styles)
  return (
    <ul style={style} className={cn(styles.skeleton, darkModeClass)}>
      {Array.from(new Array(count)).map((item, idx) => (
        <li
          style={style}
          key={idx}
          className={cn(styles.skeleton__item, darkModeClass)}
        >
          <div className={styles.skeleton__item__light}></div>
        </li>
      ))}
    </ul>
  )
}

const Skeleton = {
  SkeletonDiv,
  SkeletonUl,
}

export default Skeleton
