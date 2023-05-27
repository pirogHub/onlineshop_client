import { $userCity } from '@/context/user';
import { error500hander } from "@/app/api.helpers"
import { checkPaymentFx, makePaymentFx } from "@/app/api/payment"
import { removeFromCartFx } from "@/app/api/shopping-cart"
import { $isPaymentConfirmWaiting, setIsPaymentConfirmWaiting, setShoppingCart } from "@/context/shopping-cart"
import { useStore } from "effector-react"
import { toast } from "react-toastify"
import { useUser } from './useUser';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export const usePayment = () => {
    const { user } = useUser()
    const userCity = useStore($userCity)
    const router = useRouter()

    const isWaitingPaymentIdConfirm = useStore($isPaymentConfirmWaiting)

    const paymentAlreadyChecking_ref = useRef(false)

    const makePayment = async (totalPrice: number) => {
        try {
            setIsPaymentConfirmWaiting(true)
            const data = await makePaymentFx({
                url: '/payment',
                amount: totalPrice,
                description: `Заказ №1 ${userCity.city.length
                    ? `Город: ${userCity.city}, улица: ${userCity.street}`
                    : ''
                    }`,
            })
            // isWaitingPaymentIdConfirm_ref.current = true


            sessionStorage.setItem('paymentId', data.id)
            router.push(data.confirmation.confirmation_url)
        } catch (error) {
            if (!error500hander(error)) toast.error((error as Error).message)
            setIsPaymentConfirmWaiting(false)
            // isWaitingPaymentIdConfirm_ref.current = false
        }
    }



    const checkPayment = () => {
        const paymentId = sessionStorage.getItem('paymentId')


        if (paymentId) {
            checkingPayment(paymentId)
        } else {
            setIsPaymentConfirmWaiting(false)
        }

    }

    const checkingPayment = async (paymentId: string) => {
        const flag = user === false
        debugger
        if (!flag) {
            try {
                paymentAlreadyChecking_ref.current = true
                setTimeout(() => {
                    paymentAlreadyChecking_ref.current = false
                }, 3000)
                debugger
                const data = await checkPaymentFx({
                    url: '/payment/info',
                    paymentId,
                })
                debugger
                if (data?.status === 'succeeded') {
                    toast.success('Заказ оплачен!')
                    // resetCart()
                    return
                }

                sessionStorage.removeItem('paymentId')
            } catch (error) {
                debugger
                error500hander(error)
            } finally {
                debugger
                paymentAlreadyChecking_ref.current = false
                resetCart()
                setIsPaymentConfirmWaiting(false)
            }
        }
    }

    const resetCart = async () => {
        if (user !== false) {
            sessionStorage.removeItem('paymentId')
            await removeFromCartFx(`/shopping-cart/delete-all`)
            setShoppingCart([])
        }
    }
    return { resetCart, checkPayment, makePayment }
}