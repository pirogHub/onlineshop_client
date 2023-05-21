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
import { $shoppingCart } from '@/context/shopping-cart'

import { useStore } from 'effector-react'
import Link from 'next/link'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const darkModeClass = useTheme(styles)
    const shoppingCart = useStore($shoppingCart)

    const toggleCartPopup = () => {
      console.log('toggleCartPopup')

      setOpen(!open)
    }

    useEffect(() => {
      console.log('toggleCartPopup', open)
    }, [open])

    return (
      <div className={styles.cart} ref={ref}>
        <button onClick={toggleCartPopup} className={styles.cart__btn}>
          {!!shoppingCart.length && (
            <span className={styles.cart__btn__count}>
              {shoppingCart.length}
            </span>
          )}
          <span className={cn(styles.cart__svg, darkModeClass)}>
            <MaterialIcon name="IoCartOutline" />
          </span>
          <span className={cn(styles.cart__text, darkModeClass)}>Корзина</span>
        </button>
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
                    Общая сумма заказа
                  </span>
                  <span
                    className={cn(
                      styles.cart__popup__footer__price,
                      darkModeClass
                    )}
                  >
                    0
                  </span>
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
