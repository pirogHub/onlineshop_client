import axios from "axios";
import Cookies from "js-cookie"
import { errorCatch } from "./api.helpers";


import AuthService from "@/services/auth.service";
import { removeTokensStorage } from "@/services/auth.helper";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const accessToken = Cookies.get("accessToken")
    const flag = !!config.headers && !!accessToken

    if (flag) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

api.interceptors.response.use((config) => config, async error => {
    const originalRequest = error.config

    if ((error?.response?.status === 403
        || error?.response?.status === 401
        || errorCatch(error) === "jwt-expired"
        || errorCatch(error) === "jwt must be provided")
        && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            await AuthService.getNewTokens()
            return api.request(originalRequest)
        } catch (error) {
            if (errorCatch(error) === "jwt exipred") removeTokensStorage()
        }
    }
    throw error
}
)

export default api