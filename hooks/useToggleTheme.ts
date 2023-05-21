import { $mode, setMode } from '@/context/mode';
import { useStore } from "effector-react"
import { useEffect } from 'react';

export const useToggleTheme = () => {
    const mode = useStore($mode)

    const toggleTheme = () => {
        if (mode === 'light') {
            localStorage.setItem("mode", JSON.stringify("dark"))
            setMode("dark")
        } else {
            localStorage.setItem("mode", JSON.stringify("light"))
            setMode("light")
        }
    }

    useEffect(() => {
        const localTheme = JSON.parse(localStorage.getItem('mode') as string)

        if (localTheme === "light" || localTheme === "dark") {
            setMode(localTheme)
        }
    }, [])

    return { toggleTheme }
}