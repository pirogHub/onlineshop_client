import { MultiValue, SingleValue } from 'react-select'


export interface IOption {
    value: string | number
    label: string | number
}

export type SelectOptionType = MultiValue<IOption> | SingleValue<IOption> | null



export interface IAccordion {
    children: React.ReactNode
    title: string | false
    titleClass: string
    arrowOpenClass?: string
    isMobileForFilters?: boolean
    hideArrowClass?: string,
    isExpandedDefault?: boolean
}


export interface ILayoutProps {
    children: React.ReactNode
}

export interface ISliderItem {
    id: string | number
    img: string
    alt: string
}