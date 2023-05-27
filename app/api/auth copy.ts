// import { AxiosError } from 'axios';
// import { toast } from 'react-toastify';
// import api from '../axiosClient';
// import { ISingInFx, ISingUpFx, IUser } from './../../types/auth';
// import { createEffect } from 'effector-next';
// import { HTTPStatus } from '@/constants';
// import { setUser } from '@/context/user';



// export const signInFx = createEffect(
//     async ({ url, username, password }: ISingInFx) => {
//         debugger
//         const response = await api.post(url, { username, password })
//         debugger
//         const { data } = response

//         if (data.warningMessage) {
//             // throw new Error(data.warningMessage)
//             toast.warning(data.warningMessage)
//             return
//         }
//         toast.success("Вход выполнен!")
//         return data.user
//     }
// )

// export const signUpFx = createEffect(
//     async ({ url, username, password, email }: ISingUpFx) => {
//         const { data } = await api.post(url, { username, password, email })

//         if (data.warningMessage) {
//             // throw new Error(data.warningMessage)

//             toast.warning(data.warningMessage)
//             return
//         }
//         await signInFx({
//             url: 'users/login',
//             username: username,
//             password: password,
//         })
//         toast.success("Регистрация прошла успешно!")
//         return data
//     }
// )


// export const checkUserAuthFx = createEffect(
//     async (url: string) => {

//         try {
//             const { data } = await api.get(url)

//             return data
//         } catch (error) {
//             return false
//             // const AxiosError = error as AxiosError
//             // if (AxiosError.response) {
//             //     if (AxiosError.response.status === HTTPStatus.FORBIDDEN) {
//             //         return false
//             //     }
//             // }

//             // toast.error((error as Error).message)
//         }
//     }
// )

// export const logoutFx = createEffect(
//     async (url: string) => {

//         try {

//             await api.get(url)
//             setUser({} as IUser)

//         } catch (error) {
//             const AxiosError = error as AxiosError
//             if (AxiosError.response) {
//                 if (AxiosError.response.status === HTTPStatus.FORBIDDEN) {
//                     return false
//                 }
//             }

//             toast.error((error as Error).message)
//         }
//     }
// )