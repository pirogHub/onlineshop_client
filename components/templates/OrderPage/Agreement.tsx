import { useTheme } from '@/hooks/useTheme'
import styles from './OrderPage.module.scss'
import cn from 'classnames'

const Agreement = ({
  agreement,
  handleAgreementChange,
}: {
  agreement: boolean
  handleAgreementChange: () => void
}) => {
  const darkModeClass = useTheme(styles)
  return (
    <label className={cn(styles.order__pay__rights, darkModeClass)}>
      <input
        className={styles.order__pay__rights__input}
        type="checkbox"
        onChange={handleAgreementChange}
        checked={agreement}
      />
      <span className={styles.order__pay__rights__text}>
        <strong>Согласен с условиями</strong> Правил пользования торговой
        площадкой и правилами возврата
      </span>
    </label>
  )
}

export default Agreement
