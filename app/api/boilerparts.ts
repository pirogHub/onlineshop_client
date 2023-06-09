import { createEffect } from "effector";
import api from "../axiosClient";
import { toast } from "react-toastify";
import { error500hander } from "../api.helpers";

export const getBestsellersFx = createEffect(async () => {
    const response = await api.get("/boiler-parts/bestsellers")
    const { data } = response

    return data
})
export const getNewPartsFx = createEffect(async (url: string) => {
    const { data } = await api.get("/boiler-parts/new")

    return data
})
export const getBoilerPartsFx = createEffect(async (url: string) => {
    const { data } = await api.get(url)

    return data
})

export const getBoilerPartFx = createEffect(async (url: string) => {
    const { data } = await api.get(url)

    return data
})


export const searchPartsFx = createEffect(
    async ({ url, search }: { url: string; search: string }) => {
        const { data } = await api.post(url, { search })

        return data.rows
    }
)

export const getPartByNameFx = createEffect(
    async ({ url, name }: { url: string; name: string }) => {
        try {
            const { data } = await api.post(url, { name })

            return data
        } catch (error) {
            if (!error500hander(error))
                toast.error((error as Error).message)
        }
    }
)