import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from './ContactsPage.module.scss'
import FeedbackForm from '@/components/modules/FeedbackForm/FeedbackForm'
import SVG from '@/components/elements/ui/svg'
import { useTheme } from '@/hooks/useTheme'
import cn from 'classnames'
const ContactsPage = ({ isWholesaleBuyersPage = false }) => {
  const isMobile560 = useMediaQuery(560)
  const darkModeClass = useTheme(styles)
  return (
    <section className={styles.contacts}>
      <div className="container">
        <h2 className={cn(styles.contacts__title, darkModeClass)}>
          {isWholesaleBuyersPage ? 'Оптовым покупателям' : 'Контакты'}
        </h2>
        <div className={styles.contacts__inner}>
          {isWholesaleBuyersPage ? (
            <div className={cn(styles.contacts__list, darkModeClass)}>
              <p>
                <span>
                  Условия оптовых заказов решаются индивидуально по телефону:{' '}
                </span>
                <span>+0 (123) 45-67-89</span>
              </p>
              <p>
                Либо опишите суть заказа в форме обртной связи и мы с вами
                свяжемся.
              </p>
            </div>
          ) : (
            <ul className={cn(styles.contacts__list, darkModeClass)}>
              <li className={styles.contacts__list__title}>
                <h3 className={darkModeClass}>
                  Магазин деталей для газовых котлов
                </h3>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>Офис:</span>
                <span> Lorem ipsum dolor sit amet.</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>Склад:</span>
                <span> Lorem ipsum dolor sit amet.</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>График работы офиса:</span>
                <span> пн-пс: с 24:00 до 24:00</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>Наш контактный телефон:</span>
                <span> +0 (123) 45 67 89</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>Время приемок завок:</span>
                <span> Пн-Вс: с 24:00 до 24:00</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>Прием заказов электронным способом на сайте:</span>
                <span> круглосуточно</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>E-mail:</span>
                <span className={styles.contacts__list__item__mail}>
                  {!isMobile560 && <SVG.MailSvg />}{' '}
                  <span>email@email.email</span>
                </span>
              </li>
            </ul>
          )}
          <FeedbackForm />
        </div>
      </div>
    </section>
  )
}

export default ContactsPage
