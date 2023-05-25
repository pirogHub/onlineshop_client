import styles from '@/components/templates/AuthPage/AuthPage.module.scss'
import { IAuthPageInput } from '@/types/auth'

const NameInput = ({ register, errors }: IAuthPageInput) => {
  return (
    <label className={styles.form__label}>
      <input
        {...register('name', {
          required: 'Введите имя',
          minLength: 2,
          maxLength: 15,
          pattern: {
            value: /^[а-яА-яa-zA-zёЁ0-9]*$/,
            message: 'Недопустимый символ',
          },
        })}
        className={styles.form__input}
        placeholder="Имя"
      />
      {errors.name && (
        <span className={styles.error_alert}>{errors.name?.message} </span>
      )}
      {errors.name && errors.name.type === 'minLength' && (
        <span className={styles.error_alert}>Минимум 2 символа!</span>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 15 символов!</span>
      )}
    </label>
  )
}

export default NameInput
