import { FC } from 'react'
import cn from 'classnames'
import styles from './Header.module.scss'
import Link from 'next/link'
import CityButton from '@/components/elements/CityButton/CityButton'

interface INavItem {
  href: string
  title: string
}

const NavItem = ({ href, title }: INavItem) => {
  return (
    <li className={styles.header__nav__list__item}>
      <Link href={href} className={styles.header__nav__list__item__link}>
        {title}
      </Link>
    </li>
  )
}

const HeaderTop: FC = () => {
  return (
    <div className={styles.header__top}>
      <div className={cn('container', styles.header__top__container)}>
        <CityButton />
        <nav className={styles.header__nav}>
          <ul className={styles.header__nav__list}>
            <NavItem href="shopping-payment" title="Доставка и оплата" />
            <NavItem href="about" title="О компании" />
            <NavItem href="catalog" title="Каталог" />
            <NavItem href="contacts" title="Контакты" />
            <NavItem href="wholesale-byers" title="Отптовым покупателям" />
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default HeaderTop
