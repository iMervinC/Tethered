import React, { FC } from 'react'
import Head from 'next/head'
import { useEffect } from 'react'
import Router from 'next/router'
import useSession from '@/hooks/useSession'

const Layout: FC<{ title: string; auth?: boolean }> = ({
  title,
  children,
  auth,
}) => {
  const session = useSession()

  const route = Router

  useEffect(() => {
    if (!session && auth) route.push('/login')
  }, [session])

  if (!session && auth) return null

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <main className="container">{children}</main>
    </>
  )
}

export { Layout }
