/* eslint-disable max-len */

import { CustomArrowProps } from 'react-slick'
import styles from './CustomSlider.module.scss'
import { useTheme } from '@/hooks/useTheme'

export interface IBrandsSliderArrow extends CustomArrowProps {}

const BrandSliderArrowSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z" />
  </svg>
)

const SliderNextArrow = (props: IBrandsSliderArrow) => {
  const darkModeClass = useTheme(styles)
  return (
    <button
      className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_next}  ${darkModeClass}`}
      onClick={props.onClick}
    >
      <span>
        <BrandSliderArrowSvg />
      </span>
    </button>
  )
}

const SliderPrevArrow = (props: IBrandsSliderArrow) => {
  const darkModeClass = useTheme(styles)

  return (
    <button
      className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${darkModeClass}`}
      onClick={props.onClick}
    >
      <span>
        <BrandSliderArrowSvg />
      </span>
    </button>
  )
}

const SliderArrows = {
  Next: SliderNextArrow,
  Prev: SliderPrevArrow,
}

export default SliderArrows
