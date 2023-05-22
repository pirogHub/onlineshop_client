import { FC, PropsWithChildren, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './DashboardPage.module.scss'
import CustomSlider from '@/components/modules/CustomSlider/CustomSlider'
import { brandItems } from '@/mock/dataSlider'
import { IBoilerPart } from '@/types/boilerparts'
import { getBestsellersFx } from '@/app/api/boilerparts'
import { toast } from 'react-toastify'
import { useTheme } from '@/hooks/useTheme'

const DashboardPage: FC<PropsWithChildren> = () => {
  const darkModeClass = useTheme(styles)

  const [newParts, setNewParts] = useState<IBoilerPart[]>([])
  const [bestsellers, setBestsellers] = useState<IBoilerPart[]>([])

  const loadBoilerPArts = async () => {
    try {
      const received_newParts = await getBestsellersFx()
      const received_bestsellers = await getBestsellersFx()

      setNewParts(received_newParts)
      setBestsellers(received_bestsellers)
    } catch (error) {
      toast.error((error as Error).message)
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
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
