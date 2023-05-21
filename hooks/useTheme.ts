import { $mode, setMode } from '@/context/mode';
import { useStore } from "effector-react"
import { useEffect } from 'react';

export const useTheme = (styles: any) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? styles.dark_mode : ''
    return darkModeClass
}