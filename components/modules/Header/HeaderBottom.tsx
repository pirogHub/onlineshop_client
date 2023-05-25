import { FC, PropsWithChildren, useEffect, useState } from 'react'

import styles from './Header.module.scss'
import { useTheme } from '@/hooks/useTheme'
import Link from 'next/link'
import cn from 'classnames'
import MaterialIcon from '@/components/MaterialIcon/MaterialIcon'
import SearchInput from '@/components/elements/SearchInput/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import CartPopup from './CartPopup/CartPopup'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useRouter } from 'next/router'
import { setDisableCart } from '@/context/shopping-cart'

const HeaderBottom: FC<PropsWithChildren> = () => {
  const darkModeClass = useTheme(styles)

  const isMedia950 = useMediaQuery(950)
  const router = useRouter()
  const [isCartToHide, setIsCartToHide] = useState(true)
  useEffect(() => {
    if (router.pathname === '/order') {
      setDisableCart(true)
      setIsCartToHide(true)
    } else {
      setDisableCart(false)
      setIsCartToHide(false)
    }
  }, [router.pathname])

  return (
    <div className={styles.header__bottom}>
      <div className={cn('container', styles.header__bottom__container)}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard" className={styles.header__logo__link}>
            <img src="/img/logo.svg" alt="logo" />

            <span
              className={cn(styles.header__logo__link__text, darkModeClass)}
            >
              Детали для газовых котлов
            </span>
          </Link>
        </h1>
        <div className={cn(styles.header__search, darkModeClass)}>
          <SearchInput />
        </div>
        <div className={cn(styles.header__shopping_cart, darkModeClass)}>
          {!isMedia950 && <ModeToggler />}
          {!isCartToHide && <CartPopup />}
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
