import {
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'

export interface IWrappedComponentPropsDo {
  isClickOutside: boolean
  setIsClickOutside: (arg0: boolean) => void
}

export function DoWhenClickOutside(
  WrappedComponent: ForwardRefExoticComponent<
    IWrappedComponentPropsDo & RefAttributes<HTMLDivElement>
  >
) {
  const Component = () => {
    const [isClickOutside, setIsClickOutside] = useState(false)
    const ref = useRef() as MutableRefObject<HTMLDivElement>

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (!ref.current.contains(e.target as HTMLDivElement)) {
          setIsClickOutside(true)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ref])

    return (
      <WrappedComponent
        isClickOutside={isClickOutside}
        setIsClickOutside={setIsClickOutside}
        ref={ref}
      />
    )
  }

  return Component
}
