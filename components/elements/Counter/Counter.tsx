import { useTheme } from '@/hooks/useTheme'
import { ICartItemCounterProps } from '@/types/shopping-cart'
import styles from '@/components/modules/Header/CartPopup/CartPopup.module.scss'
import SVG from '../ui/svg'
import { useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { updateCartItemFx } from '@/app/api/shopping-cart'
import { updateCartItemCount } from '@/context/shopping-cart'
import { toast } from 'react-toastify'
import cn from 'classnames'
import { error500hander } from '@/app/api.helpers'
enum COUNT_OPERATIONS {
  INCREASE,
  DECREASE,
}

const Counter = ({
  totalCount,
  id,
  partId,
  increasePrice,
  decreasePrice,
  initialCount,
  isWithStockCountMessage,
}: ICartItemCounterProps) => {
  const darkModeClass = useTheme(styles)
  const [spinner, setSpinner] = useState(false)
  const [count, setCount] = useState(initialCount)

  const changeCount = async (operation: COUNT_OPERATIONS) => {
    let increaseOrDecrease = increasePrice
    let newCount = count + 1
    if (operation === COUNT_OPERATIONS.DECREASE) {
      increaseOrDecrease = decreasePrice
      newCount = count - 1
    }
    try {
      setSpinner(true)
      increaseOrDecrease()
      setCount(newCount)

      const data = await updateCartItemFx({
        url: `/shopping-cart/update-count/${id}`,
        payload: { count: newCount },
      })

      updateCartItemCount({ partId, count: data.count })
    } catch (error) {
      if (!error500hander(error)) toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div
      className={cn(
        styles.cart__popup__list__item__counter__wrapper,
        darkModeClass
      )}
    >
      <div
        className={cn(styles.cart__popup__list__item__counter, darkModeClass)}
      >
        <button
          disabled={count <= 0}
          onClick={
            count <= 0
              ? undefined
              : () => changeCount(COUNT_OPERATIONS.DECREASE)
          }
        >
          <SVG.MinusSvg />
        </button>
        <span>
          {spinner ? (
            <Spinner style={{ top: 4, left: 33, width: 20, height: 20 }} />
          ) : (
            count
          )}
        </span>
        <button
          disabled={count >= totalCount}
          onClick={
            count >= totalCount
              ? undefined
              : () => changeCount(COUNT_OPERATIONS.INCREASE)
          }
        >
          <SVG.PlusSvg />
        </button>
      </div>
      {isWithStockCountMessage && count >= totalCount && (
        <div
          className={cn(
            styles.cart__popup__list__item__inStock_message,
            darkModeClass
          )}
        >
          На складе осталось {totalCount} шт.{' '}
        </div>
      )}
    </div>
  )
}

export default Counter
