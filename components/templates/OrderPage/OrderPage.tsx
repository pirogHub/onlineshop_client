import { useTheme } from '@/hooks/useTheme'
import styles from './OrderPage.module.scss'
import cn from 'classnames'
import { useStore } from 'effector-react'
import {
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
} from '@/context/shopping-cart'
import { formatPrice } from '@/utils/common'
import Spinner from '@/components/elements/Spinner/Spinner'
import { useEffect, useState } from 'react'
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion'
import { checkPaymentFx, makePaymentFx } from '@/app/api/payment'
import { useRouter } from 'next/router'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import { toast } from 'react-toastify'
import { $user, $userCity } from '@/context/user'

const OrderPage = () => {
  const darkModeClass = useTheme(styles)
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  const user = useStore($user)
  const userCity = useStore($userCity)

  const [agreement, setAgreement] = useState(false)

  const [orderIsReady, setOrderIsReady] = useState(false)
  const spinner = useStore(makePaymentFx.pending)
  const router = useRouter()

  const handleAgreementChange = () => setAgreement(!agreement)
  const makePay = async () => {
    try {
      const data = await makePaymentFx({
        url: '/payment',
        amount: totalPrice,
        description: `Заказ №1 ${
          userCity.city.length
            ? `Город: ${userCity.city}, улица: ${userCity.street}`
            : ''
        }`,
      })

      sessionStorage.setItem('paymentId', data.id)
      router.push(data.confirmation.confirmation_url)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
  useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')

    if (paymentId) {
      checkPayment(paymentId)
    }
  }, [])
  const checkPayment = async (paymentId: string) => {
    try {
      const data = await checkPaymentFx({
        url: '/payment/info',
        paymentId,
      })

      if (data.status === 'succeeded') {
        resetCart()
        return
      }

      sessionStorage.removeItem('paymentId')
    } catch (error) {
      console.log((error as Error).message)
      resetCart()
    }
  }

  const resetCart = async () => {
    sessionStorage.removeItem('paymentId')
    await removeFromCartFx(`/shopping-cart/all/${user.userId}`)
    setShoppingCart([])
  }

  return (
    <section className={styles.order}>
      <div className="container">
        <h2 className={cn(styles.order__title, darkModeClass)}>
          Оформление заказа
        </h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <OrderAccordion
              setOrderIsReady={setOrderIsReady}
              showDoneIcon={orderIsReady}
            />
          </div>
          <div className={styles.order__pay}>
            <h3 className={cn(styles.order__pay__title, darkModeClass)}>
              Итого
            </h3>
            <div className={cn(styles.order__pay__inner, darkModeClass)}>
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
                <span className={darkModeClass}>
                  {formatPrice(totalPrice)} P
                </span>
              </div>
              <button
                disabled={!(orderIsReady && agreement)}
                className={styles.order__pay__btn}
                onClick={makePay}
              >
                {spinner ? (
                  <Spinner style={{ top: '6px', left: '47%' }} />
                ) : (
                  'Подтвердить заказ'
                )}
              </button>
              <label className={cn(styles.order__pay__rights, darkModeClass)}>
                <input
                  className={styles.order__pay__rights__input}
                  type="checkbox"
                  onChange={handleAgreementChange}
                  checked={agreement}
                />
                <span className={styles.order__pay__rights__text}>
                  <strong>Согласен с условиями</strong> Правил пользования
                  торговой площадкой и правилами возврата
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderPage
