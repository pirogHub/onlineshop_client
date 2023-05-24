import { IPartImagesItemProps } from '@/types/part'
import styles from '@/components/templates/PartPage/PartPage.module.scss'

const ImagesItem = ({ src, callback, alt }: IPartImagesItemProps) => {
  const changeMainImage = () => callback(src)

  return (
    <li className={styles.part__images__list__item} onClick={changeMainImage}>
      <img src={src} alt={alt} />
    </li>
  )
}

export default ImagesItem
