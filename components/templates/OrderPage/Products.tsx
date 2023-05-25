import { formatPrice } from '@/utils/common'

import styles from './OrderPage.module.scss'
import { useTheme } from '@/hooks/useTheme'
import { IShoppingCartItem } from '@/types/shopping-cart'

const Products = ({
  shoppingCart,
  totalPrice,
}: {
  shoppingCart: IShoppingCartItem[]
  totalPrice: number
}) => {
  const darkModeClass = useTheme(styles)

  return (
    <>
      {' '}
      <div className={styles.order__pay__goods}>
        <span>
          Товары (
          {shoppingCart.reduce(
            (defaultCount, item) => defaultCount + item.count,
            0
          )}
          )
        </span>
        <span>{formatPrice(totalPrice)} P</span>
      </div>
      <div className={styles.order__pay__total}>
        <span>На сумму</span>
        <span className={darkModeClass}>{formatPrice(totalPrice)} P</span>
      </div>
    </>
  )
}

export default Products
