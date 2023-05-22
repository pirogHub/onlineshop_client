import { FC, PropsWithChildren, useState } from 'react'

import styles from './CatalogFilters.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFilterDesktopProps, ICatalogFiltersProps } from '@/types/catalog'
import PriceRange from '../PriceRange'

const CatalogFilters = (props: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)

  const applyFilters = async () => {
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(props.priceRange[0])
      const priceTo = Math.ceil(props.priceRange[1])
      const priceQuery = 
    } catch (error) {
      
    } finally {
      setSpinner(false)
    }
  } 
  return (
    <>
      {isMobile ? (
        <div />
      ) : (
        <CatalogFiltersDesktop {...(props as unknown as ICatalogFilterDesktopProps)} spinner={spinner} />
      )}
    </>
  )
}

export default CatalogFilters
