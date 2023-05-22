import styles from '../Footer.module.scss'

const SocialMedia = () => {
  return (
    <>
      <h3 className={styles.footer__bottom__block__title}>Мы в соцсети:</h3>
      <ul className={styles.footer__bottom__block__social}>
        <li className={styles.footer__bottom__block__social__item}>
          <a
            href="#"
            className={styles.footer__bottom__block__social__item_vk}
          />
        </li>
        <li className={styles.footer__bottom__block__social__item}>
          <a
            href="#"
            className={styles.footer__bottom__block__social__item_fb}
          />
        </li>
        <li className={styles.footer__bottom__block__social__item}>
          <a
            href="#"
            className={styles.footer__bottom__block__social__item_inst}
          />
        </li>
        <li className={styles.footer__bottom__block__social__item}>
          <a
            href="#"
            className={styles.footer__bottom__block__social__item_ytb}
          />
        </li>
      </ul>
    </>
  )
}
export default SocialMedia
