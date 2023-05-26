import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { useEffect } from 'react'

import styles from './ModeToggler.module.scss'
import { useToggleTheme } from '@/hooks/useToggleTheme'

const ModeToggler = () => {
  const { toggleTheme } = useToggleTheme()
  const mode = useStore($mode)

  const handleToggleMode = () => {
    toggleTheme()
    document.body.classList.toggle('dark_mode')
  }

  useEffect(() => {
    document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body')
  }, [mode])

  return (
    <div className={styles.theme}>
      <input
        className={styles.theme__input}
        type="checkbox"
        checked={mode === 'light'}
        onChange={handleToggleMode}
      />
    </div>
  )
}
export default ModeToggler
