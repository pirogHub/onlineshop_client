import Layout from '@/components/layout/Layout'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'
import { IQueryParams } from '@/types/catalog'
import Head from 'next/head'

export default function Catalog({ query }: { query: IQueryParams }) {
  return (
    <>
      <Head>
        <title>Магазин | Каталог</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <CatalogPage query={query} />
          <div className="overlay"></div>
        </main>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}
