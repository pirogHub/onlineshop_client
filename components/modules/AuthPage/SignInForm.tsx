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

import { useRouter } from 'next/router'
import NameInput from '@/components/elements/AuthPage/NameInput'
import { useTheme } from '@/hooks/useTheme'
import { setUser } from '@/context/user'
const SignInForm = ({ linkToRedirect }: { linkToRedirect?: string }) => {
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
      const userData = await signInFx({
        url: 'users/login',
        username: data.name,
        password: data.password,
      })
      debugger
      if (!userData) return
      setUser(userData)
      resetField('name')
      resetField('password')
      // setUser(userData)
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
        Войти на сайт
      </h2>
      <NameInput register={register} errors={errors} />
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
