import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { withHydrate } from 'effector-next'
import { useEffect, useState } from 'react'
import NextNProgress from 'nextjs-progressbar'

import 'react-toastify/dist/ReactToastify.css'
import { checkUserAuthFx } from '@/app/api/auth'
import { useUser } from '@/hooks/useUser'

const enhance = withHydrate()

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  const { checkUser } = useUser()

  useEffect(() => {
    checkUser()
  })
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <>
        <NextNProgress />
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          limit={1}
          theme="light"
        />
      </>
    )
  )
}

export default enhance(App as React.FC<AppProps>)
