import cn from 'classnames'

import { toast } from 'react-toastify'

import styles from '@/components/templates/AuthPage/AuthPage.module.scss'
import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth'
import NameInput from '@/components/elements/AuthPage/NameInput'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { signUpFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import { useState } from 'react'
import Spinner from '@/components/elements/Spinner/Spinner'

import { useRouter } from 'next/router'
import { useTheme } from '@/hooks/useTheme'
const SignUpForm = ({ linkToRedirect }: { linkToRedirect?: string }) => {
  const [spinner, setSpinner] = useState(false)

  const darkModeClass = useTheme(styles)
  const route = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const redirector = () => {
    if (linkToRedirect) route.push(`${linkToRedirect}`)
    else route.push('/dashboard')
  }
  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      const userData = await signUpFx({
        url: '/users/signup',
        username: data.name,
        password: data.password,
        email: data.email,
      })

      if (!userData) return
      resetField('email')
      resetField('name')
      resetField('password')
      redirector()
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
        Создать аккаунт
      </h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        // onClick={switchForm}

        className={cn(
          styles.form__button,
          styles.button,
          styles.submit,
          darkModeClass
        )}
      >
        {spinner ? <Spinner /> : 'Зарегистрироваться'}
      </button>
    </form>
  )
}

export default SignUpForm
