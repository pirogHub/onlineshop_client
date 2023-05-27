import { toast } from "react-toastify"

export const errorCatch = (error: any): string => {
    if (error.response && error.response.data) {
        if (typeof error.response.data.message === "object") {
            return error.response.data.message[0]
        } else {
            return error.response.data.message
        }
    } else {
        return error.message
    }
}

export const getContentType = () => ({
    'Content-Type': "application/json"
})

export const getAuthUrl = (string: string) => `/auth${string}`


export const error500hander = (error: any) => {
    if ((error as any)?.response?.status === 500) {
        toast.warning("Лимит запросов к бесплатной базе данных https://freedb.tech/ закочился:(")
        return true
    }
    else return false
}