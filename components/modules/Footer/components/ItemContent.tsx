import Link from 'next/link'
import styles from '../Footer.module.scss'

export type TypeItemContentItem = {
  href: string
  label: string
}

const ItemContent = ({ items }: { items: Array<TypeItemContentItem> }) => {
  return (
    <ul className={styles.footer__top__item__list}>
      {!!items.length &&
        items.map((i) => (
          <li
            key={i.href + i.label}
            className={styles.footer__top__item__list__item}
          >
            <Link
              className={styles.footer__top__item__list__item__link}
              href={i.href}
            >
              {i.label}
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default ItemContent
