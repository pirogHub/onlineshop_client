import { toast } from 'react-toastify';
import api from '../axiosClient';
import { ISingInFx, ISingUpFx } from './../../types/auth';
import { createEffect } from 'effector-next';


export const signUpFx = createEffect(
    async ({ url, username, password, email }: ISingUpFx) => {
        const { data } = await api.post(url, { username, password, email })

        if (data.warningMessage) {
            // throw new Error(data.warningMessage)
            toast.warning(data.warningMessage)
            return
        }

        toast.success("Регистрация прошла успешно!")
        return data
    }
)

export const signInFx = createEffect(
    async ({ url, username, password }: ISingInFx) => {
        const { data } = await api.post(url, { username, password })

        if (data.warningMessage) {
            // throw new Error(data.warningMessage)
            toast.warning(data.warningMessage)
            return
        }
        toast.success("Вход выполнен!")
        return data
    }
)