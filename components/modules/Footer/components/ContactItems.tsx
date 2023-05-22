import { useTheme } from '@/hooks/useTheme'
import { FC, PropsWithChildren } from 'react'

import styles from '../Footer.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import MaterialIcon from '@/components/MaterialIcon/MaterialIcon'

const OneItem: FC<PropsWithChildren<{ href: string; title: string }>> = ({
  href,
  title,
  children,
}) => {
  const darkModeClass = useTheme(styles)
  return (
    <li className={cn(styles.footer__top__item__list__item, darkModeClass)}>
      <Link
        className={cn(
          styles.footer__top__item__list__item__link,
          darkModeClass
        )}
        href={href}
      >
        <span>{title}</span>
        <span>{children}</span>
      </Link>
    </li>
  )
}

const ContactItems = () => {
  return (
    <ul
      className={cn(
        styles.footer__top__item__list,
        styles.footer__top__item__contacts
      )}
    >
      <OneItem href="/contacts" title="Наш адрес">
        <MaterialIcon name="MdOutlineLocationOn" /> Lorem ipsum dolor sit amet.
      </OneItem>
      <OneItem href="tel:+0123456789" title="Наш контактный телефон:">
        <MaterialIcon name="FiPhoneCall" /> +0 123 45 67 89
      </OneItem>
      <OneItem href="mailto:email@email.email" title="Email">
        <MaterialIcon name="RxEnvelopeClosed" /> email@email.email
      </OneItem>
    </ul>
  )
}

export default ContactItems
