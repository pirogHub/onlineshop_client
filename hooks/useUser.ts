import { $user } from '@/context/user';
import { useStore } from "effector-react"
const isUserNotEmpty = (user: any) => {
    if (!user.username ||
        !user.userId ||
        !user.email)
        return false
    else return true
}
export const useUser = () => {
    const userData = useStore($user)

    return isUserNotEmpty(userData) ? userData : false
}