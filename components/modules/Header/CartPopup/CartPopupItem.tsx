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

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
  const darkModeClass = useTheme(styles)

  const [spinner, setPinner] = useState(false)
  const [price, setPrice] = useState(item.price)
  useEffect(() => {
    setPrice(price * item.count)
  }, [])
  useEffect(() => {
    updateTotalPrice(price, item.partId)
  }, [price])

  const increasePrice = () => setPrice(price + item.price)
  const decreasePrice = () => setPrice(price - item.price)
  const deleteCartItem = () => removeItemFromCart(item.partId, setPinner)

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
            {item.name.replace('.', '')}, {item.parts_manufacturer},{' '}
            {item.boiler_manufacturer}
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
            partId={item.id}
            totalCount={item.in_stock}
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
