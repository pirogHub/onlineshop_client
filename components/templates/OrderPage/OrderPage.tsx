import { useTheme } from '@/hooks/useTheme'
import styles from './OrderPage.module.scss'
import cn from 'classnames'
import { useStore } from 'effector-react'
import {
  $isPaymentConfirmWaiting,
  $shoppingCart,
  $totalPrice,
  setIsPaymentConfirmWaiting,
  setShoppingCart,
} from '@/context/shopping-cart'
// import { formatPrice } from '@/utils/common'
import Spinner from '@/components/elements/Spinner/Spinner'
import { useEffect, useRef, useState } from 'react'
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion'
import { checkPaymentFx, makePaymentFx } from '@/app/api/payment'
import { useRouter } from 'next/router'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import { toast } from 'react-toastify'
import { $user, $userCity } from '@/context/user'
import Products from './Products'
import Agreement from './Agreement'
import { useUser } from '@/hooks/useUser'
import { useLoadShoppingCart } from '@/hooks/useLoadShoppingCart'

enum WHERE_TO_REDIRECT {
  TO_CATALOG,
  TO_PAYMENT,
  TO_AUTH,
}

const OrderPage = () => {
  const darkModeClass = useTheme(styles)
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  // const user = useStore($user)
  const { user } = useUser()
  const userCity = useStore($userCity)

  const [agreement, setAgreement] = useState(false)

  const [orderIsReady, setOrderIsReady] = useState(false)
  const spinner = useStore(makePaymentFx.pending)
  const router = useRouter()
  const isWaitingPaymentIdConfirm = useStore($isPaymentConfirmWaiting)
  const isWaitingPaymentIdConfirm_ref = useRef(false)
  useLoadShoppingCart(isWaitingPaymentIdConfirm_ref.current)
  const [btnText, setBtnText] = useState('Сначала выберите товар')
  const [whereToRedirect, setWhereToRedirect] = useState(
    WHERE_TO_REDIRECT.TO_CATALOG
  )

  useEffect(() => {
    const isShoppingCartEmpty = !shoppingCart.length
    if (isShoppingCartEmpty) {
      setBtnText('Сначала выберите товар')

      setWhereToRedirect(WHERE_TO_REDIRECT.TO_CATALOG)
    } else if (user !== false) {
      setBtnText('Подтвердить заказ')
      setWhereToRedirect(WHERE_TO_REDIRECT.TO_PAYMENT)
    } else {
      setBtnText('Войти и Подтвердить заказ')
      setWhereToRedirect(WHERE_TO_REDIRECT.TO_AUTH)
    }
  })

  const isContinueBtnDisable = () => {
    const isShoppingCartEmpty = !shoppingCart.length
    const flag = isShoppingCartEmpty
    return flag
  }
  const isPaymentBtnDisable = () => {
    const isShoppingCartEmpty = !shoppingCart.length
    const flag = !isShoppingCartEmpty && (user === false ? false : !agreement)

    return flag
  }

  const handleAgreementChange = () => setAgreement(!agreement)
  const makePayOrRedirect = async () => {
    if (whereToRedirect === WHERE_TO_REDIRECT.TO_AUTH) {
      router.push(`/auth?redirect="${router.asPath}"`)
      return
    } else if (whereToRedirect === WHERE_TO_REDIRECT.TO_CATALOG) {
      router.push(`/catalog`)
      return
    }
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
      isWaitingPaymentIdConfirm_ref.current = true
      setIsPaymentConfirmWaiting(true)

      sessionStorage.setItem('paymentId', data.id)
      router.push(data.confirmation.confirmation_url)
    } catch (error) {
      toast.error((error as Error).message)
      setIsPaymentConfirmWaiting(false)
      isWaitingPaymentIdConfirm_ref.current = false
    }
  }
  useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')

    const flag =
      !isWaitingPaymentIdConfirm_ref.current || !isWaitingPaymentIdConfirm
    if (flag) {
      if (paymentId) {
        checkPayment(paymentId)
      } else {
        setIsPaymentConfirmWaiting(false)
      }
    }
  }, [])

  const checkPayment = async (paymentId: string) => {
    if (user !== false) {
      try {
        const data = await checkPaymentFx({
          url: '/payment/info',
          paymentId,
        })

        if (data.status === 'succeeded') {
          toast.success('Заказ оплачен!')
          resetCart()
          return
        }

        sessionStorage.removeItem('paymentId')
      } catch (error) {
        resetCart()
      } finally {
        isWaitingPaymentIdConfirm_ref.current = false
        setIsPaymentConfirmWaiting(false)
      }
    }
  }

  const resetCart = async () => {
    if (user !== false) {
      sessionStorage.removeItem('paymentId')
      await removeFromCartFx(`/shopping-cart/delete-all/${user.userId}`)
      setShoppingCart([])
    }
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
              isContinueBtnDisable={isContinueBtnDisable()}
              isEditBtnDisabled={!shoppingCart.length}
            />
          </div>
          <div className={styles.order__pay}>
            <h3 className={cn(styles.order__pay__title, darkModeClass)}>
              Итого
            </h3>
            <div className={cn(styles.order__pay__inner, darkModeClass)}>
              <Products shoppingCart={shoppingCart} totalPrice={totalPrice} />

              <button
                disabled={isPaymentBtnDisable()}
                className={styles.order__pay__btn}
                onClick={makePayOrRedirect}
              >
                {spinner ? (
                  <Spinner style={{ top: '6px', left: '47%' }} />
                ) : (
                  btnText
                )}
              </button>
              {user !== false && !!shoppingCart.length && (
                <Agreement
                  agreement={agreement}
                  handleAgreementChange={handleAgreementChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderPage
