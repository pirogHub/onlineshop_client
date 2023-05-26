import { $user } from '@/context/user';
import { getCartItemsFx } from "@/app/api/shopping-cart"
import { setShoppingCart } from "@/context/shopping-cart"
import { toast } from "react-toastify"
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { useUser } from './useUser';



export const useLoadShoppingCart = (isWaitingPaymentIdConfirm?: boolean) => {
    const { user } = useUser()
    const loadCartItems = async () => {

        if (user !== false) {
            if (isWaitingPaymentIdConfirm) return
            try {
                const cartItems = await getCartItemsFx(`/shopping-cart/${user.userId}`)

                setShoppingCart(cartItems)
            } catch (error) {

                toast.error((error as Error).message)
            }
        } else {
            setShoppingCart([])
        }
    }
    useEffect(() => {
        if (user !== false) loadCartItems()
        else {
            setShoppingCart([])
        }
    }, [])
}