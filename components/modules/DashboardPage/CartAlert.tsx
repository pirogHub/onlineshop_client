import { ICartAlertProps } from '@/types/dashboard'

import styles from '../../templates/DashboardPage/DashboardPage.module.scss'
import { useTheme } from '@/hooks/useTheme'
import { formatPrice } from '@/utils/common'
import Link from 'next/link'

import cn from 'classnames'

const CartAlert = ({ count, closeAlert }: ICartAlertProps) => {
  const darkModeClass = useTheme(styles)

  const showCountMessage = (count: string) => {
    if (count.endsWith('1')) {
      return 'товар'
    }

    if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
      return 'товара'
    }

    return 'товаров'
  }

  return (
    <>
      <div className={cn(styles.dashboard__alert__left, darkModeClass)}>
        <span>
          В корзине {count} {showCountMessage(`${count}`)}
        </span>
        <span> На сумму {formatPrice(0)}</span>
      </div>
      <div className={cn(styles.dashboard__alert__right, darkModeClass)}>
        <Link
          href="/order"
          className={cn(styles.dashboard__alert__btn_cart, darkModeClass)}
        >
          Перейти в корзину
        </Link>
        <Link
          href="/order"
          className={cn(styles.dashboard__alert__btn_order, darkModeClass)}
        >
          Оформить заказ
        </Link>
      </div>
      <button
        onClick={closeAlert}
        className={cn(styles.dashboard__alert__btn_close, darkModeClass)}
      ></button>
    </>
  )
}

export default CartAlert
