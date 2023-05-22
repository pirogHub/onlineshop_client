import { FC, PropsWithChildren, useState } from 'react'
import cn from 'classnames'
import styles from './CatalogPage.module.scss'
import { useTheme } from '@/hooks/useTheme'
import { IBoilerPart } from '@/types/boilerparts'
import Link from 'next/link'
import { formatPrice } from '@/utils/common'
import { useStore } from 'effector-react'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverSvg from './svg/CartHoverSvg'
import CartHoverCheckedSvg from './svg/CartHoverCheckedSvg'
import Spinner from '@/components/elements/Spinner/Spinner'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const [spinner, setSpinner] = useState(false)
  const darkModeClass = useTheme(styles)
  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
  return (
    <li className={cn(styles.catalog__list__item, darkModeClass)}>
      <img src={JSON.parse(item.images)[0]} alt={item.name} />

      <div className={cn(styles.catalog__list__item__inner, darkModeClass)}>
        <Link
          href={`/catalog/${item.id}`}
          className={cn(styles.catalog__list__item__inner, darkModeClass)}
        >
          <h3 className={cn(styles.catalog__list__item__title, darkModeClass)}>
            {item.name}
          </h3>
        </Link>
        <span className={cn(styles.catalog__list__item__code, darkModeClass)}>
          Артикул : {item.vendor_code}
        </span>
        <span className={cn(styles.catalog__list__item__price, darkModeClass)}>
          Цена : {formatPrice(item.price)} P
        </span>
      </div>
      <button
        className={cn(styles.catalog__list__item__cart, darkModeClass, {
          [styles.added]: isInCart,
        })}
        disabled={spinner}
      >
        {spinner ? (
          <Spinner style={{ top: 6, left: 6 }} />
        ) : (
          <span>{!isInCart ? <CartHoverSvg /> : <CartHoverCheckedSvg />}</span>
        )}
      </button>
    </li>
  )
}

export default CatalogItem
