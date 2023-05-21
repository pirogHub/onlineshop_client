import { getWindowWidth } from "@/utils/common"
import { useEffect, useState } from "react"



const useWindowWidth = () => {

    const [windowWidth, setWindowWidth] = useState(getWindowWidth())
    const handleResize = () => setWindowWidth(getWindowWidth())


    useEffect(() => {
        window.addEventListener('resize', handleResize, true)

        return () => window.removeEventListener("resize", handleResize, true)
    }, [])
    return { windowWidth, handleResize }
}


export const useMediaQuery = (maxWidth: number) => {

    const { handleResize, windowWidth: { windowWidth } } = useWindowWidth()

    const [isMedia, setIsMedia] = useState(false)

    useEffect(() => {
        if (maxWidth >= windowWidth) {
            setIsMedia(true)
        } else {
            setIsMedia(false)
        }
    }, [maxWidth, windowWidth])

    return isMedia
}