import Layout from '@/components/layout/Layout'
import OrderPage from '@/components/templates/OrderPage/OrderPage'
import Head from 'next/head'

export default function Order() {
  return (
    <>
      <Head>
        <title>Магазин | Заказ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <OrderPage />
          <div className="overlay"></div>
        </main>
      </Layout>
    </>
  )
}