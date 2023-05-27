import { $user } from '@/context/user';
import { getShoppingCartFx } from "@/app/api/shopping-cart"
import { setShoppingCart } from "@/context/shopping-cart"
import { toast } from "react-toastify"
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { useUser } from './useUser';
import { error500hander } from '@/app/api.helpers';



export const useLoadShoppingCart = (isWaitingPaymentIdConfirm?: boolean) => {
    const { user } = useUser()
    const loadCartItems = async () => {

        if (user !== false) {
            if (isWaitingPaymentIdConfirm) return
            try {
                // const cartItems = await getShoppingCartFx(`/shopping-cart/${user.userId}`)
                const cartItems = await getShoppingCartFx()

                setShoppingCart(cartItems)
            } catch (error) {
                if (!error500hander(error))
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