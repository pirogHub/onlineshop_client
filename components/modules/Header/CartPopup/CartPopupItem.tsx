import { $mode } from '@/context/mode'
import { IShoppingCartItem } from '../../../../types/shopping-cart'
import styles from './cartPopup.module.scss'
import cn from 'classnames'
import { useStore } from 'effector-react'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { formatPrice } from '@/utils/common'
import { removeItemFromCart, updateTotalPrice } from '@/utils/shopping-cart'
import { useTheme } from '@/hooks/useTheme'
import Spinner from '@/components/elements/Spinner/Spinner'
import SVG from '@/components/elements/ui/svg'
import Counter from '@/components/elements/Counter/Counter'
import { $isPaymentConfirmWaiting } from '@/context/shopping-cart'
import { useLogoutIfForbidden } from '@/hooks/useLogoutIfForbidden'

const CartPopupItem = ({
  item,
  shoppingCart,
}: {
  item: IShoppingCartItem
  shoppingCart?: any
}) => {
  const darkModeClass = useTheme(styles)
  const isPaymentConfurmWaiting = useStore($isPaymentConfirmWaiting)
  const [spinner, setPinner] = useState(false)
  const [price, setPrice] = useState(item.price)
  const { checkError } = useLogoutIfForbidden()
  useEffect(() => {
    setPrice(price * item.count)
  }, [])
  useEffect(() => {
    updateTotalPrice(price, item.id, item.partId, isPaymentConfurmWaiting)
  }, [price])

  const increasePrice = () => {
    setPrice(price + item.price)
  }
  const decreasePrice = () => setPrice(price - item.price)
  const deleteCartItem = () =>
    removeItemFromCart(item.partId, checkError, setPinner)

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={item.image} alt={item.name} />
        </div>
        <Link
          href={`/catalog/${item.partId}`}
          className={cn(styles.cart__popup__list__item__text, darkModeClass)}
        >
          <span>
            <strong>{item.name.replace('.', '')}</strong>;{' '}
            {item.parts_manufacturer}, {item.boiler_manufacturer}
          </span>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {spinner ? (
              <Spinner style={{ top: 0, left: 0, width: 20, height: 20 }} />
            ) : (
              <SVG.DeleteSvg />
            )}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        {item.in_stock === 0 ? (
          <span className={styles.cart__popup__list__item__empty}>
            Нет на складе
          </span>
        ) : (
          <Counter
            decreasePrice={decreasePrice}
            increasePrice={increasePrice}
            initialCount={item.count}
            id={item.id}
            totalCount={item.in_stock}
            partId={item.partId}
          />
        )}
        <span
          className={cn(styles.cart__popup__list__item__price, darkModeClass)}
        >
          {formatPrice(item.price)} P
        </span>
      </div>
    </li>
  )
}

export default CartPopupItem
