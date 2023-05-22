import Slider from 'react-slick'
import { useStore } from 'effector-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { IDashboardSlider } from '@/types/dashboard'
import SliderArrows from '@/components/modules/CustomSlider/SliderArrows'

import cn from 'classnames'
import styles from '../DashboardPage.module.scss'
import Skeleton from '@/components/elements/Skeleton/Skeleton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { formatPrice } from '@/utils/common'

const DashboardSlider = ({
  items,
  spinner,
  goToPartPage,
}: IDashboardSlider) => {
  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia1030 = useMediaQuery(1030)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    // slidesToShow: items.length >= 4 ? (isMedia1030 ? 3 : 4) : items.length - 1,
    slidesToScroll: isMedia768 ? 1 : 2,
  }

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  }

  const darkModeClass = useTheme(styles)

  useEffect(() => {
    const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)

    slider.forEach((item) => {
      const list = item.querySelector('.slick-list') as HTMLElement

      list.style.height = isMedia560 ? '276px' : '390px'
      list.style.padding = '0 5px'
      list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0'
    })
  }, [isMedia560, isMedia800])

  return (
    <Slider {...settings} className={styles.dashboard__slider}>
      {spinner ? (
        [...Array(8)].map((item) => (
          <Skeleton.SkeletonDiv style={width} key={item} />
        ))
      ) : items.length ? (
        items.map((item) => (
          <div
            className={cn(styles.dashboard__slide, darkModeClass)}
            key={item.id}
            style={width}
          >
            <img src={JSON.parse(item.images)[0]} alt={item.name} />
            <div className={cn(styles.dashboard__slide__inner, darkModeClass)}>
              <Link href={goToPartPage ? `/catalog/${item.id}` : '/catalog'}>
                <h3
                  className={cn(styles.dashboard__slide__title, darkModeClass)}
                >
                  {item.name}
                </h3>
              </Link>
              <span
                className={cn(styles.dashboard__slide__code, darkModeClass)}
              >
                Артикул: {item.vendor_code}
              </span>
              <span
                className={cn(styles.dashboard__slide__price, darkModeClass)}
              >
                {formatPrice(item.price)} P
              </span>
            </div>
          </div>
        ))
      ) : (
        <span>Список товаров пуст</span>
      )}
    </Slider>
  )
}

export default DashboardSlider
