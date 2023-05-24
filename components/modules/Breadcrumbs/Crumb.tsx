import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { ICrumbProps } from '@/types/common'
import { $mode } from '@/context/mode'
import styles from '@/styles/breadcrumbs/index.module.scss'
import SVG from '@/components/elements/ui/svg'
import cn from 'classnames'
const Crumb = ({
  text: defaultText,
  textGenerator,
  href,
  last = false,
}: ICrumbProps) => {
  const [text, setText] = useState(defaultText)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    handleTextGenerate()
  }, [textGenerator])

  const handleTextGenerate = async () => {
    if (!Boolean(textGenerator)) {
      return
    }

    const finalText = await textGenerator()
    setText(finalText)
  }

  if (last) {
    return (
      <a>
        <span
          className={cn(styles.breadcrumbs__item__icon, darkModeClass)}
          style={{ marginRight: 13 }}
        >
          <SVG.CrumbArrowSvg />
        </span>
        <span className={cn('last-crumb', styles.breadcrumbs__item__text)}>
          {text}
        </span>
      </a>
    )
  }

  return (
    <Link href={href}>
      <span
        className={cn(styles.breadcrumbs__item__icon, darkModeClass)}
        style={{ marginRight: 13 }}
      >
        <SVG.CrumbArrowSvg />
      </span>
      <span className={styles.breadcrumbs__item__text}>{text}</span>
    </Link>
  )
}

export default Crumb
