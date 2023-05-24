import { getBoilerPartFx } from '@/app/api/boilerparts'
import Layout from '@/components/layout/Layout'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'
import PartPage from '@/components/templates/PartPage/PartPage'
import { $boilerPart, setBoilerPart } from '@/context/boilerPart'
import { IQueryParams } from '@/types/catalog'
import { useStore } from 'effector-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Custom404 from '../404'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

export default function Part({ query }: { query: IQueryParams }) {
  const boilerPart = useStore($boilerPart)
  const [error, setError] = useState(false)

  const router = useRouter()
  const getDefaultTextGenerator = useCallback(
    (subpath: string) => subpath.replace('catalog', 'Каталог'),
    []
  )
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])
  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

  useEffect(() => {
    loadBoilerPart()
  }, [router.asPath])

  useEffect(() => {
    if (lastCrumb) {
      lastCrumb.textContent = boilerPart.name
    }
  }, [lastCrumb, boilerPart])

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)

      if (!data) {
        setError(true)
        return
      }

      setBoilerPart(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
  return (
    <>
      <Head>
        <title>Магазин | {boilerPart.name}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        <Layout>
          <main>
            <Breadcrumbs
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
            />
            <PartPage />
            <div className="overlay"></div>
          </main>
        </Layout>
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}
