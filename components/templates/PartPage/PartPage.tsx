import { useTheme } from '@/hooks/useTheme'
import styles from './PartPage.module.scss'
import { useStore } from 'effector-react'
import { $boilerPart } from '@/context/boilerPart'
import cn from 'classnames'
import PartImagesList from '@/components/modules/PartImageList/PartImageList'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import { getBoilerPartsFx } from '@/app/api/boilerparts'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import SVG from '@/components/elements/ui/svg'
import Spinner from '@/components/elements/Spinner/Spinner'
import PartTabs from '@/components/modules/PartImageList/PartTabs'
import DashboardSlider from '../DashboardPage/DashboardSlider/DashboardSlider'
import {
  $boilerParts,
  setBoilerParts,
  setBoilerParts_byPopularity,
} from '@/context/boilerParts'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ImagesAccordion from '@/components/modules/PartImageList/ImagesAccordion'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/useUser'
import { useLogoutIfForbidden } from '@/hooks/useLogoutIfForbidden'
import { error500hander } from '@/app/api.helpers'
const PartPage = () => {
  const darkModeClass = useTheme(styles)
  const boilerPart = useStore($boilerPart)
  const boilerParts = useStore($boilerParts)
  const isMobile = useMediaQuery(850)
  const cartItems = useStore($shoppingCart)
  const isInCart = cartItems.some((item) => item.partId === boilerPart.id)
  const spinnerToggleCart = useStore(removeFromCartFx.pending)
  const spinnerSlider = useStore(getBoilerPartsFx.pending)
  const user1 = useStore($user)
  const router = useRouter()
  const { user } = useUser()
  const { checkError } = useLogoutIfForbidden()
  const toggleToCart = () => {
    const usertmp = user1
    if (user !== false)
      toggleCartItem(user.username, boilerPart.id, isInCart, checkError)
    else {
      router.push(`/auth?redirect="${router.asPath}"`)
      toast.warning('Войдите в систему, чтобы добавлять товары в корзину')
    }
  }

  useEffect(() => {
    loadBoilerPart()
  }, [])

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      setBoilerParts(data)
      setBoilerParts_byPopularity()
    } catch (error) {
      if (!error500hander(error)) toast.error((error as Error).message)
    }
  }

  return (
    <section>
      <div className="container">
        <div className={cn(styles.part__top, darkModeClass)}>
          <h2 className={cn(styles.part__title, darkModeClass)}>
            {boilerPart.name}
          </h2>
          <div className={styles.part__inner}>
            <PartImagesList />
            <div className={styles.part__info}>
              <span className={cn(styles.part__info__price, darkModeClass)}>
                {formatPrice(boilerPart.price || 0)} P
              </span>
              <span className={styles.part__info__stock}>
                <span
                  className={
                    boilerPart.in_stock > 0
                      ? styles.part__info__stock__success
                      : styles.part__info__stock__not
                  }
                >
                  {boilerPart.in_stock > 0 ? 'Есть на складе' : 'Нет на складе'}
                </span>
              </span>
              <span className={styles.part__info__code}>
                Артикул: {boilerPart.vendor_code}
              </span>
              <button
                className={cn(styles.part__info__btn, {
                  [styles.in_cart]: isInCart,
                })}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <Spinner style={{ top: 10, left: '45%' }} />
                ) : (
                  <>
                    <span className={styles.part__info__btn__icon}>
                      {isInCart ? (
                        <SVG.CartHoverCheckedSvg />
                      ) : (
                        <SVG.CartHoverSvg />
                      )}
                    </span>
                    {isInCart ? (
                      <span>Добавлено в карзину</span>
                    ) : (
                      <span>Положить в корзину</span>
                    )}
                  </>
                )}
              </button>
              {!isMobile && <PartTabs />}
            </div>
            {isMobile && (
              <div className={styles.part__accordion}>
                <div className={styles.part__accordion__inner}>
                  <ImagesAccordion title="Описание">
                    <div
                      className={cn(
                        styles.part__accordion__content,
                        darkModeClass
                      )}
                    >
                      <h3
                        className={cn(
                          styles.part__tabs__content__title,
                          darkModeClass
                        )}
                      >
                        {boilerPart.name}
                      </h3>
                      <p
                        className={cn(
                          styles.part__tabs__content__text,
                          darkModeClass
                        )}
                      >
                        {boilerPart.description}
                      </p>
                    </div>
                  </ImagesAccordion>
                </div>
                <ImagesAccordion title="Совместимость">
                  <div
                    className={cn(
                      styles.part__accordion__content,
                      darkModeClass
                    )}
                  >
                    <p
                      className={cn(
                        styles.part__tabs__content__text,
                        darkModeClass
                      )}
                    >
                      {boilerPart.compatibility}
                    </p>
                  </div>
                </ImagesAccordion>
              </div>
            )}
          </div>
          <div className={styles.part__bottom}>
            <h2 className={cn(styles.part__title, darkModeClass)}>
              Вам понравится
            </h2>
            <DashboardSlider
              goToPartPage
              spinner={spinnerSlider}
              items={boilerParts.rows || []}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartPage
