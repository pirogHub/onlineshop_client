import { FC, PropsWithChildren } from 'react'

import styles from './Header.module.scss'
import { useTheme } from '@/hooks/useTheme'
import Link from 'next/link'
import cn from 'classnames'
import MaterialIcon from '@/components/MaterialIcon/MaterialIcon'
import SearchInput from '@/components/elements/SearchInput/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import CartPopup from './CartPopup/CartPopup'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const HeaderBottom: FC<PropsWithChildren> = () => {
  const darkModeClass = useTheme(styles)

  const isMedia950 = useMediaQuery(950)

  return (
    <div className={styles.header__bottom}>
      <div className={cn('container', styles.header__bottom__container)}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard" className={styles.header__logo}>
            <img src="/img/logo.svg" alt="logo" />

            <span className={cn(styles.header__logo, darkModeClass)}>
              Детали для газовых котлов
            </span>
          </Link>
        </h1>
        <div className={cn(styles.header__search, darkModeClass)}>
          <SearchInput />
          <button className={cn(styles.header__search__btn, darkModeClass)}>
            <span className={cn(styles.header__span, darkModeClass)}>
              <MaterialIcon name="MdSearch" />
            </span>
          </button>
        </div>
        <div className={cn(styles.header__shopping_cart, darkModeClass)}>
          {!isMedia950 && <ModeToggler />}
          <CartPopup />
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
