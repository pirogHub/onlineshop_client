import { FC, useState } from 'react'

import styles from './SearchInput.module.scss'
import { useTheme } from '@/hooks/useTheme'
import Select from 'react-select'
import { SelectOptionType } from '@/types/common'
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from './ReactSelect.styles'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'

const SearchInput: FC = () => {
  const mode = useStore($mode)
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption)
  }
  return (
    <Select
      placeholder="Я ищу..."
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...inputStyles,
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
      isClearable={true}
      openMenuOnClick={false}
      options={[1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15].map((item) => ({
        value: item,
        label: item,
      }))}
    />
  )
}

export default SearchInput
