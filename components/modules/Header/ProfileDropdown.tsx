import { forwardRef } from 'react'
import styles from './ProfileDropdown.module.scss'
import { IWrappedComponentProps } from '@/hocs/CloseWhenClickOutside'
import MaterialIcon from '@/components/MaterialIcon/MaterialIcon'
import { useTheme } from '@/hooks/useTheme'

import cn from 'classnames'

const ProfileDropdown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const darkModeClass = useTheme(styles)

    return (
      <div className={cn(styles.profile, darkModeClass)}>
        <button>
          <MaterialIcon name="CgProfile" />
        </button>
      </div>
    )
  }
)

ProfileDropdown.displayName = 'ProfileDropdown'
export default ProfileDropdown
