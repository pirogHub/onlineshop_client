import { createSelectOption } from '@/utils/common'
import { controlStyles, menuStyles, selectStyles } from './FilterSelect.styles'
import Select from 'react-select'
import { optionStyles } from '@/components/elements/SearchInput/ReactSelect.styles'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useEffect, useState } from 'react'
import { IOption, SelectOptionType } from '@/types/common'
import { categoriesOptions } from '@/utils/selectContents'
import {
  $boilerParts,
  setBoilerParts_byPopularity,
  setBoilerParts_cheapFirst,
  setBoilerParts_expensiveFirst,
} from '@/context/boilerParts'
import { useRouter } from 'next/router'

const FilterSelect = ({
  setSpinner,
}: {
  setSpinner: (arg0: boolean) => void
}) => {
  const mode = useStore($mode)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()
  const boilerParts = useStore($boilerParts)

  const updateRoteParam = (first: string) => {
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    ) // поверхностно, то есть без перерендеривания пропров
  }

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value })

  useEffect(() => {
    if (boilerParts.rows) {
      switch (router.query.first) {
        case 'expensive':
          updateCategoryOption('Сначала дорогие')
          setBoilerParts_expensiveFirst()
          break
        case 'popular':
          updateCategoryOption('По популярности')
          setBoilerParts_byPopularity()
          break
        case 'cheap':
        default:
          updateCategoryOption('Сначала дешевые')
          setBoilerParts_cheapFirst()
          break
      }
    }
  }, [boilerParts.rows, router.query.first])

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true)
    setCategoryOption(selectedOption)
    switch ((selectedOption as IOption).value) {
      case 'Сначала дешевые':
        setBoilerParts_cheapFirst()
        updateRoteParam('cheap')
        break
      case 'Сначала дорогие':
        setBoilerParts_expensiveFirst()
        updateRoteParam('expensive')
        break
      case 'По популярности':
        setBoilerParts_byPopularity()
        updateRoteParam('popular')
        break
    }
    setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={categoryOption || createSelectOption('Сначала дешевые')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  )
}

export default FilterSelect
