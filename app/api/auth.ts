import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '../axiosClient';
import { ISingInFx, ISingUpFx, IUser } from './../../types/auth';
import { createEffect } from 'effector-next';
import { HTTPStatus } from '@/constants';
import { setUser } from '@/context/user';
import AuthService from '@/services/auth.service';
import { error500hander, errorCatch } from '../api.helpers';



export const signInFx = createEffect(
    async ({ username, password }: ISingInFx) => {

        const response = await AuthService.login(password, username)

        const { data } = response
        if (data.user) {
            toast.success("Вход выполнен!")
            setUser(data.user)
            return true
        }

        if (data.warningMessage) {
            toast.warning(data.warningMessage)
        } else {

            toast.warning("Серверная ошибка. Повторите позже")
        }
        return false

    }
)

export const signUpFx = createEffect(
    async ({ username, password, email }: ISingUpFx) => {
        const { data } = await AuthService.register(email, password, username)

        if (data.user) {
            toast.success("Регистрация прошла успешно!")
            setUser(data.user)
            return true
        }

        if (data.warningMessage) {
            toast.warning(data.warningMessage)
        } else {

            toast.warning("Серверная ошибка. Повторите позже")
        }
        return false
    }
)

export const logoutFx = createEffect(
    async () => {
        await AuthService.logout()
        setUser({} as IUser)

    }
)
export const checkUserAuthFx = createEffect(
    async () => {

        try {
            const { data } = await AuthService.getNewTokens()

            return data
        } catch (error) {
            if (errorCatch(error) === "jwt-expired" || errorCatch(error) === "unauthorized") {
                logoutFx()
            }
            error500hander(error)
            return false
        }
    }
)

