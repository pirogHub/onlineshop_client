import { setShoppingCart } from "@/context/shopping-cart"
import { setUser } from "@/context/user"
import { IUser } from "@/types/auth"
import { toast } from "react-toastify"

export const useLogoutIfForbidden = () => {

    const checkError = (error: any) => {
        if (error?.response?.status === 403) {
            toast.warning("Перезайдите, пожалуйста!")
            setUser({} as IUser)
            setShoppingCart([])
        }
        return true
    }

    return { checkError }
}