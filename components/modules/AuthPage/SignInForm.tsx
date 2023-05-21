import cn from 'classnames'

import { useForm } from 'react-hook-form'

import { signInFx } from '@/app/api/auth'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import Spinner from '@/components/elements/Spinner/Spinner'
import styles from '@/components/templates/AuthPage/AuthPage.module.scss'
import { IInputs } from '@/types/auth'
import { showAuthError } from '@/utils/errors'
import { useState } from 'react'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const route = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      const userData = await signInFx({
        url: 'users/login',
        username: data.name,
        password: data.password,
      })
      resetField('name')
      resetField('password')
      route.push('/dashboard')
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form
      className={cn(styles.form, darkModeClass)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={cn(styles.form_title, styles.title, darkModeClass)}>
        Войти на сайт
      </h2>
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={cn(
          styles.form__button,
          styles.button,
          styles.submit,
          darkModeClass
        )}
      >
        {spinner ? <Spinner /> : 'Войти'}
      </button>
    </form>
  )
}

export default SignInForm
