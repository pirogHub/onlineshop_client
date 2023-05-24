import styles from './AboutPage.module.scss'
import { useTheme } from '@/hooks/useTheme'
import cn from 'classnames'
const AboutPage = () => {
  const darkModeClass = useTheme(styles)

  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={cn(styles.about__title, darkModeClass)}>О компании</h2>
        <div className={styles.about__inner}>
          <div className={cn(styles.about__info, darkModeClass)}>
            <p>
              Компания &quot;АкваТермикс&quot; предлагает Вам запасные части для
              европейских, корейских и отечественных газовых и электрических
              котлов. 99% запчастей представленных на сайте постоянно
              поддерживаются в наличии на нашем складе.
            </p>
            <p>
              Ассортимент интернет-магазина &quot;АкваТермикс&quot; включает в
              себя запасные части для котлов Arderia, Ariston, Baxi, Beretta,
              Bosch, Buderus, Chaffoteaux, De Dietrich, Demrad, Electrolux,
              Ferroli, Fondital, Immergas, Junkers, Koreastar, Nova Florida,
              Saunier Duval, Sime, Tiberis, Vaillant, Viessmann, Westen.
            </p>
          </div>
          <div className={cn(styles.about__img, styles.about__img__top)}>
            <img src="/img/about/about-img.png" alt="image-1" />
          </div>
          <div className={cn(styles.about__img, styles.about__img__bottom)}>
            <img src="/img/about/about-img-2.png" alt="image-2" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
