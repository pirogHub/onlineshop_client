import { FC } from 'react'

import MaterialIcon from '@/components/MaterialIcon/MaterialIcon'
import styles from './CityButton.module.scss'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'

import cn from 'classnames'
import { useTheme } from '@/hooks/useTheme'
import { $userCity, setUserCity } from '@/context/user'
import { getGeolocationFx } from '@/app/api/geollocation'
import { toast } from 'react-toastify'
import Spinner from '../Spinner/Spinner'
import { error500hander } from '@/app/api.helpers'

const CityButton: FC = () => {
  const darkModeClass = useTheme(styles)
  const { city } = useStore($userCity)
  const spinner = useStore(getGeolocationFx.pending)
  const getCity = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
    const success = async (pos: GeolocationPosition) => {
      try {
        const { latitude, longitude } = pos.coords

        const { data } = await getGeolocationFx({ latitude, longitude })

        setUserCity({
          city: data.features[0].properties.city,
          street: data.features[0].properties.address_line1,
        })
      } catch (error) {
        if (!error500hander(error)) toast.error((error as Error).message)
      }
    }

    const error = (error: GeolocationPositionError) =>
      toast.error(`${error.code} ${error.message}`)

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  return (
    <button className={styles.city} onClick={getCity}>
      <span className={cn(styles.city__span, darkModeClass)}>
        <MaterialIcon name="TfiLocationArrow" isFlipHorizontal />
      </span>
      <span className={cn(styles.city__text, darkModeClass)}>
        {spinner ? (
          <Spinner style={{ top: '-10px', left: 10, width: 20, height: 20 }} />
        ) : city.length ? (
          city
        ) : (
          'Найти Город'
        )}
      </span>
    </button>
  )
}

export default CityButton
