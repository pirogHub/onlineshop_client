import { addToCartFx, removeFromCartFx, updateCartItemFx } from '@/app/api/shopping-cart'
import { toast } from 'react-toastify'
import {
    $isPaymentConfirmWaiting,
    removeShoppingCartItem,
    updateCartItemTotalPrice,
    updateShoppingCart,
} from '@/context/shopping-cart'
import { useStore } from 'effector-react'
import { useLogoutIfForbidden } from '@/hooks/useLogoutIfForbidden'

export const toggleCartItem = async (
    username: string,
    partId: number,
    isInCart: boolean,
    checkError: (arg0: any) => boolean,
    setSpinner?: (arg: boolean) => void
) => {

    try {
        if (setSpinner) setSpinner(true)

        if (isInCart) {
            await removeFromCartFx(`/shopping-cart/delete-one/${partId}`)
            removeShoppingCartItem(partId)
            return
        }

        const data = await addToCartFx({
            url: '/shopping-cart/add',
            username,
            partId,
        })

        updateShoppingCart(data)
    } catch (error) {
        const is403 = checkError(error)
        if (!is403) toast.error((error as Error).message)
    } finally {
        if (setSpinner) setSpinner(false)
    }
}

export const removeItemFromCart = async (
    partId: number,
    checkError: (arg0: any) => boolean,
    setSpinner?: (arg: boolean) => void,
) => {
    try {
        if (setSpinner) setSpinner(true)
        await removeFromCartFx(`/shopping-cart/delete-one/${partId}`)
        removeShoppingCartItem(partId)
    } catch (error) {
        const is403 = checkError(error)
        if (!is403) toast.error((error as Error).message)
    } finally {
        if (setSpinner) setSpinner(false)
    }
}

export const updateTotalPrice = async (total_price: number, id: number, partId: number, isPaymentConfirmWaiting: boolean) => {

    if (isPaymentConfirmWaiting) return
    const data = await updateCartItemFx({
        url: `/shopping-cart/update-total-price/${id}`,
        payload: { total_price },
    })

    updateCartItemTotalPrice({ partId, total_price: data.total_price })
}