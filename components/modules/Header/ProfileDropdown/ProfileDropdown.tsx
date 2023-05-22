import { forwardRef, useEffect } from 'react'
import styles from './ProfileDropdown.module.scss'
import {
  CloseWhenClickOutside,
  IWrappedComponentProps,
} from '@/hocs/CloseWhenClickOutside'
import MaterialIcon from '@/components/MaterialIcon/MaterialIcon'
import { useTheme } from '@/hooks/useTheme'

import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from 'effector-react'
import { $user } from '@/context/user'
import { useRouter } from 'next/router'
import { logoutFx } from '@/app/api/auth'

const ProfileDropdown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const darkModeClass = useTheme(styles)

    const user = useStore($user)
    const router = useRouter()
    const toggleProfileDropdown = () => {
      console.log('toggleProfileDropdown')

      setOpen(!open)
    }

    const handleLogout = async () => {
      await logoutFx('/users/logout')
      router.push('/')
    }

    useEffect(() => {
      console.log('toggleProfileDropdown', open)
    }, [open])

    return (
      <div className={cn(styles.profile, darkModeClass)} ref={ref}>
        <button
          onClick={toggleProfileDropdown}
          className={cn(styles.profile__btn, darkModeClass)}
        >
          <span className={cn(styles.profile__icon, darkModeClass)}>
            <MaterialIcon
              name="CgProfile"
              className={cn(styles.profile__icon__svg, darkModeClass)}
            />
          </span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={cn(styles.profile__dropdown, darkModeClass)}
              style={{ transformOrigin: 'right top' }}
            >
              <li className={styles.profile__dropdown__user}>
                <span
                  className={cn(
                    styles.profile__dropdown__username,
                    darkModeClass
                  )}
                >
                  {user.username}
                </span>
                <span
                  className={cn(styles.profile__dropdown__email, darkModeClass)}
                >
                  {user.email}
                </span>
              </li>
              <li className={styles.profile__dropdown__item}>
                <button
                  onClick={handleLogout}
                  className={styles.profile__dropdown__item__btn}
                >
                  <span
                    className={cn(
                      styles.profile__dropdown__item__text,
                      darkModeClass
                    )}
                  >
                    Выйти
                  </span>
                  <span
                    className={cn(
                      styles.profile__dropdown__item__svg,
                      darkModeClass
                    )}
                  >
                    <MaterialIcon name="MdLogout" />
                  </span>
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

ProfileDropdown.displayName = 'ProfileDropdown'
export default CloseWhenClickOutside(ProfileDropdown)
