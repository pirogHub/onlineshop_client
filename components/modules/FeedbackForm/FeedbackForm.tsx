import { $mode } from '@/context/mode'
import styles from '@/styles/feedbackForm/index.module.scss'
import { useStore } from 'effector-react'
import emailjs from '@emailjs/browser'
import NameInput from './NameInput'
import { useForm } from 'react-hook-form'
import { FeedbackInputs } from '@/types/feedbackForm'
import PhoneInput from './PhoneInput'
import EmailInput from './EmailInput'
import MessageInput from './MessageInput'
import { MutableRefObject, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useTheme } from '@/hooks/useTheme'
import cn from 'classnames'
import Spinner from '@/components/elements/Spinner/Spinner'

const FeedbackForm = () => {
  const darkModeClass = useTheme(styles)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackInputs>()
  const [spinner, setSpinner] = useState(false)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  const submitForm = () => {
    setSpinner(true)
    emailjs
      .sendForm(
        'service_j0ms23r',
        'template_qplfysj',
        formRef.current,
        'EO4DR1bW692APhHZA'
      )
      .then((result) => {
        setSpinner(false)
        toast.success(`Сообщение отправлено! ${result.text}`)
      })
      .catch((error) => {
        setSpinner(false)
        toast.error(`Что-то пошло не так! ${error.text}`)
      })

    formRef.current.reset()
  }

  return (
    <div className={cn(styles.feedback_form, darkModeClass)}>
      <h3 className={cn(styles.feedback_form__title, darkModeClass)}>
        Форма обратной связи
      </h3>
      <form
        ref={formRef}
        className={styles.feedback_form__form}
        onSubmit={handleSubmit(submitForm)}
      >
        <NameInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <PhoneInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <EmailInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <MessageInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <div className={styles.feedback_form__form__btn}>
          <button>
            {spinner ? (
              <Spinner style={{ top: '6px', left: '47%' }} />
            ) : (
              'Отправить сообщение'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
