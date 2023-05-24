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
                <span>+7 (555) 55-55-555</span>
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
                <span> г. Москва, ул. ... д....</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>Склад:</span>
                <span> г. Москва, ул. ... д....</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>График работы офиса:</span>
                <span> пн-пс: с 8:00 до 22:00</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>Наш контактный телефон:</span>
                <span> +7(8095) 555-55-55</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>Время приемок завок:</span>
                <span> Пн-Вс: с 8:00 до 22:00</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>Прием заказов электронным способом на сайте:</span>
                <span> круглосуточно</span>
              </li>
              <li className={cn(styles.contacts__list__item, darkModeClass)}>
                <span>E-mail:</span>
                <span className={styles.contacts__list__item__mail}>
                  {!isMobile560 && <SVG.MailSvg />}{' '}
                  <span>info@zapchasti.com.ru</span>
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
