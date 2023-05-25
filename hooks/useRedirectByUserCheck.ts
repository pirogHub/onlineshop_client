import { checkUserAuthFx } from "@/app/api/auth"
import { setUser } from "@/context/user"
import { NextRouter, useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"


const getQuery = (
    queryName: string,
    router: NextRouter
    // ) => router.query[queryName] || router.asPath.match(new RegExp(`[&?]${queryName}=(.+?)(&|$)`))?.[1]
) => router.asPath.match(new RegExp(`[&?]${queryName}=("|%22)(.+?)(("|%22)&|("|%22)$)`))



const useRedirectByUserCheck = (isAuthPage = false) => {
    const [shouldLoadContent, setShouldLoadContent] = useState(false)
    const router = useRouter()

    const shouldCheckAuth = useRef(true)
    const [linkToRedirect, setLinkToRedirect] = useState("")

    const getRedirectLink = () => {

        try {
            const redirectLinkArr = getQuery('redirect', router)
            const tmpArr = redirectLinkArr?.filter(i => i && i !== "%22" && i !== '\"')


            return tmpArr?.[1] || "/dashboard"

        } catch (error) {
            return "/dashboard"
        }
    }




    useEffect(() => {

        if (shouldCheckAuth.current) {
            shouldCheckAuth.current = false
            checkUser()
        } else {
            const redirectQuery = getRedirectLink()
            setLinkToRedirect(redirectQuery)
        }
    })

    const checkUser = async () => {
        const user = await checkUserAuthFx("/users/login-check")

        if (user) {
            setUser(user)
        }

        const redirectQuery = getRedirectLink()

        if (isAuthPage) {
            if (!user) {
                setShouldLoadContent(true)
                setLinkToRedirect(redirectQuery)
                return
            }

            if (redirectQuery) router.push(`${redirectQuery}`)
            else router.push('/dashboard')
            return
        }

        if (user) {
            // setUser(user)
            setShouldLoadContent(true)
            return
        }

        router.push('/')
    }

    return { shouldLoadContent, linkToRedirect }
}

export default useRedirectByUserCheck