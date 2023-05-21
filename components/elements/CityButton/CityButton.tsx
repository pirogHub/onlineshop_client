import { FC } from 'react'

import MaterialIcon from '@/components/MaterialIcon/MaterialIcon'
import styles from './CityButton.module.scss'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'

import cn from 'classnames'
import { useTheme } from '@/hooks/useTheme'

const CityButton: FC = () => {
  // const mode = useStore($mode)
  // const darkModeClass = mode === 'dark' ? styles.dark_mode : ''
  const darkModeClass = useTheme(styles)
  return (
    <button className={styles.city}>
      <span className={cn(styles.city__span, darkModeClass)}>
        <MaterialIcon name="TfiLocationArrow" isFlipHorizontal />
      </span>
      <span className={cn(styles.city__text, darkModeClass)}>Moscow</span>
    </button>
  )
}

export default CityButton
