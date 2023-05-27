import cn from 'classnames'
import styles from './Spinner.module.scss'
import { useTheme } from '@/hooks/useTheme'

const Spinner = ({ style }: { style?: any }) => {
  const darkModeClass = useTheme(styles)

  // if (style) return <div className={cn(styles.spinner, darkModeClass)} />
  // else
  return <div style={style} className={cn(styles.spinner, darkModeClass)} />
}

export default Spinner
