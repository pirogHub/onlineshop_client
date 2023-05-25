import { $user } from '@/context/user';
import { getCartItemsFx } from "@/app/api/shopping-cart"
import { setShoppingCart } from "@/context/shopping-cart"
import { toast } from "react-toastify"
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { useUser } from './useUser';

// const isUserNotEmpty = (user: any) => {
//     if (!user.username ||
//         !user.userId ||
//         !user.email)
//         return false
//     else return true
// }

export const useLoadShoppingCart = () => {
    const { user } = useUser()
    const loadCartItems = async () => {
        // debugger
        if (user !== false) {
            try {
                const cartItems = await getCartItemsFx(`/shopping-cart/${user.userId}`)

                setShoppingCart(cartItems)
            } catch (error) {
                toast.error((error as Error).message)
            }
        }
    }
    useEffect(() => {
        if (user !== false) loadCartItems()
    }, [])
}