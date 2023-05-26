import { useStore } from 'effector-react'
import Link from 'next/link'
import { IShoppingCartItem } from '@/types/shopping-cart'
import { usePrice } from '@/hooks/usePrice'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Counter from '@/components/elements/Counter/Counter'
import { formatPrice } from '@/utils/common'
import styles from '@/components/templates/OrderPage/OrderPage.module.scss'
import cn from 'classnames'
import { useTheme } from '@/hooks/useTheme'
import Spinner from '@/components/elements/Spinner/Spinner'

const OrderItem = ({ item }: { item: IShoppingCartItem }) => {
  const isMedia1160 = useMediaQuery(1160)
  const darkModeClass = useTheme(styles)

  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    usePrice(item.count, item.id, item.partId, item.price)

  return (
    <li className={styles.order__cart__list__item}>
      <div className={styles.order__cart__list__item__left}>
        <div className={styles.order__cart__list__item__left__inner}>
          <div className={styles.order__cart__list__item__img}>
            <img src={item.image} alt={item.name} />
          </div>
          <Link
            href={`/catalog/${item.partId}`}
            className={cn(styles.order__cart__list__item__text, darkModeClass)}
          >
            <span>
              {item.name.replace('.', '')}, {item.parts_manufacturer},{' '}
              {item.boiler_manufacturer}
            </span>
          </Link>
        </div>
        {isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>
              Нет на складе
            </span>
          ) : (
            <Counter
              totalCount={item.in_stock}
              partId={item.partId}
              initialCount={item.count}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
              id={item.id}
            />
          ))}
      </div>
      <div className={styles.order__cart__list__item__right}>
        {!isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>
              Нет на складе
            </span>
          ) : (
            <Counter
              totalCount={item.in_stock}
              partId={item.partId}
              initialCount={item.count}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
              id={item.id}
            />
          ))}
        <span
          className={cn(styles.order__cart__list__item__price, darkModeClass)}
        >
          {formatPrice(price)} P
        </span>
        <button
          className={styles.order__cart__list__item__delete}
          onClick={deleteCartItem}
        >
          {spinner ? (
            <Spinner
              style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
            />
          ) : (
            'Удалить'
          )}
        </button>
      </div>
    </li>
  )
}

export default OrderItem
