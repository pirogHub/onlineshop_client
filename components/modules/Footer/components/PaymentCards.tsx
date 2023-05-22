import styles from '../Footer.module.scss'

const PaymentCards = () => {
  return (
    <>
      <h3 className={styles.footer__bottom__block__title}>
        Мы принимаем к оплате:
      </h3>
      <ul className={styles.footer__bottom__block__pay}>
        <li className={styles.footer__bottom__block__pay__item}>
          <img src="/img/cards/pay.png" alt="apple-pay" />
        </li>
        <li className={styles.footer__bottom__block__pay__item}>
          <img src="/img/cards/gpay.png" alt="google-pay" />
        </li>
        <li className={styles.footer__bottom__block__pay__item}>
          <img src="/img/cards/master-card.png" alt="master-card" />
        </li>
        <li className={styles.footer__bottom__block__pay__item}>
          <img src="/img/cards/visa.png" alt="visa" />
        </li>
      </ul>
    </>
  )
}
export default PaymentCards
