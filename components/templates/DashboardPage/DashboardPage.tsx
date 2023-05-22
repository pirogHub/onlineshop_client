import { FC, PropsWithChildren, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './DashboardPage.module.scss'
import CustomSlider from '@/components/modules/CustomSlider/CustomSlider'
import { brandItems } from '@/mock/dataSlider'
import { IBoilerPart, IBoilerParts } from '@/types/boilerparts'
import { getBestsellersFx } from '@/app/api/boilerparts'
import { toast } from 'react-toastify'
import { useTheme } from '@/hooks/useTheme'
import DashboardSlider from './DashboardSlider/DashboardSlider'

const DashboardPage: FC<PropsWithChildren> = () => {
  const darkModeClass = useTheme(styles)

  const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts)
  const [bestsellers, setBestsellers] = useState<IBoilerParts>(
    {} as IBoilerParts
  )

  const [spinner, setSpinner] = useState(false)

  const loadBoilerPArts = async () => {
    try {
      setSpinner(true)
      const received_newParts = await getBestsellersFx()
      const received_bestsellers = await getBestsellersFx()

      setNewParts(received_newParts)
      setBestsellers(received_bestsellers)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  useEffect(() => {
    loadBoilerPArts()
  }, [])

  return (
    <section className={styles.dashboard}>
      <div className={cn('container', styles.dashboard__container)}>
        <div className={styles.dashboard__brands}>
          <CustomSlider items={brandItems} />
        </div>
        <h2 className={cn(styles.dashboard__title, darkModeClass)}>
          Детали для газовых котлов
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={cn(styles.dashboard__title, darkModeClass)}>
            Хиты продаж
          </h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={cn(styles.dashboard__title, darkModeClass)}>
            Новинки
          </h3>
          <DashboardSlider items={newParts.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={cn(
              styles.dashboard__title,
              styles.dashboard__about__title,
              darkModeClass
            )}
          >
            О компании
          </h3>
          <p className={cn(styles.dashboard__about__text, darkModeClass)}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            reiciendis esse dicta dolore inventore hic, quos vitae rem iusto,
            voluptatem sed molestias aspernatur, nam perferendis repudiandae
            blanditiis perspiciatis expedita. Distinctio facere saepe soluta
            dolores ipsa adipisci asperiores iste. Dolorem qui cumque doloremque
            quos commodi molestias iste suscipit atque maxime rerum, cum amet
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
