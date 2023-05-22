import Link from 'next/link'
import styles from '../Footer.module.scss'

const FooterLogo = () => {
  return (
    <div>
      <Link className={styles.footer__top__item__logo} href="/dashboard">
        <img src="/img/logo-footer.svg" alt="logo" />
        <span className={styles.footer__top__item__logo__text}>
          Детали для котлов
        </span>
      </Link>
    </div>
  )
}

export default FooterLogo
