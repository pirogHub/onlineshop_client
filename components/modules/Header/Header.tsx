import { FC } from 'react'

import styles from './Header.module.scss'
import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <HeaderTop />
      <HeaderBottom />
    </div>
  )
}

export default Header
