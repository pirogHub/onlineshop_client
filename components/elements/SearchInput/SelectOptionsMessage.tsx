import { IOption } from '@/types/common'
import { GroupBase, NoticeProps, components } from 'react-select'
import Spinner from '../Spinner/Spinner'

export const NoOptionsMessage = (
  props: NoticeProps<IOption, boolean, GroupBase<IOption>>
) => (
  <components.NoOptionsMessage {...props}>
    <span>Ничего не найдено</span>
  </components.NoOptionsMessage>
)

export const NoOptionsSpinner = (
  props: NoticeProps<IOption, boolean, GroupBase<IOption>>
) => (
  <components.NoOptionsMessage {...props}>
    <Spinner style={{ top: '5px', left: '48%', width: 25, height: 25 }} />
  </components.NoOptionsMessage>
)
