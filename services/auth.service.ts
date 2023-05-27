import { IAuthResponse } from './../types/auth';
import axiosWithoutAuth from "@/app/axiosWithoutAuth"
import Cookies from "js-cookie"
import { removeTokensStorage, saveToStorage } from './auth.helper';
import { error500hander, getAuthUrl, getContentType } from '@/app/api.helpers';


const AuthService = {

    async register(email: string, password: string, username: string) {
        const response = await axiosWithoutAuth.post<IAuthResponse & { warningMessage?: string }>(getAuthUrl("/register"), { email, password, username })

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }
        return response
    },
    async login(password: string, username: string) {
        const response = await axiosWithoutAuth.post<IAuthResponse & { warningMessage?: string }>(getAuthUrl("/login"), { password, username })

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }
        return response
    },
    async logout() {
        removeTokensStorage()
        localStorage.removeItem('user')
    },
    async getNewTokens() {
        const refreshToken = Cookies.get("refreshToken")
        try {
            const response = await axiosWithoutAuth.post<IAuthResponse>(
                getAuthUrl('/login/access-token'),
                { refreshToken },
                { headers: getContentType() }
            )

            if (response?.data?.accessToken) saveToStorage(response.data)

            return response

        } catch (error) {
            error500hander(error)

            return { data: null }
        }
    }
}


export default AuthService