import { createEffect } from "effector";
import api from "../axiosClient";

export const getBestsellersFx = createEffect(async () => {
    const { data } = await api.get("/boiler-parts/bestsellers")
    return data
})
export const getNewPartsFx = createEffect(async (url: string) => {
    const { data } = await api.get("/boiler-parts/new")

    return data
})