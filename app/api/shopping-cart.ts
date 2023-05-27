import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { IAddToCartFx, IUpdateCartItemFx } from '@/types/shopping-cart'
import { error500hander } from '../api.helpers'

export const getShoppingCartFx = createEffect(async () => {
    try {

        const { data } = await api.get("/shopping-cart")

        return data
    } catch (error) {

        error500hander(error)
        return []
    }
})

export const addToCartFx = createEffect(
    async ({ url, username, partId }: IAddToCartFx) => {
        const { data } = await api.post(url, { username, partId })

        return data
    }
)

export const removeFromCartFx = createEffect(async (url: string) => {
    await api.delete(url)
})


export const updateCartItemFx = createEffect(
    async ({ url, payload }: IUpdateCartItemFx) => {
        const { data } = await api.patch(url, payload)

        return data
    }
)