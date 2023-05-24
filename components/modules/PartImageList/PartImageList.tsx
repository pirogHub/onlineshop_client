import { useStore } from 'effector-react'
import { useState } from 'react'
import { $boilerPart } from '@/context/boilerPart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/components/templates/PartPage/PartPage.module.scss'
import PartSlider from './PartSlider'
import ImagesItem from './ImagesItem'

const PartImagesList = () => {
  const boilerPart = useStore($boilerPart)
  const isMobile = useMediaQuery(850)
  const images = boilerPart.images
    ? (JSON.parse(boilerPart.images) as string[])
    : []
  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={boilerPart.name} />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <ImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default PartImagesList
