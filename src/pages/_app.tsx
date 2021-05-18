import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client/react'
import '../styles/main.scss'
import { client } from '@/utils/apollo'
import { Nav } from '@/components'
import { SessionProvider } from '@/hooks/useSession'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <Nav />
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
