import { useTheme } from '@/hooks/useTheme'
import { ICartItemCounterProps } from '@/types/shopping-cart'
import styles from '@/components/modules/Header/CartPopup/CartPopup.module.scss'
import SVG from '../ui/svg'
import { useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { updateCartItemFx } from '@/app/api/shopping-cart'
import { updateCartItemCount } from '@/context/shopping-cart'
import { toast } from 'react-toastify'

enum COUNT_OPERATIONS {
  INCREASE,
  DECREASE,
}

const Counter = ({
  totalCount,
  partId,
  increasePrice,
  decreasePrice,
  initialCount,
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
        url: `/shopping-cart/count/${partId}`,
        payload: { count: newCount },
      })

      updateCartItemCount({ partId, count: data.count })
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div>
      <button
        disabled={count <= 0}
        onClick={
          count <= 0 ? undefined : () => changeCount(COUNT_OPERATIONS.INCREASE)
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
            : () => changeCount(COUNT_OPERATIONS.DECREASE)
        }
      >
        <SVG.PlusSvg />
      </button>
    </div>
  )
}

export default Counter
