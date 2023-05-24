import { forwardRef, useEffect } from 'react'
import styles from './CartPopup.module.scss'
import {
  CloseWhenClickOutside,
  IWrappedComponentProps,
} from '@/hocs/CloseWhenClickOutside'
import MaterialIcon from '@/components/MaterialIcon/MaterialIcon'
import { useTheme } from '@/hooks/useTheme'

import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import {
  $disableCart,
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
  setTotalPrice,
} from '@/context/shopping-cart'

import { useStore } from 'effector-react'
import Link from 'next/link'
import { getCartItemsFx } from '@/app/api/shopping-cart'
import { toast } from 'react-toastify'
import { $user } from '@/context/user'
import { formatPrice } from '@/utils/common'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const darkModeClass = useTheme(styles)
    const shoppingCart = useStore($shoppingCart)
    const user = useStore($user)
    const disableCart = useStore($disableCart)
    const totalPrice = useStore($totalPrice)

    const toggleCartPopup = () => {
      setOpen(!open)
    }

    useEffect(() => {
      loadCartItems()
    }, [])
    useEffect(() => {
      setTotalPrice(
        shoppingCart.reduce(
          (defaultCount, item) => defaultCount + item.total_price,
          0
        )
      )
    }, [shoppingCart])

    const loadCartItems = async () => {
      try {
        const cartItems = await getCartItemsFx(`/shopping-cart/${user.userId}`)

        setShoppingCart(cartItems)
      } catch (error) {
        toast.error((error as Error).message)
      }
    }

    return (
      <div className={styles.cart} ref={ref}>
        {disableCart ? (
          <button
            style={{ cursor: 'auto' }}
            className={cn(styles.cart__btn, darkModeClass)}
          >
            <span className={cn(styles.cart__svg, darkModeClass)}>
              <MaterialIcon name="IoCartOutline" />
            </span>
            <span className={cn(styles.cart__text, darkModeClass)}>
              Корзина
            </span>
          </button>
        ) : (
          <button
            onClick={toggleCartPopup}
            className={cn(styles.cart__btn, darkModeClass)}
          >
            {!!shoppingCart.length && (
              <span className={styles.cart__btn__count}>
                {shoppingCart.length}
              </span>
            )}
            <span className={cn(styles.cart__svg, darkModeClass)}>
              <MaterialIcon name="IoCartOutline" />
            </span>
            <span className={cn(styles.cart__text, darkModeClass)}>
              Корзина
            </span>
          </button>
        )}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={cn(styles.cart__popup, darkModeClass)}
              style={{ transformOrigin: 'right top' }}
            >
              <h3 className={cn(styles.cart__popup__title, darkModeClass)}>
                Корзина
              </h3>
              <ul className={cn(styles.cart__popup__list, darkModeClass)}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) => <li key={item.id}></li>)
                ) : (
                  <li className={cn(styles.cart__popup__empty, darkModeClass)}>
                    <span
                      className={cn(
                        styles.cart__popup__empty__text,
                        darkModeClass
                      )}
                    >
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={cn(styles.cart__popup__footer, darkModeClass)}>
                <div
                  className={cn(
                    styles.cart__popup__footer__total,
                    darkModeClass
                  )}
                >
                  <span
                    className={cn(
                      styles.cart__popup__footer__text,
                      darkModeClass
                    )}
                  >
                    Общая сумма заказа:
                  </span>
                  <span
                    className={cn(
                      styles.cart__popup__footer__price,
                      darkModeClass
                    )}
                  >
                    {formatPrice(totalPrice)} P
                  </span>
                </div>
                <Link href="/order">
                  <button
                    className={cn(
                      styles.cart__popup__footer__btn,
                      darkModeClass
                    )}
                    disabled={!shoppingCart.length}
                  >
                    Оформить заказ
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'
export default CloseWhenClickOutside(CartPopup)
