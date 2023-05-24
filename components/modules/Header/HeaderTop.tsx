import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './Header.module.scss'
import Link from 'next/link'
import CityButton from '@/components/elements/CityButton/CityButton'
import ProfileDropdown from './ProfileDropdown/ProfileDropdown'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import { useTheme } from '@/hooks/useTheme'
import { usePopup } from '@/hooks/usePopups'

interface INavItem {
  href: string
  title: string
  onClick?: () => void
}

const NavItem: FC<PropsWithChildren<INavItem>> = ({
  onClick,
  href,
  title,
  children,
}) => {
  const darkModeClass = useTheme(styles)
  return (
    <li
      onClick={onClick}
      className={cn(styles.header__nav__list__item, darkModeClass)}
    >
      {children ? (
        children
      ) : (
        <Link
          href={href}
          className={cn(styles.header__nav__list__item__link, darkModeClass)}
        >
          {title}
        </Link>
      )}
    </li>
  )
}

const HeaderTop: FC = () => {
  const isMedia950 = useMediaQuery(950)
  const darkModeClass = useTheme(styles)

  const { closePopup, open, toggleOpen } = usePopup()
  return (
    <div className={styles.header__top}>
      <div
        className={cn('container', {
          [styles['open']]: open,
          [styles['header__top__container']]: true,
        })}
      >
        {isMedia950 && (
          <button
            onClick={toggleOpen}
            className={cn(
              styles.burger_menu,
              { [styles['open']]: open },
              darkModeClass
            )}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        {!isMedia950 && <CityButton />}
        <nav
          className={cn(styles.header__nav, darkModeClass, {
            [styles['open']]: open,
          })}
        >
          <ul className={styles.header__nav__list}>
            <NavItem
              onClick={closePopup}
              href="shipping-payment"
              title="Доставка и оплата"
            />
            <NavItem onClick={closePopup} href="about" title="О компании" />
            <NavItem onClick={closePopup} href="catalog" title="Каталог" />
            <NavItem onClick={closePopup} href="contacts" title="Контакты" />
            <NavItem
              onClick={closePopup}
              href="wholesale-buyers"
              title="Отптовым покупателям"
            />
            {isMedia950 && [
              <NavItem
                onClick={closePopup}
                key={'cityButton'}
                href="-"
                title="-"
              >
                <CityButton />
              </NavItem>,
              <NavItem key={'modeToggler'} href="-" title="-">
                <ModeToggler />
              </NavItem>,
            ]}
          </ul>
        </nav>
        <ProfileDropdown />
      </div>
    </div>
  )
}

export default HeaderTop
