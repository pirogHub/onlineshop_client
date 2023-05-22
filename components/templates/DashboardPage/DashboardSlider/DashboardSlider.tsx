import Slider from 'react-slick'
import { useStore } from 'effector-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { IDashboardSlider } from '@/types/dashboard'
import SliderArrows from '@/components/modules/CustomSlider/SliderArrows'

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

const DashboardSlider = ({
  items,
  spinner,
  goToPartPage,
}: IDashboardSlider) => {
  //   const isMedia768 = useMediaQuery(768)
  //   const isMedia1366 = useMediaQuery(1366)
  //   const isMedia800 = useMediaQuery(800)
  //   const isMedia560 = useMediaQuery(560)
  const darkModeClass = useTheme(styles)

  return (
    <Slider {...settings} className={styles.dashboard__slider}>
      {spinner
        ? [...Array(8)].map((item) => (
            <div className="" key={item}>
              <div className=""></div>
            </div>
          ))
        : ''}
    </Slider>
  )
}

export default DashboardSlider
