import { FC, PropsWithChildren } from 'react'

import styles from './Footer.module.scss'
import FooterLogo from './components/FooterLogo'

import ItemContent, { TypeItemContentItem } from './components/ItemContent'

import cn from 'classnames'
import MaterialIcon from '@/components/MaterialIcon/MaterialIcon'
import { useTheme } from '@/hooks/useTheme'
import Link from 'next/link'
import ContactItems from './components/ContactItems'
import PaymentCards from './components/PaymentCards'
import SocialMedia from './components/SocialMedia'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Accordion from '@/components/elements/Accordion/Accordion'

const OneItem: FC<
  PropsWithChildren<{ label: string; items?: TypeItemContentItem[] }>
> = ({ label, items, children }) => {
  const isMedia500 = useMediaQuery(500)
  return (
    <div className={styles.footer__top__item}>
      {!isMedia500 ? (
        <>
          <h3 className={styles.footer__top__item__title}>{label}</h3>
          {!!children ? (
            children
          ) : !!items?.length ? (
            <ItemContent items={items} />
          ) : null}
        </>
      ) : (
        <Accordion
          title={label}
          titleClass={styles.footer__top__item__title}
          arrowOpenClass={styles.open}
        >
          {!!children ? (
            children
          ) : !!items?.length ? (
            <ItemContent items={items} />
          ) : null}
          <div style={{ height: 17 }}></div>
        </Accordion>
      )}
    </div>
  )
}

// const ContactOneItem: FC<
//   PropsWithChildren<{ label: string; items?: TypeItemContentItem[] }>
// > = ({ label, items, children }) => {
//   const isMedia500 = useMediaQuery(500)
//   return (
//     <div className={styles.footer__top__item}>
//       {!isMedia500 ? (
//         <>
//           <h3 className={styles.footer__top__item__title}>{label}</h3>
//           {!!children ? (
//             children
//           ) : !!items?.length ? (
//             <ItemContent items={items} />
//           ) : null}
//         </>
//       ) : (
//         <Accordion
//           title={label}
//           titleClass={styles.footer__top__item__title}
//           arrowOpenClass={styles.open}
//         >
//           {!!children ? (
//             children
//           ) : !!items?.length ? (
//             <ItemContent items={items} />
//           ) : null}
//         </Accordion>
//       )}
//     </div>
//   )
// }

const Footer: FC = () => {
  const darkModeClass = useTheme(styles)

  const isMedia750 = useMediaQuery(750)
  const isMedia500 = useMediaQuery(500)
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {!isMedia750 && <FooterLogo />}
          <div className={styles.footer__top__inner}>
            <OneItem
              label="Интернет-магазин"
              items={[
                { label: 'Каталог', href: '/catalog' },
                { label: 'Доставка и оплата', href: '/shipping-payment' },
              ]}
            />
            <OneItem
              label="Компания"
              items={[
                { label: 'О компании', href: '/about' },
                { label: 'Обратная связь', href: '/contacts' },
                { label: 'Оптовым покупателям', href: '/wholesale-buyers' },
                { label: 'Контакты', href: '/contacts' },
              ]}
            />
          </div>
          <OneItem label="Контакты">
            <ContactItems />
          </OneItem>
        </div>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottom__block}>
            <div className={styles.footer__bottom__block__left}>
              <PaymentCards />
            </div>
            <div className={styles.footer__bottom__block__right}>
              <SocialMedia />
            </div>
          </div>
          {isMedia750 && <FooterLogo />}
          <div className={styles.footer__bottom__block}>
            <p className={styles.footer__bottom__block__copyright}>
              ©Детали для газовых котлов
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
