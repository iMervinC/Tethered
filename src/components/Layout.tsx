import React, { FC } from 'react'
import Head from 'next/head'

const Layout: FC<{ title: string }> = ({ title, children }) => {
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
