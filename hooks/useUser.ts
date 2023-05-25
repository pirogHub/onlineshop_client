import { checkUserAuthFx, logoutFx } from '@/app/api/auth';
import { $user, $userExipiresIn, setUser, setUserExpiresIn } from '@/context/user';
import { IUser } from '@/types/auth';
import { useStore } from 'effector-react';
import { useEffect, useRef, useState } from 'react';
const isUserNotEmpty = (user: any) => {
    if (!user || !user.username ||
        !user.userId ||
        !user.email)
        return false
    else return true
}


export const useUser = () => {
    const userData = useStore($user)
    const expiresIn = useStore($userExipiresIn)

    const prevExpInref = useRef(expiresIn)


    const [tmpUser, setTmpUser] = useState<IUser | false>(isUserNotEmpty(userData) ? userData : false)

    const checkUser = async () => {

        const date = Date.now()
        const diff = prevExpInref.current - date
        if (diff < 0 && prevExpInref.current === expiresIn) {
            // console.log("do");
            const newExpiresIn = Date.now() + 100 * 60 * 60
            // console.log("date", date);
            // console.log("now ", expiresIn);
            // console.log("new ", newExpiresIn);

            prevExpInref.current = newExpiresIn
            setUserExpiresIn(newExpiresIn)
            const { data } = await checkUserAuthFx("/users/login-check")

            if (isUserNotEmpty(data)) {

                setUser(data)
                setTmpUser(data)
            } else {
                setTmpUser(false)
            }

        } else {
            // console.log("not do");
        }
    }


    useEffect(() => {
        if (isUserNotEmpty(userData)) {
            setTmpUser(userData)
        } else {
            setTmpUser(false)
        }

    }, [userData])



    return { user: tmpUser, checkUser }
}