import { MutableRefObject, useRef } from 'react'
import styles from './AuthPage.module.scss'
import SignUpForm from '@/components/modules/AuthPage/SignUpForm'
import SignInForm from '@/components/modules/AuthPage/SignInForm'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import cn from 'classnames'
import { useTheme } from '@/hooks/useTheme'

const AuthPage = ({ linkToRedirect }: { linkToRedirect?: string }) => {
  const isMedia800 = useMediaQuery(800)
  const switchCtn = useRef() as MutableRefObject<HTMLDivElement>
  const switchC1 = useRef() as MutableRefObject<HTMLDivElement>
  const switchC2 = useRef() as MutableRefObject<HTMLDivElement>
  const switchCircle1 = useRef() as MutableRefObject<HTMLDivElement>
  const switchCircle2 = useRef() as MutableRefObject<HTMLDivElement>
  const aContainer = useRef() as MutableRefObject<HTMLDivElement>
  const bContainer = useRef() as MutableRefObject<HTMLDivElement>
  const darkModeClass = useTheme(styles)

  const switchForm = () => {
    switchCtn.current.classList.add(styles.is_gx)

    setTimeout(() => {
      if (switchCtn.current) switchCtn.current.classList.remove(styles.is_gx)
    }, 500)

    switchCtn.current.classList.toggle(styles.is_txr)
    switchCircle1.current.classList.toggle(styles.is_txr)
    switchCircle2.current.classList.toggle(styles.is_txr)

    switchC1.current.classList.toggle(styles.is_hidden)
    switchC2.current.classList.toggle(styles.is_hidden)
    aContainer.current.classList.toggle(styles.is_txl)
    bContainer.current.classList.toggle(styles.is_txl)
    bContainer.current.classList.toggle(styles.is_z200)
  }

  return (
    <div className={`${styles.main} ${darkModeClass}`}>
      <div className={styles.mode_toggle}>
        <ModeToggler />
      </div>

      <div className={styles.mode_toggle}>{/* <ModeToggler /> */}</div>
      <div
        className={cn(styles.container, styles.a_container, darkModeClass)}
        id="a-container"
        ref={aContainer}
      >
        <div className={styles.container__inner}>
          <SignUpForm linkToRedirect={linkToRedirect} />
        </div>
      </div>
      <div
        className={cn(styles.container, styles.b_container, darkModeClass)}
        id="b-container"
        ref={bContainer}
      >
        <div className={styles.container__inner}>
          <SignInForm linkToRedirect={linkToRedirect} />
        </div>
      </div>
      <div
        className={cn(styles.switch, darkModeClass)}
        id="switch-cnt"
        ref={switchCtn}
      >
        <div
          className={cn(styles.switch__circle, darkModeClass)}
          ref={switchCircle1}
        />
        <div
          className={cn(
            styles.switch__circle,
            styles.switch__circle__t,
            darkModeClass
          )}
          ref={switchCircle2}
        />
        <div className={styles.switch__container} id="switch-c1" ref={switchC1}>
          {!isMedia800 && (
            <>
              <h2
                className={cn(
                  styles.switch__title,
                  styles.title,
                  darkModeClass
                )}
              >
                Добро пожаловать!
              </h2>
              <p
                className={cn(
                  styles.switch__description,
                  styles.description,
                  darkModeClass
                )}
              >
                Чтобы оставаться на связи с нами, пожалуйста, войдите в свой
                аккаунт
              </p>
            </>
          )}
          <button
            onClick={switchForm}
            className={cn(
              styles.switch__button,
              styles.button,
              styles.switch__btn,
              darkModeClass
            )}
          >
            Войти
          </button>
        </div>
        <div
          className={cn(styles.switch__container, styles.is_hidden)}
          id="switch-c2"
          ref={switchC2}
        >
          {!isMedia800 && (
            <>
              <h2
                className={cn(
                  styles.switch__title,
                  styles.title,
                  darkModeClass
                )}
              >
                Привет, друг!
              </h2>
              <p
                className={cn(
                  styles.switch__description,
                  styles.description,
                  darkModeClass
                )}
              >
                Зарегистрируйтесь и начните путешествие с нами
              </p>
            </>
          )}
          <button
            onClick={switchForm}
            className={cn(
              styles.switch__button,
              styles.button,
              styles.switch__btn,
              darkModeClass
            )}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
