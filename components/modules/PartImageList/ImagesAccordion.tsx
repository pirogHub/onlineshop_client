import Accordion from '@/components/elements/Accordion/Accordion'

import { IPartAccordionProps } from '@/types/part'
import styles from '@/components/templates/PartPage/PartPage.module.scss'
import { useTheme } from '@/hooks/useTheme'

import cn from 'classnames'

const ImagesAccordion = ({ children, title }: IPartAccordionProps) => {
  const darkModeClass = useTheme(styles)

  const handleExpandAccordion = (expanded: boolean) => {
    const accordionTitles = document.querySelectorAll(
      `.${styles.part__accordion__title}`
    )

    accordionTitles.forEach((title) => {
      const item = title as HTMLElement

      if (!expanded) {
        item.style.borderBottomLeftRadius = '0'
        item.style.borderBottomRightRadius = '0'
      } else {
        item.style.borderBottomLeftRadius = '4px'
        item.style.borderBottomRightRadius = '4px'
      }
    })
  }

  return (
    <Accordion
      title={title}
      titleClass={cn(styles.part__accordion__title, darkModeClass)}
      arrowOpenClass={styles.open}
      boxShadowStyle="0px 2px 8px rgba(0, 0, 0, 0.1)"
      callback={handleExpandAccordion}
    >
      {children}
    </Accordion>
  )
}

export default ImagesAccordion
