import {
  FC,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from 'react'
import cn from 'classnames'
import styles from './CatalogPage.module.scss'
import { useTheme } from '@/hooks/useTheme'
import { IBoilerPart } from '@/types/boilerparts'
import Link from 'next/link'
import { formatPrice } from '@/utils/common'
import { useStore } from 'effector-react'
import { $shoppingCart } from '@/context/shopping-cart'
import Spinner from '@/components/elements/Spinner/Spinner'
import { $user } from '@/context/user'
import { toggleCartItem } from '@/utils/shopping-cart'
import SVG from '@/components/elements/ui/svg'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const [spinner, setSpinner] = useState(false)
  const darkModeClass = useTheme(styles)
  // const user = useStore($user)
  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)

  const user = useUser()
  const router = useRouter()

  const toggleCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (user !== false)
      toggleCartItem(user.username, item.id, isInCart, setSpinner)
    else {
      router.push(`/auth?redirect="${router.asPath}"`)
      toast.warning('Войдите в систему, чтобы добавлять товары в корзину')
    }
  }

  return (
    <li
    //  className={cn(styles.catalog__list__item, darkModeClass)}
    >
      <Link
        href={`/catalog/${item.id}`}
        className={cn(styles.catalog__list__item, darkModeClass)}
      >
        <img src={JSON.parse(item.images)[0]} alt={item.name} />

        <div className={cn(styles.catalog__list__item__inner, darkModeClass)}>
          <div
            // href={`/catalog/${item.id}`}
            className={cn(styles.catalog__list__item__inner, darkModeClass)}
          >
            <h3
              className={cn(styles.catalog__list__item__title, darkModeClass)}
            >
              {item.name}
            </h3>
          </div>
          <div className={cn(styles.catalog__list__item__code, darkModeClass)}>
            Произв. : {item.boiler_manufacturer}
          </div>
          <span className={cn(styles.catalog__list__item__code, darkModeClass)}>
            Запчасти : {item.parts_manufacturer}
          </span>
          <span className={cn(styles.catalog__list__item__code, darkModeClass)}>
            Артикул : {item.vendor_code}
          </span>
          <span
            className={cn(styles.catalog__list__item__price, darkModeClass)}
          >
            Цена : {formatPrice(item.price)} P
          </span>
        </div>
        <button
          onClick={toggleCart}
          className={cn(styles.catalog__list__item__cart, darkModeClass, {
            [styles.added]: isInCart,
          })}
          disabled={spinner}
        >
          {spinner ? (
            <Spinner style={{ top: 6, left: 6 }} />
          ) : (
            <span>
              {!isInCart ? <SVG.CartHoverSvg /> : <SVG.CartHoverCheckedSvg />}
            </span>
          )}
        </button>
      </Link>
    </li>
  )
}

export default CatalogItem
