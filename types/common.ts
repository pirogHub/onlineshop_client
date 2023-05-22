export interface IAccordion {
    children: React.ReactNode
    title: string | false
    titleClass: string
    arrowOpenClass?: string
    isMobileForFilters?: boolean
    hideArrowClass?: string
}


export interface ILayoutProps {
    children: React.ReactNode
}

export interface ISliderItem {
    id: string | number
    img: string
    alt: string
}