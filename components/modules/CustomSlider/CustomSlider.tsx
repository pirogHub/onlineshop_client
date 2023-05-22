import cn from 'classnames'

import styles from './CustomSlider.module.scss'
import { useTheme } from '@/hooks/useTheme'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ISliderItem } from '@/types/common'
import SliderArrows from './SliderArrows'

const settings = {
  dots: false,
  infinite: true,
  slidesToScroll: 1,
  variableWidth: true,
  autoplay: true,
  speed: 500,
  nextArrow: <SliderArrows.Next />,
  prevArrow: <SliderArrows.Prev />,
}

const CustomSlider = ({ items }: { items: ISliderItem[] }) => {
  const darkModeClass = useTheme(styles)
  const isMedia768 = useMediaQuery(768)

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    )

    const list = slider?.querySelector('.slick-list') as HTMLElement

    list.style.height = isMedia768 ? '60px' : '80px'
  }, [])

  return (
    <Slider
      {...settings}
      className={cn(styles.dashboard__brands__slider, darkModeClass)}
    >
      {items.map((i) => (
        <div
          key={i.id}
          className={cn(styles.dashboard__brands__slide, darkModeClass)}
          style={{ width: isMedia768 ? 124 : 180 }}
        >
          <img src={i.img} alt={i.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default CustomSlider
