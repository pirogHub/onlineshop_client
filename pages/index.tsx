import Layout from '@/components/layout/Layout'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
import Head from 'next/head'

import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useUser } from '@/hooks/useUser'
import { useEffect } from 'react'

export default function Dashboard() {
  const getDefaultTextGenerator = () => ''
  const getTextGenerator = () => ''
  const { checkUser } = useUser()

  useEffect(() => {
    checkUser()
  }, [])
  return (
    <>
      <Head>
        <title>Магазин | Главная</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      <Layout>
        <main>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <DashboardPage />
          <div className="overlay"></div>
        </main>
      </Layout>
    </>
  )
}
