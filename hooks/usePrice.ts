import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import { removeItemFromCart, updateTotalPrice } from '@/utils/shopping-cart'
import { $isPaymentConfirmWaiting } from '@/context/shopping-cart'
import { useLogoutIfForbidden } from './useLogoutIfForbidden'

export const usePrice = (
    count: number,
    id: number,
    partId: number,
    initialPrice: number
) => {
    const spinner = useStore(removeFromCartFx.pending)
    const [price, setPrice] = useState(initialPrice)

    const { checkError } = useLogoutIfForbidden()

    const isPaymentConfurmWaiting = useStore($isPaymentConfirmWaiting)
    useEffect(() => {
        setPrice(price * count)
    }, [])

    useEffect(() => {
        updateTotalPrice(price, id, partId, isPaymentConfurmWaiting)
    }, [price])

    const increasePrice = () => setPrice(price + initialPrice)
    const decreasePrice = () => setPrice(price - initialPrice)
    const deleteCartItem = () => removeItemFromCart(partId, checkError)

    return { price, spinner, increasePrice, decreasePrice, deleteCartItem }
}