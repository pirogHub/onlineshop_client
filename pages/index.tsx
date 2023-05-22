import AuthPage from '@/components/templates/AuthPage/AuthPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'

export default function Auth() {
  const { shouldLoadContent } = useRedirectByUserCheck(true)
  return (
    <>
      <Head>
        <title>Магазин | {shouldLoadContent ? 'Авторизация' : ''}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && <AuthPage />}
    </>
  )
}
