import { FC, PropsWithChildren, useState } from 'react'

import styles from './CatalogFilters.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import {
  ICatalogFilterDesktopProps,
  ICatalogFilterMobileProps,
  ICatalogFiltersProps,
} from '@/types/catalog'
import PriceRange from '../PriceRange'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setFilteredBoilerParts,
} from '@/context/boilerParts'
import { useRouter } from 'next/router'
import { getBoilerPartsFx } from '@/app/api/boilerparts'
import { createQuery } from '@/utils/aboutQuery'
import CatalogFiltersMobile from './CatalogFiltersMobile/CatalogFiltersMobile'

const CatalogFilters = (props: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)

  const router = useRouter()

  const applyFiltersWithQuery = async () => {
    props.setIsFilterInQuery(true)
    const queryFull = createQuery({
      priceRange: props.priceRange,
      isPriceRangeChanged: props.isPriceRangeChanged,
      boilerManufacturers,
      partsManufacturers,
      currentPage: props.currentPage,
      limit: 20,
    })
    props.applyFilters(queryFull)
  }
  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          {...(props as unknown as ICatalogFilterMobileProps)}
        />
      ) : (
        <CatalogFiltersDesktop
          {...(props as unknown as ICatalogFilterDesktopProps)}
          applyFilters={applyFiltersWithQuery}
          // spinner={spinner}
        />
      )}
    </>
  )
}

export default CatalogFilters
